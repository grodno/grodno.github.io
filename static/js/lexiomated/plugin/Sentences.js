(function() {
  Object.entity.define({
    id: "lexiomated.plugin.Sentences extends lexiomated.Plugin",
    methods: function(_super) {
      var eachDet, eachPrep;
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
        var next, next2;
        while (e) {
          if (e.kind === 'prep') {
            e = e.surroundWith({
              kind: 'clause'
            }).setFlags('prep object ' + e.text);
            if ((next = e.next) && (next2 = next.next)) {
              e.doInBetween(next2.next, 'setParent', e);
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
      return {
        handleEvent: function(event) {
          eachDet(event.rootElt);
          return eachPrep(event.rootElt);
        }
      };
    }
  });

}).call(this);
