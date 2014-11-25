class this.Lexion 

    constructor: (opts)->
        @attrs = {}
        @flags = {}
        Object.update(@, opts)
        @tag = 'span' unless @tag
        @flags[@kind] = 1 if @kind
        @parent.addLast @ if @parent
        
    # sets/remove class for elt. 
    # Classes to remove have to be prefixed with '!' sign.
    setFlags: (delta) ->
        return @ unless delta and (delta = delta.split(" ")).length
        for cl in delta when cl
            if cl[0] is "!"
                @flags[cl[1..]] = 0
            else
                @flags[cl] = 1
        @
        
    # sets/remove class for elt. 
    # Classes to remove have to be prefixed with '!' sign.
    isMatched: (delta) ->
        return @ unless delta and (delta = delta.split(" ")).length
        for cl in delta
            if '+' in cl
                if cl[0] is "!"
                    return false if @isMatchedAny cl[1..].split("+")
                else
                    return false unless @isMatchedAny cl.split("+")
            else
                if cl[0] is "!"
                    return false if @flags[cl[1..]]
                else
                    return false unless @flags[cl]
        
        r=[@]           
        return r if (rest = arguments.length) is 1
        next = @nextToken()
        for d in [1..rest-1] 
            return false unless next and next.isMatched(arguments[d])
            r.push next
            next = next.nextToken()
        return r
        
    isMatchedAny: (delta) ->
        return false unless delta
        for cl in delta
            if cl[0] is "!"
                return true unless @flags[cl[1..]]
            else
                return true if @flags[cl]
        false
        
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
         
    setParent: (p) ->
        
        @detachMe()
        p.addLast @ if @parent = p
           
    setNext: (e) -> 
        
        e.detachMe()
        e.parent = @parent
        e.prev = @
        e.next = @next
        
        if @next 
            @next.prev = e
            
        @next = e
        @

    setAttr: (k, v) ->
        @attrs[k] = v
        @

    setText: (v) ->
        @text = v
        @
        
    setTag: (v) ->
        @tag = v
        @
        
    setKind: (v) ->
        @flags[@kind] = 0 if @kind
        @kind = v
        @flags[@kind] = 1
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
            p.eachChildInDeep op
            op.call @, p
            p = p.next
        @
        
    nextToken: ->
        next = @next
        while next and next.kind is 'space' 
            next = next.next
        next
            
    surroundWith: (opts) ->
        p = (new Lexion(opts))
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
        
        textOp = (text, e) ->
            if e 
                opts = 
                    tag: 'i'
                    kind: SIGN_FLAGS[text] or 'sign'
                    text: text
                    parent: @
            else     
                opts = 
                    tag: 'span'
                    kind:'word'
                    text: text
                    flags: flags = {}
                    parent: @
                    
                if text.match(reDigits)
                    opts.kind = 'number'
                else
                    flags[text] = 1
                    opts.lowerText = opts.text.toLowerCase() if opts.text
                    flags['abbr'] = 1 if text.toUpperCase() is text
                    flags['capital'] = 1 if String.capitalize(text) is text
                
            new Lexion opts

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
                            kind:'elt'
                            tag: tag
                            attrs: parseAttrs e[3]
                            parent: stack[0]
                            
                        elt = new Lexion opts
                            
                        if e[4] is '/' #single tag
                        else 
                            tagInfo = TAGS_INFO[tag] or TAGS_INFO['*']
                            
                            if tagInfo.isContainer
                                elt.kind = 'box'
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
        
        return ' ' if @kind is 'space'
         
        gap = '\n'+'\t'.multi(ngap)
        
        if (w = @word)
            @setAttr('title', w) 
            if (best = w.best) and (root=best.root)
                @setFlags(root)
                @setFlags(root+best.suffix)
        
        #attributes
        attrs = (" #{k}=\"#{v}\"" for own k, v of @attrs when v).join('')
        
        #flags as className
        fl = (f for f,v of @flags when v and (v isnt 'undefined'))
        fl = " class=\"#{fl.join(' ')}\"" if fl.length
        
        opentag = "#{@tag}#{fl or ''}#{attrs}"
        if p=@first
            inner = []
            while p
             inner.push p.toHtml(ngap+1)
             p = p.next
            
            "#{gap}<#{opentag}>#{inner.join('')}#{gap}</#{@tag}>"

        else if @text
        
            t = @text.replace(/\s+/g,' ')
            "#{gap}<#{opentag}>#{t}</#{@tag}>" 
            
        else
            
            "#{gap}<#{opentag}/>"
  
