# Web Server Plugin that adds a static resources support.
# Based on Express.
Object.entity.define
    id: 'webserver.ResponsePlugin' 
    methods: (_super) ->

        config: (app) ->
            
            app.use (req, res, next) =>
                return Object.http.sendError(res, req.error) if req.error
                    
                return Object.http.send res, req.result if req.result
                    
                return next() if next
                
                Object.http.sendError(res, 0, "Not resolved: #{req.uri}")  
        


