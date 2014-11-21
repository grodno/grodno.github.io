Object.entity.define 
    id:"lexiomated.plugin.Hardcoded extends lexiomated.Plugin"
    requires:[
        'gsheet://1r9wwsGFHeJ_rxC-zNJ8ysoEcznk76PmGah1uLdus3iQ/content'
    ]    
    methods: (_super) ->

        onRequiredLoaded: (err, count, content)->
            @hardcoded = content.intoRegistry()

        prepare: (event) ->
            
            event.eachWord (word)=>
                word.setKind(r.kind).setFlags(r.flags) if (r = @hardcoded[key = word.lowerText])
                
                count=3
                e=word
                while count and nextWord=e.nextWord()
                    if (r = @hardcoded[key+=e.next.text+nextWord.text])
                        word.splitTill(nextWord).setKind(r.kind).setText(key)
                    e = nextWord
                    count--