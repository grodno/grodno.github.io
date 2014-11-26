# Morphological analysis.
Object.entity.define 
    id : "lexiomated.plugin.Morpheus extends lexiomated.Plugin"
    requires: [
        'gsheet://1FNyFDeXG68gTfCbWr1gno3KykcUGvH_SXOqrjl1wZhQ/chars'#chars
        'gsheet://1JBxZVPj4pbHVlywPd9YzXyAVUrliAnOfFQ5zW57zoBA'#en
        'gsheet://0AqQx4KOOt8TGdExjQ2ZJM0Q5MFBQSVRhYUw1ZHJMSFE'#ru
    ]
    methods: (_super) ->

        onRequiredLoaded: (err, count, chars) ->
            Word.registry 'CHARS', chars
            Word.applyDictionaries e for e, i in arguments when i>2 

        # handles text event passed 
        analyze: (event) ->
            event.eachMatched 'word', (e)-> 
                
                w = e.word = Word.get(e.text).analyze()
                e.setAttr('title', w) 
                e.flags['lx'+e.text.length] = 1
