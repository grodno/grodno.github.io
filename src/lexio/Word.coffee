class Word 

    _matchesInTree = (sub, op) ->
        x = @x
        l = x.length - 2
        p = 0
        while p < l and (c = x[p]) and sub and (sub = sub[c])
            op.call @, r, x[p + 1..] if r = sub["_"]
            p++
        return

    _reverseMatchesInTree = (sub, op) ->
        x = @x
        p = x.length - 1
        while p > 1 and (c = x[p]) and sub and (sub = sub[c])
            op.call @, x[p..], x[0..p-1] if sub["_"]
            p--
        return

    op_prefixize =  (key, rest) -> if rest.length > 1 then @branch prefix: key,     x: rest, score: key.length - 2 else 0

    op_flexify =    (key, rest) -> if rest.length > 1 then @branch flexie: key,     x: rest, score: key.length else 0

    op_suffixize =  (key, rest) -> if rest.length > 1 then @branch suffix: key,     x: rest, score: key.length else 0

    op_complexify = (key, rest) -> if rest.length > 1 then @branch complexie: key,  x: rest, score: 2 * key.length else 0

    VOWEL_PREP = "aeoi"
    APP1 = ["ся","сь","те"]
    NEG = ["не","ни","un","de","in","re"]
    NEG3 = ["dis","non","mis"]
    ETE = ["eте"]
    RE_RU = /^[а-я]+$/i
    
    class Case 
        constructor: (@word, parent) ->
            # current score
            @score = 0
            Object.update @, parent
            @level = (parent?.level or 0) + 1 # branch depth level
            @word.cases.push @
            @

        branch: (params) ->
            (new Case(@word, @)).update(params).analyze()

        update: (params) ->
            if params
                sc = @score + (params.score or 0)
                @[n] = params[n] for n of params
                @score = sc
            @

        toString: ->
            (@negation or "") + ((if @prependix then @prependix + "-" else "")) + @getForm() + ((if @flexie then ":" + @flexie else "")) + ((if @appendix then ":" + @appendix else ""))

        getForm: ->
            (@prefix or "") + ((if @complexie then "{" + @complexie + "}" else "")) + "[" + (@x or "-") + ((if not @root or (@root is @x) then "" else ("=" + @root))) + "]" + (@suffix or "")

        analyze: ->
            _reverseMatchesInTree.call @, Word.FLEXIES_TREE, op_flexify, @flexie = "" unless @flexie?
            _matchesInTree.call @, Word.PREFIXES_TREE, op_prefixize, @prefix = "" unless @prefix?
            _reverseMatchesInTree.call @, Word.SUFFIXES_TREE, op_suffixize, @suffix = "" unless @suffix?
            _matchesInTree.call @, Word.COMPLEXIES_TREE, op_complexify, @complexie = "" unless @complexie?
            @tuneRoot()

        tuneRoot: ((ev) ->
            ->
                x = @x
                if (x.length > 4) and (@word.lang is "e") and (VOWEL_PREP.indexOf(x[0]) > -1) and (x[1] is x[2])
                    @branch
                        prependix: x.substr(0, 2)
                        score: 3
                        x: x.substr(2)

                @
        )()
        
        cuttify: ->
            x = @x

            @branch negation: ch2, score: 3, x: x[2..]                 if (ch2 = x[0..1]) in NEG
            @branch negation: ch3, score: 4, x: x[3..]                 if (ch3 = x[0..2]) in NEG3
            
            @branch appendix: ch2, score: 3, x: x[0..x.length-3]   if (ch2 = x[-2..]) in APP1
            @branch appendix: "е", score: 3, x: x[0..x.length-2]   if (ch2 = x[-3..]) in ETE

            @

    constructor: (@x) ->
        @cases = []
        @info = {}
        @lang = if @x.match(RE_RU) then 'r' else 'e'
   
    analyze: (b) ->
        # initial case for word
        @top = (new Case @).update({score: 1, x: @x} ).cuttify().analyze() unless @top
        @

    toString: (sep=', ') ->
        (w.score + ":" + w for w in @cases).join sep
    
    @registry: (key, arr) ->
        @[key] = arr.intoRegistry @[key]

    @get: (x) ->
        @ALL[x] or (@ALL[x] = new Word(x))

    @ALL: {}
    
    @applyDictionaries : (data) ->
        return null unless data
        @registry 'ROOTS', data.roots
        @registry 'COMPLEXIES', data.complexies
        @registry 'FLEXIES', data.flexies
        @registry 'ROOTS_MASKS', data.root_masks
        @applyInTree "COMPLEXIES_TREE", data.complexies?.getKeys()
        @applyInTree "PREFIXES_TREE", data.prefixes?.getKeys()
        @applyInTree "SUFFIXES_TREE", data.suffixes?.getKeys().mirrorItems()
        @applyInTree "FLEXIES_TREE", (k for k of @FLEXIES).mirrorItems()
        data

    @applyInTree = (key, data) ->
        tree = @[key] or (@[key] = {})
        Object.prop tree, (v + "_").split("").join("."), v for v in data