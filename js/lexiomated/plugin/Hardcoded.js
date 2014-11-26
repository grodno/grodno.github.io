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
          return event.eachMatched('word', (function(_this) {
            return function(word) {
              var count, e, key, nextWord, r, _results;
              if ((r = _this.hardcoded[key = word.lowerText])) {
                word.setFlags(r.flags + ' !word');
              }
              count = 3;
              e = word;
              _results = [];
              while (count && (nextWord = e.nextToken())) {
                if ((r = _this.hardcoded[key += " " + nextWord.text])) {
                  word.mergeFrom(e.next, nextWord).setFlags(r.flags + ' !word');
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
