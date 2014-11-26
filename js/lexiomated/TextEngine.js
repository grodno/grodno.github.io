(function() {
  Object.entity.define({
    id: "lexiomated.Plugin",
    properties: ['requires:Requires']
  });

  Object.entity.define({
    id: "lexiomated.TextEngine",
    properties: ['plugins:Plugins', 'requires:Requires'],
    requires: ["entity://lexiomated.Utils", "entity://lexiomated.Word", "entity://lexiomated.Event"],
    methods: function(_super) {
      return {
        onEvent: function(ev) {
          var event;
          event = Object.entity.create({
            id: 'lexiomated.Event',
            input: ev.uri.hash
          });
          if (!event.isValidInput()) {
            return ev.callback('bad_input: No input', '');
          }
          return Function.nextTick(this, function() {
            var p, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
            event.parse();
            _ref = this.plugins;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              p = _ref[_i];
              if (typeof p.prepare === "function") {
                p.prepare(event);
              }
            }
            _ref1 = this.plugins;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              p = _ref1[_j];
              if (typeof p.analyze === "function") {
                p.analyze(event);
              }
            }
            _ref2 = this.plugins;
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              p = _ref2[_k];
              if (typeof p.syntesize === "function") {
                p.syntesize(event);
              }
            }
            return ev.callback(0, event);
          });
        }
      };
    }
  });

}).call(this);
