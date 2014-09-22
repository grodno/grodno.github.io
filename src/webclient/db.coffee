((global) ->

    # Naming is a mess!
    IDB = global.indexedDB or global.webkitIndexedDB or global.mozIndexedDB or global.msIndexedDB
    IDBKeyRange = global.IDBKeyRange or global.webkitIDBKeyRange
    IDBCursor = global.IDBCursor or global.webkitIDBCursor or global.mozIDBCursor or global.msIDBCursor
    
    PREV = IDBCursor.PREV or "prev"
    NEXT = IDBCursor.NEXT or "next"

    # Generate four random hex digits.
    S4 = -> (((1 + Math.random()) * 0x10000) | 0).toString(16).substring 1
  
    # Generate a pseudo GUID by concatenating random hexadecimal.
    guid = -> S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
  
        
    _openCursorArgs = (options) ->
        
        desc = options.descend or (options.dir is "desc")
        
        return [null, unless desc then NEXT else PREV] unless range = options.range
          
        if range instanceof Array
              [lower,upper] = range
              return if upper is null  
                        [IDBKeyRange.lowerBound(lower)]  
                     else if lower is null 
                        [IDBKeyRange.upperBound(upper)]  
                     else 
                         if desc = (lower > upper) then [IDBKeyRange ([upper,lower])...,PREV] else [IDBKeyRange ([lower,upper])...,NEXT]
              
        [IDBKeyRange.only(range)]

    _getDoc = (store, opts) ->

        return store.get(val) if val = opts.id
        # We need to find which index we have
        for key of store.indexNames
            index = store.index(key)
            return index.get(val) if val = opts[index.keyPath]
        null   
        
    _UPGRADE = (->
        
        # narrow index info
        _idx = (idx) -> if idx.keyPath then idx else keyPath:idx
 
        # creates a new Store in @ database
        createStore = (id, idx='id', indices=[]) ->
            store = @createObjectStore(id, _idx(idx))
            store.createIndex String.camelize(idx.keyPath, ","), idx.keyPath, idx.options for idx in indices when idx = _idx(idx)

        (ev, cb) ->
            @log "Upgrade", ev.oldVersion, " => ", ev.newVersion
            
            db = ev.target.result
            db.deleteObjectStore s for s in db.objectStoreNames
    
            throw new Error "No scheme for db #{@id}" unless @scheme 
            createStore.call db, st.id, st.keyPath, st.indices for st in @scheme when (st = if st.id then st else id:st)
    )()
        
    _STORE = ->
        txType = if @operation in ["query","read"] then "readonly" else "readwrite"
        try
            @store = @home.db.transaction(@scope or [@storeId], txType).objectStore(@storeId)
            @next()
        catch
            @callback @home.error('db','can\'t obtain the store '+@storeId, _error)

    _CURSOR = (store, options={}, next) ->
        key = options.key
        src = if key then store.index(String.camelize(key, ",")) else store
        
        return next "No cursor" unless cursor = src.openCursor.apply(src, _openCursorArgs(options))

        cursor.onerror = (e) -> next Object.error("failed", "cursor error", e)

        elements = []
        skipped = 0
        processed = 0
        
        # Creates a handler for the cursor’s `success` event:
        cursor.onsuccess = (e) ->
            
            cursor = e.target.result
          
            # We're done. No more elements.
            return next null, elements unless cursor
            
            # Cursor is not over yet.
            if options.limit and processed >= options.limit
              next null, elements
              e.target.transaction.abort()
            else if options.offset and options.offset > skipped
              skipped++
              cursor["continue"]() # We need to Moving the cursor forward
            else
              elements.push cursor.value
              processed++
              cursor["continue"]()
              
            0
        0
        
    _FIND = ->
        # We couldn't even look for it, as we don't have enough data.
        cb = @next
        return cb "not_specified" unless req = _getDoc(@store, @options)
              
        req.onsuccess = (event) ->
            err = "not_found" unless data = event.target.result
            cb err, data
            
        req.onerror = -> cb "not_found" # We couldn't find the record.
        
        0
          
    _PUT = [
        ->
            docs = [].concat(@payload)
            on_ = =>
                return @next() unless doc = docs.shift()
                
                doc.id = guid() unless doc.id
                doc.ts  = Date.now().valueOf()
                
                tx = @store.put(doc)
                tx.onsuccess = on_
                tx.onerror = @next
        
            on_()
        ->
            @home.prop 'touch', Date.now()
            @next()
        ]
        
    _OPS = 
        # Query the database
        query: -> _CURSOR @store, @options, @next
        # Reads from storeName in db with json.id if it's there of with any json.xxxx as long as xxx is an index in storeName
        find: _FIND
        field: [
            _FIND
            (err, data)->
                @next(err, data?[@options.field])
            ]
        # Insert operations
        insert: _PUT
        # Update operations
        update: _PUT
        # Upsert operations
        upsert: _PUT
        # Remove operations
        remove: ->
            tx = store["delete"](@payload[0].id)
            tx.oncomplete = @next
            tx.onerror = => @next "Not Deleted"

        # Clears all records operations.
        clear: ->
            tx = store.clear()
            tx.oncomplete = @next
            tx.onerror = => @next "Not cleared"
            
        sync: ->
            @prop 'syncDeltaUri', uri if uri = @prop 'syncDeltaUri'

    # UI [fieldset] component:
    Object.entity.define 
        id: "IndexedDatabase extends EventHandler",
        properties: ['touch', "sync"]    

        #schema version need to be an unsigned long
        version: 1
        ready: false # not ready by default
        
        methods: (_super) ->
            launch : (cb) ->
                
                tx = IDB.open(@id, @version)
                tx.onblocked =   (ev) =>  @error "db", "blocked"
                tx.onerror =     (ev) =>  @error "db", "couldn't not connect", ev
                tx.onabort =     (ev) =>  @error "db", "connection aborted", ev
                tx.onsuccess =   (ev) =>
                    @db = ev.target.result # Attach the connection ot the queue.
                    _super.launch.call @, cb

                tx.onupgradeneeded= (ev) =>
                    
                    global.localStorage?[@id+'LastSync'] = 0
                    
                    _UPGRADE.call @, ev, => 
                        _super.launch.call @, cb
                    
            init: ->
                _super.init.call @
                @setIsReady()
                @prop 'lastSynchedTimestamp', global.localStorage?[@id+'LastSync']
                
                if @socketChannel
                    Object.entity.create
                        id:@id+'Socket:SocketClient'
                        channel: @socketChannel

            done: ->
                @db?.close()
                _super.done.call @

            # 
            handleEvent: (ev) -> 
                u = ev.uri
                
                ev.home = @
                ev.storeId = u.path[0].toLowerCase()
                ev.operation = u.domain
                ev.payload = ev.docs or [ev.doc]
                ev.options = Object.update(u.params, ev.options)

                Function.perform ev , (flow) -> 
                    @next = flow.next # allow flow.next() just from context!!!
                    [ _STORE ].concat( _OPS[@operation], @callback )

            syncChanged: (ev, delta)->
                return @_newSyncTs = Date.now() unless delta
                Function.perform @, (flow) -> 
                    [
                        ->
                            for storeId, docs of delta when (storeId = storeId.split('_')[0])
                                Object.fire
                                    uri:"db://upsert/#{storeId}"
                                    docs: docs
                                    callback: flow.wait()
                                    
                            flow.next()
                        ->
                            @prop 'lastSynchedTimestamp', @_newSyncTs
                    ]
            
            lastSynchedTimestampChanged: (ev, ts)->
                
                global.localStorage?.setItem @id+'LastSync', ts
                
                if @syncPeriod
                    fn = => @prop 'lastSynchedTimestampByPeriod', ts
                    global.setTimeout fn, @syncPeriod
                else
                   @prop 'lastSynchedTimestampOnce', ts unless @prop 'lastSynchedTimestampOnce' 

) @

