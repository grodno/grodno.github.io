Object.entity.define 

    id:"lexio.plugin.Numesida extends lexio.Plugin"
      
    methods: (_super) ->

        prepare: (event)->
            #event.eachElt @, (elt)->
            #    @splitSentences elt if elt.kind is 'text'
                
            event.rootElt.eachChildInDeep @, (elt)->
                @splitWords elt if elt.kind is 'text'

        splitSentences: (elt)->
            
            pastLastIndex=0

            s = elt.text

            re = ///\.\s///g

            while (e = re.exec(s)) 
                index = elt.index + e.index
                found = true
                #text
                if e.index and (text = s[pastLastIndex..e.index-1])
                    elt.home.register index, new TextLexion
                        text: text+'.'
                        parent: elt

                pastLastIndex = re.lastIndex
                
            if pastLastIndex
                elt.kind='box'
                if (text = s[pastLastIndex..])
                    elt.home.register pastLastIndex, new TextLexion
                        text: text
                        parent: elt
                

        splitWords: (elt)->
            
            pastLastIndex=0

            s = elt.text

            re = /\W+/g
            
            re2 = ///\b
                \d{1,3}
                (?:
                    
                    ( ([,\x20]\d{3,3})* (\.\d{1,})?)
                   |
                    ( (-\d{1,7})+)
                   |
                    \d+
                )?
                ///g

            elt.executeRegExp re, (text, e) ->
                
                if e
                    punkts = text.split('')
                    for p in punkts
                        new Lexion 
                            kind: if p is ' ' then 's' else 'p'
                            tag:'i'
                            text: p
                            parent: elt
                
                else
                    new Lexion
                        tag: 'span'
                        kind:'word'
                        text: text
                        parent: elt
 