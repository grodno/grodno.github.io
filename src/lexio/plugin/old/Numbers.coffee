# Lexio plugin
(->

    checkFactor = (t) ->
        n = t.next
        n = n.next    if n and n.kind is "s"
        if n and FACTORS[n.id]
            Object.update t, FACTORS[n.id]
            t.input += " " + n.input
            t.setNext n.next
        t.setNext n.next.next    if t.next and t.next.id is "."
        return

    checkMeasures = (t) ->
        n = t.next
        n = n.next    while n and ("er".indexOf(n.kind) is -1)
        return    unless n
        k = Object.get(n.word, "best.root") or n.id
        if MEASURES[k]
            Object.update t, MEASURES[k]
            t.input += " " + t.measure
            t.setNext n.next
        else
            n2 = n.next
            n2 = n2.next    while n2 and ("er".indexOf(n2.kind) is -1)
            return    unless n2
            k2 = Object.get(n2.word, "best.root") or n2.id
            m = (MEASURES[k + "_" + k2] or MEASURES[k2 + "_" + k])
            if m
                Object.update t, m
                t.input += " " + t.measure + ((if t.measureSpec then ("<sup>" + t.measureSpec + "</sup>") else ""))
                t.setNext n2.next
        return

    checkFlexie = (t) ->
        n = t.next
        n = n.next    if n and n.kind is "s"
        n = n.next    if n and n.id is "-"
        if n and FLEXIES[n.id]
            Object.update t, FLEXIES[n.id]
            t.input += "-" + t.flexie
            t.setNext n.next
        return

    checkPrefix = (t) ->
        p = t.prev
        if p and ("er".indexOf(p.kind) + 1)
            if p and PREFIXES[p.id]
                Object.update t, PREFIXES[p.id]
                t.input += " " + t.measure
                t.setPrev p.prev
                return
            if "er".indexOf(p.kind) + 1
                p.input = (p.id += t.id)
                p.kind = "a"
                t.remove()
                return

    _op = (t) ->
        if t.kind is "d"
            
            #join separated by dot or comma
            n2 = Object.get(t.next, "next")
            if n2 and (".,".indexOf(t.next.id) + 1) and (n2.kind is "d")
                t.input = (t.id += "." + n2.id)
                t.setNext n2.next
            t.tags.push "label", "numeric"
            checkFlexie t
            checkFactor t
            checkMeasures t
            checkPrefix t
        return

    Object.entity.define "lexio/plugin/numbers extends lexio/Plugin",
        methods: (_super) ->
            
            # implementation of perform on event
            performImpl: (err, ev) ->
                ev.eachToken _op
                return

    return
)()