# Lexio plugin
Object.entity.define 
    id:"lexio.plugin.Abbr extends lexio.Plugin"
    methods: (_super) ->
            
            _op = (t) ->
                t.kind = "a"    if ("er".indexOf(t.kind) + 1) and t.size > 1 and t.input is t.input.toUpperCase()
                return            
                
            # implementation of perform on event
            performImpl: (err, ev) ->
                ev.eachToken _op
