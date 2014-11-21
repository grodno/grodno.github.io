((global) ->

    Object.ownProps = (obj) ->
        result = []
        for n of obj
            if obj.hasOwnProperty(n)
                result.push
                    id: n
                    value: obj[n]

        result

    Array::sortByMirrorKey = (key) ->
        key = key or "id"
        @sort (s1, s2, v1, v2) ->
            v1 = s1[key].mirror()
            v2 = s2[key].mirror()
            (if v1 > v2 then 1 else ((if v1 < v2 then -1 else 0)))


    Array::sortByKeyLen = (key) ->
        key = key or "id"
        @sort (s1, s2, v1, v2) ->
            v2 = s1[key].length
            v1 = s2[key].length
            (if v1 > v2 then 1 else ((if v1 < v2 then -1 else 0)))


    Function::iterator =  ->
        (arr,ctx,p) =>
            Function.iterate(@,arr,ctx,p)

    Array::getKeys = (key) ->
        key = key or "id"
        ((v, p) ->
            @push v[key]
        ).iterator() this, []

    
    #returns mirrored of {this) .
    String::mirror = ->
        r = ""
        i = @length - 1

        while i >= 0
            r += this[i]
            i--
        r
        
    String::multi = (len)-> if len>0 then new Array(len).join(@) else ''
        
        
    String::trim = (->
            re = /^\s+|\s+$/g
            -> @.replace(re,'')
        )() 
    
    # checks if {this} ends with given {suffix}.
    String::endsWith = (suffix) ->
        @indexOf(suffix, @length - suffix.length) isnt -1

    _undef = undefined
    isLetter = (f) ->
        CHARS[f] isnt _undef

    pushIntoCategory = (obj, cat, val) ->
        obj[cat] = all: []    unless obj[cat]
        obj[cat].all.push val
        return

    tagsSorterFn = (s1, s2, v1, v2) ->
        v1 = s1.value.all.length
        v2 = s2.value.all.length
        (if v1 > v2 then -1 else ((if v1 < v2 then 1 else 0)))
        
            
    Array::mirrorItems = ->
        ((v) ->
            @push v.mirror("")
            return
        ).iterator() this, []
        
    Array::intoRegistry = (reg={}) ->
        for v in @
            reg[v.id] = v
            reg[e] = v for e in v.ids.split(",") if v.ids
        reg        

    TYPE_U = type: "x"
    DIFTONGS = [
        "oo"
        "ea"
        "ei"
        "th"
        "gh"
        "ou"
        "sh"
        "ch"
    ]
    
    String.signature = (x) ->
        i = 0
        r = ""
        l = x.length
        p = undefined
        c = undefined

        while i < l
            c = x[i]
            if c isnt p and DIFTONGS.indexOf(p + c) is -1
                r += (Word.CHARS[c] or TYPE_U).type
                p = c
            i++
        r

)(this)