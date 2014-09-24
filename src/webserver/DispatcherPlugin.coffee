# The plugin that dispatches requests to handle with appropriate plugins method.
Object.entity.define
    id : 'webserver.DispatcherPlugin' 
    config: (app)->
        
        HTTP_METHODS= ["get","post","put","delete","options"]
  
        app.use (req, res, next) ->
            
            method = req.method = req.method.toLowerCase()
            
            return next() unless method in HTTP_METHODS
            
            opts = req.options = {}
            (req.options[n.toLowerCase()] = v) for n,v of req.headers
            
            
            opts.host = opts["x-forwarded-host"] or opts.host or "*"
            opts.access_token = opts["x-authorization"] or opts["authorization"] or null
            
            uri = req.uri = Object.Uri.parse("//*" + (if req.url is '/' then '/home' else req.url))
            
            Object.update opts, uri.params
            
            opts.language = opts.language or opts.lang or String.LANGUAGE

            return next() unless plugin = app[uri.path[0]]

            opId = String.capitalize(uri.path[1] or 'default')
            op = Object.prop plugin, (method + opId)
            
            opName = [plugin.id, ".", method, opId].join('')
            
            Object.log("Dispatch #{uri} into #{opName}")
            
            if op
                try
                    return op.call plugin, opts, (err, result)->
                        req.error = err
                        req.result = result
                        next()
                catch 
                    req.error = Object.error(0,"Error in #{opName} ", _error).log()
            else
                if (method is "options") and plugin["post" + opId]
                    req.result = "OK"
                else
                    req.error = Object.error("no-op", "Operation not found:  #{opName}").log()

            return next()
