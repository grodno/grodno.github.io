(function() {
  Object.entity.define({
    id: "lexiomated.plugin.Calendar extends lexiomated.Plugin",
    name: 'Calendar plugin',
    methods: function(_super) {
      var RULES;
      RULES = {
        'number': {
          'lx4 @between.1000.2200': 'yearNum',
          'lx1+lx2 @between.1.31': 'dayOfMonthNum',
          '@between.10.24': 'hourNum'
        },
        'yearNumber': {
          '*>#г ]>dot>': {
            '*': 'year #$0_года>#>#',
            '*>#в ]>dot': 'born #$0_выпуска>#>#',
            '*>#р ]>dot': 'born #$0_рождения>#>#'
          },
          'phase<*': '#<#$-1_$0'
        },
        'measure': {
          'year': {
            'yearNumber<*': '{year}<^',
            'rxслед<*': '{year} #$0.year.1<^_ next',
            'lx2+lx3<*': '{age}<^',
            'lx2+lx3<minus<*': '{age}<^<^'
          }
        },
        'month': {
          'dayOfMonthNum<*': '{dayOfMonth}<^',
          '*>yearNum': {
            '*': '{date}>#',
            '::else': '#$0_$0.year current'
          }
        },
        'dayOfMonth': {
          '*>year': '{date}>^_'
        },
        'hourNum': {
          '*>dot+colon>lx2 @between.0.59': '{time} #$0:$2>#>#'
        }
      };
      return {
        testData: function() {
          return ['в гродненской кирхе 6 декабря в 14.00'];
        },
        analyze: function(event) {
          return event.evaluateRules(RULES);
        }
      };
    }
  });

}).call(this);
