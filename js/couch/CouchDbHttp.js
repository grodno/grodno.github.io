(function() {
  Object.entity.define({
    id: "couch.CouchDbHttp extends HttpService",
    properties: ['remote:Uri'],
    methods: function(_super) {
      return {
        init: function() {
          return _super.init.call(this);
        },
        resolveHeaders: function(ev) {
          return {
            'Accept': "application/json",
            'Content-Type': "application/json"
          };
        },
        resolveUri: function(uri, ev) {
          uri.type = this.remote.type;
          uri.host = this.remote.host;
          uri.path = [].concat(this.remote.path, uri.path);
          return '' + uri;
        },
        handleEvent: function(ev) {
          ev.dataType = 'json';
          return _super.handleEvent.call(this, ev);
        }
      };
    }
  });

}).call(this);
