#-----------------------------------------------------------------------------
#
# Axiod UI: Submit, fields and related
#
#-----------------------------------------------------------------------------

# The UI [submitSupport] Property.
Object.entity.defineProperty
    id:"SubmitSupport"
    mixin: (_super) ->
        
        RE_TILDA = /~/g
        
        validateFields: ->
            ev = stack: []
            valid = true
            if @fields
                for f in @fields
                    ev0 = Object.entity.get(f).checkIfValid()
                    ev.stack.push.apply ev.stack, ev0.stack    if ev0.stack.length
                    
                unless valid = not (ev.stack.length)
                    firstInput.domNode.focus() if firstInput = ev.stack[0].entity.valueElt
                    @error ev
            valid
    
        fieldsValues: ->
            r = {}
            Object.prop r, key.replace(RE_TILDA, "."), Object.entity.get(key).getValue() for key in @fields if @fields
            Object.prop r, key.replace(RE_TILDA, "."), window.document.getElementById(key).value for key in @inputs if @inputs
            r
    
        getFields: ->
            r = {}
            r[key] = Object.entity.get(key) for key in @fields if @fields
            r

        # creates onload handler for hidden iframe
        create_onload_handler: ->
            T = this
            (ev) ->
                return unless T.frameElt
                frame = T.frameElt.domNode
                doc = frame.contentDocument
                win = frame.contentWindow or doc.window or frame # f..ing IE8
                return if win.location.href is "about:blank"
                err = null
                value = Object.parse(doc.body.innerText or doc.body.textContent or doc.body.innerHTML)
                value = errors: [reason: "server_error"]    unless value
                err = stack: value.errors    if value.errors and value.errors.length
                T.onResult err, value

        onResult: (err, value) ->
            if err then @error err else @success value

        error: (err) -> Object.dom.handleError err, @

        success: (x) -> x


# [AsyncButton] UI component:
Object.entity.define
    id: "AsyncButton extends Button"
    properties: ["support:SubmitSupport"]
    
    busyCaption: "in_progress"
    methods: (_super) ->
        createAsyncDoc: -> @fieldsValues()
    
        async: -> @validateFields() and @createAsyncEvent() #UI.hideAlert() &&
    
        createAsyncEvent: ->
            uri: @asyncUrl
            doc: @createAsyncDoc()
            callback: @createAsyncCallback()
    
        createAsyncCallback: -> @onResult

# UI [Form] component:
Object.entity.define 
    id: "Form extends Box"
    properties: ["disabled:Disabled","support:SubmitSupport"]
    
    domNodeType: "form"
    domNodeAttrs:
        onsubmit: -> false

    submit: ->
        @domNode.submit()

# UI [SubmitForm] component:
Object.entity.define 
    id:"SubmitForm extends Form"
    enctype: "application/x-www-form-urlencoded"
    method: "post"
    action: "#"
    methods: (_super) ->
        init: ->
            T = this
            id = @id
            @domNode = Object.dom.createComplexElement(String.format("<form enctype=\"{0}\" method=\"{1}\" target=\"{2}_target\" action=\"{3}\"></form>", @enctype, @method, @id, @action), @domNodeAttrs)    unless @domNode
            Object.dom.listenEvents this, "submit", ->
                T.validateFields()

            _super.init.call this
            @createChild
                referrer: [@,"frameElt"]
                id: id + "_target:View"
                domNode: Object.dom.createComplexElement("<iframe src=\"about:blank\" style=\"display:none;\" name=\"#{@id}_target\"></iframe>")
                , (err, e) ->
                    # IE8
                    e and Object.dom.listenEvents(e, "load", @create_onload_handler())
                    return
                
        childrenAdapter: (ch) ->
            [].concat ch

# UI [SubmitButton] component:
Object.entity.define 
    id:"SubmitButton extends View"
    methods: (_super) ->
        init: ->
            @domNode = Object.dom.createComplexElement("<input type=\"submit\"/>", value: String.localize(@caption) )
            _super.init.call @


# UI [FileUploader] field:
Object.entity.define 
    id: "FileUploader extends Field"
    properties: ["attempt", "submitSupport:submitSupport"]
    
    methods: (_super) ->
        init: ->
            @domNode = Object.dom.createComplexElement(String.format("<form enctype=\"multipart/form-data\", method=\"post\" target=\"{0}_target\" action=\"{1}\"></form>", @id, @action), @domNodeAttrs)
            _super.init.call this
            Object.dom.listenEvents @frameElt, "load", @create_onload_handler()
            return

        childrenAdapter: (ch) ->
            id = @id
            _super.childrenAdapter.call this, [
                {
                    referrer: [@,"valueElt"]
                    id: id + "_input:View"
                    domNode: Object.dom.createComplexElement(String.format("<input type=\"file\" class=\"{0}\" name=\"{1}\"/>", @valueStyle, @fileFieldName or id),
                        onchange: @create_onchange_handler()
                    )
                }
                {
                    referrer: [@,"linkElt"]
                    id: id + "_link:View"
                    domNodeType: "a"
                    domNodeAttrs:
                        target: "_blank"
                }
                {
                    referrer: [@,"frameElt"]
                    id: id + "_target:View"
                    domNode: Object.dom.createComplexElement("<iframe src=\"about:blank\" style=\"display:none;\" name=\"#{@id}_target\"></iframe>",
                        onload: @create_onload_handler()
                    )
                }
            ].concat(ch)

        submit: ->
            @domNode.submit()

        create_onchange_handler: ->
            (ev) ->
                true

        error: (ev) ->
            ev.alertEntity = @linkElt
            _super.error.call @, ev

        success: (ev) ->
            url = "" + (ev and ev.uri or "")
            if url
                a = @linkElt.domNode
                a.className = ""
                a.innerHTML = "link"
                @setValue a.href = "//" + url
            @prop "attempt", 1 + (@prop "attempt" or 0)

###
UI field ancestor.
###
Object.entity.define 
    id:"Field extends Box"
    properties: ["caption:Caption","value:Value","disabled:Disabled"]
    children: []
    caption: ""
    style: "control-group"
    valueBoxStyle: "controls"
    valueStyle: "input-xlarge"
    captionStyle: "control-label"
    helpStyle: "help-block"
    methods: (_super) ->
        init: ->
            # normalize caption obtained from id with '.'
            @caption = @caption or @id?.split(".")[-1]
            _super.init.call this

        childrenAdapter: (ch) ->
            T = this
            if not ch or not ch.length
                ch = [
                    id:  @id + "_input:View"
                    referrer: [
                        this
                        "valueElt"
                    ]
                    style: @valueStyle
                    alive: true
                    tapped: (ev) ->
                        T.doFocus ev
                ]
            if @help
                ch.push
                    id: "Label"
                    domNodeType: "p"
                    style: @helpStyle
                    caption: @help
                    referrer: [
                        this
                        "helpElt"
                    ]

            [
                {
                    referrer: [
                        this
                        "captionElt"
                    ]
                    id: @id + "_label:Label"
                    
                    #domNodeType:'label',
                    #style:this.captionStyle
                    domNode: Object.dom.createComplexElement(String.format("<label class=\"{0}\" for=\"{1}_input\"/>", @captionStyle, @id))
                }
                {
                    id: "Box"
                    style: @valueBoxStyle
                    children: ch
                }
            ]

        launchEditor: Function.NONE
        doFocus: (ev) ->
            @launchEditor ev
            return

        isEditable: ->
            not @readOnly

        valueChanged: (ev) ->
            @redrawValue()
            return

        
        # invoked when value changed
        redrawValue: ->
            @valueElt.domNode.innerHTML = @getCValue() if @valueElt
            @domNodeClass "!error"
            return

        doneEditor: (ev) ->
            value = ev.value
            return    if value is @getValue()
            ev.fromUI = true
            @setValue ev
            return

        
        # @add validation rule to be checked from this.checkIfValid()
        addValidationRule: (rule) ->
            @rules = (@rules or []).concat(rule)
            return

        # @check if field has some errors
        # @param err - error object like {stack:[{reason,message}]}
        checkIfValid: ->
            err = stack: []
            if @isValueRequired() and @isEmptyValue()
                err.stack.push
                    reason: "empty_required_field"
                    message: String.localize("empty_required_field", String.localize(@caption or @id))

            rule.call @, err for rule in @rules if rules
            valid = not (err.stack.length)
            e.entity = @ for e in err.stack unless valid
            @toggleDomNodeClass "error", not valid
            err

        isValueRequired: -> @valueRequired

        getCValue: -> @getValue()

        getCaptionHtml: (v, ev) -> String.localize(v or @id) + ((if @valueRequired then " <span class=\"required\">*</span>" else ""))

        disabledChanged: (ev, v) -> 
            _super.disabledChanged.apply this, arguments_
            Object.prop @, "valueElt.domNode.disabled", v


# UI Text input field base:
Object.entity.define
    id: "Input extends Field"
    alive: true
    maxLength: 128
    inputTag: "input"
    inputType: "text"
    methods: (_super) ->
        childrenAdapter: (ch) ->
            ch = @getInputChildrenMeta()
            _super.childrenAdapter.call this, ch

        getInputChildrenMeta: (ch) ->
            [
                id: @id + "_input:View"
                domNode: @create_inputNode()
                style: @valueStyle
                referrer: [
                    this
                    "valueElt"
                ]
            ]

        create_inputNode: ->
            _done = @create_onblur_handler()
            Object.dom.createComplexElement String.format("<{0} type=\"{1}\" name=\"{2}\" maxLength=\"{3}\"/>", @inputTag, @inputType, @id, @maxLength), Object.update(
                placeholder: String.localize(@placeholder)
                onblur: _done
                onfocusleave: _done
                onkeydown: @create_onkeydown_handler()
            , @inputNodeAttrs)

        create_onblur_handler: ->
            T = this
            (ev) ->
                T.doneEditor value: @value
                true

        create_onkeydown_handler: ->
            T = this
            (ev) ->
                ev = ev or window.event
                T.doneEditor value: @value if ev.keyCode is 13
                true
    
        # invoked when value changed
        redrawValue: ->
            @valueElt?.domNode.value = @getValue() 
            @domNodeClass "!ui-error"

        tapped: (ev) ->
            @valueElt?.domNode.focus()


# UI text input field:
Object.entity.define
    id: "Textarea extends Input"
    inputTag: "textarea"
    maxLength: 8192


# UI text input field:
Object.entity.define
    id: "PasswordInput extends Input"
    inputType: "password"


# UI dropdown field:
Object.entity.define
    id: "Dropdown extends Input"
    properties: ["data"]
    alive: true
    
    methods: (_super) ->
        getInputChildrenMeta: (ch) ->
            [
                referrer: [
                    this
                    "valueElt"
                ]
                id: @id + "_input:View"
                domNodeType: "select"
                style: @valueStyle
                domNodeAttrs:
                    onchange: @create_onchange_handler()
            ]

        tapped: (ev) ->
            @valueElt and @valueElt.domNode.focus()
            return

        create_onchange_handler: ->
            T = this
            (ev) ->
                T.doneEditor value: T.data[@selectedIndex].id
                true

        op_options: ((v, i) ->
            v._pos = i
            if @valueElt
                is_ = v.id is @value
                @valueElt.domNode.options[i] = new Option(v.name, v.id, is_, is_)
            return
        ).iterator()
        dataChanged: (ev, v) ->
            _super.dataChanged.apply this, arguments_
            @valueElt.domNode.options.length = 0
            @op_options v, this
            return

        redrawValue: ->
            if @data and @valueElt
                d = Array.findByAttr(@data, @value, "id")
                @valueElt.domNode.selectedIndex = (if d then d._pos else 0)
            return


# UI checkbox field:
Object.entity.define
    id: "Checkbox extends Field"
    captionStyle: "checkbox"
    childrenAdapter: (ch) ->
        T = this
        _done = (ev) ->
            T.doneEditor value: !!@checked
            true

        [
            {
                id:"box"
                style: @valueBoxStyle
                children: [
                    {
                        id:"Label"
                        style:@captionStyle
                    }
                    {
                        id: "View"
                        referrer: [@,"valueElt"]
                        domNodeType: "input"
                        style: @valueStyle1
                        domNodeAttrs:
                            onchange: _done
                            type: "checkbox"
                            value: true
                            disabled: @disabled
                            checked: !!@getValue()
                    }
                    {
                        referrer: [@,"captionElt"]
                        id: "View"
                        domNodeType: "span"
                        css1: "display:inline;padding-left:8px"
                    }
                ]
            }
        ]

    
    # invoked when value changed
    redrawValue: ->
        @valueElt.domNode.checked = !!@getValue()    if @valueElt
        return


# UI [fieldset] component:
Object.entity.define
    id: "Fieldset extends Box"
    domNodeType: "fieldset"
    childrenAdapter: (ch) ->
        # add legend on top of children:
        ch.unshift(
            id: @id + "_label:Label"
            domNodeType: "legend"
            style: @captionStyle
            caption: @caption
        )
        ch

