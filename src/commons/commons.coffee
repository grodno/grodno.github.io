
### 
 Very common stuff used with AXOIDs.
### 

# property [liquid].
Object.entity.defineProperty 
    id: "Liquid"
    methods : ->
        # value comparator
        comparator: Function.FALSE


# property [boolean].
Object.entity.defineProperty 
    id: "Boolean"
    methods : ->
        # value comparator
        comparator: (a, b) -> (not a) is (not b) # compares as boolean
        # value setter
        setter: (T, v, ev) -> T[@id] = not not v


# property [number].
Object.entity.defineProperty 
    id: "Number"
    methods : ->
        # value comparator
        comparator: (a, b) -> Number(a) is Number(b)
        # value setter
        setter: (T, v, ev) -> T[@id] = Number(v)


# property [date].
Object.entity.defineProperty 
    id: "Date"
    methods : ->
        # value comparator
        comparator: (a, b) -> Date.compare(a, b) is 0

# property [value].
Object.entity.defineProperty 
    id: "Value"
    mixin:  (_super) ->
    
        # get value 
        getValue: -> @prop "value"

        # set value 
        setValue: (v) -> @prop "value", v

        # check if value is empty
        isEmptyValue: (e) -> not @getValue()

        # check if value equals to 
        equalsToValue: (v) -> v and (@getValue() is ("" + v))

# property [multiValue].
# It provides value multiset logic.

# patch entity type attached to
Object.entity.defineProperty 
    id: "MultiValue"
    mixin:   (_super) ->
        valueChanged: (ev, v) ->
            @prop "mvalue", (if v then ((if (v.split and v.length) then v.split(@mvalueSeparator or ",") else ["" + v])) else [])
            _super.valueChanged.call this, ev, v
            return

        getMultiValue: -> @mvalue or []
    
        equalsValue: (v) -> v and (("" + v) in @getMultiValue())
    
        putIntoMultiValue: (pk, v) ->
            return    unless pk
            mv = @getMultiValue()
            pk = "" + pk
            contained = pk in mv
            changed = false
            v = (if contained then 0 else 1) if v is -1
            if (v) and not contained
                mv.push pk
                changed = true
            if (not v) and contained
                for pk, i in mv
                    if pk is mv[i]
                        mv.splice i, 1
                        changed = true
                        break
            changed and @setValue(mv.sort().join(@mvalueSeparator))
            
###
EventHandler entity type
###

# property [IsReady].
Object.entity.defineProperty 
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

Object.entity.define 
    id : "EventHandler" 
    properties: ["ready:IsReady"]
    ready: true # ready by default
    methods: (_super) ->
        
        _listenEvents = ->
            throw new Error("No id for #{@}") if not @id
            @log "listen for events"
            Object.entity.listen @id, @onEvent, @
            
        # done entity
        done: ->
           Object.entity.unlisten @id 
           _super.done.call @
           
        # listen for Events
        onEvent: (ev) -> @handleEvent ev 

        # evaluate defered events
        readyChanged: (_ev, ready) ->
            _listenEvents.call @ if ready

        # default Event handler
            handleEvent: (ev) -> ev.callback @error('bad-code', 'No EventHandler Implementation')
            
# Lexio plugin ancestor
Object.entity.defineProperty 

    id:"Plugins"
    
    methods: () ->

        # create by meta
        setter: (T, meta, ev) ->
            
            Function.perform T ,
                (flow) -> [
                    ->
                        for m in meta
                            Object.entity.create m, flow.wait()
                            
                        flow.next()
                    
                    (err)-> 
                        Object.error(err,"#{@}.onPluginsInitializing").log() if err
                        @onPluginsInitialized?(err, @plugins = (e for e, i in arguments when i>1))          
                ]  
                
# EventHandler With Plugins
Object.entity.define 

    id:"EventHandlerWithPlugins extends EventHandler"
    
    properties: [
        "plugins:Plugins" 
    ]    
    plugins:[]
    
    ready: false
        
    methods: (_super) ->
        
        onPluginsInitialized: -> @setIsReady()

# property [value].
Object.entity.defineProperty 
    id: "Requires"
    mixin:  (_super) ->
        launch: (cb)->
            # property is not inited yet!!!
            Object.require @requires, (err) =>
                Object.error(err,"#{@}.onRequires").log() if err
                @onRequiredLoaded? (e for e,i in arguments when i>1)...
                _super.launch.call @, cb

###
Define Cache entity type
###
Object.entity.define 

    id: "Cache extends EventHandler"
    uriPattern : 'remote://{{domain}}/{{path}}?_ver={{version}}'
    methods: (_super) ->

        CACHE = {}
        
        resolveUri: (u) ->
            
            u = Object.clone u, u.params
            u.path = u.path.join('/')
            u.version = @getVersion() unless u.version
            
            Object.Uri.parse(String.template @uriPattern, u)
        
        cacheDeserializer : (s) -> 
            
            return null unless s
            
            if typeof s is "object" then s else Object.parse(s)
            
        cacheSerializer : (s)   -> 
            
            return null unless s
            
            s = if typeof s is "object" then JSON.stringify(s) else s
            if s and s isnt "{}" then s else null
        
        getVersion: -> 
            '' + (@version or 1)
        
        fetch: (uri, cb) ->
            
            Object.fire
                uri: @resolveUri uri
                callback: cb
                unmarshaller: @fetchUnmarshaller
                
        restore: (key) ->
            
            return null unless s = @storage?[key]
            ver = @getVersion()
            if ver is s[0..ver.length-1] then s[ver.length+1..] else null
        
        store: (key, s) -> 
            
            try @storage?.setItem key, (@getVersion()+":"+s)

        handleEvent : (ev) ->
            
                u = ev.uri
                key = @id + ':' +u.id

                # try get cached result
                return ev.callback null, r if (r =  CACHE[key] or (CACHE[key] = @cacheDeserializer(@restore key)))
                    
                #fetch otherwise    
                @fetch u, (err, data) =>
                    
                    err = Object.error(err, "fetch data for versioned cache").log() if (err = s?.error or err)
                    
                    if not err and (s = @cacheSerializer(data))
                        CACHE[key] = data
                        @store key, s
                    
                    ev.callback err, data

# Storage definition.
Object.entity.define 
    id: "ValueStorage"
    properties: ["value:Value"]
    methods: (_super) ->

        init: -> 
            @storage = @createStorage() 
            @initStorage()
            _super.init.call @
        
        createStorage: ->
            @storage or
                getItem: (key) -> @[key]
                setItem: (key, value) -> @[key] = value

        initStorage: ->
            @value = (s = @storage.getItem(@id)) and Object.parse(s) or @value or {}

         # property get/set
        propertyChanged: (ev, value, propId) ->
            _super.propertyChanged.call @, ev, value, propId
    
            unless propId is 'value'
                unless @valueDelta
                    @valueDelta = {}
                    setTimeout(=>
                            delta = @valueDelta
                            @valueDelta = null
                            @setValue Object.clone(@getValue(), delta)
                            
                        ,10)
                @valueDelta[propId] = value


        valueChanged: (ev, val) ->
            @persistValue val
            _super.valueChanged.call @, ev, val

        persistValue: (v) ->
            try @storage.setItem @id, s unless @storage.getItem(@id) is (s = JSON.stringify(v))

