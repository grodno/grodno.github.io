# Web Server Plugin that adds a File system access and a static resources support.
# Based on Express.
Object.entity.define
    id: 'webserver.HomePlugin' 
    methods: (_super) ->
        
        getDefault: (opts, cb) ->
            opts.viewId='index'
            cb()
            
                    
        getAppCache: (opts, cb) ->
            opts.viewId='appcache'
            cb()
            
        getOffline: (opts, cb) ->
            opts.viewId='offline'
            cb()