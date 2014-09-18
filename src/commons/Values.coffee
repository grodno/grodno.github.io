# property [valueRange].
# It provides value range logic.
Object.entity.defineProperty 
    id: "ValueRange"
    methods : ->

        #patch entity type with some related methods.
        init: Function.NONE
        
        # value setter
        setter: (v) ->
            v0 = @valueRangePartAdapter(v[0])
            v1 = @valueRangePartAdapter(v[1])
            @_valueRangeLocked = (@_valueRangeLocked or 0) + 1
            @prop "valueMin", v0
            @prop "valueMax", v1
            @prop "value", @valueFromParts(v0, v1)
            @_valueRangeLocked--
            @[propId] = [v0,v1]
            v

        # value comparator
        comparator: (a, b) ->
            (not a and not b) or (a and b and a.length > 1 and (a.length is b.length) and (a[0] is b[0]) and (a[1] is b[1]))

    #patches entity type attached to
    mixin: (_super) ->
        
        #@hook on [value] value is changed
        valueChanged: (ev, v) ->
            unless @_valueRangeLocked
                @_valueRangeLocked = (@_valueRangeLocked or 0) + 1
                @prop "valueRange", (if (v and v.split and (v = v.split("-")) and (v.length > 1)) then v else [null,null])
                _super.valueChanged.call @, ev, v
                @_valueRangeLocked--
            return

        #@hook on [valueMin] value is changed
        valueMinChanged: (ev, v) ->
            @prop "value", @valueFromParts(v, @valueMax)    unless @_valueRangeLocked
            return

        #@hook on [valueMax] value is changed
        valueMaxChanged: (ev, v) ->
            @prop "value", @valueFromParts(@valueMin, v)    unless @_valueRangeLocked
            return

        # @adapt part of value 
        valueRangePartAdapter: Function.NONE
        
        # @get value from parts
        valueFromParts: (min, max) -> "" + (min or "") + "-" + (max or "")



# property [batchedProperties].
# It patches entity type with ability to property changes in batch.

# patch entity type attached to
Object.entity.defineProperty 
    id: "BatchedProperties"
    mixin:  (_super) ->
        init: ->
            @_changeEvent =
                entity: this
                counter: 0
                delta: {}
            _super.init.call this 

        
        # do something inside batch
        batch: (fn) ->
            @_touch.counter++
            fn and fn.apply(this, Array::slice.call(arguments_, 1))
            @changed()    unless --@_touch.counter

        # @hook on touch ended
        changed: ->
            @notifyPropertyChanged "changed", @_changeEvent
            @_changeEvent.delta = {}

        # @set property value
        prop: (key, val, asyncUrl, force) ->
            
            # prevent execution for finalized entity
            unless @_done
                if val and (val.value isnt _undef or val.asyncUrl)
                    
                    # extract asyncUrl if any
                    if val.asyncUrl
                        asyncUrl = val.asyncUrl
                        delete val.asyncUrl
                else
                    
                    # wrap value into event instance
                    val = value: val
                che = @_changeEvent
                che.delta[key] = val.value
                che.counter++
                @_prop(key).setValue this, val, asyncUrl, force
                @changed()    unless --che.counter
            return


# property [valueBundle].
# It manage a set of dynamic properties as part of [value] property bundle.
Object.entity.defineProperty 
    id: "Bundle"
    # patch entity type attached to
    mixin:  (_super) ->
        __allKeys = (obj) ->
            r = {}
            for key of obj
                r[key] = null
            r
    
        __actualDelta = (obj, oldV) ->
            r = []
            for n of obj
                if obj.hasOwnProperty(n) and (oldV[n] isnt obj[n])
                    r.push
                        id: n
                        value: obj[n]
    
            r
    
        setValue: (d) ->
            @prop "value", d or __allKeys(@value)
            return
    
        _get: (key) ->
            (if (key is "value") then @value else ((if @value then @value[key] else null)))
    
        prop: (key, v) ->
            _undef = undefined
            unless @_done
                v = value: v    unless v and (v.value isnt _undef)
                unless @write_counter
                    @write_counter = 1
                    delta = undefined
                    if key isnt "value"
                        delta = {}
                        delta[key] = v.value
                    else
                        delta = v.value
                    @update delta
                    @write_counter--
                else
                    @delayedDelta = @delayedDelta or {}
                    @delayedDelta[key] = v.value
            return
    
        update: (dd) ->
            T = this
            v = Object.clone(dd)
            oldV = Object.clone(T.value or {})
            deltaArr = __actualDelta(v, oldV)
            if deltaArr.length
                if @__update(v, false, oldV)
                    ev1 =
                        entity: T
                        oldValue: oldV
                        value: T.value
    
                    
                    # hook
                    hook = T.valueChanged
                    hook and hook.call(T, ev1, ev1.value)
                    
                    # notify
                    T.notifyPropertyChanged "value", ev1
            return
    
        __update: (delta, hasChanges, oldV) ->
            @value = @value or {}
            T = this
            deltaArr = __actualDelta(delta, oldV)
            i = 0
    
            while i < deltaArr.length
                e = deltaArr[i]
                id = e.id
                ev0 =
                    entity: T
                    oldValue: oldV[id]
                    value: e.value
    
                T.value[id] = e.value
                
                #Object.debug('Update::'+T.id+'.'+id+'=', e.value);
                # hook
                hook = T[id + "Changed"]
                hook and hook.call(T, ev0, ev0.value)
                
                # notify
                T.notifyPropertyChanged id, ev0
                hasChanges = true
                i++
            if @delayedDelta
                delta = T.delayedDelta
                T.delayedDelta = null
                return T.__update(delta, hasChanges, oldV)
            hasChanges

