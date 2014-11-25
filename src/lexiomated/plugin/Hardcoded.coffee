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
                while count and nextWord=e.nextToken()
                    if (r = @hardcoded[key+=e.next.text+nextWord.text])
                        word.mergeFrom(e.next, nextWord).setKind(r.kind)
                    e = nextWord
                    count--