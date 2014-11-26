(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Object.entity.define({
    id: "lexiomated.plugin.WordScore extends lexiomated.Plugin",
    methods: function(_super) {
      var tryNormalize, _score;
      tryNormalize = function(n) {
        var i, m, r;
        if (this.root) {
          return;
        }
        m = this.x.match(n.re);
        if (m) {
          i = 0;
          while (i < n.patches.length) {
            r = Word.ROOTS[m[1] + n.patches[i] + (m[3] || "")];
            if (r) {
              this.root = this.x;
              this.score += this.x.length + (r.score || 90);
              return;
            }
            i++;
          }
        }
      };
      _score = function() {
        var lang, len, mask, r, sf, x;
        x = this.x;
        len = x.length;
        lang = this.word.lang;
        if (len < 2) {
          return;
        }
        r = Word.ROOTS[x];
        if (r) {
          this.root = x;
          this.score += len * 8 + r.score;
          this.setFlags(r.flags);
          return;
        }
        sf = this.suffix || this.flexie;
        if (sf && lang === "r" && (__indexOf.call("аеяюий", sf) >= 0) && (r = Word.ROOTS[x + "й"])) {
          this.root = r.id;
          this.score += len + r.score;
          this.setFlags(r.flags);
          return;
        }
        if (lang === "e") {
          if (sf && (r = Word.ROOTS[x + "e"])) {
            this.root = r.id;
            this.score += len * 8 + r.score;
            this.setFlags(r.flags);
            return;
          }
          if ((x[len - 1] === x[len - 2]) && (r = Word.ROOTS[x.substring(0, len - 1)])) {
            this.root = r.id;
            this.score += len * 8 + r.score;
            this.setFlags(r.flags);
            return;
          }
        }
        if (len < 3) {
          return;
        }
        if (mask = Word.ROOTS_MASKS[lang + String.signature(x)]) {
          this.root = x;
          this.score += len + mask.score;
        }
      };
      return {
        analyze: function(event) {
          var c, i, k, tres, w, _i, _len, _ref, _ref1;
          _ref = Word.ALL;
          for (k in _ref) {
            w = _ref[k];
            if (!(!w.best)) {
              continue;
            }
            _ref1 = w.cases;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              c = _ref1[_i];
              _score.call(c);
            }
            Object.math.sort(w.cases, "score", -1);
            w.best = w.cases[0];
            tres = w.best.score * 0.2;
            w.cases = (function() {
              var _j, _len1, _ref2, _results;
              _ref2 = w.cases;
              _results = [];
              for (i = _j = 0, _len1 = _ref2.length; _j < _len1; i = ++_j) {
                c = _ref2[i];
                if (i < 3 && c.x && c.score >= tres) {
                  _results.push(c);
                }
              }
              return _results;
            })();
          }
          return event.eachMatched('word', function(elt) {
            var ci, _j, _ref2, _results;
            w = elt.word;
            _results = [];
            for (ci = _j = _ref2 = w.cases.length - 1; _ref2 <= 0 ? _j <= 0 : _j >= 0; ci = _ref2 <= 0 ? ++_j : --_j) {
              if ((c = w.cases[ci])) {
                _results.push(elt.setFlags('rx' + (c.root || c.x) + ' px' + c.prefix + ' sx' + c.suffix + ' fx' + c.flexie + ' ' + (c.flags || '')));
              }
            }
            return _results;
          });
        }
      };
    }
  });

}).call(this);
