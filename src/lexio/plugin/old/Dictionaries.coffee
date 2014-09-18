Object.entity.define 
    id : "lexio.plugin.Dictionaries extends lexio.Plugin"
                            
    requires: [
        'gsheet://0AqQx4KOOt8TGdExjQ2ZJM0Q5MFBQSVRhYUw1ZHJMSFE'
        'gsheet://0AqQx4KOOt8TGdEFhUExMU3ZsaVl3RDBiWXhtcWVDZ2c'
    ]
    
    methods: (_super) ->
        _reg = ((v, p) ->
            this[v.id] = v
            ids = v.ids
            if ids
                ids = ids.split(",")
                i = 0
    
                while i < ids.length
                    this[ids[i]] = v
                    i++
            return
        ).iterator()
        registry = ((v) ->
            key = v.toUpperCase()
            _reg this[v], String[key] or (String[key] = {})
            return
        ).iterator()
        enums = ((v) ->
            key = v.key.toUpperCase()
            b = String[key] or (String[key] = {})
            b[v.id] = v.value
            return
        ).iterator()
        Array::mirrorItems = ->
            ((v) ->
                @push v.mirror("")
                return
            ).iterator() this, []
    
        treeGenerator = ((v) ->
            Object.set this, (v + "_").split("").join("."), v
            return
        ).iterator()
        addIntoTree = (key, data) ->
            treeGenerator data, String[key] or (String[key] = {})
    
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
                    r += (String.CHARS[c] or TYPE_U).type
                    p = c
                i++
            r
    
        applySourceData = (data) ->
            registry [
                "chars"
                "roots"
                "complexies"
                "hardcoded"
                "chars"
                "root_masks"
            ], data
            enums data["~"]
            data.complexies and addIntoTree("COMPLEXIES_TREE", data.complexies.getKeys())
            data.prefixes and addIntoTree("PREFIXES_TREE", data.prefixes.getKeys())
            data.suffixes and addIntoTree("SUFFIXES_TREE", data.suffixes.getKeys().mirrorItems())
            data.flexies and addIntoTree("FLEXIES_TREE", data.flexies.getKeys().mirrorItems())
            return
            
            onRequires: (sources) ->
                Function.iterate applySourceData, Array.slice(arguments_, 2), T.home

            init: ->
                _super.init.call this
                T = this
                return

            
            # implementation of perform on event
            perform: (err, ev) ->
                ev
