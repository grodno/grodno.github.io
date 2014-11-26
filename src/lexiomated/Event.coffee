class Lexion 

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
    isMatched: (delta) ->
        return false unless delta
        return true if delta is '*'
        
        if '<' in delta
            prevC = delta.split("<")
            delta = prevC[prevC.length-1]

        if '>' in delta
            nextC = delta.split(">")
            delta = nextC.shift()

        delta = delta.split(" ")
        
        for cl in delta when cl
            if '+' in cl
                if cl[0] is "!"
                    return false if @isMatchedAny cl[1..].split("+")
                else
                    return false unless @isMatchedAny cl.split("+")
            else
                if cl[0] is "!"
                    return false if @flags[cl[1..]]
                else if cl[0] is "#"
                    return false unless @text is cl[1..]
                else if cl[0] is "@"
                    return false unless @[cl[1..]]()
                else
                    return false unless @flags[cl]
        if nextC
            lx = @
            for c in nextC 
                return false unless (lx = lx.nextToken()) and lx.isMatched(c)
                
        if prevC
            lx = @
            for ci in [prevC.length-2..0] 
                return false unless (lx = lx.prevToken()) and lx.isMatched(prevC[ci])
        true
        
    isMatchedAny: (delta) ->
        return false unless delta
        for cl in delta
            if cl[0] is "!"
                return true unless @flags[cl[1..]]
            else if cl[0] is "#"
                return true if @text is cl[1..]
            else if cl[0] is "@"
                return true if @[cl[1..]]()
            else
                return true if @flags[cl]
        false
        
    #------------------------------
    # Setters
    # sets/remove class for elt. 
    
    # Classes to remove have to be prefixed with '!' sign.
    setFlags: (delta, v=1) ->
        return @ unless delta
                
        if '<' in delta
            prevC = delta.split("<")
            delta = prevC[prevC.length-1]

        if '>' in delta
            nextC = delta.split(">")
            delta = nextC.shift()

        delta = delta.split(" ")
        for cl in delta when cl
            if cl[0] is "!"
                @flags[cl[1..]] = 0
            else if cl[0] is "#"
                T = @
                @text = cl[1..].replace(/_/g,' ').replace /\$(\-?\d+)(?:\.([a-z][a-zA-Z0-9\.]*))?/g, (s, n, method)-> 
                    n=+n
                    return T.text if n is 0 
                    dir = if n>0 then 'nextToken' else 'prevToken'
                    next = T
                    while n-- 
                        return '' unless next = next[dir]()
                    return next.getText() unless method 
                    method = method.split '.'
                    next?['get'+String.capitalize(method[0])] method[1..]...
                    
                @detachMe() unless @text
            else
                @flags[cl] = v
                
        next.setFlags(c) for ci in [prevC.length-2..0] when (c=prevC[ci]) and next = @prevToken() if prevC
        next.setFlags(c) for c in nextC when next = @nextToken() if nextC

        @

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
            p.eachChildInDeep op
            op.call @, p
            p = p.next
        @
        
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
                flags[SIGN_FLAGS[text] or 'sign'] = 1
            else if text.match(reDigits)
                flags.number = 1
                opts.numValue = +text
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
                            tag: tag
                            attrs: parseAttrs e[3]
                            flags: flags = {ex:1}
                            parent: stack[0]
                            
                        elt = new Lexion opts
                            
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

        #attributes
        attrs = (" #{k}=\"#{v}\"" for own k, v of @attrs when v).join('')
        
        #flags as className
        fl = (f for f,v of @flags when v)
        fl = " class=\"#{fl.join(' ')}\"" if fl.length
        
        tag = @tag or 'span'
        
        opentag = "#{tag}#{fl or ''}#{attrs}"
        
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
            @rootElt = new Lexion kind:'root', tag: 'article', text: @input
            @rootElt.parse()

        eachMatched: (condition, action, params)->
            @rootElt.eachChildInDeep (elt)->
                action.call @, elt, params if elt.isMatched condition
                
        isValidInput: ()->
            return false unless s = @input
            return false unless s = @input = s.replace(/\n/g,'').replace(/\s+/g,' ').trim()
            return false if s is 'null' or s is 'undefined'
            true
            
        toHtml: ->
            @rootElt.toHtml()