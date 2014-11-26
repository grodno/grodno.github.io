(function() {
  Object.entity.define({
    id: "lexiomated.plugin.SyntaxAnalysis extends lexiomated.Plugin",
    methods: function(_super) {
      var RULES, fn;
      RULES = {
        'det+prep<word>!word': 'noun',
        'quote<word>quote': 'named',
        '!dot<word capital': 'named',
        'named<named': '[<named',
        'lat @noNextSpace>dot @noNextSpace>lat #by+#com+#ru': 'url !word #[$0.$2]>#>#',
        'number>number lx3': '#$0$1>#',
        'number lx4>#г>dot>#в>dot': 'year born #$0_года_выпуска>#>#>#>#',
        'number>percent': 'percent #$0%>#',
        'number>minus>lx2': '#$0-$2.textSlice.1>#>#',
        'dollar<number': '#<price usd #$$0',
        'number>rxдоллар': 'price usd #$$0>#',
        'quote<word<word>quote': 'named adj<named',
        'det+prep<word<word>comma+dot': 'adj<noun'
      };
      fn = function(elt, flags) {
        return elt.setFlags(flags);
      };
      return {
        analyze: function(event) {
          var condition, flags;
          for (condition in RULES) {
            flags = RULES[condition];
            event.eachMatched(condition, fn, flags);
          }
          return event;
        }
      };
    }
  });

}).call(this);
