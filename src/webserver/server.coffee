
# 
# * HTTP utils.
# 
Object.http = (->
    http = require("http")
    request = require("request")
    _perform = (ev) ->
        Object.debug "Remote HTTP request", "" + ev.uri
        request.get "" + ev.uri, ev.options, (err, response, body) ->
            console.log body    if not err and response.statusCode is 200 # Print the google web page.
            ev.callback err, body
            return

        return

    Object.entity.create
        id: "EventHandler:http"
        handleEventImpl: _perform

    Object.entity.create
        id: "EventHandler:https"
        handleEventImpl: _perform

    http.withFileContent = (fileName, cb, encoding) ->
        name = path.join(global.__root, fileName)
        path.exists name, (x) ->
            if x
                fs.readFile name, encoding, cb
            else
                cb
                    reason: "not-found"
                    message: "Not found: " + fileName

            return

        return

    MIME = http.MIME =
        URL_ENCODED: "application/x-www-form-urlencoded"
        JSON: "application/json"
        JS: "text/javascript"
        HTML: "text/html"
        CSS: "text/css"
        IMAGE: "image/*"
        JPG: "image/jpg"
        PNG: "image/png"
        GIF: "image/gif"
        TXT: "text/plain"
        APPCACHE: "text/cache-manifest"

    
    ###
    Return `true` if the request has a body, otherwise return `false`.
    
    @param  {IncomingMessage} req
    @return {Boolean}
    @api private
    ###
    _hasBody = (req) ->
        "transfer-encoding" of req.headers or "content-length" of req.headers

    
    ###
    Extract the mime type from the given request's
    _Content-Type_ header.
    
    @param  {IncomingMessage} req
    @return {String}
    @api private
    ###
    _mime = (req) ->
        str = req.headers["content-type"] or ""
        str.split(";")[0]

    REASON_CODES = http.REASON_CODES =
        ok: 200
        bad: 400
        conflict: 409
        forbidden: 403
        "not-found": 404
        "method-not-allowed": 405
        "internal-server-error": 500

    http.fetchPayload = (ev, req, next) ->
        if [
            "get"
            "delete"
        ].indexOf(req.method) is -1
            req.addListener "data", (chunk) ->
                ev.body += chunk
                return

            req.addListener "end", ->
                Object.http.parsePayload ev, ->
                    next err, ev
                    return

                return

        else
            this err, ev
        return

    http.parsePayload = (ev, cb) ->
        mime = ev.headers["content-type"]
        ch0 = ev.body[0]
        if mime is MIME.URL_ENCODED
            ev.payload = Object.parseUri("?" + ev.body).params
            cb()
        else if mime.indexOf("xml") > -1 or ch0 is "<"
            xml2js = require("xml2js")
            parser = new xml2js.Parser()
            parser.parseString ev.body, cb
        else if ch0 is "{" or ch0 is "["
            try
                ev.payload = JSON.parse(ev.body)
            catch e
                @error "bad", "Bad JSON payload format: " + ":" + e
            cb()
        else
            cb()
        return

    http.xmlPayloadParser = (options) ->
        options = options or {}
        (req, res, next) ->
            return next()    if req._body
            req.body = req.body or {}
            return next()    unless _hasBody(req)
            
            # check Content-Type
            return next()    if [
                "application/xml"
                "application/atom+xml"
                "application/rss+xml"
            ].indexOf(_mime(req)) is -1
            
            # flag as parsed
            req._body = true
            
            # parse
            buf = ""
            req.setEncoding "utf8"
            req.on "data", (chunk) ->
                buf += chunk
                return

            req.on "end", ->
                first = buf.trim()[0]
                return next(400, "invalid json, empty body")    if 0 is buf.length
                xml2js = require("xml2js")
                parser = new xml2js.Parser()
                parser.parseString buf, (err, result) ->
                    if err
                        err.body = buf
                        err.status = 400
                        next err
                    else
                        req.body = result
                        next()
                    return

                return

            return

    
    #if (strict && '{' != first && '[' != first) return next(400, 'invalid json');
    http.negotiateMime = (url) ->
        p = url.lastIndexOf(".")
        ext = url.substring(p + 1).toUpperCase()
        MIME[ext] or MIME.HTML

    http.send = (res, result, mime, reason) ->
        code = (if reason then (REASON_CODES[reason] or 500) else 200)
        res.writeHead code, http.STATUS_CODES[code],
            "Content-Type": mime or MIME.HTML

        res.end result
        return

    
    # send error as JSON
    http.sendJson = (res, obj, reason) ->
        @send res, JSON.stringify(obj), MIME.JSON, reason
        return

    
    # send error as JSON
    http.sendError = (res, err, message) ->
        err = http.narrowError(err, message)
        http.sendJson res, err, err.reason
        err

    http.narrowError = (err, message) ->
        err = Object.error(err or {}, message)
        err.reason = "internal-server-error"    if not err.reason or not REASON_CODES[err.reason]
        err.message = http.STATUS_CODES[REASON_CODES[err.reason]]    unless err.message
        err

    http
)()

# 
# * File system.
# 
Object.fs = (->
    fs = require("fs")
    path = fs.path = require("path")
    fs.withFileContent = (fileName, cb, encoding) ->
        name = path.join(global.__root, fileName)
        path.exists name, (x) ->
            if x
                fs.readFile name, encoding, cb
            else
                cb
                    reason: "not-found"
                    message: "Not found: " + fileName

            return

        return

    Object.entity.create
        id: "EventHandler:file"
        handleEventImpl: (ev) ->
            fs.withFileContent ev.uri.steps.join("/"), ((err, content) ->
                if content
                    Object.http.send ev.res, content, Object.http.negotiateMime("" + ev.uri)
                else
                    Object.http.sendError ev.res, "not-found", "Url not found: " + ev.uri
                return
            ), ev.encoding
            return

    fs
)() # 
# * The AxioServer class.
#

# RemoteServerModule 
Object.entity.define "RemoteServerModule extends EventHandler",
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
