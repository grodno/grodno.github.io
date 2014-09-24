# Web Server Plugin that adds a File system access and a static resources support.
# Based on Express.
Object.entity.define
    id: 'webserver.FilesPlugin extends EventHandler' 
    baseDir: './static'
    methods: (_super) ->
        fs = require 'fs'
        path =  require 'path' 
        express = require 'express'
        
        config: (app) ->
            @rootDir = path.dirname(require.main.filename)
            app.use express.static(@baseDir)


        handleEvent: (ev) ->
            cb = ev.callback
            name = path.resolve [@rootDir].concat(ev.uri.path)...
            fs.exists name, (x) ->
                if x
                    fs.readFile name, ev.encoding or "utf8", cb
                else
                    cb
                        reason: "not-found"
                        message: "File not found: " + name

            
