# Lexio plugin
(->
    Token = (v, m, prev) ->
        @id = m.origin or v
        @input = v
        @size = 1
        @kind = m.kind
        @tags = []
        
        # sequence refs
        if prev
            @prev = prev
            prev.next = this
        return

    ZToken = (t, prev) ->
        @id = t.id
        @input = t.input or +t.id
        @size = t.id.length
        @kind = "z"
        @type = t.type
        @tags = (t.tags or []).concat("type-" + @type)
        
        # sequence refs
        if prev
            @prev = prev
            prev.next = this
        return

    Token:: = ZToken:: =
        remove: ->
            @kind = null
            @prev and (@prev.next = @next)
            @next and (@next.prev = @prev)
            return

        setNext: (n) ->
            @next = n
            n.prev = this    if n
            return

        setPrev: (p) ->
            @prev = p
            p.next = this    if p
            return

    
    # metadata String.CHARS2[ev.lastChar+v] ||
    
    #ev.lastChar = v;
    # append to previous of same kind
    _tokenize = ((v, p, ev) ->
        prev = ev.lastToken
        unless v
            v =
                type: "x"
                id: "error"
                input: "[error]"
        if v.type
            @push ev.lastToken = new ZToken(v, prev)
        else
            m = String.CHARS[v] or (String.CHARS[v] =
                kind: "x"
                lat: ""
                id: v
                type: v
                origin: v
            )
            if prev and (prev.kind is m.kind)
                id = m.origin or v
                prev.input += v
                prev.id += id
                prev.size++
            else
                @push ev.lastToken = new Token(v, m, prev)
        ev.firstToken = ev.lastToken    unless prev
        return
    ).iterator()
    
    # parses and compile binding from expression
    compileTemplate = (s) ->
        posB = undefined
        posE = -2
        path = undefined
        r = []
        while ((posB = s.indexOf("{{")) > -1) and ((posE = s.indexOf("}}", posB)) > -1)
            path = s.substring(posB + 1, posE + 1)
            r.push.apply r, s.substring(0, posB).split("")
            r.push Object.parse(path)
            s = s.substring(posE + 2)
        s and r.push.apply(r, s.split(""))
        r

    Object.entity.define 
        id:"lexio/plugin/tokenize extends lexio.Plugin"
        performImpl: (err, ev) ->
            arr = (if ev.normalizedInput then compileTemplate(ev.normalizedInput) else ev.input.split(""))
            _tokenize arr, [], ev
            return

    return
)()


# Lexio plugin
(->
    _lat = (ww) ->
        i = 0
        r = ""
        l = ww.length

        while i < l
            r += String.CHARS[ww[i]].lat
            i++
        r

    _translite = (c) ->
        if c.root and String.ROOTS[_lat(c.root)]
            c.score += 100
            c.word.best = c
        return

    _iterator = ((w, i) ->
        if not w.trasliterated and w.lang is "r" and w.best.score < 59
            w.trasliterated = 1
            w.eachCase _translite
        return
    ).iterator()
    Object.entity.define "lexio/plugin/translit extends lexio/Plugin",
        methods: (_super) ->
            
            # implementation of perform on event
            performImpl: (err, ev) ->
                _iterator String.WORDS, ev
                return

    return
)()
