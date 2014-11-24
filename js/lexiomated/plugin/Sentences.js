(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Object.entity.define({
    id: "lexiomated.plugin.Sentences extends lexiomated.Plugin",
    methods: function(_super) {
      var clauses, eachDet, eachPrep, normalizeNumbersOp, sentences;
      normalizeNumbersOp = function(e) {
        var n, next, next2, s, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        if (e.kind === 'number') {
          if (_ref = (s = (_ref1 = e.prev) != null ? _ref1.text : void 0), __indexOf.call('-+', _ref) >= 0) {
            e.setText(s + e.text);
            e.prev.detachMe();
          }
          n = e;
          while ((next2 = (_ref2 = (next = n.next)) != null ? _ref2.next : void 0) && next2.kind === 'number' && next2.text.length === 3 && (_ref3 = next.text, __indexOf.call(' ,', _ref3) >= 0)) {
            e.splitTill(next2.next).setText(e.text + next.text + next2.text);
            n = next2;
          }
          if ((next2 = (_ref4 = (next = n.next)) != null ? _ref4.next : void 0) && next2.kind === 'number' && (_ref5 = next.text, __indexOf.call('.,', _ref5) >= 0)) {
            e.splitTill(next2.next).setText(e.text + next.text + next2.text);
            return n = next2;
          }
        }
      };
      eachDet = function(e) {
        var next, next2;
        while (e) {
          if (e.kind === 'det') {
            e = e.surroundWith({
              kind: 'clause'
            }).setFlags('noun');
            while ((next = e.next) && (next2 = next.next) && next2.kind === 'word') {
              e.doInBetween(next2.next, 'setParent', e);
              next2.setKind('adj');
            }
            if (e.last !== e.first) {
              e.last.setKind('noun');
            }
          } else {
            if (e.first) {
              eachDet(e.first);
            }
          }
          e = e.next;
        }
        return e;
      };
      eachPrep = function(e) {
        var next;
        while (e) {
          if (e.kind === 'prep') {
            e = e.surroundWith({
              kind: 'clause'
            }).setFlags('prep object ' + e.text);
            if ((next = e.nextWord())) {
              e.doInBetween(next.next, 'setParent', e);
            }
          } else {
            if (e.first) {
              eachPrep(e.first);
            }
          }
          e = e.next;
        }
        return e;
      };
      sentences = function(e) {
        var next;
        while (e) {
          if (e.text === '.') {
            e = e.surroundWith({
              kind: 'sentence'
            });
            while ((next = e.nextWord())) {
              e.doInBetween(next.next, 'setParent', e);
            }
          } else {
            if (e.first) {
              sentences(e.first);
            }
          }
          e = e.next;
        }
        return e;
      };
      clauses = function(e) {
        var next;
        while (e) {
          if (e.text === ',') {
            e = e.surroundWith({
              kind: 'clause'
            });
            while ((next = e.nextWord())) {
              e.doInBetween(next.next, 'setParent', e);
            }
          } else {
            if (e.first) {
              clauses(e.first);
            }
          }
          e = e.next;
        }
        return e;
      };
      return {
        analyze: function(event) {}
      };
    }
  });

}).call(this);
