# Lexio Text Factory.
Object.entity.define 
    id:"lexiomated.TextFactory extends EventHandlerWithPlugins"
    properties:['requires:Requires']
    requires:[
        "entity://lexiomated.Utils"
        "entity://lexiomated.Lexion"
        "entity://lexiomated.Word"
    ]
    methods: (_super) ->
        
        handleEvent : (ev) ->
            Object.entity.create
                id: "lexiomated.Text"
                plugins: @plugins
                ,
                (err, obj)-> obj.analyze ev.uri.hash, ev.callback
