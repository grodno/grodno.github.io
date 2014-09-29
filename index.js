#!/bin/env node
Object.DEBUG = true;

require('./static/js/axoid/axoid.js');

require('./static/js/commons/commons.js');
require('./static/js/webserver/utils.js');


Object.entity.create({
id: 'entity:EventHandler',
handleEvent: function(ev) {
  require('./static/js/' + ev.uri.domain.replace(/\./g, '/') + '.js');
  return ev.callback();
}
});

Object.entity.create({
id: 'app:webserver.Application',
config: require('./static/js/config.js'),
ipaddress: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1",
port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8000,
    plugins: ['file:webserver.FilesPlugin', 'webserver.RequestParsingPlugin', 'webserver.DispatcherPlugin', 'home:webserver.HomePlugin', 'webserver.DustPlugin'
    ,
    'webserver.ResponsePlugin'
    ,
    {
            id:'db:webserver.MongoPlugin'
            ,
            uri:process.env.MONGO
            //    ,
        //              getQuery: (opts,cb) -> @perform opts.path2, 'query', opts, cb
        //    getCount: (opts,cb) -> @perform opts.path2, 'count', opts, cb
        //      getDoc: (opts,cb) -> @perform opts.path2, 'find', opts, cb
        //        postInsert: (opts,cb) -> @perform opts.path2, 'insert', opts, cb

    }
    
    ]

});
