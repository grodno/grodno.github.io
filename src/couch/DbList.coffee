Object.entity.define
    id:'couch.DbList extends D3List'
    methods:(_super)->
        dataAsyncAdapter:(err, value)->
            Object.event
                value: value?.items or value or null
                error: err

        dataChanged:(ev, data)->
            _super.dataChanged.call @, ev, data
