
Object.log = (x) ->
        c = global.console
        
        if x?.isError
            stack = (new Error).stack.split('\n')[3..-3].join('\n\t\t\t')
            args = ["#{Date(Date.now())} : "+x, '\n\t Details:', x.details,'\n\t Stacktrace:\n\t\t\t', stack]
            c.error args...
        else
            args = (e for e in arguments)
            c.log args...
        x         

Object.entity.create
    id: "request:EventHandler"
    handleEvent: (ev) ->
        Object.log "Remote HTTP request", "" + ev.uri
        request.get "" + ev.uri, ev.options, (err, response, body) ->
            console.log body    if not err and response.statusCode is 200 # Print the google web page.
            ev.callback err, body

Object.http = (->
    
    http = require("http")
    request = require("request")
    
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

    REASON_CODES = http.REASON_CODES =
        ok: 200
        bad: 400
        conflict: 409
        forbidden: 403
        "not-found": 404
        "method-not-allowed": 405
        "internal-server-error": 500
    
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
        (req.headers["content-type"] or "").split(";")[0]

    _statusCode = (reason) ->
        (if reason then (REASON_CODES[reason] or 500) else 200)
        
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

    #if (strict && '{' != first && '[' != first) return next(400, 'invalid json');
    http.negotiateMime = (url) ->
        p = url.lastIndexOf(".")
        ext = url.substring(p + 1).toUpperCase()
        MIME[ext] or MIME.HTML

    http.send = (res, result, reason) ->
        res.status(_statusCode reason).send(result)

    # send error as JSON
    http.sendJson = (res, obj, reason) ->
        res.status(_statusCode reason).json(obj)

    # send error as JSON
    http.sendError = (res, message) ->
        err = Object.error(message).log()
        err.message = http.STATUS_CODES[REASON_CODES[err.reason]] + err.message
        res.status(_statusCode err.reason).json(err)
        err

    http
)()

