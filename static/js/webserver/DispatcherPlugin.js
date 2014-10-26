(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Object.entity.define({
    id: 'webserver.DispatcherPlugin',
    config: function(app) {
      var HTTP_METHODS;
      HTTP_METHODS = ["get", "post", "put", "delete"];
      return app.use((function(_this) {
        return function(req, res, next) {
          var ev, method, uri, _ref;
          ev = {
            uri: uri = Object.Uri.parse("//*" + (req.url === '/' ? '/home' : req.url)),
            method: method = req.method = req.method.toLowerCase(),
            headers: req.headers
          };
          if (__indexOf.call(HTTP_METHODS, method) < 0) {
            return next();
          }
          if (!(uri.type = (_ref = app[uri.path.shift()]) != null ? _ref.id : void 0)) {
            return next();
          }
          return Object.event.fire(ev, function(err, result) {
            req.error = err;
            if (ev.viewId) {
              req.viewId = ev.viewId;
            }
            req.result = result;
            return next();
          });
        };
      })(this));
    }
  });

}).call(this);
