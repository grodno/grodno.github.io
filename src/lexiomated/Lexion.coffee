class Record

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

    # sets/remove class for elt. 
    # Classes to remove have to be prefixed with '!' sign.
    setFlags: (delta) ->
        return @ unless delta and (delta = delta.split(" ")).length
        for cl in delta
            if cl
                if cl[0] is "!"
                    @flags[cl[1..]] = 0
                else
                    @flags[cl] = 1
        @

    doInBetween: (next, op)->
        p = @next
        while p and p isnt next
            pn = p.next # preserve before op!!
            p[op] (e for e,i in arguments when i>1)...
            p = pn
        @
        
    splitTill: (ending)->
        @doInBetween(ending.next,'detachMe') 
        
    eachChildInDeep: (op) ->
        p = @first
        while (p)
            p.eachChildInDeep op
            op.call @, p
            p = p.next
        @
        
    nextWord: ->
        if (next2 = @next?.next) and next2.kind is 'word' then next2 else null
            
    surroundWith: (opts) ->
        p = (new Lexion(opts))
        @setNext(p).setParent(p)
        p
        
class this.Lexion extends Record

    constructor: (opts)->
        @attrs = {}
        @flags = {}
        Object.update(@, opts)
        @tag = 'span' unless @tag
        @flags[@kind] = 1 if @kind
        @lowerText = @text.toLowerCase() if @text
        @parent.addLast @ if @parent

    executeRegExp: (s, re, op)->
        
        pastLastIndex = 0
        while (e = re.exec(s)) 

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
            (?:=(?:\w+ | "?[^>"]*"?))?
            )*)
            #single tag slash
            (\/?) 
            >
            ///gi;
            
        reDigits = /^\d+$/
            
        textOp = (text, e) ->
            flags={}
            opts= 
                tag: 'span'
                kind:'word'
                text: text
                flags: flags
                parent: @
            if e 
                opts.tag = 'i'
                flags['dot'] = 1 if text is '.'
                flags['comma'] = 1 if text is ','
                flags['dash'] = 1 if text is '-'
                opts.kind = if text is ' ' then 'space' else 'sign'
            else
                if text.match(reDigits)
                    opts.kind = 'number'
                else
                    flags[text] = 1
                    flags['l'+text.length] = 1 
                    flags['abbr'] = 1 if text.toUpperCase() is text
                    flags['capital'] = 1 if String.capitalize(text) is text
                    
                
            new Lexion opts

        ->
            stack = [@]
            
            @executeRegExp @text, re, (text, e) ->
                
                if e # match
                    tag = e[2].toLowerCase()

                    if e[1] is '/' 
                        #closing tag
                        if tag is stack[0].tag and stack.length>1
                            stack.shift()
                      
                    else 
                        opts = 
                            tag: tag
                            attrs: parseAttrs e[3]
                            parent: stack[0]
                            
                        if e[4] is '/' 
                            #single tag
                            new Lexion opts
    
                        else 
                            elt = new Lexion opts
                            
                            tagInfo = TAGS_INFO[tag] or TAGS_INFO['*']
                            
                            if tagInfo.isContainer
                                elt.kind = 'box'
                                
                                if tagInfo.nonRecursive and stack[0].tag is tag
                                    stack[0] = elt
                                else
                                    stack.unshift elt

                else # text between matches
                    if textx = text.trim()
                        for txts in textx.split '.'
                            elts = new Lexion
                                kind: 'sentence'
                                tag: 'p'
                                parent: stack[0]
                            for txtc in txts.split ','
                                elt = new Lexion
                                    kind: 'clause'
                                    tag: 'span'
                                    parent: elts
                                elt.executeRegExp txtc, /[^a-zа-я0-9]/gi, textOp#,;-~!'"@#$%^&*\(\)\[\]\{\}\|\\\/?=+
                        
    )()
            
    toHtml:(ngap=0)->
        
        return ' ' if @kind is 'space'
         
        gap = '\n'+'\t'.multi(ngap)
        
        if (r = @word)
            @setAttr('title', r) 
            @setFlags(r.best.root)
        
        #attributes
        attrs = (" #{k}=\"#{v}\"" for own k, v of @attrs when v).join('')
        
        #flags as className
        fl = (f for f,v of @flags when v and (v isnt 'undefined')).join(' ')
        fl = " class=\"#{fl}\"" if fl
        
        opentag = "#{@tag}#{fl or ''}#{attrs}"
        if p=@first
            inner = []
            while p
             inner.push p.toHtml(ngap+1)
             p = p.next
            
            "#{gap}<#{opentag}>(#{@tag}:#{inner.join('')}#{gap})</#{@tag}>"

        else if @text
        
            t = @text.replace(/\s+/g,' ')
            "#{gap}<#{opentag}>#{t}</#{@tag}>" 
            
        else
            
            "#{gap}<#{opentag}/>"
            
            
            
            
