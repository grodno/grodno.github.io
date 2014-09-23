Object.entity.define 

    id:"lexiomated.plugin.Numerics extends lexiomated.Plugin"
      
    methods: (_super) ->
        re = /^\d+$/

        # handles text event passed 
        handleEvent: (event) ->
            event.each 'word', (e)->
                e.setKind('number') if e.text.match(re)

            event.each 'number', (e)->
                
                #sign
                if (s=e.prev?.text) in '-+'
                    e.setText(s+e.text)
                    e.prev.detachMe()
                    
                n=e
                
                # x1000 series
                while (next2 = (next=n.next)?.next) and next2.kind is 'number'  and next2.text.length is 3 and next.text in ' ,'
                    e.doInBetween(next2.next,'detachMe').setText(e.text+next.text+next2.text)
                    n = next2
                    
                #float point
                if (next2 = (next=n.next)?.next) and next2.kind is 'number'  and next.text in '.'
                    e.doInBetween(next2.next,'detachMe').setText(e.text+next.text+next2.text)
                    n = next2
                