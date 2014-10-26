(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Object.entity.define({
    id: "lexiomated.plugin.Numerics extends lexiomated.Plugin",
    methods: function(_super) {
      var re;
      re = /^\d+$/;
      return {
        handleEvent: function(event) {
          event.each('word', function(e) {
            if (e.text.match(re)) {
              return e.setKind('number');
            }
          });
          return event.each('number', function(e) {
            var n, next, next2, s, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
            if (_ref = (s = (_ref1 = e.prev) != null ? _ref1.text : void 0), __indexOf.call('-+', _ref) >= 0) {
              e.setText(s + e.text);
              e.prev.detachMe();
            }
            n = e;
            while ((next2 = (_ref2 = (next = n.next)) != null ? _ref2.next : void 0) && next2.kind === 'number' && next2.text.length === 3 && (_ref3 = next.text, __indexOf.call(' ,', _ref3) >= 0)) {
              e.doInBetween(next2.next, 'detachMe').setText(e.text + next.text + next2.text);
              n = next2;
            }
            if ((next2 = (_ref4 = (next = n.next)) != null ? _ref4.next : void 0) && next2.kind === 'number' && (_ref5 = next.text, __indexOf.call('.', _ref5) >= 0)) {
              e.doInBetween(next2.next, 'detachMe').setText(e.text + next.text + next2.text);
              return n = next2;
            }
          });
        }
      };
    }
  });

}).call(this);
