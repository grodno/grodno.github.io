
# 
# * HTTP utils.
# 

   
Object.entity.define
    id : 'webserver.Express' 
    properties : ['config', "plugins:Plugins"]
    methods : (_super) ->

        # Creates Entities from given DOM tree.
        init: ->

            _super.init.call @

   
Object.entity.define
    id : 'webserver.Application' 
    properties : ['config', "plugins:Plugins"]
    methods : (_super) ->

        # Creates Entities from given DOM tree.
        init: ->

            _super.init.call @

 # 
# * The AxioServer class.
#

# RemoteServerModule 
Object.entity.define 
    id: "webserver.Plugin extends EventHandler"
    methods: (_super) ->
        opDone = (err, result, mime) ->
            ev = @event
            if @viewId
                ev.renderView @viewId, result
            else
                if err
                    ev.error err
                else
                    ev.send result, @contentType or mime
            ev.done()
            return

        
        #
        opInitArray = [(ev) ->
            @event = ev
            @options = ev.options
            @payload = ev.payload
            ev.callback = this
            this ev
            return
        ]
        
        # init
        init: ->
            _super.init.call this
            Object.log "++Module: ", @id
            
            #delete require.cache[p];
            m = @impl = require(@requirePath, true)
            m.init and m.init(@server, @config)
            return

        
        # done
        done: ->
            Object.log "--Module: ", @id
            @impl.done and @impl.done(this)
            return

        handleEvent: (ev) ->
            ev = ev.payload
            uri = ev.uri
            opId = String.capitalize(String.camelize(uri.path[1]))
            op = @impl[ev.options.method + opId]
            opName = @id + "." + ev.options.method + opId
            if op
                try
                    Object.log "!!! Operation", opName
                    Function.perform opInitArray.concat(op, opDone), ev # do perform
                catch ex
                    ev.error ex, "Error in " + opName
            else
                if (ev.options.method is "options") and this["post" + opId]
                    ev.send "OK"
                else
                    ev.error "no-op", "Operation not found: " + opName
            return


# Object.web.Server prototype 
Object.entity.define "RemoteServer extends EventHandler",
    methods: (_super) ->
        initModuleIterator = ((cfg, i, T) ->
            cfg = Object.narrowFromString(cfg)
            p = T.config("rootdir", ".") + "/" + (cfg.path or String.format(T.config("modulesPattern") or "{0}.js", cfg.id))
            this[cfg.id] = Object.entity.create(
                id: "RemoteServerModule:remote_" + cfg.id
                config: cfg
                server: T
                requirePath: p
            )
            return
        ).iterator()
        
        # init
        init: ->
            
            # underlying http server
            @httpServer = require("http").createServer(@app)
            _super.init.call this
            
            # init modules
            @modules = initModuleIterator(@config("modules"), {}, this)
            return

        
        # done server instance.
        # invoked from process.on('SIGTERM') hook
        done: (cb) ->
            
            #require.cache = {};
            Object.unlisten._all()
            for n of @modules
                @modules[n].done()
            @httpServer.removeAllListeners "connection"
            @httpServer.removeAllListeners "request"
            @httpServer.close cb
            this

        
        # gets config param
        config: (key, def) ->
            Object.get(@cfg, key) or def or null

        
        # listen http port
        listenHttpPort: (port, cb) ->
            port = port or @config("http.port", 80)
            @httpServer.listen port, ->
                Object.log "Server is listening at port: ", port
                cb and cb()
                return

            return

        
        # express handler that 
        #   - dispatch requests to handle with appropriate module method 
        #   - and then send the result back with response
        createHandler: ->
            (req, res, next) ->
                isMethodAllowed = [
                    "get"
                    "post"
                    "put"
                    "delete"
                    "options"
                ].indexOf(req.method.toLowerCase()) > -1
                unless isMethodAllowed
                    next()
                else
                    ev = Object.entity.create(
                        id: "RemoteServerEvent"
                        req: req
                        res: res
                    )
                    foundModule = Object.notify(
                        uri: "remote_" + (ev.uri.path[0] or "home") + "://handle"
                        payload: ev
                    )
                    next()    unless foundModule
                return


# RemoteServer Event 
Object.entity.define "RemoteServerEvent extends EventHandler",
    methods: (_super) ->
        
        # init
        init: (config) ->
            _super.init.call this
            req = @req
            @payload = req.body or ""
            opts = @options = {}
            for n of req.headers
                opts[n.toLowerCase()] = req.headers[n]
            host = opts["x-forwarded-host"] or opts.host or "default"
            @uri = Object.parseUri("//" + host + req.url)
            @access_token = opts["x-authorization"] or opts["authorization"] or null
            Object.update opts, @uri.params
            opts.method = req.method.toLowerCase()
            opts.language = opts.language or opts.lang or String.LANGUAGE
            return

        
        # done
        done: ->
            @payload = @req = @res = null
            return

        
        # send error as JSON
        error: (err, message) ->
            Object.error.log Object.http.sendError(@res, err, message)
            return

        
        # send static file content
        sendStatic: (filename) ->
            Object.notify
                uri: "file://" + filename
                res: @res

            return

        
        # send object as JSON
        sendJson: (obj, reason) ->
            Object.http.sendJson @res, obj, reason
            return

        
        # send string result
        send: (result, mime, reason) ->
            Object.http.send @res, (if (typeof (result) is "string") then result else JSON.stringify(result)), mime, reason
            return

        
        # renders a view
        renderView: (viewId, context) ->
            Object.notify
                uri: "view://" + viewId
                context: context
                res: @res

            return

(->
    
    # @define [SocketServer] entity based on Socket.IO.
    Object.entity.define "SocketServer extends EventHandler",
        methods: (_super) ->
            init: ->
                T = this
                _super.init.apply this, arguments_
                io = require("socket.io").listen(@httpServer)
                
                # configure
                io.configure ->
                    io.set "transports", T.transports or ["xhr-polling"] #'flashsocket', 'websocket',
                    io.set "polling duration", T.pollingDuration or 15
                    io.enable T.enable or "log"
                    return

                sockets = io.sockets #.of('/'+(T.channel||''));
                T.broadcastAll = (ev) ->
                    sockets.json.send ev.payload
                    return

                sockets.on "connection", (socket) ->
                    Object.debug "connection"
                    socket.on "connect", ->
                        T.onConnect {}
                        return

                    
                    #   socket : socket
                    socket.on "message", (ev, callback) ->
                        Object.debug "message", ev, callback
                        
                        #ev = Object.parse(ev)
                        #ev.uri = Object.parseUri(ev.uri);
                        #ev.socket = socket;
                        ev.callback = callback or Function.NONE
                        if ev.user
                            socket.set "user", ev.user, ->
                                Object.notify ev
                                return

                        else
                            socket.get "user", (err, user) ->
                                ev.user = user
                                Object.notify ev
                                return

                        return

                    socket.on "disconnect", ->
                        T.onDisconnect {}
                        return

                    return

                return

            
            #   socket : socket
            onConnect: (ev) ->
                Object.debug "onConnect"
                return

            onDisconnect: (ev) ->
                Object.debug "onDisconnect"
                return

            user: (ev) ->
                Object.debug "user"
                ev.callback()
                return

            handleEventImpl: (ev) ->
                op = ev.uri.host
                Object.debug "Socket.", op
                ev.uri = ev.uri.hash or ev.uri
                this[op] ev
                return

    return
)()
