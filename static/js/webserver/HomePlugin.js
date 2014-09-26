// Generated by CoffeeScript 1.8.0
(function() {
  Object.entity.define({
    id: 'webserver.HomePlugin',
    methods: function(_super) {
      return {
        getDefault: function(opts, cb) {
          opts.viewId = 'index';
          return cb();
        },
        getAppCache: function(opts, cb) {
          opts.viewId = 'appcache';
          return cb();
        },
        getLogin: function(opts, cb) {
          opts.viewId = 'login';
          return cb();
        },
        getOffline: function(opts, cb) {
          opts.viewId = 'offline';
          return cb();
        }
      };
    }
  });

}).call(this);
