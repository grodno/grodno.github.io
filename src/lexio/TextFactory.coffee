# Lexio Text Factory.
Object.entity.define 
    id:"lexio.TextFactory extends EventHandlerWithPlugins"
    properties:['requires:Requires']
    requires:[
        "script://*/js/lexio/Utils.js"
        "script://*/js/lexio/Lexion.js"
        "script://*/js/lexio/Word.js"
    ]
    methods: (_super) ->
        
        handleEvent : (ev) ->
            Object.entity.create
                id: "lexio.Text"
                plugins: @plugins
                ,
                (err, obj)-> obj.analyze ev.uri.hash, ev.callback
