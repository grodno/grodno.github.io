(function() {
  Object.entity.define({
    id: "lexiomated.plugin.Grodno extends lexiomated.Plugin",
    requires: ['gsheet://1f64CyciX17lLXEzdycrsjagjBOh6R_sIrZmKhMuWfGA/content'],
    methods: function(_super) {
      return {
        onRequiredLoaded: function(err, count, content) {
          return this.hardcoded = content.intoRegistry();
        },
        find: function(lx) {
          var r, w, _ref;
          if (r = this.hardcoded[lx.lowerText]) {
            return r;
          }
          if ((w = (_ref = lx.word) != null ? _ref.best : void 0)) {
            if (r = this.hardcoded[w.root]) {
              return r;
            }
            if (r = this.hardcoded[w.root + w.suffix]) {
              return r;
            }
          }
          return null;
        },
        analyze: function(event) {
          return event.eachWord((function(_this) {
            return function(word) {
              var count, e, key, nextWord, r, _results;
              if (r = _this.find(word)) {
                word.setTag('a').setAttr('target', '_blank').setAttr('href', r.url);
              }
              count = 2;
              e = word;
              key = word.text;
              _results = [];
              while (count && (nextWord = e.nextToken())) {
                if ((r = _this.find(key += e.next.text + nextWord.text))) {
                  word.splitTill(nextWord).setKind(r.kind).setText(key);
                }
                e = nextWord;
                _results.push(count--);
              }
              return _results;
            };
          })(this));
        }
      };
    }
  });

}).call(this);
