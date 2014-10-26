(function() {
  Object.entity.define({
    id: 'webserver.Plugin extends EventHandler',
    methods: function(_super) {
      return {
        onEvent: function(ev) {
          var cb, op, opId, uri;
          uri = ev.uri;
          cb = ev.callback || function() {};
          opId = uri.path.shift() || 'default';
          if (ev.method) {
            opId = ev.method + String.capitalize(opId);
          }
          this.log("Dispatch " + uri + " into " + opId);
          if (!(op = this[opId])) {
            cb(this.error("not-found: Operation not found: " + opId).log());
          }
          try {
            return op.call(this, ev, cb);
          } catch (_error) {
            return cb(this.error(_error, "Error in " + opId + " ").log());
          }
        }
      };
    }
  });

}).call(this);
