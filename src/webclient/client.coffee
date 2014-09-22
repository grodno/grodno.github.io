###
HttpService.
###

Object.entity.define  

    id: "HttpService extends EventHandler"

    methods: (_super) ->  
        
        F0 = (x) -> x

        # MIME type by extension registry. Used for XHR.
        MIME =
            json: "application/json"
            js: "application/json"
            html: "text/html"
            txt: "text/plain"
        
        
        # Parsers for given resource type
        PARSERS =
            js: Object.parse
            json: Object.parse
            uri: Object.parseUri
        
        _newRequest = ->
            try
                new window["XMLHttpRequest"]()
            catch 
                try
                    new window.ActiveXObject("Microsoft.XMLHTTP")
    
        _error = (st, text, ev) ->
            (if (not st or (st >= 200 and st < 300) or (st is 304)) then null else
                reason: "http_transport"
                message: "Remote error: code #{st}. " + ev.uri+'\n' + (text or '')
                code: st
            )
    
        _negotiateResultType = (u) ->
            urlId = u.path[-1..][0]
            r = "js"
            r = urlId[p + 1..] if urlId and (p = urlId.lastIndexOf(".")) > -1
            r
            
        resolveMethod : (ev) ->
            ev.method or ((if ev.payload then "POST" else "GET"))
            
        resolveUri : (uri) ->
            uri.domain = window.location.hostname if uri.domain is '*'
            uri.type = if uri.params.ssl then 'https' else window.location.protocol[0..-2]
            "" + uri
            
        # creates Event handler implementation
        handleEvent : (ev) ->
                try
                    rq = _newRequest()

                    dataType = ev.dataType or _negotiateResultType(ev.uri)
                    
                    rq.open @resolveMethod(ev), @resolveUri(ev.uri), true
                    
                    rq.onreadystatechange = ->
                        if (@readyState is 4) and (not ev.completed)
                            ev.completed = true
                            @onreadystatechange = F0
                            ev.callback _error(@status, @statusText, ev), (ev.unmarshaller or PARSERS[dataType] or F0)(@responseText)
                        false
        
                    headers = Object.update(
                        Accept: MIME[dataType] or "*"
                        Language: String.LANGUAGE
                    , ev.headers)
                    
                    rq.setRequestHeader h, v for h, v of headers when v
                            
                    if ev.payload
                        if typeof (ev.payload) is "object"
                            rq.setRequestHeader "Content-Type", "application/json;charset=UTF-8"
                            ev.payload = JSON.stringify(ev.payload)
                        rq.send ev.payload
                    else
                        rq.send null
                catch 
                    running=false
                    ev.callback Object.error(_error, "remote_error:" + ev.uri).log()
                return
        
Object.entity.define  

    id: "ScriptService extends EventHandler"
    scriptType:"text/javascript"
    methods: (_super) ->
        registry = window._JSONP or (window._JSONP = {})
        counter =  window._JSONP_COUNTER or ( window._JSONP_COUNTER = 1)
        _doc = window.document

        _createScriptTag = (attrs) ->
            e = _doc.createElement("script")
            e.type = @scriptType
            e.charset = "utf-8"
            Object.update e, attrs
            e
            
        resolveUri : (u) ->
            u.domain = window.location.hostname if u.domain is '*'
            u.type = if u.params.ssl then 'https' else window.location.protocol[0..-2]
            "" + u
            
        # creates Event handler implementation
        handleEvent : (ev) ->
                script = _createScriptTag.call @, ev.scriptAttrs
               # script.async = "async" unless ev.noAsynMode
                script.id = ev.scriptId if ev.scriptId
    
                u = ev.uri
                u.type = "http" if u.type is "script"
                ev.uri.domain = window.location.hostname if ev.uri.domain is '*'

                if u.params.jsonp
                
                    sid = "n" + counter++
                    u.params[u.params.jsonp] = escape("window._JSONP.#{sid}")
                    registry[sid] = (r) -> ev.callback? null, r
                    script.onload = ->
                        script.parentNode.removeChild script
                        delete registry[sid]
                else
                    
                    script.onload = ->
                        cb = ev.callback
                        ev.callback = null
                        cb? null, this

                script.onerror = -> 
                    ev.callback Object.error("remote_error", "Script error: #{u}")
                    
                script.src = @resolveUri u
                
                Object.dom.appendToHead script


((global) ->
    
    # @define [SocketClient] entity
    Object.entity.define 
    
        id: "SocketClient extends EventHandler"
        properties:['requires:Requires']
        ready: false # not ready by default
        methods: (_super) ->
            
            launch: (cb)->
                @requires = ["script://#{@channel}/socket.io.js"]
                _super.launch.call @, cb            
                
            init: ->
                
                _super.init.call @
                
                throw new Error 'No Socket IO' unless io = global.io
                
                socket = io.connect @channel
                socket.on "connect", (=> @onConnect())
                socket.on "message", ((ev) => @onMessage ev)
                socket.on "disconnect", (=> @onDisconnect())
                
                @emit = (ev, cb = ev.callback) ->
                    ev.uri = "" + ev.uri
                    delete ev.callback
                    socket.json.emit "message", ev, cb

            handleEvent : (ev) ->
                @log "send", ev
                @emit ev

            onConnect: (ev) ->
                @log "onConnect", ev
                @setIsReady()

            onDisconnect: (ev) ->
                @log "onDisconnect", ev

            onMessage: (ev) ->
                @log "onMessage", ev
                Object.fire ev if ev.uri

) @

Object.entity.define
    id: "HtmlLoader extends Cache"  
    uriPattern: 'remote://*/html/{{domain}}.html'
    methods : (_super) ->
        init: -> 
            @storage = @createStorage() 
            _super.init.call @
        
        createStorage: ->
            @storage or
                getItem: (key) -> @[key]
                setItem: (key, value) -> @[key] = value
                
        cacheDeserializer : (s) -> s
        cacheSerializer : (s) -> s


###
Define Cache entity type
###
Object.entity.define 

    id: "CodeLoader extends Cache"
    uriPattern : 'remote://*/js/{{domain}}.js?_ver={{version}}'
    #storage: window.localStorage
    methods: (_super) ->
        fetchUnmarshaller : (s) -> s
        cacheSerializer : (s)   -> @evaluate s
        cacheDeserializer: (s) -> @evaluate s
        evaluate: (s) ->
            return null unless s
            try
                (Function.call(Function, s))()
            catch 
                Object.error(_error, "JS syntax:" + _error.message).log()
            s

Object.entity.define
    id: "EntityLoader extends CodeLoader"
    methods : (_super) ->
        resolveUri: (uri) ->
            uri.domain = uri.domain.replace(/\./g,'/')
            _super.resolveUri.call @, uri

                
 Object.entity.define
    id : 'Settings extends ValueStorage' 
    storage: window.localStorage
    
Object.entity.define
    id : 'ClientApplication' 
    properties : ['title', 'page', 'index', "plugins:Plugins"]
    methods : (_super) ->

        # Creates Entities from given DOM tree.
        init: ->

            @domNode = window.document.body unless @domNode
            
            _super.init.call @

            #hook on hash changed
            (window.onhashchange = => @navigate (window.location.hash[2..] or 'home'))()


        titleChanged: (ev, v)->
            window.document.title = v
        
        dataChanged: (ev, data)->
            _super.dataChanged.call @, ev, data
            @prop 'title', (ENV.TITLE or '-')
            
        navigate: (h)->
            return unless h
            hashes = h.split '-'
            @prop 'page', hashes[0]
            @prop 'index', (hashes[1] or "")

        onPluginsInitialized: ->
                @initWidget node for node in @domNode.querySelectorAll "[data-widget]"
                true
                
        initWidget : (->
            
    
            handleError = (err, meta) ->
                Object.error(err "wrong_widget", meta).log()
                            
                node = Object.dom.createElement()
                meta.domNode.appendChild node
                Object.entity.create
                    typeId: "Html"
                    parentEntity: meta.parentEntity
                    style: "alert-error"
                    html: "Error: " + (err.message or ("can't create UI view: " + meta.id))

            (v) ->
                meta = 
                    domNode : v
                    parentEntity : @                    

                for n,z of v.dataset 
                    meta[n] = if z[0] is '@' then Object.parse(z[1..]) else z
                id = v.getAttribute("id")
                meta.id = ((if id then (id+":") else "")) + meta["widget"]
    
                Object.entity.create meta, (err) -> handleError err, meta if err
                
        )()

