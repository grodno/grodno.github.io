Object.entity.define
    id:"lexiomated.Widget extends Html"
    properties: ["text","data"]
    methods: ->
        
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
    
        _op = (d) ->
            @value += _toHtml(d)
            return

        
        dataChanged: (ev) -> 
            @prop 'textUri', 'lexio://#'+ ev.value        
        
        textChanged: (ev) -> 
            text = ev.value
            r=  (text?.rootElt.toHtml() or '-')
            @prop 'html', ''+r #'<textarea style="width:100%;height:700px">'+r+'</textarea>'

    
