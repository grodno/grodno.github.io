(function() {
  Object.entity.define({
    id: "lexiomated.TextFactory extends EventHandler",
    properties: ['plugins:Plugins', 'requires:Requires'],
    requires: ["entity://lexiomated.Utils", "entity://lexiomated.Lexion", "entity://lexiomated.Word"],
    methods: function(_super) {
      return {
        handleEvent: function(ev) {
          return Object.entity.create({
            id: "lexiomated.Text",
            plugins: this.plugins
          }, function(err, obj) {
            return obj.analyze(ev.uri.hash, ev.callback);
          });
        }
      };
    }
  });

}).call(this);
