#!/bin/env node
require('./static/js/axoid/axoid.js');

require('./static/js/commons/commons.js');
require('./static/js/webserver/utils.js');

Object.DEBUG = true;

Object.log = function(x) {
var args, c, e;
c = global.console;
args = (function() {
  var _i, _len, _results;
  _results = [];
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    e = arguments[_i];
    _results.push(e);
  }
  return _results;
}).apply(this, arguments);
c.log.apply(c, args);
return x;
};

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
    plugins: ['file:webserver.FilesPlugin', 'webserver.RequestParsingPlugin', 'webserver.DispatcherPlugin', 'home:webserver.HomePlugin', 'webserver.DustPlugin', 'webserver.ResponsePlugin']

});
