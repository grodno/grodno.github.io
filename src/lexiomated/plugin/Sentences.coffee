Object.entity.define 

    id:"lexiomated.plugin.Sentences extends lexiomated.Plugin"
      
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
                    
        eachDet=(e) ->
            while (e)
            
                if e.kind is 'det'
                    e = e.surroundWith(kind:'clause').setFlags('noun')
                    
                    # add next words into clause
                    while (next = e.next) and (next2 = next.next) and next2.kind is 'word'
                        e.doInBetween(next2.next,'setParent',e)
                        next2.setKind('adj')
                    
                    e.last.setKind('noun') unless e.last is e.first
                    
                else      
                    eachDet e.first if e.first
                    
                e = e.next
            e
         
        eachPrep=(e) ->
            while (e)
            
                if e.kind is 'prep'
                    e = e.surroundWith(kind:'clause').setFlags('prep object '+e.text)
                    
                    # add next words into clause
                    if (next = e.nextWord())
                        e.doInBetween(next.next,'setParent',e)
                        
                else      
                    eachPrep e.first if e.first
                    
                e = e.next
            e           

         
        sentences=(e) ->
            while (e)
            
                if e.text is '.'
                    e = e.surroundWith(kind:'sentence')
                    
                    # add next words into clause
                    while (next = e.nextWord())
                        e.doInBetween(next.next,'setParent',e)
                        
                else      
                    sentences e.first if e.first
                    
                e = e.next
            e   
            
        clauses=(e) ->
            while (e)
            
                if e.text is ','
                    e = e.surroundWith(kind:'clause')
                    
                    # add next words into clause
                    while (next = e.nextWord())
                        e.doInBetween(next.next,'setParent',e)
                        
                else      
                    clauses e.first if e.first
                    
                e = e.next
            e           

        # handles text event passed 
        analyze: (event) ->
            
            #sentences event.rootElt
            #clauses event.rootElt
            #eachDet event.rootElt
            #eachPrep event.rootElt


