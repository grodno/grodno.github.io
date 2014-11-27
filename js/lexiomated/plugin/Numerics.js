(function() {
  Object.entity.define({
    id: "lexiomated.plugin.Numerics extends lexiomated.Plugin",
    methods: function(_super) {
      var RULES;
      RULES = {
        'shrt ]>dot': '#$0.>#',
        'number': {
          '*>number lx3': 'x1000 #$0_$1>#',
          'x1000>number lx3': 'x1000000 #$0_$1>#',
          '*>numFactor x1000': 'x1000 #$0$1>#',
          '*>numFactor x1000000': 'x1000000 #$0$1>#',
          '*>percent': 'percent #$0%>#',
          '*>minus>cyr lx2': '#$0-$2.textSlice.1>#>#',
          'dollar<*': '#<price usd #$$0',
          '*>rxдоллар': 'price usd #$$0>#',
          'adv<*': '#<degree #$-1_$0',
          'adv<prep<*': '#<p2<degree #$-2_$0'
        },
        'number>measure': '#$0$1>#'
      };
      return {
        analyze: function(event) {
          return event.evaluateRules(RULES);
        }
      };
    }
  });

}).call(this);
