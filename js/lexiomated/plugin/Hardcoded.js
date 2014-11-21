(function() {
  Object.entity.define({
    id: "lexiomated.plugin.Hardcoded extends lexiomated.Plugin",
    requires: ['gsheet://1r9wwsGFHeJ_rxC-zNJ8ysoEcznk76PmGah1uLdus3iQ/content'],
    methods: function(_super) {
      return {
        onRequiredLoaded: function(err, count, content) {
          return this.hardcoded = content.intoRegistry();
        },
        prepare: function(event) {
          return event.eachWord((function(_this) {
            return function(word) {
              var count, e, key, nextWord, r, _results;
              if ((r = _this.hardcoded[key = word.lowerText])) {
                word.setKind(r.kind).setFlags(r.flags);
              }
              count = 3;
              e = word;
              _results = [];
              while (count && (nextWord = e.nextWord())) {
                if ((r = _this.hardcoded[key += e.next.text + nextWord.text])) {
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
