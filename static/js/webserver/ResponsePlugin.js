(function() {
  Object.entity.define({
    id: 'webserver.ResponsePlugin',
    methods: function(_super) {
      return {
        config: function(app) {
          return app.use((function(_this) {
            return function(req, res, next) {
              if (req.error) {
                return Object.http.sendError(res, req.error);
              }
              if (req.result) {
                return Object.http.send(res, req.result);
              }
              if (next) {
                return next();
              }
              return Object.http.sendError(res, 0, "Not resolved: " + req.uri);
            };
          })(this));
        }
      };
    }
  });

}).call(this);
