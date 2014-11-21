Object.entity.define
    id:'couch.DbAddNewButton extends Button'
    properties: ["value"]
    busyCaption: "in progress"
    methods: (_super) ->

        createAsyncEvent: ->

            doc = Object.clone(@prop 'value')
            
            docId = ''
            if @needPromptId 
                return null unless docId = window.prompt "Enter the Id for a new #{doc.kind}" 
                
            doc.name = [docId, doc.name, (@prop 'counter')].join ' '
            
            uri:"db://put/" + docId
            doc: doc

                        
