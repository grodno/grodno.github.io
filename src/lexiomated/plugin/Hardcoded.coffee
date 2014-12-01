Object.entity.define 
    id:"lexiomated.plugin.Hardcoded extends lexiomated.Plugin"
    requires:[
        'gsheet://1r9wwsGFHeJ_rxC-zNJ8ysoEcznk76PmGah1uLdus3iQ/content'
    ]    
    methods: (_super) ->

        RULES =     
            'shrt ]>dot': '#$0.>#'


        onRequiredLoaded: (err, count, content)->
            @hardcoded = content.intoRegistry()

        prepare: (event) ->
            
            event.eachMatched 'word', (word)=>
                word.setFlags(r.flags+' !word') if (r = @hardcoded[key = word.lowerText])
                
                count=3
                e=word
                while count and nextWord=e.nextToken()
                    if (r = @hardcoded[key+=" "+nextWord.text])
                        word.mergeFrom(e.next, nextWord).setFlags(r.flags+' !word')
                    e = nextWord
                    count--

            event.evaluateRules RULES 