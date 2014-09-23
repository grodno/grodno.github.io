Object.entity.define 
    id:"lexiomated.plugin.Hardcoded extends lexiomated.Plugin"
    requires:[
        'gsheet://1r9wwsGFHeJ_rxC-zNJ8ysoEcznk76PmGah1uLdus3iQ/content'
    ]    
    methods: (_super) ->

        onRequiredLoaded: (content)->
            @hardcoded = content.intoRegistry()

        # handles text event passed 
        handleEvent: (event) ->
            event.each 'word', (elt)=>
                elt.setKind(r.kind).setFlags(r.flags) if (r = @hardcoded[key = elt.text.toLowerCase()])
                
                count=2
                e=elt
                while count and (next2 = (next=e.next)?.next) and next2.kind is 'word' 
                    if (r = @hardcoded[key+=next.text+next2.text])
                        elt.doInBetween(next2.next,'detachMe').setKind(r.kind).setText(key)
                        
                    e = next2
                    count--