Object.entity.define 

    id:"lexio.plugin.Charlie extends lexio.Plugin"
    requires:[
        'gsheet://1FNyFDeXG68gTfCbWr1gno3KykcUGvH_SXOqrjl1wZhQ/chars'
    ]    
    methods: (_super) ->
        
        newChar = (ch, prev, i) ->
            e = new Lexion
                body: ch
                index: i
                prev: prev
                
            prev?.next = e
            e
            
        onRequiredLoaded: (chars)->
            @chars =chars.getKeys()
            
        prepare: (text)->
            #text.registry = ((char: prev = newChar(ch, prev,i)) for i, ch of text.input)