#parse HTML markup
Object.entity.define 

    id:"lexio.plugin.Tokio extends lexio.Plugin"
    methods: (_super) ->
        
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

        prepare: (event)->
            
            root = event.rootElt = new Lexion
                kind:'root'
                tag: 'article'
                text: event.input.trim().replace(/\n/g,'').replace(/\s+/g,' ')
            
            stack = [root]

            re = ///<
                #closing tag slash
                (\/?) 
                #tag
                ([a-z]{1,7}) 
                #attributes
                ((?:
                \s+[a-z][a-z0-9\-]+
                (?:=(?:[a-z0-9\-]+ | "?[^>"]*"?))?
                )*)
                #single tag slash
                (\/?) 
                >
            ///gi;

            root.executeRegExp re, (text, e) ->
                
                if e # match
                    tag = e[2].toLowerCase()

                    if e[1] is '/' 
                        #closing tag
                        if tag is stack[0].tag and stack.length>1
                            stack.shift()
                      
                    else 
                        opts = 
                            tag: tag
                            attrs: e[3]
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
                    if text = text.trim()
                        new Lexion
                            kind: 'text'
                            tag: 'span'
                            text: text
                            parent: stack[0]
