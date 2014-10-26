(function() {
  Object.entity.define({
    id: "lexiomated.plugin.SplitText extends lexiomated.Plugin",
    methods: function(_super) {
      var op;
      op = function(text, e) {
        return new Lexion({
          tag: e ? 'i' : 'span',
          kind: e ? (text === ' ' ? 'space' : 'sign') : 'word',
          text: text,
          parent: this.sourceElt
        });
      };
      return {
        handleEvent: function(event) {
          return event.rootElt.eachChildInDeep(this, function(elt) {
            if (elt.kind === 'text') {
              return elt.executeRegExp(/[^a-zа-я]/gi, op);
            }
          });
        }
      };
    }
  });

}).call(this);
