
# Lexio plugin
(->
    checkYear = (t) ->
        n = t.next
        n = n.next    if n and n.kind is "s"
        if n and n.word and n.word.best.root is "год"
            t.input += " г."
            t.setNext n.next
            t.tags.push "year"
            p = t.prev
            p = p.prev    if p and p.kind is "s"
            return    unless p
            if p.tags.indexOf("date") + 1
                p.input += "-" + t.input
                p.year = t.id
                p.setNext t.next
            if MONTH_ROOTS.indexOf(Object.get(p, "word.best.root")) + 1
                p.input += "-" + t.input
                p.year = t.id
                p.setNext t.next
                p.tags.push "label", "date", "month"
        return


    checkDate = (t) ->
        n = t.next
        n = n.next    if n and n.kind is "s"
        if n and n.word and (MONTH_ROOTS.indexOf(Object.get(n, "word.best.root")) + 1)
            t.input += "-" + n.input
            t.setNext n.next
            t.year = CURR.getFullYear()
            t.tags.push "label", "date"
        return

    _op = (t) ->
        if t.kind is "d"
            w = 3    if checkYear(t)
            checkDate t
        return

    CURR = new Date()
    Object.entity.define "lexio/plugin/dates extends lexio/Plugin",
        methods: (_super) ->
            
            # implementation of perform on event
            performImpl: (err, ev) ->
                ev.eachToken _op
                return

    return
)()
