Object.entity.define 

    id:"lexio.plugin.SplitText extends lexio.Plugin"
      
    methods: (_super) ->
        
        op = (text, e) ->
            new Lexion
                tag: if e then 'i' else 'span'
                kind: if e then (if text is ' ' then 'space' else 'sign') else 'word'
                text: text
                parent: @sourceElt
                        

        # handles text event passed 
        handleEvent: (event) ->
            event.rootElt.eachChildInDeep @, (elt)->
                elt.executeRegExp /[^a-zа-я]/gi, op if elt.kind is 'text'#,;-~!'"@#$%^&*\(\)\[\]\{\}\|\\\/?=+
