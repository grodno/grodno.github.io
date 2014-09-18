###
AXIOD.JS Framework.
###
((global) ->

    # strict mode on
    "use strict"
    
    # some internal shortcuts
    [F,A,O] = [Function, Array, Object]

    F0 = (x) -> x
    
    # Default logging.
    O.log = (x) ->
        return x unless global.DEBUG
        c = global.console
        args = (e for e in arguments)
        if c?.log
            if c.log.apply
                c.log args...
            else
                c.log args.join(", ")# IE8
        x  

    #  narrow error to reqular form: { reason:'', message:'', info:''}
    O.error = (err, message, details) ->
        err = message: "unknown"  if not err
        err = reason: err  if typeof (err) is "string"
        err.reason =  err.reason or "unknown"
        err.message = [(message or ''), (err.message or (''+err))].join(' ')
        err.details = details or err.details or ''
        err.log = -> 
            c = global.console
            @stack = (new Error).stack unless @stack
            if c?.error then c.error @reason, @message, @details, @stack else O.log ["ERROR:", @]...
            @
        err

    # URI object: type://id?(p1=v1)*#hash
    class O.Uri 
    
        constructor:  () ->
          @isUri = true
          @params = {}
    
        toString : ->
            r =""
            
            (r = @type + ":") if @type
                 
                
            r += (if @domain then "//" + @domain else (if @type then "*" else ""))
            
            (r +=  '/' + @path.join('/')) if @path
            
            sep='?'
            for own n,v of @params
                r += sep + n + "=" + encodeURIComponent(v)
                (sep = '&') if sep is '?'
                

            if @hash 
                r += "#" + @hash
            r
    
        @parse : (s) ->
          
          return s  if s?.isUri
          
          r = new Uri(s)
          
          return r  unless s
          
          s = "" + s  unless s.split
          
          # extract type:
          if (p = s.indexOf("://")) > -1
            r.type = s[0..p-1]
            s = s[p+1..]
            
          # extract hash:
          if (p = s.indexOf("#")) > -1
            r.hash = s[p+1..]
            s = s[0..p-1]

          r.id = s
          
          # extract query:
          [s, r.query] = s.split("?")
          if r.query
            (r.params[p[0]] = decodeURIComponent(p[1]) for v in r.query.split("&") when (p = v.split("=")).length > 1)


          
          # work with path:
          p = s.split("/")
          if p[0] is ""
            p.shift()
            if p[0] is ""
                p.shift()
                r.domain = p.shift()
          r.path = p
          
          r

    # Event object
    class Event 
        
        LISTENERS = {}
        DEFERED = {}
        
        _obj = (key, force) ->
          obj = LISTENERS
          p1 = -1
          obj = (obj[k = key[p1..p-1]] or (obj[k] = {})) while (p = key.indexOf(".", p1 = p + 1)) > -1
          obj[k = key[p1..]] or (force and (obj[k] = {}))

        _defer = (key)->
            (DEFERED[key] or (DEFERED[key] = [])).push @
            O.log "!!! Defer event for [#{key}]"
        
        # broadcast to all listeners
        _notify = (obj) ->
            rec = obj?.first
            while rec
                try
                    rec.handler.call rec.target, @
                catch 
                    O.error(_error, 'event notify:', op:(''+rec.handler).replace(/\s+/g,'')[9..150],target:rec.target ).log()
                rec = rec.next
            @  
            
        class Record
        
            constructor:  (@handler, @target=null) -> target?.addFinalizer? => @.remove()
                    
            remove: ->
                if @next 
                    @next.prev = @prev
                else 
                    @obj.last = @prev or null
                    
                if @prev
                    @prev.next = @next
                else 
                    @obj.first = @next or null
                @
                
            add: (@obj) -> 
                if obj.last 
                    (obj.last.next = @).prev = obj.last 
                else 
                    obj.first = @
                    
                obj.last = @
                
        constructor:  (u) ->
            if u.uri
                O.update @, u
            else 
                @uri = u
                
            @uri = O.Uri.parse(@uri)
            
        
        #notify broadcasts event to all handlers that listen appropriate event type
        fire: (c) ->
            @callback = c if c
            
            throw ("No target specified for event #{@uri.toString()}") unless key = @uri.type
            
            return _defer.call @, key unless obj = LISTENERS[key]
            
            _notify.call @, obj

        isEvent : true

        callback : ->
        
        #register adds an event {#handler} for {#type}
        @listen : (key, handler, target) -> 
            new Record(handler, target).add(_obj(key, true))
            ev.fire() for ev in list  if list = DEFERED[key]

        #removes all handlers for given event type
        @unlisten : (key) -> delete LISTENERS[key]
        
        # Property changed notification
        @notifyPropertyChanged : (key, propId, ev) -> _notify.call ev, LISTENERS[key]?[propId]
        

    ###
      That iterator call {#fn} for each entry of {#obj} on {#ctx} passing datum, index and {#opts}.
      @return {#ctx}
    ###
    F.iterate = (fn, obj, ctx, opts) ->
        if obj
          ln = obj.length
          if ln is +ln
            fn.call ctx, x, i, opts for x, i in obj
          else
            fn.call ctx, x, n, opts for own n, x of obj
        ctx

    F.perform = (ctx, factory) ->
            
        locked = 1
        results = [null, undefined]

        # callback function passed as context for each operation
        tick = () ->

            if not --locked and (op = flow.operations.shift())
            
                locked = 1
                    
                _args = [].concat results
                results = [null, undefined]
                try
                    _sError = new Error unless global.DEBUG
                    op.apply(flow.context, _args) 
                catch 
                    O.error(_error, 'flow-op:', op:(''+op).replace(/\s+/g,'')[9..150], args:_args ).log()
 
        newCb = (pos)-> 
            (err, v) ->
                return unless (results[pos] is undefined) # can affect only once!
                results[0]   = O.error(err).log() if err
                results[pos] = v
                tick()
                
        flow = 
            context : ctx
            
            # skip code to next inside op
            next : newCb(1)
            
            # used to create parallel callback
            wait : ->
                pos = results.length
                # ensure size
                results[pos] = undefined
                # increment locked
                locked+=1
                newCb(pos)

        flow.operations = factory.call(ctx, flow)

        # start with first operation
        tick()  
    
    # Ensure all dependencies are resolved and invokes callback after.
    O.require = ( ->
        
        _cache = {}
        
        createCb = (ctx) ->
            (err, r) ->
                O.error(err).log() if err
                ctx.isDone = 1 unless err
                cb(err, r) while (cb = ctx.q.shift())
                1 
            
        (list, cb) ->
            
            return cb(null, 0) unless list?.length
                  
            F.perform list,
                (flow) -> [
                    ->
                        for x in list
                        
                            if x and (ctx = _cache[x] or (_cache[x] = q: [], x: x)) and not ctx.isDone
        
                                ctx.q.push flow.wait()
                          
                                O.fire x, createCb(ctx) if ctx.q.length is 1    
                          
                        flow.next(null, list.length)
        
                    cb
                ]
    )()  

    ###
    @find item of {#arr} with {#key='id'} attribute value matching {#val}.
    @return item found or null if none
    ###
    A.find = (arr, fn, key) ->
        if arr
            fn = ((e) -> if e[key] is fn then e else null) unless typeof (fn) is "function"
            for x, i in arr
                return r if (r = fn.call(arr, x, i))
            null
        null
  
  
    # sort given {#a}rray in {#dir}ection using {#getter} for criteria
    A.sortBy = (a, key, dir) ->
        dir = 1 unless dir
        rdir = dir * -1
        getter = if typeof (key) is "string" then (s) -> s?[key] else key or F0
        a.sort (s1, s2) ->
            if (v1 = getter(s1)) > (v2 = getter(s2)) then dir else (if v1 < v2 then rdir else 0)
    
    # updates {obj} with own key/values from {extra}.
    O.update = (obj, extra) ->
        if obj and extra
          obj[n] = extra[n] for own n of extra
        obj

    # get/set value of {#obj} property by {#keys} in deep.
    O.prop = (obj, key, val) ->
          
        return null unless obj
        
        p = -1
    
        if arguments.length>2
          (obj = (obj[k = key[p1..p-1]] or (obj[k] = {}))) while (p = key.indexOf(".", p1 = p + 1)) > -1
          obj[key[p1..]] = val
        else
          (obj = obj[key[p1..p-1]]) while obj and (p = key.indexOf(".", p1 = p + 1)) > -1
          obj?[key[p1..]]
    
    # null-safe clone of obj with extra if any.
    O.clone = (obj, extra) -> 
        return null unless obj 
        r = new (obj.constructor)()
        r[n] = obj[n] for own n of obj
        r[n] = extra[n] for own n of extra if extra
        r
    
    # returns object evaluated from given s or null.
    O.parse = (s) ->
        return null unless s
        try
            F.call(F,'window', "return #{s}")() 
        catch 
            (O.error "bad-code", "Object.parse: #{_error.message}", s).log() and null

    ###
    Working with Strings.
    ###
    # @return capitalized {#s} or ''
    String.capitalize = (s) -> 
        if s?.length then s.toString()[0].toUpperCase() + s[1..] else ""

    # @return camelize {#s} or ''
    String.camelize = (s, sep='_') -> 
        if s?.length then (String.capitalize(t) for t in s.split(sep)).join('') else ''

    # @return localized {#s} or ''
    String.localize = (s) -> 
        if s then String.capitalize(String.camelize(s)) else ""

    # Returns string formatted by template filled with rest of arguments.
    # If template is a function, then it is invoked with rest of arguments passed
    # @return string result.
    String.format = (->
        RE =/\{(\d+)\}/gm
        (s) ->
            return '' unless s
            args = (e for e in arguments)
            s.replace RE, (s,d) ->
                args[+d+1] or ''
    )()

    # @return string formatted by template and key/value map used for placeholder substitution.
    String.template = (->
        RE =/\{\{(\w+?)\}\}/gm
        RE2 = /\{\{#(\w+?)\}\}([\s\S]+?)\{\{\/(\w+?)\}\}/gm
        FN2 = (s,k,c) -> 
                    return k+c
                    return '' unless ctx=@[k]
                    if ctx.length 
                        (String.template(c,e) for e in ctx).join('')
                    else
                        String.template(c,ctx)

        (s, map) ->
            unless s then '' else 
                s
                #.replace(RE2, FN2)
                .replace(RE, (s,k) -> O.prop(map,k) or '' )
    )()

    ###
    properties
    ###
    PROP = 
        # property types
        TYPES : {} 
        
        # all properties registry
        ALL : {} 
        
        # property instance
        GET : (id) -> @ALL[id] or (@ALL[id] = new EntityProperty(id))
        
        # binds property value with expression
        BIND : (->
            
            RE =/\$\{([\?\+]?[\w\.]+?)\}/gm
            
            # parses and compile binding from expression
            compile = (s, tId) ->
                _reg={}
                src = []
                body = s.replace RE, (s, path)->

                    path = path[1..]  if (opt = path[0] is "?") or (req = path[0] is "+")
                    
                    [id, prop] = path.split(".")
                    prop = "value" unless prop
                    id = tId unless id
                
                    path = id + "." + prop
                        
                    unless _reg[path] 
                        
                        _reg[path] = 1
                        
                        src.push
                            id: path
                            required: req
                            optional: opt
                            entityId: id
                            propName: prop

                    "$V[\"#{path}\"]"
                    
                fn = try 
                        new Function("$V", "return " + body + ";") 
                    catch 
                        ->
                            O.error(_error, "Wrong binding expression", compiled.body).log()
                            _error.message
                
                sources: src
                expression: fn
                values : null
                
    
            (T, propName, value) ->
                
                handler = compile(value, T.id)
                fn =->
                    v = handler.values
                    handler.values = null
                    T.prop propName, handler.expression.call(T, v)
                    
                # event handler
                _bind = (ev) -> 
                    hasPending = handler.values isnt null
                    handler.values = {}
                    for p in handler.sources
                        
                        unless (w = O.entity(p.entityId))
                            handler.values = null
                            return T.log("Expression have no source yet: #{p.id} -> #{propName}") 
                        
                        val = w.prop(p.propName)
                        
                        if (val is undefined and not p.optional) or (p.required and not val)
                            handler.values = null
                            return T.log("Expression have no value yet: #{p.id} -> #{propName}") 
                        
                        handler.values[p.id] = val

                    setTimeout(fn, 10) unless hasPending

                # subscribe all
                Event.listen(ps.id, _bind, T) for ps in handler.sources
                
                # perform binding immediately!!!
                _bind()
            
        )()  
        
        BIND2: (T, prop, path, dbound) ->
            [sId, sProp] = path.split('.')
            
            # event handler
            _bind = (ev) -> 
                return unless S = O.entity sId
                val =  S.prop sProp
                if val is undefined
                    #O.log ("Binging is not ready for #{T}.#{prop}")
                else
                    #O.log ("Binging for #{T}.#{prop}"+val)
                    T.prop prop, val
                unless dbound
                    PROP.BIND2 S, sProp, T.id + "." + prop, true
                    dbound = true
                    
            # subscribe
            Event.listen(path, _bind, T)

            unless dbound
                # perform binding immediately!!!
                _bind()
                

    class EntityProperty 
    
        constructor: (@id) ->
            @_id =@id
            @asyncTarget = @id[0..-4] if @id[-3..] is "Uri"
                
            ids = @id.split(':')
            if (typeId = ids[1])
              @id = ids[0]
              type = PROP.TYPES[typeId]
              throw new Error("ERROR: No such property type: " + typeId)  unless type
              if ftor = type.methods
                  methods = ftor(_super = {})
                  for n of methods
                    _super[n] = @[n] or F0  if typeof (methods[n]) is "function"
                    @[n] = methods[n]
              @mixin = type.mixin
        
        # invoked when property attached to entity type
        # by default applies patches to entity type
        attachToEntityCtor: (ctor) -> ENTITY.applyMixin.call(ctor::, @mixin) if @mixin

        extractDefaults: (T, defaults) ->
                n = @id
                if T[n]
                    defaults[n] = T[n]
                    T[n] = undefined
                n = @id+'Expression'
                if T[n]
                    defaults[n] = T[n]
                    T[n] = undefined
                n = @id+'Binding'
                if T[n]
                    defaults[n] = T[n]
                    T[n] = undefined
                unless @asyncTarget
                    n = @id+'Uri'
                    if T[n]
                        defaults[n] = T[n]
                        T[n] = undefined
                    n = @id+'UriExpression'
                    if T[n]
                            defaults[n] = T[n]
                            T[n] = undefined


        # Property initialization for given entity
        # invoked at entity.init()
        # @param T  entity instance
        init: (T, defs) ->
            
          # set initial value if any
          unless (v = defs[@id]) is undefined
            T.prop @id, isEvent:true, value:v, force: true 
          
          # dynamically init async url if any
          PROP.GET("#{@id}Uri").init(T,defs) if (defs["#{@id}Uri"]) or (defs["#{@id}UriExpression"])
          
          #bind expression if any
          PROP.BIND(T, @id, expr) if (expr = defs["#{@id}Expression"])
          PROP.BIND2(T, @id, expr) if (expr = defs["#{@id}Binding"])
          
          T.addFinalizer @done

        # finalizer for given property. invoked at entity.done()
        done: (T) -> delete T[@id]

        # value getter
        getter: (T) -> T[@id]

        # value setter
        setter: (T, v, ev) -> T[@id] = v

        # value comparator
        comparator: (v1, v2) ->  v1 is v2
        
        # async value adapter. used in setAsyncValue() callback by default.
        asyncAdapter : (err, value) -> 
            @error(err) if err
            value or null

        # @set async property value.
        setValueForUri: (T, uri) -> 
            O.fire uri, (err, value) =>
                T.prop @id, (T["#{@id}AsyncAdapter"] or @asyncAdapter).call(T, err, value) unless T.isDone

        
        # @set property value. 
        # invoked from entity.setProperty()
        # @param T  entity instance
        # @param ev event object containing value to set
        setValue: (T, ev) ->
            
            ev = if (ev?.isEvent) then ev else value:ev 
            ev.propId = @id
            ev.entity = T 
            ev.oldValue = @getter T            

            if ((v = ev.value) isnt undefined) and (ev.force or not @comparator(v, ev.oldValue))

                # actually set
                @setter T, v, ev
                
                # async set for target property
                T.prop(@asyncTarget, isEvent:true,value:null, uri: v, force: true ) if @asyncTarget and v
                
                
                T.propertyChanged ev, v, @id

            @setValueForUri(T, ev.uri) if ev.uri
            
            ev
 
    ###
    Entity
    ###
  
    ENTITY = 
        # entities registry
        ALL : {}
        
        # entity types registry
        TYPES : {}
        
        # entity counter used as guid
        TOTAL : 0
  
        #overrides methods.
        applyMixin : (fn) ->
            return @ unless fn
            for own n, m of fn(_super = {})
                _super[n] = @[n] or F0
                @[n] = m
            @

        # parses meta info for entity create
        parseMeta : (m) ->
            m =  id:m if typeof (m) is "string"
            # identity
            unless m.typeId
                id = m.id
                [m.id, m.typeId] = if ':' in id then id.split(":") else [null,id]
            m 
            
        # just register meta at this time. Actual type constructor will be created on demand.
        defineType : (m) ->
            [m.id, m.superId] = m.id.split(" extends ")
            @TYPES[m.id] = m

        # get entity constructor or creates/register a new one.
        getCtor : (t) -> t.ctor or (t.ctor = @createCtor(t)) if (t = @TYPES[t])
        
        #@creates a new one entity constructor.
        createCtor : (->
            
            PKEYS = ['id', 'superId','properties','methods']

            _applyType = (t) ->
                # recurrsive to root 
                _applyType.call(@, ENTITY.TYPES[t.superId]) if t.superId
                #properties
                if t.properties
                    for pId in t.properties
                        if @properties[pId]
                            O.log('Duplicate property', pId, @)
                        else     
                            (@properties[(p=PROP.GET(pId)).id] = p).attachToEntityCtor(@)                       
                #options 
                (@options[k] = v) for own k, v of t when k not in PKEYS
                        
                # methods
                ENTITY.applyMixin.call @::, t.methods

                @

                        
            (type) ->
          
                ctor = (@id, options)->
                    @_finalizers = []
                    @_id = "E" + (ENTITY.TOTAL++) # unique identity
                    
                    @[k] = v for own k, v of @constructor.options
                    @[k] = v for own k, v of options when k not in PKEYS if options
                    
                    @
                    
                ctor::[k] = v for own k, v of EntityPrototype
                
                ctor.type = type
                ctor.options = {} # incremental with supers
                ctor.properties = {} 

                _applyType.call(ctor, type, {})

        )()
        
        findUnresolvedType : (typeId) ->
            
            return typeId unless (type = @TYPES[typeId])
            
            return @findUnresolvedType(type.superId) if type.superId
            
            null
            
        #@get entity constructor or creates/register a new one.
        resolveType : (typeId, cb) ->
            
             O.require ["entity://#{typeId}"], (err) =>
                 
                throw new Error ("Can't resolve type #{typeId}") unless @TYPES[typeId]
                
                if (utype = @findUnresolvedType(typeId))
                    @resolveType utype,cb
                else
                    cb()

        createInlineCtor:(meta) ->
                @createCtor
                        id : "T" + (@TOTAL++)   
                        options: meta
                        superId: meta.typeId
                        properties: meta.properties or []
                        methods: meta.methods
                        
        create:(meta, cb) ->
            
            meta = @parseMeta(meta)
            typeId = meta.typeId
            
            # check if type hierarhy present
            if (utype = @findUnresolvedType(typeId))
                return @resolveType utype, (err) => 
                        @create meta, cb unless err

            # get constructor
            Ctor = if meta.properties or meta.methods then @createInlineCtor(meta) else @getCtor(typeId)
            
            # create object
            obj = new Ctor(meta.id, meta) 
            
            # register if has explicit id
            @ALL[obj.id] = obj if obj.id
            
            #launch
            obj.launch(cb)

        get : (id) -> if id._id then id else @ALL[id] if id

    # @define The basic [entity] entity type.
    EntityPrototype =
    
        # launches entity with cb
        launch: (cb)->
            @init() 
            cb?(null, @)

        # initializes entity
        init: ->
            
            # init all declared properties
            defaults = {}
            p.extractDefaults @, defaults for n, p of @constructor.properties
            p.init @, defaults for n, p of @constructor.properties
            
            # assign this for other entities
            if ref = @referrer
                ref = (if ref.split then ref.split(".") else ref)
                if target = (if ref[0] is "parent" then @parentEntity else ENTITY.get(ref[0]))
                    target[ref[1]] = @
                    @addFinalizer -> target[ref[1]] = null

            @isInited = true

        # done entity
        done: ->
            @isDone = true # mark done
            
            delete ENTITY.ALL[@id] if @id

            if @_finalizers
                fn.call @, @ for fn in @_finalizers
                @_finalizers =null

        # add a some finalizer function to be invoked at done();
        addFinalizer: (fn) -> 
            @_finalizers.push fn unless @isDone
            
        # property get/set
        prop: (key, value) ->
            return null if @isDone
            
            p = @constructor.properties
              
            return (if p[key] then p[key].getter(@) else @[key]) if arguments.length is 1 # as getter
            
            (p[key] or (p[key] = PROP.GET(key))).setValue @, value
            
        propertyChanged: (ev, v, propId) ->
            # hook
            @["#{propId}Changed"]?.call(@, ev, v)
            # notify dependensies
            Event.notifyPropertyChanged @id, propId, ev

        # error handler
        error: (err, message, info) ->
            Object.error(err, message, info or @).log()
            
        log : (x) ->
            return x unless global.DEBUG
            args = (e for e in arguments)
            args[0] = "#{@}:#{x}"
            O.log args...

        # toString
        toString: -> 
            "[Entity:#{@constructor.type.id}:#{@id}:#{@_id}]"

    ###
    API 
    ###
        
    O.fire = (ev, cb) -> (if ev.isEvent then ev else new Event(ev)).fire cb
    
    O.entity = (id) -> ENTITY.get(id)
  
    # define a new entity type
    O.entity.define = (meta) -> ENTITY.defineType(meta)

    # defines a property type
    O.entity.defineProperty = (meta) -> PROP.TYPES[meta.id] = meta

    # creates a new entity instance.
    # @param r - metainfo object for instance: 
    O.entity.create = (meta, cb) -> ENTITY.create(meta, cb)

    # creates a new entity instance.
    # @param r - metainfo object for instance: 
    O.entity.prop = (id, key, value) -> ENTITY.get(id)?.prop(key,value)

    ###
    EventHandler entity type
    ###
    
    # property [valueBundle].
    # It manage a set of dynamic properties as part of [value] property bundle.
    O.entity.defineProperty 
        id: "IsReady"
        # patch entity type attached to
        methods : ->
            # value comparator
            comparator: (a, b) -> (not a) is (not b) # compares as boolean
            # value setter
            setter: (T, v, ev) -> T[@id] =  !!v
            
        mixin:  (_super) ->
            # @return true if handler is ready to perform events
            isReady: -> @prop "ready"
    
            # @set ready flag to true
            setIsReady: -> @prop "ready", true

    O.entity.define 
        id : "EventHandler" 
        properties: ["ready:IsReady"]
        ready: true # ready by default
        methods: (_super) ->
            
            _listenEvents = ->
                throw new Error("No id for #{@}") if not @id
                @log "listen for events"
                Event.listen @id, @onEvent, @
                
            # done entity
            done: ->
               Event.unlisten @id 
               _super.done.call @
               
            # listen for Events
            onEvent: (ev) -> @handleEvent ev 
    
            # evaluate defered events
            readyChanged: (_ev, ready) ->
                _listenEvents.call @ if ready

            # default Event handler
            handleEvent: (ev) -> ev.callback @error('bad-code', 'No EventHandler Implementation')

    O.entity
    
)(if typeof (global) is "undefined" then this else global)
