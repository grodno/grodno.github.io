
# Lexio Event
Object.entity.define 

    id:"lexio.Text"
    
    methods: (_super) ->
          
        # handles text event passed 
        analyze: (@input, callback) ->
            return callback(0, '') if not @input or not @input.trim() or @input is 'null' or @input is 'undefined'

            # handles text event by each plugin 
            p.handleEvent? @ for p in @plugins

            callback(0, @)   

        each: (kind, op)->
            @rootElt?.eachChildInDeep @, (elt)->
                op.call @, elt if elt.kind is kind
 