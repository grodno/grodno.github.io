# Lexio plugin.
Object.entity.define 
    id:"lexiomated.Plugin"
    properties:['requires:Requires']
    methods: (_super) ->
        # perform on event
        perform: (ev) ->
