Object.entity.define 

    id:"lexiomated.plugin.Calendar extends lexiomated.Plugin"
      
    methods: (_super) ->
        
        RULES =
            
            'number':

                'lx2+lx3':
                    '*>year': 'year age #$0_$1>#'
                    '*>minus>year': 'year age #$0-$2>#>#'

                'lx4 @numberBetween.1000.2200': 'likeYear'
                
                'likeYear': 
                    '*>measure year': 'year #$0_$1>#'
                    '*>#г ]>dot>':
                        '*':'year #$0_года>#>#'
                        '*>#в+#р ]>dot':'born #$0_выпуска>#>#>'
 
        analyze: (event) ->

            event.evaluateRules RULES               



