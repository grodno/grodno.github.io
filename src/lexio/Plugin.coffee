# Lexio plugin.
Object.entity.define 
    id:"lexio.Plugin"
    properties:['requires:Requires']
    methods: (_super) ->
        # perform on event
        perform: (ev) ->
