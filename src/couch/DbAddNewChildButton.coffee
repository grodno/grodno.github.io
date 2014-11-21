Object.entity.define
    id:'couch.DbAddNewChildButton extends couch.DbAddNewButton'
    properties: ['parentId']
    methods: (_super) ->

        createAsyncEvent: ->
            ev = _super.createAsyncEvent.call @
            # update with parent id
            doc.parent = pId if (doc = ev.doc) and (pId = @prop 'parentId')
            ev

                        

                         