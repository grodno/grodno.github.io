class Lexion

    addLast = (e)->
        if @last 
            (@last.next = e).prev = @last 
        else 
            @first = e
        
        @last = e
        
        @


    constructor: (opts)->
        @attrs = {}
        Object.update(@, opts)
        @tag = 'span' unless @tag
        @flags = {}
        @flags[@kind] = 1
        addLast.call @parent, @ if @parent

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
        
    setAttr: (k, v) ->
        @attrs[k] = v
        @
        
        
    setText: (v) ->
        @text = v
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
        
    addChild: (e) ->
        e.detachMe()
        addLast.call e.parent = @, e
         
    setParent: (p) ->
        
        @detachMe()
        addLast.call p, @ if @parent = p
           
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
        
    eachChild: (ctx, op)->
        p = @first
        while (p)
            op.call ctx, p
            p = pn
        ctx
    
    eachChildInDeep: (ctx, op) ->
        
        p = @first
        while (p)
            p.eachChildInDeep ctx, op
            op.call ctx, p
            p = p.next
        ctx
        
    surroundWith: (opts) ->
        p = (new Lexion(opts))
        @setNext(p).setParent(p)
        p
        
    
    textRegistry:(ctx={text:'',registry:[]}) ->
        
        if @children
        
            e.textRegistry(ctx) for e in @children

        else if @text
            
            ctx.text += @text
            ctx.registry.push @ for ch in @text
            
        else
            
            #do nothing for single tags
            
        ctx
     
    executeRegExp: (re, op)->
        
        pastLastIndex = 0
        
        ctx = @textRegistry()
        ctx.sourceElt = @
        s = ctx.text

        while (e = re.exec(s)) 
        
            ctx.matching = e
            
            #interval text
            op.call ctx, text, null if e.index and (text = s[pastLastIndex..e.index-1])
            
            #result
            op.call ctx, e[0], e
            
            pastLastIndex = re.lastIndex
            
        #rest    
        op.call ctx, text, ctx.matching = null if (text = s[pastLastIndex..])
            
        ctx    
            
    toHtml:(ngap=0)->
        
        return ' ' if @kind is 'space'
         
        gap = '\n'+'\t'.multi(ngap)
        
        @setAttr('title', r) if (r = @word)
        
        #attributes
        attrs = ("#{k}=\"#{v}\"" for own k, v of @attrs when v).join(' ')
        
        #flags as className
        fl = (f for f,v of @flags when v).join(' ')
        fl = if fl then " class=\"#{fl}\"" else ''
        
        opentag = "#{@tag}#{fl} #{attrs}"
        if p=@first
            inner = []
            while p
             inner.push p.toHtml(ngap+1)
             p = p.next
            
            "#{gap}<#{opentag}> #{inner.join('')}#{gap}</#{@tag}>"

        else if @text
        
            t = @text.replace(/\s+/g,' ')
            "#{gap}<#{opentag}>#{t}</#{@tag}>" 
            
        else
            
            "#{gap}<#{opentag}/>"
