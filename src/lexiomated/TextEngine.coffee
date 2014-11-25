# Lexio Event
Object.entity.define 

    id:"lexiomated.Event"
    
    methods: (_super) ->
        init: ->
            _super.init.call @
            
        parse: ()->
            @rootElt = new Lexion kind:'root', tag: 'article', text: @input
            @rootElt.parse()

        each: (kind, op)->
            @rootElt.eachChildInDeep (elt)->
                op.call @, elt if elt.kind is kind
                
        eachMatched: (args, op)->
            @rootElt.eachChildInDeep (elt)->
                op.apply @, elts if elts = elt.isMatched args...
                
        eachWord: (op)->
            @rootElt.eachChildInDeep (elt)->
                op.call @, elt if elt.kind is 'word'
                
        isValidInput: ()->
            return false unless s = @input
            return false unless s = @input = s.replace(/\n/g,'').replace(/\s+/g,' ').trim()
            return false if s is 'null' or s is 'undefined'
            true
            
        toHtml: ->
            @rootElt.toHtml()            

# Lexio Text Factory.
Object.entity.define 
    id:"lexiomated.Plugin"
    properties:['requires:Requires']
           

# Lexio Text Factory.
Object.entity.define 
    id:"lexiomated.TextEngine"
    properties:['plugins:Plugins', 'requires:Requires']
    requires:[
        "entity://lexiomated.Utils"
        "entity://lexiomated.Lexion"
        "entity://lexiomated.Word"
    ]
    methods: (_super) ->
        
        onEvent : (ev) ->

            event = Object.entity.create id:'lexiomated.Event', input: ev.uri.hash
            
            return ev.callback 'bad_input: No input', '' unless event.isValidInput()

            event.parse()
            
            p.prepare? event for p in @plugins
            p.analyze? event for p in @plugins
            p.syntesize? event for p in @plugins

            ev.callback(0, event)
