Object.entity.define 

    id:"lexiomated.plugin.Sentences extends lexiomated.Plugin"
      
    methods: (_super) ->
        
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

        # handles text event passed 
        analyze: (event) ->
            
            eachDet event.rootElt
            eachPrep event.rootElt


