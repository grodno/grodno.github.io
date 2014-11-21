Object.entity.define
    id:'couch.DbForm extends View'
    properties: ["value:Values"]
    
    domNodeChanged: (ev, domNode)->
        Object.dom.listenEvents @, "submit", (e)=> 
            @submitDataToDb()
            Object.dom.stopEvent(e)

    submitDataToDb:()->
        Object.event.fire 
            uri:"db://put"
            doc: @prop 'value'