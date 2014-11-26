Object.entity.define 

    id:"lexiomated.plugin.Numerics extends lexiomated.Plugin"
      
    methods: (_super) ->
        
 
        normalizeNumbersOp = (e)->
            
            if e.kind is 'number'    
                #sign
                if (s=e.prev?.text) in '-+'
                    e.setText(s+e.text)
                    e.prev.detachMe()
                    
                n=e
                
                # x1000 series
                while (next2 = (next=n.next)?.next) and next2.kind is 'number'  and next2.text.length is 3 and next.text in ' ,'
                    e.splitTill(next2.next).setText(e.text+next.text+next2.text)
                    n = next2
                    
                #float point
                if (next2 = (next=n.next)?.next) and next2.kind is 'number'  and next.text in '.,'
                    e.splitTill(next2.next).setText(e.text+next.text+next2.text)
                    n = next2

        # handles text event passed 
        analyze: (event) ->
            #event.eachMatched ['number', 'space','number'], (elt)-> elt.mergeFrom(elt.next, elt.next.next)
                
               



