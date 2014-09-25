# Web Server Plugin that adds a static resources support.
# Based on Express.
Object.entity.define
    id: 'webserver.DustPlugin' 
    templatePattern: "file://*/views/{0}.html"
    methods: (_super) ->
        
        config: (app) ->
            dust = require("dustjs-linkedin")
            
            # Disable whitespace compression.
            dust.optimizers.format = (context, node) -> node
            
            dust.onLoad = (view, callback) =>
              Object.event.fire String.format(@templatePattern, view), callback
            
            app.use (req, res, next) ->
                return next() unless viewId = req.options.viewId
                context = Object.clone(req.result or {})
                context.app = app.config
                context.viewId = viewId
                dust.render viewId, context, (err, result) ->
                    req.error = err
                    req.result = result
                    next()
