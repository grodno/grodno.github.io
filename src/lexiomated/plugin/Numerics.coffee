Object.entity.define 

    id:"lexiomated.plugin.Numerics extends lexiomated.Plugin"
      
    methods: (_super) ->
        
        RULES =
            
            'shrt ]>dot': '#$0.>#'
            
            
            'number':
                '*>number lx3':'x1000 #$0_$1>#'
                'x1000>number lx3':'x1000000 #$0_$1>#'

                '*>numFactor x1000':'x1000 #$0_$1>#'
                '*>numFactor x1000000':'x1000000 #$0_$1>#'

                '*>percent':'percent #$0%>#'
                '*>minus>cyr lx2':'#$0-$2.textSlice.1>#>#'
            
                'dollar<*':'#<currency usd #$$0'

                'degree<*':'#<degree #$-1_$0'
                'degree<prep<*':'#<p2<degree #$-2_$0'

                '*>measure':
                    '*>currency':
                        '*': 'currency'
                        '*>usd': 'usd'
                        '*>rub': 'rub'

                    '*': 'measuredNumber #$0_$1>#'

        analyze: (event) ->

            event.evaluateRules RULES               



