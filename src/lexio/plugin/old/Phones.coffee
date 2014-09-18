
# Lexio plugin
(->
    _op = (t) ->
        if t.kind is "d"
            next2 = Object.get(t.next, "next")
            while 0 and next2 and ("- ()".indexOf(t.next.id) + 1) and (next2.kind is "d")
                t.input = t.id = (t.id += "" + next2.id)
                t.setNext next2.next
                next2 = Object.get(t.next, "next")
            p = t.prev
            if p and p.id is "+"
                t.input = t.id = "+" + t.input
                t.setPrev p.prev
            t.input = t.id = "+375" + t.id.substring(2)    if t.id.length is 11 and t.id.substring(0, 2) is "80"
            t.input = "+(" + t.id.substring(1, 4) + ")" + (t.id.substring(4, 6)) + "-" + t.id.substring(6)    if t.id[0] is "+"
        return

    Object.entity.define "lexio/plugin/phones extends lexio/Plugin",
        methods: (_super) ->
            
            # implementation of perform on event
            performImpl: (err, ev) ->
                ev.eachToken _op
                return

    return
)()
