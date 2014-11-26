Object.entity.define 
    id:"lexiomated.plugin.SyntaxAnalysis extends lexiomated.Plugin"
    methods: (_super) ->
        
        RULES=
            
            'det+prep<word>!word':'noun'
            'quote<word>quote':'named'
            '!dot<word capital':'named'
            'named<named':'[<named'
            
            'lat @noNextSpace>dot @noNextSpace>lat #by+#com+#ru':'url !word #[$0.$2]>#>#'
            
            'number>number lx3':'#$0$1>#'
            'number lx4>#г>dot>#в>dot':'year born #$0_года_выпуска>#>#>#>#'
            'number>percent':'percent #$0%>#'
            'number>minus>lx2':'#$0-$2.textSlice.1>#>#'
            
            'dollar<number':'#<price usd #$$0'
            'number>rxдоллар':'price usd #$$0>#'
            'quote<word<word>quote':'named adj<named'
            'det+prep<word<word>comma+dot':'adj<noun'
            
        fn = (elt, flags)-> elt.setFlags(flags)
        
        # handles text event passed 
        analyze: (event) ->

            event.eachMatched condition, fn, flags for condition, flags of RULES
                
            event


