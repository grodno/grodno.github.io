# [CouchDb] component:
Object.entity.define
    id: "couch.CouchDb",
    properties: ['touch:Number', "sync", 'ddoc']

# default endpoint
    remote: 'http://127.0.0.1:5984/default'

    ddoc: {
        "_id": "_design/common",
        "language": "javascript",
        "views": {
            "kind": {
                "map": "function(doc) { \n\tif (!doc.disabled){\n\t\tvalue = {id:doc._id, kind: doc.kind, name: doc.name, logo:doc.logo}\n\t\temit([doc.kind, doc._id], value) \n\t}\n}"
            },
            "tree": {
                "map": "function(doc) { \n\tif (!doc.disabled){\n\t\tvalue = {id:doc._id, kind: doc.kind, name: doc.name, logo:doc.logo}\n\t\temit([doc._id, null], value) \n\t\tif (doc.parent) { \n\t\t\temit([doc.parent, doc.ts || 1], value) \n\t\t}\n\t}\n}"
            }
        }
    }

    methods: (_super) ->
        
        _qEq1 = (key)-> "startkey=[\"#{key}\",null]&endkey=[\"#{key}\",\"\ufff0\"]"


        launch: (cb) ->
            _super.launch.call @, cb

            Object.entity.create
                id: "remote#{@id}:couch.CouchDbHttp"
                remote: @remote
                ,
                (err, obj)=>
                    @remoteService = obj
                    @checkIfDbExists()

        done: ->
            @remoteService?.done()
            _super.done.call @

        onEvent: (ev, u = ev.uri) -> @[u.host](ev, u, u.path[0])

        doc: (ev, u, docId)->
            ev.uri = "remote#{@id}://*/#{docId}"
            Object.event.fire ev

        put: (ev, u, docId)->
            ev.callback? Object.error('empty: No doc to put into db').log() unless ev.doc

            ev.doc._id = docId if docId
            ev.doc._id = Object.math.uuid() unless ev.doc._id

            Object.update ev,
                uri: "remote#{@id}://*/#{ev.doc._id}"
                method: 'put'
                payload: ev.doc

            Object.event.fire ev, (err, result)=>
                @prop "#{ev.doc.kind}Touch", @incrementTouch() unless err
                ev.callback? err, result

        bulk: (ev, u, newEdits = false)->
            ev.newEdits = newEdits if newEdits

            Object.update ev,
                uri: "remote#{@id}://*?new_edits=#{ev.newEdits}"
                method: 'post'
                payload: ev.docs

            Object.event.fire ev, ev.callback

        all: (ev, u, kind)->
            ev.uri = "#{@_viewBase()}kind?include_docs=true&#{_qEq1 kind}"
            Object.event.fire ev,
                (err, out)->
                    data = out?.rows and (e.doc for e in out.rows) or []
                    ev.callback err, data

        kind: (ev, u, kind)->
            ev.uri = "#{@_viewBase()}kind?#{_qEq1 kind}"
            Object.event.fire ev,
                (err, out)->
                    data = out?.rows and (e.value for e in out.rows) or []
                    ev.callback err, data

        _viewBase: (ddoc = 'common')-> "remote#{@id}://*/_design/#{ddoc}/_view/"

        tree: (ev, u, parentId)->
            kind = u.path[1]
            ev.uri = "#{@_viewBase()}tree?#{_qEq1 parentId}"
            Object.event.fire ev,
                (err, out)->
                    r = []
                    for e in data = out?.rows or [] when v = e.value
                        if e.key[1] is null
                            parent = v
                        else
                            if not kind or (v.kind is kind)
                                v.parentObj = parent
                                r.push v
                    ev.callback err, r

        view: (ev, u, ddoc)->
            if u.params.key
                u.params.startkey = u.params.startkey + '/'
                u.params.endkey = u.params.endkey + '0'

            ev.uri = Object.Uri.parse "#{@_viewBase ddoc}#{u.path[1]}?startkey=\"#{u.params.startkey}\"&endkey=\"#{u.params.endkey}\""

            Object.event.fire ev,
                (err, out)->
                    data = out?.rows and (e.value for e in out.rows) or []
                    ev.callback err, data

        initContent: (cb)->
            Object.event.fire
                uri: "remote#{@id}://*/#{@ddoc._id}"
                method: 'put'
                payload: @ddoc

        checkIfDbExists: ()->
            Function.perform @, (flow)->
                ops = [
                    ->
                        Object.event.fire
                            uri: "remote#{@id}://*/_design/common"
                            callback: flow.next

                    (err, r)->
                        if err
                            Object.event.fire
                                uri: "remote#{@id}://*/"
                                method: 'put'
                                callback: =>
                                    @initContent flow.next
                        else
                            flow.next()
                ]