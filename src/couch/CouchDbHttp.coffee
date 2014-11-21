# [CouchDbHttp] component:
Object.entity.define
    id: "couch.CouchDbHttp extends HttpService"
    properties: ['remote:Uri']

    methods: (_super)->
        init: ->
            _super.init.call @

        resolveHeaders: (ev)->
            'Accept': "application/json"
            'Content-Type': "application/json"

        resolveUri: (uri, ev)->
            uri.type = @remote.type
            uri.host = @remote.host
            uri.path = [].concat @remote.path, uri.path
            '' + uri

        handleEvent: (ev) ->
            ev.dataType = 'json'
            _super.handleEvent.call @, ev