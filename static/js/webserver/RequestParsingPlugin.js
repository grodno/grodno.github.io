(function() {
  Object.entity.define({
    id: 'webserver.RequestParsingPlugin',
    methods: function(_super) {
      return {
        config: function(app) {
          var parser;
          parser = require('body-parser');
          app.use(parser.json());
          return app.use(parser.urlencoded({
            extended: true
          }));
        }
      };
    }
  });

}).call(this);
