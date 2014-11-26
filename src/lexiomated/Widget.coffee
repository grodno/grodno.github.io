Object.entity.define
    id:"lexiomated.Widget extends Html"
    properties: ["text","data"]
    methods: (_super)->
        
        
        _toHtml = (t) ->
            return ""    unless t.kind
            w = t.word
            cl = ["kind-" + t.kind]
            title = ""
            if w
                c = w.best or w.top
                sc = c.score
                title = (if c.root then (c.root + " \n," + w) else w.top.x)
                cl.push (if c.hardcoded then "hardcoded" else ((if sc > 49 then ((if sc > 99 then "good" else "norm")) else ((if sc > 10 then "weak" else "bad")))))
            (if t.kind is "s" then " " else String.format("<span title=\"{0}\" class=\"{1}\">{2}</span>", title, cl.concat(t.tags).join(" "), t.input))
    
        #================================
        
        init: ->
            _super.init.call @
            #@prop 'data', (@prop 'html')
            
        dataChanged: (ev) -> 
            @prop 'textUri', 'lexio://#'+ ev.value.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace /&#(\d+);/g, (s, d) -> String.fromCharCode(d)       
        
        textChanged: (ev, text) -> 
            if r = text?.toHtml() 
                @prop 'html', ''+r #'<textarea style="width:100%;height:700px">'+r+'</textarea>'

    
