# Web Server Plugin that adds a File system access and a static resources support.
# Based on Express.
Object.entity.define
    id: 'webserver.HomePlugin' 
    baseDir: './static'
    methods: (_super) ->
        
        getDefault: (opts, cb) ->
            opts.viewId='index'
            cb()