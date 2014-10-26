(function() {
  var config;

  require('./axoid/axoid.coffee');

  require('./commons/commons.coffee');

  require('./webserver/utils.coffee');

  Object.DEBUG = true;

  config = require('./config.coffee');

  Object.entity.create({
    id: 'entity:EventHandler',
    handleEvent: function(ev) {
      require('./' + ev.uri.domain.replace(/\./g, '/') + '.coffee');
      return ev.callback();
    }
  });

  Object.entity.create({
    id: 'app:webserver.Application',
    config: config,
    ipaddress: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1",
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8000,
    plugins: [
      'file:webserver.FilesPlugin', 'webserver.RequestParsingPlugin', 'webserver.DispatcherPlugin', 'socket:webserver.SocketIoPlugin', 'home:webserver.HomePlugin', 'webserver.DustPlugin', 'webserver.ResponsePlugin', {
        id: 'db:webserver.MongoPlugin',
        uri: 'mongodb://grodno:ozheshko22@ds055397.mongolab.com:55397/grodno'
      }
    ]
  });

}).call(this);
