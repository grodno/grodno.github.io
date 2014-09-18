###
==========================================================================
Axio: Localization resources.
==========================================================================
###
String.LANGUAGES = [String.LANGUAGE = "en"]     

# @returns localized (or at least normalized) version of [s]
String.localize = ((_cache, fn) ->
    _undef = undefined
    RE = new RegExp("_", "g")
    normalize = (s) ->
        String.capitalize(s).replace RE, " "

    extractVal = (v, id, lng) ->
        v = v.value or v.name or v
        (if (typeof (v) is "string") then v else (v[lng] or normalize(id)))

    _getArr = ((v, i, lng) ->
        unless v.id is "_array"
            @push Object.update(Object.clone(v),
                name: extractVal(v, v.id, lng)
            )
        return
    ).iterator()
    _getArr2 = (obj, lng) ->
        r = []
        for id of obj
            unless id is "_array"
                value = obj[id]
                r.push Object.update(Object.clone(value),
                    id: id
                    name: extractVal(value, id, lng)
                )
        r

    _localize = (l, s, q) ->
        c = _lcache(l)
        r = undefined
        r = (c[s] or normalize(s))
        (if (q isnt _undef) then (c[s + "." + q] or String.format(r, q)) else r)

    _lcache = (l) ->
        _cache[l] or (_cache[l] = {})

    fn = (s, q) ->
        (if not s then "" else _localize(String.LANGUAGE, s, q))

    fn.all = _cache
    
    # localize with {#language} in first arg
    fn.withLanguage = _localize
    
    # used to add localization bundle
    fn.addBundle = (->
        (obj, _lng) ->
            lngs = (if _lng then [_lng] else String.LANGUAGES)
            for id of obj
                val = obj[id]
                j = 0
                l = lngs.length

                while j < l
                    lng = lngs[j]
                    (_lcache(lng))[id] = (if (val and val._array) then _getArr2(val, lng) else ((if Array.isArray(val) then _getArr(val, [], lng) else extractVal(val, id, lng))))
                    j++
            obj
    )()
    fn.put = (key, value, lang) ->
        (_lcache(lang or String.LANGUAGE))[key] = value
        return
        
    createL10NSource: (version, urlTemplate, key) ->
        
        # register async listener for L10N API calls
        Object.entity.create
            id: "EventHandler:" + (key or "l10n")
            handleEvent: @createSource(
                version: version
                urlTemplate: "[remote]" + (urlTemplate or ("/l10n/l10n-{0}.js?v=" + version))
                cacheDeserializer: (str) ->
                    try
                        String.localize.addBundle (Function.call(Function, str))()
                        return true
                    catch e
                        Object.error.log "Object.parse", str, e
                    null
            )
        return
    
    # async string localization handler
    Object.entity.create
        id: "EventHandler:string"
        handleEventImpl: (ev) ->
            ev.callback null, fn(ev.uri.host)
            return

    fn
)({})
