Object.entity.define 

    id:"lexiomated.plugin.Calendar extends lexiomated.Plugin"
    name:'Calendar plugin'
      
    methods: (_super) ->
        
        RULES =
            
            'number':
                'lx4 @between.1000.2200': 
                    '*':'yearNum'
                    '*>#г ]>dot>':
                        '*':'year #$0_года>#>#'
                        '*>#в ]>dot':'born #$0_выпуска>#>#'
                        '*>#р ]>dot':'born #$0_рождения>#>#'
                'lx1+lx2 @between.1.31': 'dayOfMonthNum'
                '@between.10.24': 'hourNum'
 

            'measure':
                'year':
                    'yearNum<*': '{year}<^'
                    'phase<*': '{year} #$0.year.1<^_ next'

                    'lx2+lx3<*': '{age}<^'
                    'lx2+lx3<minus<*': '{age}<^<^'

            'month':
                    'dayOfMonthNum<*': '{dayOfMonth}<^'
                    
                    'phase<*': '{phaseOfMonth }<^'
                    
                    '*>yearNum+year':
                        '*': '{date}>^'

            'yearNum': 
                'phase<*': '#<#$-1_$0'

            'dayOfMonth':
                '*>year': '{date}>^_'
                
            'hourNum':
                '*>dot+colon>lx2 @between.0.59': '{time} #$0:$2>#>#'


        testData: ()->
            [
                'в гродненской кирхе 6 декабря в 14.00'
                'использование зимних покрышек с 16 января следующего года.'
            ]

        analyze: (event) ->

            event.evaluateRules RULES               



