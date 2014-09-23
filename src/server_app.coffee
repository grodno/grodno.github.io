require './axoid/axiod.coffee'
require './webserver/server.coffee'


Object.entity.create 
    id : 'app:webserver.Application' 
    config : CONFIG
    plugins: [
            
        ]

    onPluginsInitialized: ->
                true
