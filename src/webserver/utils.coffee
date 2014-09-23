
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
)()


###
 Define the sample application.
###


express = require("express")
fs = require("fs")

SampleApp = ->
    
    #  Scope.
    self = this

    ###
    Set up server IP address and port # using env variables/defaults.
    ###
    self.setupVariables = ->
        
        #  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP or process.env.IP
        self.port = process.env.OPENSHIFT_NODEJS_PORT or process.env.PORT or 8000
        if typeof self.ipaddress is "undefined"
            
            #  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            #  allows us to run/test the app locally.
            console.warn "No predefined IP vars, using 127.0.0.1"
            self.ipaddress = "127.0.0.1"
        return

    
    ###
    Populate the cache.
    ###
    self.populateCache = ->
        self.zcache = "index.html": ""    if typeof self.zcache is "undefined"
        
        #  Local cache for static content.
        self.zcache["index.html"] = fs.readFileSync("./static/index.html")
        return

    
    ###
    Retrieve entry (content) from cache.
    @param {string} key  Key identifying content to retrieve from cache.
    ###
    self.cache_get = (key) ->
        self.zcache[key]

    
    ###
    terminator === the termination handler
    Terminate server on receipt of the specified signal.
    @param {string} sig  Signal to terminate on.
    ###
    self.terminator = (sig) ->
        if typeof sig is "string"
            console.log "%s: Received %s - terminating sample app ...", Date(Date.now()), sig
            process.exit 1
        console.log "%s: Node server stopped.", Date(Date.now())
        return

    ###
    Setup termination handlers (for exit and a list of signals).
    ###
    self.setupTerminationHandlers = ->
        
        #  Process on exit and signals.
        process.on "exit", ->
            self.terminator()

        # Removed 'SIGPIPE' from the list - bugz 852598.
        [
            "SIGHUP"
            "SIGINT"
            "SIGQUIT"
            "SIGILL"
            "SIGTRAP"
            "SIGABRT"
            "SIGBUS"
            "SIGFPE"
            "SIGUSR1"
            "SIGSEGV"
            "SIGUSR2"
            "SIGTERM"
        ].forEach (element, index, array) ->
            process.on element, ->
                self.terminator element
                return

            return

        return

    #  ================================================================  
    #  App server functions (main app logic here).                       
    #  ================================================================  
    
    ###
    Create the routing table entries + handlers for the application.
    ###
    self.createRoutes = ->
        self.routes = {}

        self.routes["/"] = (req, res) ->
            res.setHeader "Content-Type", "text/html"
            res.send fs.readFileSync("./static/index.html")#self.cache_get("index.html")
            return

        return

    ###
    Initialize the server (express) and create the routes and register
    the handlers.
    ###
    self.initializeServer = ->
        self.createRoutes()
        self.app = express()
        
        self.app.use(express.static('./static'))
        
        #  Add handlers for the app (from the routes).
        self.app.get r, self.routes[r] for r of self.routes
            
        return

    ###
    Initializes the sample application.
    ###
    self.initialize = ->
        self.setupVariables()
        self.populateCache()
        self.setupTerminationHandlers()
        
        # Create the express server and routes.
        self.initializeServer()
        self

    ###
    Start the server (starts up the sample application).
    ###
    self.start = ->
        
        #  Start the app on the specific interface (and port).
        self.app.listen self.port, self.ipaddress, ->
            console.log "%s: Node server started on %s:%d ...", Date(Date.now()), self.ipaddress, self.port
            return

        self

    return

module.exports = ->
	new SampleApp()

