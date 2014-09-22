// Generated by CoffeeScript 1.7.1
(function() {
  Object.entity.define({
    id: "lexio.plugin.Charlie extends lexio.Plugin",
    requires: ['gsheet://1FNyFDeXG68gTfCbWr1gno3KykcUGvH_SXOqrjl1wZhQ/chars'],
    methods: function(_super) {
      var newChar;
      newChar = function(ch, prev, i) {
        var e;
        e = new Lexion({
          body: ch,
          index: i,
          prev: prev
        });
        if (prev != null) {
          prev.next = e;
        }
        return e;
      };
      return {
        onRequiredLoaded: function(chars) {
          return this.chars = chars.getKeys();
        },
        prepare: function(text) {}
      };
    }
  });

}).call(this);