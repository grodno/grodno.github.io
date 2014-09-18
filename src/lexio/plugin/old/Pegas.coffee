
# Lexio plugin
Object.entity.define 
    id: "lexio.plugin.Normalizer extends lexio.Plugin"
    requires: ["lib://peg-0.7.0",'peg/normalize_parser.pegjs']
    methods: (_super) ->
        
        # implementation of perform on event
        performImpl: (err, ev) ->
            ev.normalizedInput = @parser.parse(ev.input)    if @parser
            return

        grammarChanged: (ev) ->
            if ev.value
                try
                    @parser = PEG.buildParser(ev.value)
                catch ex
                    console.error "Can't create parser", ex
            return



