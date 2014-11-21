# Lexio plugin
Object.entity.define 
    id: "lexiomated.plugin.WordScore extends lexiomated.Plugin"
    methods: (_super) ->
        
        tryNormalize = (n) ->
            return    if @root
            m = @x.match(n.re)
            if m
                i = 0
    
                while i < n.patches.length
                    r = Word.ROOTS[m[1] + n.patches[i] + (m[3] or "")]
                    if r
                        @root = @x
                        @score += @x.length + (r.score or 90)
                        return
                    i++
            return
    
        _score = ->
            x = @x
            len = x.length
            lang = @word.lang
            
            return if len < 2
            
            r = Word.ROOTS[x]
            
            if r
                @root = x
                @score += len * 8 + r.score
                return
                
            sf = (@suffix or @flexie)
            
            if sf and lang is "r" and (sf in "аеяюий") and (r = Word.ROOTS[x + "й"])
                @root = r.id
                @score += len + r.score
                return
            
            if lang is "e"
                if sf and (r = Word.ROOTS[x + "e"])
                    @root = r.id
                    @score += len * 8 + r.score
                    return
                    
                if (x[len - 1] is x[len - 2]) and (r = Word.ROOTS[x.substring(0, len - 1)])
                    @root = r.id
                    @score += len * 8 + r.score
                    return
            
            return if len < 3
            
            #Function.iterate tryNormalize, NORMALIZERS[lang], c
            #return if @root
            
            if mask = Word.ROOTS_MASKS[lang + String.signature(x)]
                @root = x
                @score += len + mask.score#@token.size - 
                return

        # handles text event passed 
        analyze: (event) ->
            for k,w of Word.ALL when not w.best

                _score.call c for c in w.cases
                
                Object.math.sort w.cases, "score", -1
                w.best = w.cases[0]
                tres = w.best.score * 0.2
                w.cases = (c for c in w.cases when c.x and c.score >= tres)

