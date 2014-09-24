         

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

