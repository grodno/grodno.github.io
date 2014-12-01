           

# Lexio Text Factory.
Object.entity.define 
    id:"lexiomated.Plugin"
    properties:['requires:Requires','testData']
           

# Lexio Text Factory.
Object.entity.define 
    id:"lexiomated.TextEngine"
    properties:['plugins:Plugins', 'requires:Requires']
    requires:[
        "entity://lexiomated.Utils"
        "entity://lexiomated.Word"
        "entity://lexiomated.Event"
    ]
    methods: (_super) ->
        init: ->
            _super.init.call @
            @prop 'testData', [].concat ({id:p.id or p._id, title:p.name or p.id, content: data} for p in @plugins when data=p.testData?())...

        onEvent : (ev) ->

            event = Object.entity.create id:'lexiomated.Event', input: ev.uri.hash
            
            return ev.callback 'bad_input: No input', '' unless event.isValidInput()
            Function.nextTick @, ->
                event.parse()
                p.prepare? event for p in @plugins
                p.analyze? event for p in @plugins
                p.syntesize? event for p in @plugins
                ev.callback(0, event)
