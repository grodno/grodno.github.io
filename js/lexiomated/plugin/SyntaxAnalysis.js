(function() {
  Object.entity.define({
    id: "lexiomated.plugin.SyntaxAnalysis extends lexiomated.Plugin",
    methods: function(_super) {
      var RULES;
      RULES = {
        'word': {
          'det+prep<*>!word': 'noun',
          'quote<*>quote': 'named',
          '!dot<capital': 'named',
          'quote<word<*>quote': 'named adj<named',
          'det+prep<word<*>comma+dot': 'adj<noun'
        },
        'named': {
          'named<*': '[<named'
        },
        'lat': {
          ']>dot ]>lat #by+#com+#ru': 'url !word #[$0.$2]>#>#'
        }
      };
      return {
        analyze: function(event) {
          return event.evaluateRules(RULES);
        }
      };
    }
  });

}).call(this);