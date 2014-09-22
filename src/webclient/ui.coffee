###
Axio: Web DOM API. 
###

Object.dom = ((_win) ->
    
    _doc = _win.document
    
    _createEvent = (evt) ->
        r = {}
        e = undefined
        if _win.event
            r.internal = _win.event
            r.target = e = _win.event.srcElement
        else
            r.internal = evt
            e = evt.target
            e = e.parentNode while e and e.nodeType isnt 1
            r.target = e
        e = e.parentNode while e and not e.entity
        r.entity = e and e.entity
        r

    _ALIVE_EVENTS_KEYS = [
        "mousedown"
        "mouseup"
        "click"
        "mousemove"
        "mouseover"
        "mouseout"
    ]
    _ALIVE_HANDLER = (ev0) ->
        T = this
        unless T.disabled
            ev = _createEvent(ev0)
            type = ev.internal.type
            switch type
              when "mousedown"
                    T.updateClass T.stylePressed if T.stylePressed
                    
                    #_lastTouchedEntity=evt.entity;
                    T.touchBegin and T.touchBegin(ev)
              when "mouseup"
                    T.touchEnd and T.touchEnd(ev)
                    T.updateClass "!" + T.stylePressed if T.stylePressed
              when "click"
                    T.tapped and T.tapped(ev)
              when "mousemove"
                    T.mouseMove and T.mouseMove(ev)
              when "mouseover"
                    T.updateClass T.styleHovered if T.styleHovered
                    T.mouseOver and T.mouseOver(ev)
              when "mouseout"
                    T.mouseOut and T.mouseOut(ev)
                    T.updateClass "!" + T.styleHovered if T.styleHovered
        true

    #creates UI event
    document: _win.document
    createEvent: _createEvent
    
    # common styles
    STYLE_LINE_FIXED : "overflow:hidden;white-space:nowrap;cursor:pointer;"
    STYLE_TEXTLINE : "white-space:nowrap;line-height:1.5em;vertical-align:middle;"
    
    # creates a new DOM Element
    createElement: (type="DIV", attrs) ->
        Object.update _doc.createElement(type), attrs

    createComplexElement: (tag, attrs) ->
        
        # hack for type set on IE8
        div = @DOM_FACTORY or (@DOM_FACTORY = _doc.createElement("div"))
        div.innerHTML = tag
        r = div.firstChild
        div.removeChild r
        Object.update r, attrs

    appendToHead: (el) ->
        fjs = _doc.getElementsByTagName("head")[0]
        fjs.appendChild el

    appendCss: (href) -> @appendToHead @createElement "link", rel: "stylesheet", href: href

    # finds a DOM Element from parent
    getElementById: (id) -> _doc.getElementById(id) or null

    # removes a DOM Element from parent
    removeElement: (e) -> e?.parentNode?.removeChild e 

    # makes entity view alive
    alive: (T) ->
        @listenEvents T, _ALIVE_EVENTS_KEYS, (ev0) ->
            _ALIVE_HANDLER.call T, ev0

    # bind handler for entity DOM event
    listenEvents: (T, key, fn, fl) ->
        node = (if T then T.domNode else _doc)
        keys = (if key.split then key.split(" ") else key)
        for key in keys
            if node.addEventListener
                node.addEventListener key, fn, fl #, false
            else
                node.attachEvent "on" + key, fn, fl
        node

    # stops event bubbling
    stopEvent: (ev) ->
        e = ev?.internal
        e?.stopPropagation?()
        e?.cancelBubble = true

    # returns size of client viewport
    isKeyboardCode: (ev = _win.event or {}, code) -> ev.keyCode is code or ev.charCode is code or ev.which is code

    KEY_CODE:
        ESCAPE: 27
        ENTER: 13
        TAB: 8

    # returns size of client viewport
    viewportSize: ->
        scr = _win.screen
        width: scr.availWidth
        height: scr.availHeight

    # returns total offset of element 
    getTotalOffset: (p) ->
        r =
            top: 0
            left: 0
            width: p.clientWidth
            height: p.clientHeight

        while p
            r.top += p.offsetTop - p.scrollTop
            r.left += p.offsetLeft - p.scrollLeft
            p = p.offsetParent
        r

    # UI error handler
    handleError: (err) -> Object.error(err).log()

    # sets/remove class for elt. 
    # Classes to remove have to be prefixed with '!' sign.
    updateClass: (elt, delta) ->
        return elt unless elt and delta

        clss = elt.className.split(" ")
        delta = delta.split(" ")
        
        for cl in delta
            if cl
                if cl[0] is "!"
                    if cl is "!*"
                        clss = []
                    else
                        clss[p] = "" if (p = clss.indexOf(cl[1..]))>-1
                else
                    clss.push cl unless cl in clss
        elt.className = (cl for cl in clss when cl).join(' ')
        elt

) @


###
Basic Dom UI properties.
###

# property The [domNode] property of view
# related entity attributes:
# @attr domNodeType - DOM node tag 
# @attr domNodeAttrs - DOM node attributes
# @attr alive - force DOM event listening
Object.entity.defineProperty 
    id:"Node"
    methods: ->

        # first value init
        init: (T, defs) ->

            # create if none
            unless (node = defs.domNode)
                attrs = {}
                attrs.id = T.id if T.id isnt T._id
                node =  Object.dom.createElement(T.domNodeType, Object.update(attrs, T.domNodeAttrs))
            
            # children appended to 
            T.domNode = T.contentNode = node
            
            # back reference
            node.entity = T
            
            # make alive if needed
            Object.dom.alive T if T.alive
            
            unless node.parentNode?.parentNode
                if T.nextNode
                    T.nextNode.insertBefore(node)
                else
                    T.parentEntity?.contentNode.appendChild node  
            
            T.addFinalizer @done

        # done property with entity instance
        done: (T) ->
            return unless e = T.domNode
            
            Object.dom.removeElement e
            e.entity = null
            T.domNode = null
            T.contentNode = null

# @property The [style] property of view
# related entity attributes:
# @attr css - custom DOM node style 
Object.entity.defineProperty 
    id: "Style"
    methods:  ->
    
        # @init 
        init: (T, defs) ->
            r = T.domNode
            r.style.cssText += T.css if T.css
            Object.property.bind T, @id, defs.styleExpression if defs.styleExpression
            T.domNodeClass (defs.style or "") + " " + (r.className or "")

        #@get value getter.
        getter: (T) -> T.domNode.className

        #@setter value
        setter: (T, v, ev) ->
            if typeof v is "string" then T.domNodeClass v else T.domNodeStyle v

    mixin: (_super) ->
    
        # Sets UI style attributes
        domNodeStyle: (delta) ->
            return st unless (st = @domNode.style) and delta
            st[n] = v for n, v of delta when st[n] isnt v
            st

        # Updates UI style class
        domNodeClass: (delta) -> Object.dom.updateClass @domNode, delta

        # Sets/Unsets UI style class
        toggleDomNodeClass: (cl, flag) -> Object.dom.updateClass @domNode, ((if flag then cl else ("!" + cl)))

# @property The [hidden] property of view
# related entity attributes:
# @attr displayType - type of display: 'inline', 'block', 'inline-block'
Object.entity.defineProperty 
    id: "Hidden", 
    methods:  ->
        getter: (T) -> T.domNode.style.display is "none"
        setter: (T, v) -> T.domNode.style.display = (if v then "none" else (@displayType or ""))
            
    mixin:  (_super) ->
    
        # Sets an Element "display" flag.
        display: (f, bForceParents) ->
            @setHidden not f
            if f and bForceParents and (p = @)
                p.display f while (p = p.parentEntity)
            @

        # switches an Element "display" flag.
        switchDisplay: -> @setHidden not @isHidden()

        #  is hidden
        isHidden: () -> @prop "hidden"

        # sets an Element "display" flag.
        setHidden: (f) -> @prop "hidden", f

# @define The [caption] property.
Object.entity.defineProperty 
    id: "Caption"
    methods: ->
    
        # setter
        setter: (T, v='', ev) ->
            T[@id] = v
            e = T.getCaptionElt()
            hidden = (v is "none")
            if e
                e.display not (e.hidden or hidden)
                v = T.getCaptionHtml(v, ev)
                try
                    e.domNode.innerHTML = (if (hidden or not v) then "" else v)
                catch 
                    Object.error(_error, "Caption").log()

        # value comparator
        comparator: Function.FALSE

    # patches entity type attached to
    mixin: (_super) ->
        getCaptionElt:  -> @captionElt or @
    
        getCaptionHtml: (v, ev) ->  ((if (icon = @prop 'icon') then '<i class="icon-#{icon}"></i> ' else "")) + String.localize(v, ev.quantity)


# @define The [html] property.
Object.entity.defineProperty  
    id: "Html" 
    methods:(_super) ->
        
        # Sets property value asyncly.
        setValueAsync: (T, ev, asyncUrl) ->
            @setter T, (T.asyncPlaceholder or null), ev
            _super.setAsyncValue.call this, T, ev, asyncUrl
    
        getter: (T) -> T.contentNode?.innerHTML
    
        # setter
        setter: (T, v="<div>&nbsp;</div>") ->
                try
                    throw v.error if v?.error
                    T.contentNode.innerHTML = v
                catch 
                    msg = String.localize("html_error")+": " + _error.message
                    T.contentNode.innerHTML = "<div style='color:red;'>#{msg}</div>"

# @define UI [disabled] Property
Object.entity.defineProperty  
    id: "Disabled"
    methods: ->
    
        # setter
        setter: (T, v) -> T[@id] = !!v # narrow to boolean

        # value comparator
        comparator: (a, b) -> !a is !b # compares as boolean

    # patches entity type attached to
    mixin:(_super) ->
        
        disabledChanged: (ev, v) ->
            @domNode.disabled = (if v then "disabled" else "")
            @toggleDomNodeClass "disabled", v

###
Basic Dom UI views.
###

# entity UI [view] entity type. 
# This is root entity type for all other types of UI views.
# It just attaches three core UI properties: [domNode], [style] and [hidden].
Object.entity.define 
    id:"View"
    properties: ["domNode:Node","style:Style","hidden:Hidden"]

# @define UI html view.
Object.entity.define  
    id: "Html extends View",
    properties: ["html:Html"]

# @define UI html view.
Object.entity.define  
    id: "Widget extends View",
    properties: ["html:Html","data","template"]
    methods: (_super) ->
        templateChanged: (ev, v) -> @redraw()
        
        dataChanged: (ev, v) -> @redraw()
        
        redraw: () ->
            return unless (tmpl= @prop 'template') and (ctx = @prop 'data')
            @prop 'html', String.template(tmpl, ctx)

        htmlChanged: ->
            Object.dom.init @

# @define UI label view.
Object.entity.define  
    id: "Label extends View",
    properties: ["caption:Caption"]
    domNodeType: "span"


# @define UI button view.
Object.entity.define  

    id: "Button extends View"
    
    properties: [ "disabled:Disabled", "caption:Caption", "html:Html"]

    domNodeType: "button"
    alive: true
    style: "btn"
        
    methods:
        tapped: (ev) ->
            if @async
                
                if (ev = @async())
                    @prop "disabled", true
                    @updateDomNodeClass "ui-busy"
                    if @busyCaption
                        @savedCaption = @prop "caption"
                        @prop "caption", @busyCaption

                    cb = ev.callback
                    Object.fire ev, (ev) =>
                        cb?.apply(@, arguments)
                        @updateDomNodeClass "!ui-busy"
                        @prop "disabled", false
                        if @savedCaption
                            @prop "caption", @savedCaption
                            @savedCaption = null
                    
            else if @action
                @prop "disabled", true
                @updateDomNodeClass "ui-busy"
                @action ev
                @updateDomNodeClass "!ui-busy"
                @prop "disabled", false


# @property UI [children] property
# Used by [box] entity and its descendants.
# @attr childrenAsyncAdapter - adapt result of async fetching
# @attr childrenAdapter - adapt meta data before set
Object.entity.defineProperty 
    id: "Children"
    methods: (_super) ->
        
        _child= (e, cb) ->
            e = Object.entity.create.parseMeta(e) if typeof e is "string" 
            e = Object.update {id: "box", parentEntity: @}, e
            Object.entity.create e, cb
            

        # Callback used in Sets property value from async url.
        # used in Property.setAsyncValue() as callback
        # calls event adapters: from entity or default if none
        createAsyncValueCallback: (T) ->
            (err, value) ->
                unless T._done
                    T.updateDomNodeClass "!ui-busy"
                    T.prop propId, T.childrenAsyncAdapter(err, value)

        
        # Sets property value from async url.
        setAsyncValue: (T, url) ->
            T.updateDomNodeClass "ui-busy"
            _super.setAsyncValue.call this, T, url
            return

        # sets value
        setValue: (T, ev, url) ->
            return @setAsyncValue T, url if url

            Function.perform T, (flow)-> 
                [
                    ->
                        
                        meta = @childrenAdapter(ev.value, ev)
                        
                        # removes all currently added
                        @removeAllChildren() unless ev.noReset
                        
                        #T.trace('set children',v);
                        ch = @getChildren()
                        
                        _add = (e) =>
                            pos = ch.length
                            ch.push(null)
                            cb = flow.wait()
                            _child.call @, e, (err, e) ->
                                    ch[pos] = e
                                    cb(err, e)
                                    
                        _add.call @, e for e in meta when e if meta
                        
                        flow.next()

                    # callback into entity if exists
                    ->
                        v = (e for e, i in arguments when i>1)
                        @childrenChanged(value:v, v)
                ]

        done: (T) ->
            # cascade done
            T.removeAllChildren()
            _super.done.call @, T

    # @patch entity type
    mixin: (_super) ->
        
        # Creates a new child.
        createChild: (e, cb) ->
            _child.call @, e, (err, e) =>
                ch = @getChildren()
                ch.push e
                @childrenChanged?(value: ch, ch)
                cb?(err, e)
            

        # adapt meta
        childrenAdapter: (x) -> x

        # adapt meta
        childrenChanged: (ev,v) -> ev
        
        # gets list of children
        getChildren: -> @_children or (@_children = [])

        # invokes done() for each and then removes all children
        removeAllChildren: ->
            e.done() for e in @_children if @_children
            @_children = []

        # creates a set of children by given {#meta}
        setChildren: (meta) -> @prop "children", meta

        # @adopt async value.
        childrenAsyncAdapter: (err, value) ->
            if err then id: "html", html: String.localize(err.reason or "unknown_error") else value

# entity UI [box] entity type. 
# Simplest UI container. 
# It just extend  [view] entity type with [children] property.
Object.entity.define
    id: "Box extends View",
    properties: ["children:Children"]


###
UI List view.
###
Object.entity.define  

    id: "List extends View"
    properties: ["children:Children", 'itemTemplate', "data", "selection", "value:Value"]

    domNodeType: 'ul'
    itemType: 'Widget'
    itemTemplate: '<a href="#" onclick="return false;">{{name}}</a>'
    dataIdKey: 'id'
    itemDomNodeType: 'li'
    alive: true
        
    methods: (_super) ->

        _reg = (data, key, r={}) ->
            r[val] = e for e in data when val = e[key] if data
            r

        valueChanged: (ev) -> @syncSelection()
            
        childrenChanged: (ev) ->   
            @childrenRegistry=_reg @getChildren(), 'value'
            @syncSelection()

        dataChanged: (ev, data) -> 
            @dataRegistry = _reg data, @dataIdKey
            @setChildren ev

        syncSelection: ->
            @prop "selection", @childrenRegistry[val] if val = @getValue()

        selectionChanged: (ev) ->
            ev.oldValue?.domNodeClass("!active")
            ev.value?.domNodeClass("active")

        childrenAdapter: (data, ev) ->  
            
            ev.noReset = true
            
            r=[]
            return r unless data            
            
            #remove obsolete items
            ch = @_children
            @_children = []
            @childrenRegistry = {}
            for e in ch when val = e.value
                if @dataRegistry[val]
                    @_children.push e
                    @childrenRegistry[val] = e
                else
                    e.done()
                    
            #update or insert
            for datum, i in data when val = datum[@dataIdKey] 
                if existing = @childrenRegistry[val]
                    lastNode = existing.domNode
                    @updateChild(existing, datum)
                else
                    r.push @childrenItemAdapter(datum, i, lastNode?.nextSibling) 
            r
            
        updateChild: (e, d) -> e.prop 'data', d

        childrenItemAdapter: (d, i, nextNode) ->
            id: @itemType
            domNodeType: @itemDomNodeType
            nextNode:nextNode
            style: @itemStyle
            template: @itemTemplate
            value: d[@dataIdKey]
            data: d

        tapped: (ev) ->
            w = ev.entity
            while w and (w isnt @)
                if (w.domNodeType is @itemDomNodeType) and w.value
                    @setValue w.value
                    break
                w = w.parentEntity
            w            