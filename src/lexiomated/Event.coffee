class Lexon 

    constructor: (opts)->
        @attrs = {}
        @flags = {}
        Object.update(@, opts)
        @flags[@kind] = 1 if @kind
        @parent.addLast @ if @parent

    #------------------------------
    # Matched
    
    # sets/remove class for elt. 
    # Classes to remove have to be prefixed with '!' sign.
    isMatched: (->
        
        _CACHE={}
        
        match = (conj) ->
            val = conj.expr
            r = conj.invert
            c0 = conj.char0
            if c0 is "#"
                return r unless @text is conj.rest0
            else if c0 is "@"
                val = conj.rest0.split '.'
                return r unless @[val[0]] val[1..]...
            else if val is "]"
                return r if @next?.flags.space
            else
                return r unless @flags[val]
            not r
            
        matchAny = (disj) ->
            for conj in disj.conjuctions
                return not disj.invert if match.call @, conj
            disj.invert
            
        compile = (s='*') ->
            
            return r if r = _CACHE[s]
            
            r = _CACHE[s] ={disjunctions:[]}
            
            return r if r.isTrue = (s is '*')
            
            #extract previous conditions        
            if '<' in s
                arr = s.split("<")
                len = arr.length
                s = arr[len-1]
                r.prevChain = (compile arr[ci] for ci in [len-2..0])
            #extract next conditions        
            if '>' in s
                arr = s.split(">")
                s = arr.shift() 
                r.nextChain = (compile c for c in arr)
                
            return r if not s or s is '*'
            
            s = s.split(" ")
            for cl in s when cl
                disj={conjuctions:conjuctions = []}
                
                if cl[0] is "!" and cl[1] is '('
                    disj.invert=true
                    cl=cl[2..0]

                for cl1 in cl.split("+") when cl1
                    conj = {invert:false}
                    if cl1[0] is "!" 
                        conj.invert=true
                        cl1=cl1[1..]
                    conj.expr= cl1                        
                    conj.char0 = cl1[0]
                    conj.rest0= cl1[1..]                        
                    conjuctions.push conj
                    
                disj.single = conjuctions[0] if conjuctions.length is 1
                    
                r.disjunctions.push disj
                
            r.single = r.disjunctions[0].single if r.disjunctions.length is 1

            r

        impl = (condition)->
            #match current condition
            if condition.single
                return false unless match.call @, condition.single
            else                
                for disj in condition.disjunctions
                    if disj.single
                        return false unless match.call @, disj.single
                    else
                        return false unless matchAny.call @, disj
                        
            #apply next conditions        
            if condition.nextChain
                lx = @
                for c in condition.nextChain
                    return false unless (lx = lx.nextToken()) and impl.call lx, c
            #apply previous conditions        
            if condition.prevChain
                lx = @
                for c in condition.prevChain
                    return false unless (lx = lx.prevToken()) and impl.call lx, c
            true

        (s) -> if not s or s is '*' then true else impl.call @, compile s

    )()

    #------------------------------
    # Setters
    # sets/remove class for elt. 
    
    # Classes to remove have to be prefixed with '!' sign.
    setFlags: (->
        
        fnResolveText = (cl, ev)->
            cl.replace(/_/g,' ').replace /\$(\-?\d+)(?:\.([a-z][a-zA-Z0-9\.]+))?/g, (s, n, method)-> 
                return '' unless next = ev['$'+n]
                return next.getText() unless method 
                method = method.split '.'
                next?['get'+String.capitalize(method[0])] method[1..]...
                
        (delta, ev={}) ->
            return @ unless delta
            
            ev['$0'] = @
            #extract previous expressions        
            if '<' in delta
                prevC = delta.split("<")
                delta = prevC[prevC.length-1]
                prevC = (prevC[ci] for ci in [prevC.length-2..0])
                lx = @
                prevLxs = (ev['$-'+ci] = lx for ci in [1..prevC.length] when lx and lx =lx.prevToken())
                
            #extract next expressions        
            if '>' in delta
                nextC = delta.split(">")
                delta = nextC.shift()
                lx = @
                nextLxs = (ev['$'+ci] = lx for ci in [1..nextC.length] when lx and lx =lx.nextToken())

            #apply previous/next expressions    
            lx.setFlags(prevC[i], ev) for lx,i in prevLxs if prevLxs

            #apply current
            delta = delta.split(" ")
            for cl in delta when cl and c0=cl[0]
                if c0 is "!"
                    @flags[cl[1..]] = 0
                else if c0 is "#"
                    if cl is c0 then @detachMe() else @text = fnResolveText cl[1..], ev
                else if c0 is "{"
                    (ev.parent = (ev.parent or @).surroundWith()).setFlags cl[1..-2].replace('_',' ')+' clause'
                else if c0 is "^"
                    if cl[1] is '_'
                        (new Lexon flags:{space:1}).setParent(ev.parent or ev.$0)
                        cl = cl[1..]
                    (if cl is c0 then @ else @getSibling(cl[1..]))?.setParent(ev.parent or ev.$0)
                else
                    @flags[cl] = 1
                    
            #apply previous/next expressions    
            lx.setFlags(nextC[i], ev) for lx,i in nextLxs if nextLxs

            @
    )()

    setAttr: (k, v) ->
        @attrs[k] = v
        @

    setText: (v) ->
        @text = v
        @
    getText: () -> @text
    getTextSlice: (s=0,e=-1) -> @text[+s..+e]
        
    setTag: (v) ->
        @tag = v
        @
        
    getYear: (gap=0) -> (new Date()).getFullYear()+(+gap)
    
    between: (s=0,e=Number.MAX_VALUE) -> +@text >= +s  and +@text <= +e
    noNextSpace: ()-> not @next?.flags.space

    #------------------------------
    # Chaining
    
    addLast: (e)->
        if @last 
            (@last.next = e).prev = @last 
        else 
            @first = e
        
        @last = e
        
        @
        
    detachMe: ->
        
        return @ unless @parent
            
        if @next 
            @next.prev = @prev
        else 
            @parent.last = @prev or null            
            
        if @prev
            @prev.next = @next
        else 
            @parent.first = @next or null
    
        @parent = @prev = @next = null
        
        @

    addChild: (e) ->
        e.detachMe()
        (e.parent = @).addLast e
        @
         
    setParent: (p) ->
        @detachMe()
        p.addLast @ if @parent = p
        @
           
    setNext: (e) -> 
        
        e.detachMe()
        e.parent = @parent
        e.prev = @
        e.next = @next
        
        if @next 
            @next.prev = e
            
        @next = e
        @

    doInBetween: (next, op)->
        p = @next
        while p and p isnt next
            pn = p.next # preserve before op!!
            p[op] (e for e,i in arguments when i>1)...
            p = pn
        @
        
    mergeFrom: ()->
        for target in arguments when target
            @text += target.text
            target.detachMe()
        @
        
    eachChildInDeep: (op) ->
        p = @first
        while (p)
            op.call @, p
            p.eachChildInDeep op
            p = p.next
        @
        
    getSibling: (n=1)->
        n=+n
        next = @
        if n>0
            while n-- 
                return null unless next = next.nextToken()
        else if n<0
            while n++ 
                return null unless next = next.prevToken()
        next
        
    nextToken: ->
        next = @next
        while next and next.flags.space
            next = next.next
        next
        
    prevToken: ->
        next = @prev
        while next and next.flags.space 
            next = next.prev
        next
            
    surroundWith: (opts) ->
        p = (new Lexon(opts))
        @setNext(p).setParent(p)
        p

    #------------------------------
    # ser/deser
    executeRegExp: (s, re, op)->
        pastLastIndex = 0
        while e = re.exec(s) 
            #interval text
            op.call @, text, null if e.index and (text = s[pastLastIndex..e.index-1])
            #result
            op.call @, e[0], e
            pastLastIndex = re.lastIndex
        #rest    
        op.call @, text, null if (text = s[pastLastIndex..])
        @     
     
    parse: (->
        
        TAGS_INFO = 
            'div' : 
                isContainer: true
            'span' : 
                isContainer: true
            'p': 
                isContainer: true
            'a': 
                isContainer: true
                nonRecursive: true
            'ul': 
                isContainer: true
                nonRecursive: true
            'li': 
                isContainer: true
                nonRecursive: true
            "*":
                isContainer: false

        SIGN_FLAGS =
            ' ': 'space'
            '.': 'dot'
            ',':'comma'
            '+':'plus'
            '-':'minus'
            '—':'dash'
            '$':'dollar'
            '%':'percent'
            '«':'quote'
            '»':'quote'
            '"':'quote'
            '\'':'quote'
            '*':'asterisk'
            
        reAttrs =///
            (\s+[a-z][a-z0-9\-]+)
            (?:= ( \w+ | ['"]?[^>"]*['"]?) )?
            ///gi

        parseAttrs = (s) ->    
            r={}
            if s
                while (e = reAttrs.exec(s))
                    v =e[2]
                    r[e[1]] = if not v? then true else if v[0] is '"' then v[1 .. -2] else v
            r

        re = ///<
            #closing tag slash
            (\/?) 
            #tag
            ([a-z]{1,7}) 
            #attributes
            ((?:
            \s+[a-z][a-z0-9\-]+
            (?:=(?:\w+ | (?:['"]?[^>'"]*['"]?) ))?
            )*)
            #single tag slash
            (\/?) 
            >
            ///gi;
           
        reDigits = /^\d+$/
        reLat = /^[a-zA-Z]+$/
        reCyr = /^[а-яА-Я]+$/
        
        textOp = (text, e) ->
            opts = 
                text: text
                flags: flags = {}
                parent: @
            if e 
                flags['sign'] = 1 unless text is ' '
                flags[fl] = 1 if fl=SIGN_FLAGS[text]
                
            else if text.match(reDigits)
                flags.number = 1
                flags['lx'+text.length] = 1
            else
                flags.word = 1
                opts.lowerText = opts.text.toLowerCase()
                if text.match(reLat)
                    flags['lat'] = 1 
                else if text.match(reCyr)
                    flags['cyr'] = 1 
                else
                    flags['mixed'] = 1 
                
                flags['abbr'] = 1 if text.toUpperCase() is text
                flags['capital'] = 1 if String.capitalize(text) is text
                
            new Lexon opts

        ->
            stack = [@]
            
            @executeRegExp @text, re, (text, e) ->
                
                if e # tag
                    tag = e[2].toLowerCase()

                    if e[1] is '/' 
                        #closing tag
                        if tag is stack[0].tag and stack.length>1
                            stack.shift() 

                    else 
                        opts = 
                            tag: tag
                            attrs: parseAttrs e[3]
                            flags: flags = {ex:1}
                            parent: stack[0]
                            
                        elt = new Lexon opts
                            
                        if e[4] is '/' #single tag
                        else 
                            tagInfo = TAGS_INFO[tag] or TAGS_INFO['*']
                            
                            if tagInfo.isContainer
                                flags.bx = 1
                                if tagInfo.nonRecursive and stack[0].tag is tag
                                    stack[0] = elt
                                else
                                    stack.unshift elt

                else # text between matches
                    #elt = new Lexion kind:'text',text:text, parent: stack[0]
                    stack[0].executeRegExp text, /[^a-zа-я0-9іўё]/gi, textOp
                    
                elt
                    
            @
    )()
            
    toHtml:(ngap=0)->
        
        return ' ' if @flags.space
        return ' ' if @tag is 'img'
         
        gap = ''#'\n'+'\t'.multi(ngap)

        
        #flags as className
        fl = (f for f,v of @flags when v).join(' ')
        
        tag = @tag or 'span'

        #attributes
        @attrs.title = fl+(if @attrs.title then '\n'+@attrs.title else '')
        attrs = (" #{k}=\"#{v}\"" for own k, v of @attrs when v).join('')
        
        fl = if fl.length then " class=\"#{fl}\"" else ''
        
        opentag = "#{tag}#{fl}#{attrs}"
        
        if p=@first
            inner = []
            while p
             inner.push p.toHtml(ngap+1)
             p = p.next
            "#{gap}<#{opentag}>#{inner.join('')}#{gap}</#{tag}>"

        else if @text
            t = @text.replace(/\s+/g,' ')
            "#{gap}<#{opentag}>#{t}</#{tag}>" 
            
        else
            "#{gap}<#{opentag}/>"
  
# Lexio Event
Object.entity.define 

    id:"lexiomated.Event"
    
    methods: (_super) ->
        init: ->
            _super.init.call @
            
        parse: ()->
            @rootElt = new Lexon kind:'root', tag: 'article', text: @input
            @rootElt.parse()

        eachMatched: (condition, action, params)->
            @rootElt.eachChildInDeep (elt)->
                action.call @, elt, params if elt.isMatched condition
            @
                
        evaluateRules:(->
            fn = (elt, ev, rules)-> 
                for condition, flags of rules when condition isnt '::else' 
                    if typeof flags is 'string'
                        if elt.isMatched condition
                            elt.setFlags(flags) 
                    else
                        if elt.isMatched condition
                            fn(elt, ev, flags)
                        else if elseCond = flags['::else']
                            fn(elt, ev, '*': elseCond)
        
            (rules, ev={}) ->
                @rootElt.eachChildInDeep (elt)->
                    fn elt, ev, rules
        )()
                
        isValidInput: ()->
            return false unless s = @input
            return false unless s = @input = s.replace(/\n/g,'').replace(/\s+/g,' ').trim()
            return false if s is 'null' or s is 'undefined'
            true
            
        toHtml: ->
            @rootElt.toHtml()