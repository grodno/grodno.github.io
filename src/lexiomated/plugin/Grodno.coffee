Object.entity.define 
    id:"lexiomated.plugin.Grodno extends lexiomated.Plugin"
    requires:[
        'gsheet://1f64CyciX17lLXEzdycrsjagjBOh6R_sIrZmKhMuWfGA/content'
    ]    
    methods: (_super) ->

        onRequiredLoaded: (err, count, content)->
            @hardcoded = content.intoRegistry()

        find : (lx)->
            return r if r = @hardcoded[lx.lowerText]
            if (w=lx.word?.best)
                return r if r = @hardcoded[w.root]
                return r if r = @hardcoded[w.root+w.suffix]
            null
            
        analyze: (event) ->
            
            event.eachWord (word)=>
                if r = @find word
                    word.setTag('a').setAttr('target','_blank').setAttr('href', r.url) 
                
                count=2
                e=word
                key= word.text
                while count and nextWord=e.nextWord()
                    if (r = @find  key+=e.next.text+nextWord.text )
                        word.splitTill(nextWord).setKind(r.kind).setText(key)
                    e = nextWord
                    count--