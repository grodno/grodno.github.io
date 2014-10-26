require './axoid/axoid.coffee'
require './commons/commons.coffee'
require './webserver/utils.coffee'

Object.DEBUG = true
 
config = require './config.coffee'

Object.entity.create
    id: 'entity:EventHandler' 
    handleEvent: (ev) ->
        require './'+ev.uri.domain.replace(/\./g,'/')+'.coffee'
        ev.callback()

        
Object.entity.create 
    id : 'app:webserver.Application' 
    config : config
    
    #  Set the environment variables we need.
    ipaddress : process.env.OPENSHIFT_NODEJS_IP or process.env.IP or "127.0.0.1"
    port : process.env.OPENSHIFT_NODEJS_PORT or process.env.PORT or 8000
    plugins: [
        'file:webserver.FilesPlugin'
        'webserver.RequestParsingPlugin'
        'webserver.DispatcherPlugin'
        'socket:webserver.SocketIoPlugin'
        'home:webserver.HomePlugin'
        'webserver.DustPlugin'
        'webserver.ResponsePlugin'
        {
            id:'db:webserver.MongoPlugin'
            uri:'mongodb://grodno:ozheshko22@ds055397.mongolab.com:55397/grodno'
        }
        ]

