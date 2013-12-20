/* ============================================================
 * AXIO.JS framework.
 * http://alitskevich.github.com/AxioJS
 * ============================================================
 * Copyright (c) 2009-2013, Alex Litskevich <alitskevich at gmail.com>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

/**
 * Axio: Infrastructure package. 
 * Core functional over Function, Array, Object(including Uri, Events), String.
 */

(function ( _undef) {
    
    // strict mode on
    "use strict"; 

    // some internal shortcuts
    var F = Function, A = Array, O = Object, _ownProp = O.prototype.hasOwnProperty;

    /**
     *==========================================================================
     * I. Working with Functions.
     *==========================================================================
     */
    
    /**
     * Function.NONE.
     * Widely used as a stub.
     * @return first argument
     */
    F.NONE = function(x) {
        
        return x;
    };

    /**
     * @return non-empty {#notFoundValue} or {#ctx} otherwise.
     * That iterator call {#fn} for each entry of {#obj} on {#ctx} passing datum, index and {#opts}.
     */
    F.iterate = function(fn, obj, ctx, opts, notFoundValue) {
        
        var r, i;
        
        if (obj) {
            
            var l = obj.length;
            opts = opts || {};
            
            if (l === +l) {
                
                if (notFoundValue===_undef) {
                    
                    for (i = 0 ; i < l; i++) {
                        fn.call(ctx, obj[i], i, opts);
                    }
                    
                } else {
                    
                    for (i = 0; i < l; i++) {
                        if ((r = fn.call(ctx, obj[i], i, opts))) return r;
                    }
                    
                    return notFoundValue;
                    
                }
            } else {
                
                if (notFoundValue===_undef) {
                    
                    for (i in obj) {
                        if (_ownProp.call(obj, i)) {
                            fn.call(ctx, obj[i], i, opts);
                        }
                    }
                    
                } else {
                    
                    for (i in obj) {
                        if (_ownProp.call(obj, i)) {
                            if ((r = fn.call(ctx, obj[i], i, opts))) return r;
                        }
                    }
                    
                    return notFoundValue;
                    
                }
            }
        }
        
        return ctx;
        
    };
    
    F.prototype.iterator = function() {
        
        var f = this;
        
        return function(obj, ctx, opts, notFoundValue) {
            
            return F.iterate(f, obj, ctx, opts, notFoundValue);
        }
    }
    
    /**
     * Function.perform([list], args... OR list...)
     * 
     * Performs {#list} of asynchronous operations in order.
     * 
     * Invoke this() as callback inside each function.
     * Invoke this.cb() to obtain some more callbacks for parallel flow.
     * 
     * @see test/test-event.html for sample usages
     */
    F.perform = (function(){

        var __ok = function(e){
            
            return (!e) ? true : (this(e), false);
        };
            
        return function(operations, event) {
            
            var error;
            var pending =  1;
            var args = [];
             
            var tick = function(err, v, pos) {
            
                if (err) {
                    err = O.error(err);
                    err.next = error;
                    error =  err;
                }
                
                args[ pos || 0 ] = v || null;
            
                var op;
            
                if (((--pending) === 0) && (op = operations.shift())){
                    
                    // shift `err` argument for first operation.
                    var _args = (error===_undef?[]:[error]).concat(args);
                    
                    pending = 1;
                    error = null;
                    args = [null];
                    
                    //try {
                    
                        if ((_args = op.apply(ctx, _args)) !== _undef) {
                            ctx(null, _args);
                        } 
                        
//                    } catch (ex) {
//                    
//                        O.error.log(O.error.BAD,''+ex,''+op);
//                        
//                        if (operations.length) {
//                            pending = 1; 
//                            ctx(ex, null);
//                        } else {
//                            throw ex;
//                        }
//                    }
                }
            };

            // default callback function passed as context for each operation
            var ctx = function(err, v) {
                tick(err, v);
            }
       
            // used to skip code if error
            ctx.ok = __ok;
        
            // used to create parallel callback
            ctx.cb = function() {
            
                var pos = args.length;
                
                // ensure size
                args[pos] = _undef;
                
                // increment pending
                pending++;
            
                return function(err, v) {
                    
                    // can affect only once!
                    (args[pos] === _undef) && tick(err, v, pos);
                    
                };
            };
            
            // start with first operation
            tick.call(null, event);
            
        };
    })();
    
    /**
     *==========================================================================
     * II. Working with Arrays.
     *==========================================================================
     */
    
    /**
     * makes array-like projection
     * @return slice of {#arr} or empty array.
     * @safe for no {#arr)
     */
    A.slice = function(arr, from, sz) {
        
        return arr ? A.prototype.slice.call(arr,from,sz) : [];
        
    };
    
    /**
     *@return item of {#arr} at {#p=0} position or null.
     * negative p sumed with array length
     * @safe for no {#arr)
     */
    A.item = function(arr, p) {
        
        return arr ? ( !p ? arr[0] : ((arr.length>(p=((p>0)?0:arr.length)+p))? arr[p] :  null)) : null;
        
    };

    /**
     * @find item of {#arr} with {#key='id'} attribute value matching {#val}.
     * @return item found or null if none
     */
    A.findByAttr = (function(f) {
        
        f = function(d, i, key) {
            
            return (d[key]===this) ? d : null;
            
        };
        
        return function(arr, val, key) {
            
            return F.iterate(f, arr, val, key || 'id', null);
            
        }
        
    })();
    
    /**
     * @sort given {#a}rray in {#dir}ection using {#getter} for criteria
     */
    A.sortBy = function(a, getter, dir) {
        
        getter = getter || F.NONE;
        
        if (!dir) {
            dir=1;
        }
        
        var rdir  = dir*-1;
        
        if (typeof(getter) === 'string') {
            var key = getter;
            getter = function(s) {
                return s && s[key]
            }
        }
        
        return a.sort( function(s1,s2,v1,v2){
            v1=getter(s1);
            v2=getter(s2);
            return v1>v2?dir:(v1<v2?rdir:0);
        }
        
        )
    }

    /**
     *==========================================================================
     * III. Working with Objects.
     *==========================================================================
     */

    /**
     * updates {#obj*} with own key/values from {#extra}.
     */
    O.update =  function(obj, extra) {
        
        if (obj && extra) {
            
            for(var n in extra) {
                if (_ownProp.call(extra, n)) {
                    obj[n] = extra[n];
                }
            }
        }
        
        return obj;
    };

    // @get value of {#obj} property by {#keys} in deep.
    O.get =  function(obj, key) {
        
        if (obj) {
            
            var  p=-1,p1;
            
            for (; obj && (p=key.indexOf('.',p1=p+1))>-1;obj = obj[key.substring(p1,p)] ) {}
            
            return obj ?  obj[key.substring(p1)] : _undef; 
                        
        }
        
        return null;
    };

    // @set value of {#obj} property by {#keys} in deep.
    O.set =  function(obj, key, val) {
        
        if (obj) {
            
            for(var  p=-1,p1=-1, k; (p=key.indexOf('.',p1=p+1))>-1; obj = (obj[k=key.substring(p1,p)]|| (obj[k]={}))) {}
            
            k=key.substring(p1);
            
            return (obj[k] = val);
        }
        
        return null;
    };
    
    // safely @clones {#obj}.
    O.clone =  function(obj, delta) {
        
        return obj ? O.update(O.update(new (obj.constructor)(), obj), delta) : null;
        
    };
    
    // @return object sliced from original by given keys
    O.slice = (function(f) {
        
        f = function(n, i, obj) {
            
            if ((i=obj[n]) !== _undef) {
                this[n] = i;
            }
            
        }
        
        return function(obj, keys) {
            
            return obj ? F.iterate(f, keys, {}, obj) : {};
        }
        
    })();
 
    // @return object evaluated from {#str*}.
    O.parse = function(s) {
        try {
            
            return s ? (F.call(F,"return " + s))() : null;
            
        } catch (ex) {
            
            O.error.log(O.error.BAD,'Object.parse: '+ex.message,s);
            
        }
        
        return null;
    };
  
    /**
     *==========================================================================
     * IV. Working with URI.
     *==========================================================================
     */


    // parses argument to URI object instance:
    // [kind]type://id?(p1=v1)*#hash
    // id also parsed into steps and authority
    O.parseUri =  (function() {
        
        var qFn=(function(v) {
            
            var p;
            if ((p = v.indexOf('=')) > -1) {
                this[v.substring(0, p)] = decodeURIComponent( v.substring(p + 1));
            }
            
        }).iterator();
        
        var Uri = function(s) {
            
            this.isUri =true;
            this.original = s;
            this.params = {};
            
        }
        
        Uri.prototype.constructor = Uri;
        
        Uri.prototype.toString = function() { 
            
            var q = '';
            for (var n in this.params) {
                q+=((q?'&':'?') + n + '=' + encodeURIComponent(this.params[n]));
            }
            
            return ((this.type ? (this.type + ':') : '') +  this.id + q + (this.hash ? ('#' + this.hash) : ''));
            
        };
        
        return function (s) {
            
            var r = new Uri(s), p;
            
            if (!s)  return r;
            
            if (!s.substring) {
                s = ''+s;
            }
            
            // extract hash:
            if ((p = s.indexOf('#')) > -1) {
                r.hash = s.substring(p + 1);
                s = s.substring(0, p);
            }
            // extract query:
            if ((p = s.indexOf('?')) > -1) {
                qFn(s.substring(p + 1).split('&'), r.params);
                s = s.substring(0, p);
            } 
            // extract kind:
            if ((s[0]=='[') && ((p = s.indexOf(']')) > -1)) {
                r.kind = s.substring(1, p);
                s = s.substring(p + 1);
            }
            // extract type:
            if ((p = s.indexOf('://')) > -1) {
                r.type = s.substring(0, p);
                s = s.substring(p + 1);
            }
            // work with path:
            r.id = s;
            r.host = '';
            r.path = p = s.split('/'); 
            
            if (s[0]==='/') {
                
                r.isAbsolutePath=true;
                if (s[1]==='/') {
                    
                    r.host = r.path[2];
                    r.path = r.path.slice(3);
                    
                } else {
                    
                    r.path.shift();
                    
                }
            }
            
            for (;(p[0]==='');p.shift()){}
            
            r.steps = p;
            r.authority = p[0];
            r.step = p[1];
            
            return r;
        }
    })();
    
    /**
     *==========================================================================
     * VI. Working with Strings.
     *==========================================================================
     */

    (function() {
        
        // memoize Templates
        var TEMPLATES = {};
        
        // parses and compile binding from expression
        var compileTemplate = function(s){
            
            if (TEMPLATES[s]) {
                return TEMPLATES[s];
            }
            
            var  posB, posE = -27,  path, s0=s;
            
            s = s.replace(_RE_QUOTE,'"');
            
            while ( ((posB = s.indexOf('{', posE+27)) > -1)&& ((posE = s.indexOf('}', posB)) > -1) ) {
                
                path = s.substring(posB + 1, posE);
                
                if (path[0]===' '){
                    path = path.substring(1);
                }
                
                s= s.substring(0, posB) + "'+(Object.get(this,'" + path + "')||'')+'" + s.substring(posE + 1);
                
            }
            
            //O.debug(s);
            return TEMPLATES[s0] = (new Function("return '" + s + "';"));
        };
        
        // memoize regexps
        var _RE = (function($R){
            
            return function (key){
                return $R[key] || ($R[key]=new RegExp('\\{' + key + '\\}', 'gm'))
            }
            
        })({}), _RE_UNDERSCORE=new RegExp('_', 'gm'), _RE_QUOTE=new RegExp("'", 'gm');

        String.LANGUAGE = 'en';

        String.LANGUAGES = ['en'];
    
        // @returns localized {#s} or ''
        String.localize = function(s) {
            
            return String.capitalize(s).replace(_RE_UNDERSCORE,' ');
            
        };    
        // @returns capitalized {#s} or ''
        String.capitalize = function(s) {
            
            return s && s.length && (s.toString().charAt(0).toUpperCase() + s.substring(1)) || '';
            
        };
        // @returns camelize {#s} or ''
        String.camelize = function(s, sep) {
            
            if (!s || !s.length) return '';
            
            var arr = s.split(sep||'_'), r=arr[0];
            for (var i = 1, l = arr.length; i < l; r+=String.capitalize(arr[i++])) {}
            
            return r;
            
        };        
        // Returns string formatted by template filled with rest of arguments.
        // If template is a function, then it is invoked with rest of arguments passed
        // @return string result.
        String.format = function(s){
            
            var type = typeof(s);
            
            if (type==="string") {
                
                for (var i = arguments.length-1;i>0;i--) {
                    s = s.replace(_RE(i-1), arguments[i]);
                }
                
                return s;
                
            } else if (type==="function") {
                
                return s.apply(null, A.prototype.slice.call(arguments,1));
                
            }
            
            return null;
        };

        // @return string formatted by template and key/value map used for placeholder substitution.
        String.formatWithMap = function(s, map){
            
            return compileTemplate(s).call(map);
            
        };
    
    })();

    /* 
     *==========================================================================
     * VI. Logging.
     *==========================================================================
     */
    
    // Declare stub method.
    O.log = F.NONE;
    
    // debug
    O.debug =  function() {
        
        O.log.apply(O,['DEBUG:'].concat(A.prototype.slice.call(arguments,0)));
        
    };
    
    /* 
     *==========================================================================
     * VII. Error handling.
     *==========================================================================
     */

    // narrow error to reqular form: { reason:'', message:'', info:''}
    O.error = function(err, message, info) {
        
        if (!err) {
            return null;
        } 	   		
        
        if (typeof(err)==='string') {
            err = {
                reason: err
            };
        }
        
        if (!err.reason) {
            err.reason = O.error.UNKNOWN;
        }
    
        if (!err.message) {
            err.message = message || err.reason;
        }
    
        if (!err.info) {
            err.info = info;
        }
        
        return err;
    }

    // System-level error handler
    O.error.log =  function(err, message, info) {
        
        err = O.error(err, message, info);
        
        O.log.apply(O,['ERROR:', err]);
        
        return err;
    };
    
    O.error.UNKNOWN = 'unknown-error';
    O.error.NOT_FOUND = 'not-found';
    O.error.ACCESS_DENIED = 'access-denied';
    O.error.BAD = 'bad-code';


    /* 
     *==========================================================================
     * VIII. Code dependency.
     *==========================================================================
     */
    
    // Ensure all dependencies are resolved and invokes callback after..
    O.require = function(_cache) {
        
        var _eachItem = (function(x) {
        
            // skip empty 
            if (!x) return;
            
            var ctx = _cache[x] || (_cache[x]={
                q:[]
            });

            // skip already cached
            if (ctx.done) return;
 
            // normalize/create event
            var u = O.parseUri(x);
        
            // use [script] kind by default (or for http type)
            u.kind = u.kind || ((!u.type || (u.type === 'http')) ? 'script' : u.type );
         
            ctx.q.push(this.cb());
            
            // prevent duplicate notifications
            if (ctx.q.length === 1) {

                // create callback wrapper
                var callback = function(err){
                    if (err) {
                        O.error.log('Unreachable: '+x);
                    } else {
                        ctx.done = x;
                    }
                    
                    var cb;
                    while((cb=ctx.q.shift())) {
                        cb.apply(this, arguments);
                    }
                };
                
                // notify with event
                O.notify(u, callback);

            }
        
        }).iterator();
        
         
        var _starter = [function(list) {
                
            _eachItem(list, this);
            
            return true;
            
        }];

        return function(list, cb) {
            
            F.perform(_starter.concat(cb), list);
            
        };
        
    }({});

})();
(function($R){
    
    /**
     *==========================================================================
     * V. Event notifications.
     *==========================================================================
     */
    
    var O = Object;
    
    var _opArgg0 = [function(args){
        this.apply(null, args);
    }];

    var _notify = function(obj, key, ev){
        
        if ((obj = (obj && obj[key]))) {
            
            // broadcast to all listeners
            for (var rec = obj._first; rec; rec=rec.next) {
                
                rec.fn.call(rec.target, ev); 
                
            }
            
            return true;
        }
        
        // inform that event still not handled
        ev.callback && ev.callback(Object.error(Object.error.NOT_FOUND, ev.uri));
        return false;
    };
    
    /**
     * O.listen(key, handler) 
     * @register adds an event {#handler} for {#type}
     */
    O.listen = function(key, handler, target, cb) {
            
        var obj=$R, p=-1,p1=-1, k;
        
        for(; (p=key.indexOf('.',p1=p+1))>-1; obj = (obj[k=key.substring(p1,p)]|| (obj[k]={}))) {}
        
        obj = (obj[k=(p1?key.substring(p1):key)] || (obj[k]={}));
            
        var rec = {
            fn : handler,
            target : target || null
        };
        
        if (obj._last) {
            
            obj._last.next = rec;
            rec.prev = obj._last;
            
        } else {
            
            obj._first=rec;
            
        }
        
        obj._last = rec;
        
        cb &&  cb.call(rec.target, rec, obj);
    };

    /**
     * O.notify(event, type)
     * @notify broadcasts event to all handlers that listen appropriate event type
     */
    O.notify = function(ev, cb) {
            
        if ((typeof(ev)==='string') || ev.isUri) {
            ev = {
                uri:ev
            };
        }
            
        if (typeof(ev.uri)==='string') {
            ev.uri = O.parseUri(ev.uri);
        }
            
        // negotiate key    
        var key = ev.uri.kind || ev.uri.type || 'default';
            
        // eliminate kind
        ev.uri.kind = null;

        // ensure callback
        ev.callback = cb || ev.callback || Function.NONE;

        // wrap array of callbacks with single one
        if (Array.isArray(ev.callback)){

            var cbs  = _opArgg0.concat(ev.callback);
            
            ev.callback = function() {
                Function.perform(cbs, arguments);
            }
        }
            
        //search bundle
        for(var obj=$R, p=-1,p1=-1; obj && (p=key.indexOf('.',p1=p+1))>-1; obj = obj[key.substring(p1,p)]) {}
        
        if (p1) {
            key = key.substring(p1);
        }

        return _notify(obj, key, ev);
    };
        
    // @private do not use it in your code!!!
    O.notify2 = function(key1, key2, ev){
        _notify($R[key1], key2, ev);
    };
  
    /**
     * O.unlisten(key)
     * @unregister removes all handlers for given event type
     */
    O.unlisten = function(key) {
        
        for(var obj=$R, p=-1,p1=-1; obj && (p=key.indexOf('.',p1=p+1))>-1; obj = obj[key.substring(p1,p)]) {}
            
        if (p1) {
            
            key = key.substring(p1);
            
        }
            
        if (obj && obj[key]) {
            
            delete obj[key];
            
        }
    };
        
    /**
     * O.unlisten._all(key)
     * @private do not use it in your code!!!
     * @unregister all
     */
    O.unlisten._all = function() {   
        
        $R = {};
        
    };
        
    /**
     * O.unlisten._removeRecord(key)
     * @private do not use it in your code!!!
     * @unregister just one record from obj bundle
     */
    O.unlisten._removeRecord = function(rec, obj) {
        
        if (rec.next) { 
            
            rec.next.prev = rec.prev;
            
        } else {
            
            obj._last = rec.prev || null;
            
        }
        
        if (rec.prev) {
            
            rec.prev.next = rec.next;
            
        } else {
            
            obj._first = null;
            
        }
        
    };
    
})({});
/**
 * Axio:Entity. Entity framework.
 * 
 *  It allows define types, create entity instances and get them by id:
 *      Object.entity('id')
 *      Object.entity.define(meta)
 *      Object.entity.create(meta)
 * 
 */
( function() {
    
    var O = Object;

    // entities registry
    var ALL={};
    
    // entity types registry
    var TYPES={};
    
    // entity counter used as guid
    var TOTAL=0;
    
    // unregisters entity
    var REMOVE_FROM_ALL = function(T){
        delete ALL[T.id];
    };
    
    // parses meta info for entity
    var _parseMeta =  function(url) {
        
        if (url[0]==='{') {
            return O.parse(url);
        }
        
        var u = O.parseUri(url), id= u.hash;
        
        var r = O.update({
            id : (u.type||"box") +(id?(':'+id):'')
        }, u.params);
        
        if (u.steps.length) {
            r.style =u.steps.join(' ');
        }
        
        if (u.kind) {
            r.domNodeType = u.kind;
        }
        
        return  r;
    };
    
    //overrides methods.
    var _applyMethods = function(ftor)  {  
        
        if (ftor) {
            
            var _super = {}, methods = ftor(_super);
            
            for (var n in methods) {
                
                _super[n] = this[n] || Function.NONE;
                this[n] = methods[n];
                
            }
        }  
        
    };
   
    //@get entity constructor or creates/register a new one.
    var _getType = function(id, superType) {
        
        if (!id) return null;
        
        var type = TYPES[id];
        if (!type){
            
            return null;
            
        }
        
        if (!type.ctor && (!(superType = type.superTypeId) || (superType = _getType(superType)))) {
            type.ctor = _createCtor(type, superType) ;
        }
        
        return type;
    };
    
    //@creates a new one entity constructor.
    var _createCtor = function(type, superType)  {
        
        var ctor = function(){
            this.__finalizers = [];
        };
        var _proto = ctor.prototype =  {};
        var superCtor =  null;
        
        ctor.applyMethods = _applyMethods;
        ctor.propList = [];
        ctor.properties = {};
        
        if (superType) {
            
            superCtor = superType.ctor;
            O.update(_proto, superCtor.prototype);
            Array.prototype.push.apply(ctor.propList, superCtor.propList);
            O.update(ctor.properties, superCtor.properties);
            
        }
        if (type.properties) {
            
            for(var i=0, l=type.properties.length;i<l;i++) {
                
                var id = type.properties[i], ptype = "*", v = id.split(':');
                
                if (v.length>1){
                    ptype=v[0] || v[1];
                    id=v[1];
                }
                
                if (ctor.properties[id]) {
                    throw new Error('ERROR: Duplicate property in entity type: '+id);
                }
                
                var prop = O.property(id, ptype);
                ctor.propList.push(prop);
                ctor.properties[id] = prop;
                prop.attachToEntityCtor(ctor);
                
            }
        }
        
        // apply initial values
        O.update(_proto, type.initials);
        
        // apply methods 
        _applyMethods.call(_proto, type.methods);

        // explicit constructor
        ctor.prototype.constructor = ctor;
        
        return ctor;
    };
    
    // entity home
    var $ = O.entity = function(id) {
        
        return id ? (id._id? id : ALL[id]) : null;
        
    };
 
    // @define a new entity {#type}
    // @!just register at this time. Actual type constructor will be created on demand.
    $.define = function (id, meta) {
        
        if (!meta) {
            
            meta = id;
            id  = meta.id;
            
        }
        
        var type = {
            initials:meta,
            superTypeId:meta.superType||(id==='entity'?null:'entity'), 
            properties:meta.properties,
            methods:meta.methods
        };
        
        var p = id.lastIndexOf(' extends ');
        if (p !== -1) {
            type.superTypeId = id.substring(p+9);
            id = id.substring(0,p);
        } 
        
        delete meta.properties;
        delete meta.methods;
        delete meta.superType;
        delete meta.id;
        
        if (id) {
            TYPES[id] = type;
        }
        
        return type;
        
    };
   
    //@get entity constructor or creates/register a new one.
    var _resolveTypeAsync = function(type,  cb) {
        
        if (!$.ENTITY_TYPE_FACTORY_URL) {
            return false;
        }
                
        O.notify(String.format($.ENTITY_TYPE_FACTORY_URL, type), function(err) {
                
            var _type = _getType(type);
                    
            if (err || !(_type)){
                    
                cb && cb(err || O.error('ERROR: Can\'t resolve entity type: '+type));
                    
            } else {
                
                // check for super type recursively
                if (_type.superTypeId && !_getType(_type.superTypeId)) {
                    
                    _resolveTypeAsync(_type.superTypeId, cb);
                    
                } else {
                    
                    cb();
                    
                }
            }
                
        });
                
        return true;
            
    };

    // @create a new entity instance.
    // @param r - metainfo object for instance: 
    // ex.: {id:"Type:[id]", properties:['prop1',...], prop1: initialValue,prop1Changed:function(ev, value){} }
    $.create = function(r, cb)
    {
        // parse if string notation
        if (typeof(r)==='string') {
            r = _parseMeta(r);
        }
        // identity
        var ids = r.id.split(':'), obj, type = ids[0];
        
        var _type =  _getType(type);           
            
        if (!_type || !_getType(_type.superTypeId)) {
            
            // try to use type factory if defined
            if (!_resolveTypeAsync(!_type ? type : _type.superTypeId, function(err){
                if (err) {
                    O.error.log(err);
                } else {
                    $.create(r, cb);
                }
                
            })) {
                
                O.error.log('ERROR: No such entity type: '+type); 
                
            }
            
            return null;
        }

        // prepare type and instantiate
        if (r.properties || r.methods) {
            
            // inline type
            obj = new (_createCtor($.define(type + (++TOTAL),O.clone(r)), _type))();
            
        } else {
            
            // regular instance
            obj = O.update(new (_type.ctor)(),r); 
            
        }
        
        // unique identity
        obj.id = obj._id = (type + (++TOTAL));
        
        // register if has own id
        if (ids[1]) {
            
            ALL[obj.id = ids[1]] = obj;
            
        }
        
        // add unregister finalizer
        obj.addFinalizer(REMOVE_FROM_ALL);
        
        // initialize
        if (obj.requires) {
            
            // resolve dependencies
            Object.require(obj.requires, function(err){
                
                err ? Object.error.log(err) : obj.init();
                
                cb && cb(err, obj);
                
            });
            
        } else {
            
            // instant init 
            obj.init();

            cb && cb(null, obj);

        }
        
        return obj;
    };

    $.create.parseMeta = _parseMeta;

    // @define The basic [entity] entity type.
    $.define('entity', {
        methods : function () {
        
            var _undef;
            
            var _referrer = function(){
                
                var ref = this.referrer;
                if (ref) {
                    
                    ref = ref.split ? ref.split('.') : ref;
                    
                    var target = ((ref[0]==='parent') ? this.parentEntity : $(ref[0])), key = ref[1];
                    
                    target[key]  = (this._done ? null : this);
                    
                }
                
            };
            
            // prop init operator
            var PROP_INIT_OP = function(p) {
                p.init(this);
            };
                    
            return {
                // initializes entity
                init : function() {
                    
                    // init all declared properties
                    Function.iterate(PROP_INIT_OP, this.constructor.propList, this);
                    
                    // assign this for other entities
                    _referrer.call(this);
                    
                    this.handleEvent && O.listen(this.id, this.handleEvent, this);
                }
                ,
                // done entity
                done : function() {
                    
                    // unlisten all
                    O.unlisten(this.id);
                    
                    // perform all finalizers
                    for (var fzs = this.__finalizers, i= fzs.length; i; fzs[--i](this)) {}
                    
                    delete this.__finalizers;
                    
                    // mark done
                    this._done = true;
                    
                    // un-assign this from other entities
                    _referrer.call(this);
                }
                ,
                // add a some finalizer function to be invoked at done();
                addFinalizer: function(f){
                    
                    this.__finalizers.push(f);
                    
                }
                ,
                // @get property value
                getProperty : function (key) {
                    
                    return this._get(key);
                    
                }            
                ,
                // @set property value
                setProperty : function (key, val) {
                    
                    this._set(key, {
                        value:(val===_undef)?null:val
                    });
                    
                }
                ,
                // @inc property value
                incrementProperty : function (key, inc, def) {
                    
                    this.setProperty(key,(this.getProperty(key)||(def===_undef?0:def))+(inc||1));
                    
                }
                ,
                // internal @get property value
                _get : function (key) {
                    
                    return this.constructor.properties[key] ? this._prop(key).getValue(this) : this[key];
                    
                }
                ,
                // @get property instance by key
                // Creates new one if none exists yet.
                _prop : function (key) {
                    
                    return this.constructor.properties[key] || (this.constructor.properties[key] = Object.property(key,"*"));
                    
                }
                ,
                // internal @set property value
                _set : function (key, val, asyncUrl, force) {
                    
                    // prevent execution for finalized entity
                    if (!this._done) {
                        
                        if (val && (val.value!==_undef)) {
                        } else {
                            // wrap value into event instance
                            val = {
                                value:val
                            };
                        }
                        
                        this._prop(key).setValue(this, val, asyncUrl, force);
                        
                    }
                    
                }
                ,
                // notifies about its property changed
                notifyPropertyChanged : function(propId, ev) {
                    
                    ev.entity = this;
                    ev.propId = propId;
                    
                    Object.notify2(this.id, propId, ev);
                    
                }
                ,
                // toString
                toString : function() {
                    
                    return '[entity:'+(this.id)+']';
                    
                }

            }
        }
    });
    
})();/**
 * Axio:Entity. Entity framework.
 * 
 *  It allows define property type:
 *      Object.property.define(id, meta, entityPatcher)
 * 
 */
(function(O) {
    
    // property types
    var TYPES={}; 
    
    // all properties registry
    var ALL={};
    
    // applies methods over
    var _applyMethods = function (ftor, id)  {  
        
        if (ftor) {
            
            var _super = {};
            
            var methods = ftor(id, _super);
            
            for (var n in methods) {
                
                if ((typeof (methods[n]) === 'function')) {
                    _super[n] = this[n] || Function.NONE;
                }
                
                this[n] = methods[n];
                
            }
        } 
        
    };
    
    
    // property factory
    O.property = function (id, typeId) {
        
        if (!id) return null;
        
        if (!typeId){
            typeId = "*";
        }
        
        var prop = ALL[typeId+":"+id];
        
        if (prop) {
            return prop;
        }
        
        var type = TYPES[typeId];
        if (!type) {
            throw new Error('ERROR: No such property type: '+typeId);
        }
        
        prop = {
            id: id
        };
        
        if (id.substr(id.length-3)==='Url') {
            
            prop.asyncTarget = id.substring(0, id.length - 3);
            
        } 
        
        if (typeId==='*') {
            
            O.update(prop, type.factory(id));
            
        } else {
            
            var _super = O.property(id, type.superTypeId||'*');
            
            O.update(prop,_super);  
            
            _applyMethods.call(prop, type.factory, id);
            
            // accumulate entity type patchers:
            var sep = _super.type.entityPatchers, ep  =type.entityPatcher;
            
            if (sep || ep) {
                
                var eps = type.entityPatchers = [];
                
                if (sep) {
                    eps.concat(sep); 
                }
                
                if (ep) {
                    eps.push(ep); 
                }
            }
        }
        
        prop.type = type;
        
        return  (ALL[typeId+":"+id] = prop);
               
    };
    
    // @define a property type
    O.property.define = function(id, factory, entityPatcher) {
        
        var type = {
            entityPatcher: entityPatcher, 
            factory: factory
        };
        
        var p = id.lastIndexOf(' extends ');
        
        if (p !== -1) {
            
            type.superTypeId = id.substring(p+9);
            id = id.substring(0,p);
            
        }
        
        TYPES[id] = type;
    } 

})(Object);


/* 
 * Axio: Entity property binding.
 */

// @bind property value with expression
Object.property.bind =  (function(O, _undef) {
    
    // parses and compile binding from expression
    var compileTemplate = function(s, tId){
        
        var  posB, posE = 0, src = [], path, p, prop, eId, opts, doublebind, req;
        
        while (	((posB = s.indexOf('${', posE)) > -1)&& ((posE = s.indexOf('}', posB)) > -1) ) {
            
            path = s.substring(posB + 2, posE);
            
            if ((p = path.lastIndexOf('|'))>-1) {
                opts = path.substring(p+1).split(',');
                path = path.substring(0,p);
            }

            req = (path[0]==='*');
            
            
            if ((path[0]===' ') || req) {

                path = path.substring(1);

            }

            if ((p = path.lastIndexOf('.'))==-1) {
                    
                eId  =path;
                path +='.value';
                prop = 'value';
                    
            } else {
                    
                eId = path.substring(0,p);
                prop = path.substring(p+1);
                    
            }
                
            if (eId==='@' || eId==='this') {
                    
                eId = tId;
                path = eId+'.'+prop;
                    
            }
            
            if (!Array.findByAttr(src,path)) {
                
                var sItem = {
                    id: path,
                    required : req || opts && opts.indexOf('required')>-1,
                    entityId : eId ,
                    propName : prop
                };
                
                src.push(sItem);
                
                if (opts && opts.indexOf('doublebind')>-1) {
                    doublebind = sItem;
                }
            }
            
            s= s.substring(0, posB) + '$V["' + path + '"]' + s.substring(posE + 1)
        }
        
        return {
            sources:src,
            body : s,
            doublebind: doublebind
        };
    };

    // collect source values
    var collectValuesFromSources = (function (p)
    {
        
        if (this.__incomplete) {
            return;
        }
        
        var w = O.entity(p.entityId);
        if (!w) {
            
            // if not all sources ready - prevent binding
            this.__incomplete = true;
            
        } else {
            
            this[p.id] = w._get(p.propName);
        
            if ((this[p.id]===_undef) || (p.required && !(this[p.id]))) {
            
                this.__incomplete = true;
            
            }
        }
        
        
    }).iterator();
    
    // subscriber callback
    var subscriberCb = function (rec, obj) {
        
        this.addFinalizer(function() {
            O.unlisten._removeRecord(rec, obj);
        });
    };
        
    return function(T, propName, value) {
        
        var bind = null, fn;
            
        var compiled = compileTemplate(value, T.id);
        
        try {
                
            fn = new Function('$V', 'return ' + compiled.body + ';');
            
        } catch (ex) {
             
            fn = function() {
                O.error.log(O.error.BAD,'Wrong binding expression: '+ex.message, compiled.body);
                return ex.message;
            }
                
        }
        
        // event handler
        bind= function(ev){
                
            var values = collectValuesFromSources(compiled.sources, {});
                
            if (!values.__incomplete) {
                    
//                if (ev && ev.entity && !values[ev.entity.id+'.'+ev.propId]){
//                        
//                    values[ev.entity.id+'.'+ev.propId] = ev.value;
//                }
                    
                T.setProperty(propName,fn.call(T, values));
                
                var db = compiled.doublebind;
                if (db && !db.bound){
                        //var propKey  = (!opts.key || opts.key==='value')?'':String.capitalize(opts.key);
                        var target = O.entity(db.entityId);
                        Object.property.bind(target, db.propName, '${'+T.id+'.'+propName+'}');
                        db.bound = true;
                }
            }
                
        };
            
        // subscribe all
        for (var i=0, ps = compiled.sources, l= ps.length; i<l; O.listen(ps[i++].id, bind, T, subscriberCb)) {}
        

        
        // perform binding immediately!!!
        bind();
    };
})(Object);


/**
 * Axio:Entity. Entity framework.
 * Define basic property type
 * 
 */ 
Object.property.define("*", function(propId) {
    
    var _undef, O = Object;
    
    // async value adapter. used in setAsyncValue() callback by default.
    var _asyncAdapter = function(err, value) { 
        return value;
    }
    
    var OBJ_VALUE_NULL = {
        value:null
    };

    return {
        
        // invoked when property attached to entity type
        // by default applies patches to entity type
        attachToEntityCtor: function(ctor){
            
            Function.iterate(ctor.applyMethods, this.type.entityPatchers, ctor.prototype);
            
        }
        ,
        // Property initialization for given entity
        // invoked at entity.init()
        // @param T  entity instance
        init : function(T) {
            
            var v = T[propId];
            
            // set initial value if any
            if (v !== _undef) {
                
                delete T[propId];
                
                T._set(propId,{
                    value:v
                }, _undef, true);
                
            }
            
            // dynamically init async url if any
            if ((T[propId+'Url'] !== _undef) || (T[propId+'UrlExpression'] !== _undef)) {
                
                O.property(propId+'Url').init(T);
                
            }
            
            //bind expression if any
            if ((v=T[propId+'Expression']) !== _undef) {
                
                O.property.bind(T, propId, v);
                
            }
            
            T.addFinalizer(this.done);
            
        }
        ,
        // finalizer for given property
        // invoked at entity.done()
        // @param T  entity instance
        done : function(T) {
            
            delete T[propId];
            
        }
        ,
        // value comparator
        comparator : function(v1, v2) {
            
            return v1 === v2;
            
        }
        ,
        // value setter.
        // Indirect value persisting realization.
        // @this entity instance
        setter : function(value) {
            
            return this[propId] = value;
            
        }
        ,
        // @get property value.
        // @param T  entity instance
        getValue : function(T) {
            
            return T[propId];
            
        }
        ,
        // Callback used in Sets property value from async url.
        // used in Property.setAsyncValue() as callback
        // calls event adapters: from entity or default if none
        createAsyncValueCallback : function(T) { 
            
            return  function(err, value) {
                
                !T._done && T._set(propId, (T[propId+"AsyncAdapter"] || _asyncAdapter).call(T,err, value));
            
            };
            
        }
        ,
        // @set async property value.
        setAsyncValue : function(T, url) {
            
            O.notify(url, this.createAsyncValueCallback(T));
            
        }
        ,
        // @set property value. 
        // invoked from entity.setProperty()
        // @param T  entity instance
        // @param ev event object containing value to set
        // @param url async listener target url to obtain value from
        // @param force forces value set flow regardless comparator
        setValue : function(T, ev, url, force) {

            var v = ev.value,  oldV, hook;
            
            if ((v !== _undef) && (force || !this.comparator(v, (oldV = this.getValue(T)))) ) {
                
                ev.entity=T;
                
                ev.oldValue = oldV;
                
                // actually set
                this.setter.call(T, v, ev);
                
                // async set for target property
                this.asyncTarget && v && T._set(this.asyncTarget, O.clone(ev, OBJ_VALUE_NULL), v);
                
                // hook
                (hook = T[propId+"Changed"]) && hook.call(T, ev, v);
                
                // notify dependensies
                T.notifyPropertyChanged(propId, ev);
            }
            
            url && this.setAsyncValue(T, url);
                             
        }
    };
});
/* 
 * Axio: Basic property types.
 */
        
// @property [nonequal].
Object.property.define('nonequal', function(propId) { 
    
    return {
        // value comparator
        comparator : function() {
            
            return false; // compares to not match
            
        }
    };
    
});

// @property [boolean].
Object.property.define('boolean', function(propId) { 
    
    return {
        // setter
        setter : function(v) {
            
            return this[propId] = !!v;// narrow to boolean
            
        }
        ,
        // value comparator
        comparator : function(a, b) {
            
            return (!a)==(!b); // compares as boolean
            
        }
    }
    
});

// @property [number].
Object.property.define('number', function(propId) { 
    
    return {

        // setter
        setter : function(v) {
            
            // narrow to number or 0 by default
            return this[propId] = v && Number(v) || 0;
            
        }
        ,
        // value comparator
        comparator : function(a, b) {
            
            return Number(a)===Number(b);
            
        }
    };
    
});

// @property [date].
Object.property.define('date', function(propId) { 
    
    return {

        // value comparator
        comparator : function(a, b) {
            
            return Date.compare(a, b)==0;
            
        }
    };
    
});

// @property [value].
Object.property.define('value', null, function(_super) {
    
    return {
            
        // @get value 
        getValue : function() {
                
            return this.getProperty('value');
                
        }
        ,
        // @set value 
        setValue : function(v) {
                
            this._set('value', v);
                
        }
        ,
        // @check if value is empty
        isEmptyValue : function(e) {
                
            return !this.getValue();
                
        }
        ,
        // @check if value equals to 
        hasValue : function(v){
                
            return v && (this.getValue()===(''+v));
                
        }
    }
});
        
        
/* 
 * Axio: Complex property types.
 */
  
// @property [valueRange].
// It provides value range logic.
Object.property.define('valueRange'
    ,
    function(propId) {
        
        return {

            //patch entity type with some related methods.
            init: Function.NONE
            ,
            // value setter
            setter : function(v) {
                
                var v0 = this.valueRangePartAdapter(v[0]);
                var v1 = this.valueRangePartAdapter(v[1]);
                
                this._valueRangeLocked = (this._valueRangeLocked||0)+1;
                
                this.setProperty('valueMin', v0);
                this.setProperty('valueMax', v1);
                this.setProperty('value', this.valueFromParts(v0, v1));
                
                this._valueRangeLocked--;
                
                this[propId] = [v0, v1];
                
                return v;
            }
            ,
            // value comparator
            comparator : function(a,b) {
                
                return (!a && !b) || (a && b && a.length>1 && (a.length===b.length) && (a[0]===b[0]) && (a[1]===b[1]));
                
            }
        }
    }
    ,
    // patch entity type attached to
    function(_super) {
        
        return {
        
            //@hook on [value] value is changed
            valueChanged : function(ev,v) {
                
                if (!this._valueRangeLocked) {
                    
                    this._valueRangeLocked = (this._valueRangeLocked||0)+1;
                    
                    this.setProperty('valueRange', (v && v.split && (v=v.split('-')) && (v.length>1)) ? v : [null,null] );
                    
                    _super.valueChanged.call(this, ev, v);
                    
                    this._valueRangeLocked--;
                    
                }
            }
            ,
            //@hook on [valueMin] value is changed
            valueMinChanged : function(ev, v) {
                
                if (!this._valueRangeLocked) {
                    
                    this.setProperty('value', this.valueFromParts(v,this.valueMax));
                }
            }
            ,
            //@hook on [valueMax] value is changed
            valueMaxChanged : function(ev, v) {
                
                if (!this._valueRangeLocked) {
                    
                    this.setProperty('value', this.valueFromParts(this.valueMin,v) );
                }
            }
            ,
            // @adapt part of value 
            valueRangePartAdapter : Function.NONE
            ,
            // @get value from parts
            valueFromParts : function(min,max) {
                
                return ''+(min||'') + '-' + (max||'');
                
            }
        }
    });


// @property [multiValue].
// It provides value multiset logic.
Object.property.define('multiValue'
    , 
    null
    , 
    // patch entity type attached to
    function(_super) {
        
        return {
            
            valueChanged : function(ev, v) {
                
                this.setProperty('mvalue',  v ? ((v.split && v.length) ? v.split(this.mvalueSeparator||",") : [''+v]) : []);
                
                _super.valueChanged.call(this, ev, v);
                
            }
            ,
            getMultiValue : function(){
                
                return this.mvalue || [];
                
            }
            ,
            hasValue : function(v){
                
                return v && (this.getMultiValue().indexOf(''+v) != -1);
                
            }
            ,
            putIntoMultiValue : function(pk, v){
                
                if (!pk) {
                    return;
                }
                
                var mv = this.getMultiValue();
                
                pk = '' + pk;
                
                var contained = (mv.indexOf(pk) != -1);
                var changed = false;
                
                if (v === -1){
                    
                    v = contained ? 0 : 1;
                    
                }
                
                if ((v) && !contained){
                    
                    mv.push(pk);
                    changed = true;
                    
                }
                
                if ((!v) && contained){
                    
                    for ( var i = 0, l = mv.length; i < l; i++){
                        
                        if (pk === mv[i]){
                            
                            mv.splice(i, 1);
                            changed = true;
                            
                            break;
                            
                        }
                    }
                }
                
                changed && this.setValue(mv.sort().join(this.mvalueSeparator));
                
            }
        }
    });

// @property [batchedProperties].
// It patches entity type with ability to property changes in batch.
Object.property.define('batchedProperties'
    ,
    null
    ,
    // patch entity type attached to
    function(_super) { 
        var _undef;
        return  {
            init : function() {
                
                this._changeEvent = {
                    entity:this, 
                    counter:0, 
                    delta : {}
                };
                
                _super.init.call(this);
                
            }
            ,
            // do something inside batch
            batch : function (fn) {
                
                this._touch.counter++;
                fn&& fn.apply(this, Array.prototype.slice.call(arguments,1));
                
                if (!(--this._touch.counter)) {
                    this.changed();
                }
            }
            ,
            // @hook on touch ended
            changed : function () {
                
                this.notifyPropertyChanged('changed',this._changeEvent);
                this._changeEvent.delta = {};
                
            }
            ,
            // @set property value
            _set : function (key, val, asyncUrl, force) {
                
                // prevent execution for finalized entity
                if (!this._done) {
                    if (val && (val.value!==_undef || val.asyncUrl)) {
                        // extract asyncUrl if any
                        if (val.asyncUrl) {
                            asyncUrl = val.asyncUrl;
                            delete val.asyncUrl;
                        } 
                    } else {
                        // wrap value into event instance
                        val = {
                            value:val
                        };
                    }
                    
                    var che = this._changeEvent;
                    che.delta[key]=val.value;
                    che.counter++;
                    
                    this._prop(key).setValue(this, val, asyncUrl, force);
                    
                    if (!(--che.counter)) {
                        
                        this.changed();
                        
                    }
                }
            }
        }
    }
    );


// @property [valueBundle].
// It manage a set of dynamic properties as part of [value] property bundle.
Object.property.define('valueBundle'
    ,
    null
    ,
    // patch entity type attached to
    function(_super) { 
        
        var     
        __allKeys = function(obj) {
            
            var r={};
            for (var key in obj) {
                r[key] = null;
            } 
            return r;
        }
        ,
        __actualDelta = function(obj,oldV) {
            var r = [];  
            for(var n in obj) {
                if (obj.hasOwnProperty(n) && (oldV[n]!==obj[n])) {
                    r.push({
                        id:n,
                        value:obj[n]
                    });
                }
            }
            return r;
        }
        ;
        
        return  {
            
            setValue : function(d) {
                
                this._set('value', d||__allKeys(this.value));
                
            }
            ,
            _get : function (key) {
                
                return (key==='value')?this.value:(this.value?this.value[key]:null);
                
            }
            ,
            _set : function (key, v) {
                
                var _undef;
                if (!this._done) {
                    
                    if (!(v && (v.value!==_undef))) {
                        v = {
                            value:v
                        };
                    }
                    
                    if (!this.write_counter) {
                        
                        this.write_counter=1;
                        var delta;
                        
                        if (key!=='value')
                        {
                            delta = {}
                            delta[key] = v.value;
                        } else {
                            delta = v.value; 
                        }
                        
                        this.update(delta);
                        this.write_counter--;
                        
                    } else {
                        
                        this.delayedDelta = this.delayedDelta||{}
                        this.delayedDelta[key] = v.value;
                        
                    }            
                }
            }
            ,
            update : function(dd) {
                
                var T=this, v = Object.clone(dd), oldV = Object.clone(T.value||{});
                var deltaArr = __actualDelta(v, oldV);
                
                if (deltaArr.length) {
                    
                    if (this.__update(v, false, oldV)) {
                        
                        var ev1 = {
                            entity:T, 
                            oldValue:oldV,  
                            value: T.value
                        }
                        
                        // hook
                        var hook = T.valueChanged;
                        hook && hook.call(T, ev1, ev1.value);
                        
                        // notify
                        T.notifyPropertyChanged( 'value', ev1);
                    }
                }
            }
            ,
            __update : function(delta, hasChanges, oldV) {
                
                this.value = this.value||{};
                var T=this, deltaArr = __actualDelta(delta, oldV);
                
                for (var i=0;i<deltaArr.length;i++) {
                    var e=deltaArr[i], id=e.id;
                    var ev0 = {
                        entity:T, 
                        oldValue:oldV[id],  
                        value: e.value
                    }
                    T.value[id] = e.value;
                    //Object.debug('Update::'+T.id+'.'+id+'=', e.value);
                    // hook
                    var hook = T[id+"Changed"];
                    hook && hook.call(T, ev0, ev0.value);
                    // notify
                    T.notifyPropertyChanged(id, ev0);
                    hasChanges = true;
                }
                
                if (this.delayedDelta) {
                    delta = T.delayedDelta;
                    T.delayedDelta = null;
                    return T.__update(delta, hasChanges, oldV);
                }
                
                return hasChanges;
            }
        }
    });

/**
 * Axio:Entity. Entity framework.
 * Define [EventHandlerReady] property type
 * 
 */
Object.property.define('EventHandlerReady'
    ,
    null
    ,
    function(_super) {
        
        var hIterator = (function (ev) {
            
            this.handleEventImpl(ev);
            
        }).iterator();
        
        // no handler stub
        var HANDLER_STUB = function(ev) {
            ev.callback(Object.error.BAD, 'No operation defined: '+this.id+'.'+ev.uri.host)
        }; 
            
        return {
            // handles Event 
            handleEvent : function(ev){
                
                if (!this.isReady(ev)) {
                    
                    // The execution stack is to buffer up events.
                    (this.deferedEvents || (this.deferedEvents=[])).push(ev);
                    
                } else {
                    
                    this.handleEventImpl(ev);
                    
                }
            }
            ,
            // @return true if handler is ready to perform events
            isReady:function(ev) {
                
                return this.ready;
                
            }
            ,
            // @set ready flag to true
            setReady:function() {
                
                this.setProperty('ready', true);
            }
            ,
            // @set ready flag to true
            unsetReady:function() {
                
                this.setProperty('ready', false);
            }
            ,
            // evaluate defered events
            readyChanged:function(_ev, ready) {
                
                if (ready) {
                    
                    var evs = this.deferedEvents;
                    this.deferedEvents = null;
                    hIterator(evs, this);
                    
                }
            }
            ,
            // handles Event implementation
            handleEventImpl: function(ev) {
                
                ((this.eventHandlers||this)[ev.uri.host] || HANDLER_STUB).call(this, ev);
                
                this.incrementProperty('eventCounter');
                
            }
        }
    });
    
// @define The basic [EventHandler] entity type.
Object.entity.define('EventHandler', {
        
    properties:['EventHandlerReady:ready']
    ,
    ready: true // ready by default
});


/**
 * Axio: Web client remoting.
 */

// MIME type by extension registry. Used for XHR.
Object.MIME={
    'json': 'application/json',
    'js': 'application/json',
    'html': 'text/html',
    'txt': 'text/plain'            
};

// Parsers for given resource type
Object.parsers = {
    'js': Object.parse,
    'json': Object.parse,
    'uri': Object.parseUri
};

//## Remoting source with XMLHttpRequest
(function(_win) {
   
    var _newRequest = function() {
        try {
            return new _win['XMLHttpRequest']();
        } catch (e) {
            try {
                return new _win.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    ,
    _error = function (st,text) {
        return (!st || (st>=200 && st<300) || (st===304))? null : {
            reason: 'remote_error',
            message: text ||'Remote error',
            code:st
        };
    }
    ,
    _negotiateResultType = function (u) {
        var urlId  = Array.item(u.path, -1), p, r = 'js';
        if (urlId && (p = urlId.lastIndexOf('.')) > -1) {
            r = urlId.substring(p + 1);
        }
        return r;
    }
    ,
    _perform = function (ev) {
        try {
            var rq = _newRequest();
            var dataType = ev.dataType || _negotiateResultType(ev.uri);
            rq['open'](ev.method || (ev.payload?"POST":"GET"), ''+ev.uri, true);
            
            rq.onreadystatechange = function() {
                if ((this.readyState == 4) && (!ev.completed)) {
                    ev.completed = true;
                    this.onreadystatechange = Function.NONE;
                    ev.callback(
                        _error(this.status,this.statusText)
                        ,
                        (ev.unmarshaller || Object.parsers[dataType] || Function.NONE)(this.responseText)
                        );
                }
                return false;
            };

            var headers =Object.update({
                'Accept':Object.MIME[dataType]||"*",
                'Language': String.LANGUAGE
            }, ev.headers);
            
            for (var h in headers) {
                if (headers[h]) {
                    rq.setRequestHeader(h, headers[h]);                
                }
            }

            if (ev.payload) {
                if (typeof(ev.payload)==='object') {
                    rq.setRequestHeader('Content-Type','application/json;charset=UTF-8');
                    ev.payload = JSON.stringify(ev.payload);
                }
                rq.send(ev.payload);
            } else {
                rq.send(null);
            }
            
        } catch (ex) {
            ev.callback(Object.error('remote_error','Failed remote request:'+ev.uri,ex));
        }
    };
    
    // Performs http request, unmarshalls response and calls back.
    Object.entity.create({
        id:'EventHandler:default', 
        handleEventImpl: _perform
    });      
    Object.entity.create({
        id:'EventHandler:remote', 
        handleEventImpl: _perform
    });    
    Object.entity.create({
        id:'EventHandler:http', 
        handleEventImpl: _perform
    });    
    Object.entity.create({
        id:'EventHandler:https', 
        handleEventImpl: _perform
    });    

})(this);

//## Remoting source with <SCRIPT> tag
(function(global, registry, counter) {
    var _doc  =global.document, isIE8 =!! _doc.all;
    // IE8 hack: onload event for scripts
    function onloadjs(js,func, errfn)
    {
        if(isIE8){
            js.onreadystatechange = function() {
                if (js.readyState === 'loaded' || js.readyState === 'complete') {
                    js.onreadystatechange = "";
                    func();
                }
            }
        }
        else {
            // most browsers
            js.onload = func;
            js.onerror = errfn;
        }
    }
    var _handler = function(ev) {
        var script = _doc.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        if (!ev.noAsynMode) {
            script.async = 'async';
        }
        
        if (ev.scriptId) {
            script.id = ev.scriptId;
        }
        
        if (ev.scriptAttrs) {
            Object.update(script, ev.scriptAttrs);
        }

        var u = ev.uri;
        if (u.type==='script') {
            u.type='http';
        }
        if (ev.callback) {
            onloadjs(script
                ,function(){
                    ev.callback(null, null, this);
                }
                ,function(){
                    ev.callback({
                        reason:'script error:' +u
                    })
                });
        }
        script.src = ''+u;
        Object.dom.appendToHead(script);
    };
    
    var _handlerJSONP = function(ev) {
        var script = _doc.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = 'async';

        var u = ev.uri;
        if ((u.type==='jsonp') || (u.type==='jsonps')) {
            u.type=(u.type==='jsonp')?'http':'https';
        }
        var sid = 'n'+counter++;
        u.params[u.params.jsonp||'callback']=escape('window._JSONP.' + sid)
        registry[sid] = function(r) {
            ev.callback(null, r);
        };
        onloadjs(script
            ,function() {
                script.parentNode.removeChild(script);
                delete registry[sid];
            }
            ,function(){
                ev.callback(Object.error('remote_error','JSONP script error:' +u))
            }
            );
        script.src = ''+u;
        Object.dom.appendToHead(script);
    };
    
  
    Object.entity.create({
        id:'EventHandler:script', 
        handleEventImpl: _handler
    });    
    Object.entity.create({
        id:'EventHandler:jsonp', 
        handleEventImpl: _handlerJSONP
    });    
    Object.entity.create({
        id:'EventHandler:jsonps', 
        handleEventImpl: _handlerJSONP
    });    
   
})(this, this._JSONP = {}, 0);


/**
 * Axio: Web DOM API.
 */
Object.dom = (function(_win){
    
    var _doc = _win.document;
    
    var _createEvent = function(evt) {
        var r = {}, e;
        if (_win.event) {
            r.internal = _win.event;
            r.target = e =_win.event.srcElement;
        } else {
            r.internal = evt;
            e = evt.target;
            while (e && e.nodeType != 1) {
                e = e.parentNode;
            }
            r.target = e;
        }
        while (e && !e.entity) {
            e = e.parentNode;
        }
        r.entity = e && e.entity;
        return r;
    };
    
    // common styles
    Object.STYLE_LINE_FIXED = 'overflow:hidden;white-space:nowrap;cursor:pointer;';
    Object.STYLE_TEXTLINE = 'white-space:nowrap;line-height:1.5em;vertical-align:middle;';
    
    var _ALIVE_EVENTS_KEYS  = ['mousedown','mouseup','click', 'mousemove', 'mouseover', 'mouseout'];
    
    var _ALIVE_HANDLER  = function(ev0) {
        var T = this;
        if (!T.disabled) {
            var ev = _createEvent(ev0), type = ev.internal.type;
            switch(type) {
                case "mousedown":
                    T.updateDomNodeClass(T.stylePressed);
                    //_lastTouchedEntity=evt.entity;
                    T.touchBegin && T.touchBegin(ev);
                    break;
                case "mouseup":
                    T.touchEnd && T.touchEnd(ev)
                    T.updateDomNodeClass('!'+T.stylePressed);
                    break;  
                case "click":
                    T.tapped && T.tapped(ev)
                    break;
                case "mousemove":
                    T.mouseMove && T.mouseMove(ev)
                    break;
                case "mouseover":
                    T.updateDomNodeClass(T.styleHovered);
                    T.mouseOver && T.mouseOver(ev)
                    break;
                case "mouseout":
                    T.mouseOut && T.mouseOut(ev)
                    T.updateDomNodeClass('!'+T.styleHovered);
                    break;
            }
        }
        return true;
    }
    
    return { 
        //creates UI event
        document: _win.document
        ,
        createEvent : _createEvent
        ,
        // creates a new DOM Element
        createElement : function(type, attrs)
        {
            return Object.update(_doc.createElement(type||'DIV'), attrs);
        }
        ,
        createComplexElement : function(tag, attrs)
        {
            // hack for type set on IE8
            var div = this.DOM_FACTORY || (this.DOM_FACTORY = _doc.createElement("div"));
            div.innerHTML = tag;
            var r = div.firstChild;
            div.removeChild(r);
            return Object.update(r, attrs);
        }
        ,
        appendToHead: function(el){
            var fjs = _doc.getElementsByTagName('head')[0];
            fjs.appendChild(el);
        }
        ,
        appendCss: function(href){
            this.appendToHead(this.createElement('link',{rel:'stylesheet',href:href}));
        }
        ,
        // finds a DOM Element from parent
        getElementById : function(id)
        {
            return _doc.getElementById(id) || null;
        }
        ,
        // removes a DOM Element from parent
        removeElement : function(e)
        {
            if (e && e.parentNode) {
                e.parentNode.removeChild(e);
            } 
        }
        ,
        // makes entity view alive
        alive : function (T){
            this.listenEvents(T,_ALIVE_EVENTS_KEYS, function(ev0) {
                return _ALIVE_HANDLER.call(T, ev0);
            });
        }
        ,
        // bind handler for entity DOM event
        listenEvents : function (T, key, fn, fl){
            var node = T ? T.domNode : _doc, keys = key.split ? key.split(' ') : key;
            for (var i = 0, max = keys.length; i < max; i++) {
                key = keys[i];
                if (node.addEventListener) {
                    node.addEventListener(key, fn, fl);//, false
                }
                else {
                    node.attachEvent("on"+key, fn, fl);
                }
            }
        }
        ,
        // stops event bubbling
        stopEvent : function (ev){
            var e = ev && ev.internal;
            e.stopPropagation && e.stopPropagation();
            return  e && (e.cancelBubble = true);
        }
        ,
        // returns size of client viewport
        isKeyboardCode : function (ev, code) {
            if (!ev) {
                ev = _win.event || {};
            }
            return ev.keyCode===code || ev.charCode===code || ev.which===code
        }
        ,
        KEY_CODE: {
            ESCAPE: 27,
            ENTER: 13,
            TAB: 8
        }
        ,
        // returns size of client viewport
        viewportSize : function (){
            var scr = _win.screen;
            return {
                width:scr.availWidth , 
                height:scr.availHeight
            };
        }
        ,
        // returns total offset of element 
        getTotalOffset : function(p) {
            var r = {
                top : 0, 
                left : 0,
                width : p.clientWidth,
                height : p.clientHeight
            };
            while (p) {
                r.top += p.offsetTop - p.scrollTop;
                r.left += p.offsetLeft - p.scrollLeft;
                p = p.offsetParent;
            }
            return r;
        } 
        ,
        // UI error handler
        handleError : function(err) {
            Object.error.log(err);
        }
        ,
        // sets/remove class for elt. 
        // Classes to remove have to be prefixed with '!' sign.
        updateClass: function(elt, delta) {
            if (elt && delta) {
                var clss= elt.className.split(' '), i,l, cl;
                delta = delta.split(' ')
                for (i=0, l=delta.length; i<l; i++) {
                    cl = delta[i];
                    if (cl) {
                        if (cl[0]==='!') {
                            if (cl==='!*') {
                                clss = [];
                            } else {
                                var p = clss.indexOf(cl.substring(1));
                                if (p>-1) {
                                    clss[p] ='';
                                }
                            }
                        } else {
                            if (clss.indexOf(cl)===-1) {
                                clss.push(cl);
                            } 
                        }
                    }
                }
                delta='';
                for (i=0, l=clss.length; i<l; i++) {
                    cl = clss[i];
                    if (cl) {
                        delta = delta ? ( delta+' '+cl ) : cl;
                    }
                }
                elt.className = delta;
            }
            return elt;
        }
        ,
        // Creates Entities from given DOM tree.
        init : (function() {
    
            var re_dashAlpha = /-([\da-z])/gi
            ,
            fn_camelCase = function( all, letter ) {
                return letter.toUpperCase();
            }
            ,
            _getAllWidgets = (_doc.querySelectorAll) 
            ? function(root){
                return root.querySelectorAll('[data-widget]');
            }
            : function(root) {
                for (var i=0, all=root.children, widgets = []; i<all.length; i++) {
                    var c = all[i];
                    if (c.getAttribute('data-widget')) {
                        widgets.push(c);
                    }
                    _getAllWidgets(c, widgets);
                }
                return widgets;
            }  
            ,
            // initializes widgets iterator
            _applyWidgetsInitIterator = (function(v){
                var meta = {};
                var attr = v.attributes;
                for (var i=0,name, l = attr.length; i < l; i++ ) {
                    name = attr[i].name;
                    if ( !name.indexOf( "data-" ) ) {
                        meta[ name.substring(5).replace( re_dashAlpha, fn_camelCase ) ] = v.getAttribute( name );
                    }
                }
                var id = v.getAttribute('id');
                meta['id'] = meta['widget'] + (id?(':'+id):'');
                meta.domNode=v;
                meta.parentEntity = this.parentEntity;
                try {
                    //Object.debug('widget', id, meta);
                    
                    Object.entity.create(meta);
                } catch (ex) {
                    Object.error.log('wrong_widget', ex.message, meta);
                    if (this.handleError) {
                        this.handleError(ex, meta);
                    } 
                }
            }).iterator()
        
            // initializes all widgets over DOM tree
            return function(root, options) {
                if (!root) {
                    root = Object.entity.create({
                        id:'box',
                        domNode:_doc.body
                    });  
                }

                var handleError = function  (ex, meta) {
                    var node = Object.dom.createElement();
                    meta.domNode.appendChild(node);
                    Object.entity.create({
                        id: 'html', 
                        parentEntity : root ,
                        style: 'alert-error', 
                        html: 'Error: '+(ex.message||('can\'t create UI view: '+meta.id))
                    })
                };
                
                _applyWidgetsInitIterator(_getAllWidgets(root.domNode)
                    ,
                    Object.update({
                        handleError:handleError,
                        parentEntity: root
                    }, options));
            }  
        })()
    }

})(window);


/* 
 * Web Storage.
 */
(function(global){
    
    var STORAGE_STUB = {
        getItem: function(key) {
            return this[key];
        }
        ,
        setItem: function(key, value) {
            this[key]=value;
        }
    };

    Object.entity.define('WebStorage', {
        properties: ['valueBundle:value']
        ,
        storage: global.localStorage || STORAGE_STUB
        ,
        methods : function (_super) {
        
            return {
                init : function() { 
                    
                    
                    this.initStorage();
                    
                    _super.init.call(this);
                    
                }
                ,
                initStorage: function() {
                    
                    var s = this.storage.getItem(this.id);
                    this.value = s && Object.parse(s) || this.value || {};
                    
                }
                ,
                valueChanged : function(ev, val) {
                    
                    _super.valueChanged.call(this, ev, val);
                    
                    this.persistValue(val) ;
                    
                }
                ,
                persistValue : function(s) {
                    
                    s  = JSON.stringify(s);
                    if (this.storage[this.id] != s) {
                        //Object.debug('Persist::'+this.id, s);
                        try {
                            this.storage.setItem(this.id, s);
                        }
                        catch (e) {
                        //Object.error.log('Persist::'+this.id, s, e);
                        }
                    }
                }       
            };
        }
    });

})(this);

/* 
 * Axio Web client: local caching.
 */

// creates Channel handler that enables data cache in localStorage by versions.
Object.createVersionedCacheSource = function (config) { 
    var  _cache = {}
    ,
    _lstorage = window[(config.scope||'local')+'Storage']
    ,
    _ver = config.version || '0'
    ,
    _cacheDeserializer = config.cacheDeserializer || Object.parse
    , 
    _urlTemplate = config.urlTemplate || "{0}"
    ,
    _unmarshaller = config.unmarshaller || Function.NONE; // force plain result


    if (typeof(_ver)=='function') {
        _ver = _ver(config);
        
    }

    if ((_ver==-1) || !_lstorage){
        return config.noVersionHandler || function(ev){
            var u = ev.uri, id = u.id.substring(2);
            var cb = function(err, data) {
                var rr = null;
                if (!err && data){
                    rr = _cacheDeserializer.call(id, data);
                } 
                ev.callback(err, rr);
            };
            Object.notify({
                uri:String.format(_urlTemplate,id)
                ,
                callback:cb
                ,
                unmarshaller: _unmarshaller
            });           
        }
    }

    return function(ev){
        var u = ev.uri, id = u.id.substring(2), key=u.type+':'+id, r = _cache[id];
           
        // try local storage
        if (!r && (r = _lstorage[key]) && (r.indexOf(_ver+":")===0) && (r = r.substring(_ver.length+1)) ) {
            r = _cache[id] = _cacheDeserializer.call(id, r);
        } else {
            r = null;
        }
           
        if (r) {
            ev.callback(null, r);
        } else {
            var cb = function(err, data) {
                var rr = null;
                if (err) {
                    Object.error.log('fetch data for versioned cache',id , err);
                } else if (data) {
                    rr = _cache[id] = (typeof(data)==='object')?data:_cacheDeserializer.call(id, data);
                    try {
                        _lstorage.setItem(key, (_ver+":"+((typeof(data)==='object')?JSON.stringify(data):data)));
                    }
                    catch (e) {
                    // Object.log('set item of versioned cache', id,  e);
                    }
                } 
                ev.callback(err, rr);
            };
            
            Object.notify({
                uri:String.format(_urlTemplate, id)
                ,
                callback:cb
                ,
                unmarshaller: _unmarshaller
            });           
        }
    };
};

Object.cache = {
    createSource : Object.createVersionedCacheSource
    ,
    createJSSource: function(version, urlTemplate, key) {
        // register async listener for cached js
        urlTemplate = urlTemplate|| ('/js/{0}.js?v='+version);
        Object.entity.create({
            id:'EventHandler:'+(key||'js')
            ,
            handleEvent: this.createSource({
                version: version, 
                urlTemplate: '[remote]'+urlTemplate,
                cacheDeserializer: function(s) {
                    try {
                        (Function.call(Function, s))()
                        return true;
                    } catch (ex) {
                        Object.error.log(Object.error.BAD, 'JS syntax: '+ex.message,s);
                    }
                    return null;
                }
                ,
                noVersionHandler:function(ev) {
                    var u = ev.uri;
                    Object.require(['[script]'+String.format(urlTemplate, u.id.substring(2))], ev.callback);
                }
            })
        });
    }
    ,
    createL10NSource: function(version, urlTemplate, key) {
        // register async listener for L10N API calls
        Object.entity.create({
            id:'EventHandler:'+(key||'l10n')
            ,
            handleEvent: this.createSource({
                version: version, 
                urlTemplate: '[remote]'+(urlTemplate || ('/l10n/l10n-{0}.js?v='+version)),
                cacheDeserializer:  function(str) {
                    try {
                        String.localize.addBundle((Function.call(Function, str))());
                        return true;
                    } catch (e) {
                        Object.error.log('Object.parse', str, e);
                    }
                    return null;
                }
            })
        });
    }
};



//## [CachedResourceProvider] component:
Object.entity.define('CachedResourceProvider extends EventHandler', {
    urlTemplate : "{0}"
    ,
    version:-1
    ,
    scope : 'local'
    ,
    methods : function (_super) {
        return {
            init : function() {
                _super.init.call(this);
                
                this.handleEventImpl = Object.createVersionedCacheSource({
                    version: this.version, 
                    urlTemplate: this.urlTemplate,
                    cacheDeserializer : this.cacheDeserializer,
                    scope: this.scope
                });
            }
        }
    }
});
    
/**
 * Definitions of [view] and [box] entity types 
 * and its properties: [domNode], [style], [hidden] and [children].
 */
(function(_undef) {

    //## @entity UI [view] entity type. 
    // This is root entity type for all other types of UI views.
    // It just attaches three core UI properties: [domNode], [style] and [hidden].
    Object.entity.define('view', {
        properties:[':domNode',':style',':hidden']
    });

    //## @entity UI [box] entity type. 
    // Simplest UI container. 
    // It just extend  [view] entity type with [children] property.
    Object.entity.define('box extends view', {
        properties:[':children']
    });

    //## @property The [domNode] property of view
    // related entity attributes:
    // @attr domNodeType - DOM node tag 
    // @attr domNodeAttrs - DOM node attributes
    // @attr alive - force DOM event listening
    Object.property.define('domNode', function(propId) { 
        var $D = Object.dom;
        return {
            // first value init
            init : function(T)
            {
                var node = T.domNode;
                // create if none
                if (!node) {
                    var attrs={}
                    if (T.id!==T._id) {
                        attrs.id=T.id;
                    }
                    node = T.domNode = $D.createElement(T.domNodeType, Object.update(attrs,T.domNodeAttrs));
                }
                // children appended to 
                T.contentNode =  node;
                // back reference
                node.entity = T;
                // make alive if needed
                if (T.alive){
                    $D.alive(T);
                }
                
                if (T.parentEntity && (!node.parentNode || !node.parentNode.parentNode)) {//!T.isDomNodeEmbedded &&  && 
                    T.parentEntity.contentNode.appendChild(node);
                }                

                T.addFinalizer(this.done);
            }
            ,
            // done property with entity instance
            done : function(T)
            {
                var e = T.domNode;
                
                if (e)
                {
                    $D.removeElement(e);
                    
                    e.entity = null;
                    
                    delete T.domNode;
                    delete T.contentNode;
                }
            }
        }
    }    
    ,
    function(_super) {
        return {
            // Sets UI style attributes
            init : function() {
                
                _super.init.call(this);
                
            }
        }
    });

    //## @property The [style] property of view
    // related entity attributes:
    // @attr css - custom DOM node style 
    Object.property.define('style', function(propId) { 
        return {

            // @init 
            init : function(T)
            {
                var r = T.domNode;
                
                if (T.css) {
                    r.style.cssText += T.css;
                }
                
                if (T.styleExpression) {
                    Object.property.bind(T, this.id, T.styleExpression);
                }
                
                T.updateDomNodeClass((T.style||'') +' '+(r.className||''));
                
            }
            ,
            //@get value getter.
            getValue : function(T) {
                
                return T.domNode.className;
                
            }
            ,
            //@setter value
            setter : function(v, ev) {
                
                if (typeof v === 'string') {
                    this.updateDomNodeClass(v);
                } else {
                    this.updateDomNodeStyle(v);
                }
                
            }
        }
    }
    ,
    function(_super) {
        return {
            // Sets UI style attributes
            domNodeStyle : function(delta) {
                var v,n, st = this.domNode.style;
                
                if (delta) {
                    for (n in delta) {
                        v = delta[n];
                        if (st[n]!==v) {
                            st[n] = v;
                        }
                    }
                }
                
                return st;
            }
            ,
            // Updates UI style class
            updateDomNodeClass : function(delta) {
                
                Object.dom.updateClass(this.domNode, delta);
                
            }
            ,
            // Sets/Unsets UI style class
            toggleDomNodeClass : function(cl, flag) {
                
                Object.dom.updateClass(this.domNode, (flag?cl:('!'+cl)));
                
            }
        }
    }
    );

    //## @property The [hidden] property of view
    // related entity attributes:
    // @attr displayType - type of display: 'inline', 'block', 'inline-block'
    Object.property.define('hidden', function(propId) { 
        return {
            setter : function(v) {
                
                this[propId] = v;
                
                this.domNode.style.display =  v ? "none" : (this.displayType||'');
                
            }
        }
    }
    ,
    function(_super) {
        return {
            // Sets an Element "display" flag.
            display : function(f,bForceParents) {
                
                this.setHidden(!f);
                
                if (f && bForceParents) {
                    
                    var p = this;
                    while ((p = p.parentEntity)) {
                        p.display(f);
                    }
                    
                }
            }
            ,
            // switches an Element "display" flag.
            switchDisplay : function() {
                
                this.setHidden(!this.hidden);
                
            }
            ,
            // sets an Element "visible" flag.
            setHidden : function(f) {
                
                this._set('hidden',f);
                
            }
        }
    }
    );


    //## @property UI [children] property
    // Used by [box] entity and its descendants.
    // @attr childrenAsyncAdapter - adapt result of async fetching
    // @attr childrenAdapter - adapt meta data before set
    Object.property.define('children'
        ,
        function(propId, _super) { 
            
            var _addOp  =function(T, e, ch){
                return function(){
                    
                    var cb = this.cb();
                    
                    T.createChild(e, function(err, e){
                        e && ch.push(e);
                        cb();
                    });
                                            
                    return true;
                }
            };
            
            return {
                
                // Callback used in Sets property value from async url.
                // used in Property.setAsyncValue() as callback
                // calls event adapters: from entity or default if none
                createAsyncValueCallback : function(T) { 
                    
                    return  function(err, value) {
                        if(!T._done) {
                            T.updateDomNodeClass('!ui-busy');
                            T._set(propId, T.childrenAsyncAdapter(err, value));
                        }
                    };
                    
                }
                ,
                // Sets property value from async url.
                setAsyncValue : function(T, url) {
                    
                    T.updateDomNodeClass('ui-busy');
                    
                    _super.setAsyncValue.call(this,T,url);
                    
                }
                ,
                // sets value
                setValue : function(T, ev, url)
                {
                    // checks if code dependencies specified
                    var requires  =ev.requires || T.childrenRequires;
                    
                    if (requires) {
                        
                        var p = this;
                        Object.require(requires, function (err) {
                            ev.requires = T.childrenRequires = null;
                            if (err) {
                                ev.value =['label://alert/alert-error?caption=no_required_scripts for content']
                            }
                            p.setValue(T,ev);
                        });
                        
                    } else {
                        
                        if (url) {
                            this.setAsyncValue(T, url);
                        } else {
                            
                            // removes all currently added
                            T.removeAllChildren();
                            var v = (T.childrenAdapter||Function.NONE).call(T, ev.value, ev);
                            //T.trace('set children',v);
                            
                            var ops = [];
                            
                            if (v && v.length > 0) {
                                var ch = T.getChildren();
                                for ( var i = 0, l = v.length,e; i < l; i++) {
                                    e = v[i];
                                    if (e) {
                                        ops.push(_addOp(T, e, ch));
                                    }
                                }
                            }
                            
                            // callback into entity if exists
                            ops.push(function(){
                                T.childrenChanged && T.childrenChanged(ev, v);
                            });
                            
                            Function.perform(ops);
                        }


                    }
                }
                ,
                done : function(T) {
                    
                    // cascade done
                    T.removeAllChildren();
                    _super.done.call(this, T);
                    
                }
            }
        }
        ,
        // @patch entity type
        function(_super) {
            return {
                // Creates a new child.
                createChild : function(r, cb){
                    if (Array.isArray(r)) {
                        var ch = (r.length>1)?Array.slice(r,1):null;
                        r = (typeof(r[0])==='string')?Object.entity.create.parseMeta(r[0]):r[0]
                        if (ch) {
                            r.children=ch;
                        }
                    } 

                    r = (typeof(r)==='string')?Object.entity.create.parseMeta(r):r;

                    if (!cb) {
                        var T = this;
                        cb = function(err, e) {
                            T.getChildren().push(e);
                            T.childrenChanged && T.childrenChanged({
                                value:[r]
                            });
                        }
                    }

                    var e = Object.entity.create(Object.update({
                        id:'box', 
                        parentEntity : this
                    },r), cb);
                    

                    return e;
                }
                ,
                // gets list of children
                getChildren : function() {
                    return this._children || (this._children=[]);
                }
                ,
                // invokes done() for each and then removes all children
                removeAllChildren : (function() {
                    
                    var _iterator_done = (function(v){
                        v.done();
                    }).iterator();
                    
                    return function()
                    {
                        this._children = _iterator_done(this._children, []);
                    }
                    
                })()
                ,
                // creates a set of children by given {#meta}
                setChildren : function(meta) {
                    
                    this._set('children', meta);
                    
                }
                ,
                // @adopt async value.
                childrenAsyncAdapter : function(err, value) {
                    
                    if (err) {
                        
                        value = [{
                            id:'html',
                            html:String.localize(err.reason||'unknown_error')
                        }];
                    
                    }
                    return value;
                }
            }
        });
})();
/**
 * Axio UI views and properties basics.
 */

// @define The [caption] property.
Object.property.define('caption extends nonequal'
    ,
    function(propId) { 
        return {
            // setter
            setter : function(v, ev) {
                this[propId] = v = v || '';
                var e=this.getCaptionElt(), hidden = (v === 'none');
                if (e) {
                    e.display(!(e.hidden || hidden));
                    v = this.getCaptionHtml(v, ev);
                    try {
                        e.domNode.innerHTML = (hidden || !v)? '' :v;
                    } catch (e) {
                        Object.error.log('Caption set error',e);
                    }
            
                }
            }
        }
    }
    ,
    // patches entity type attached to
    function(_super) {
        return {
            getCaptionElt : function(v, ev){
                return this.captionElt || this;
            }
            ,
            getCaptionHtml : function(v, ev){
                return (this.icon?'<i class="icon-'+this.icon+'"></i> ':'')+String.localize(v,ev.quantity);
            }
        }
    }
    );

// @define The [html] property.
Object.property.define('html extends nonequal'
    ,
    function(propId, _super) { 
        return {
            // Sets property value asyncly.
            setAsyncValue : function(T, ev, asyncUrl) {
                this.setter.call(T, null, ev);
                _super.setAsyncValue.call(this, T, ev, asyncUrl);
            }
            ,
            getValue : function(T) {
                return Object.get(T,'contentNode.innerHTML');
            }
            ,
            // setter
            setter : function(v, ev) {
                var node = this.contentNode;
                if (node) {
                    try {
                        node.innerHTML = v || "<div>&nbsp;&nbsp;</div>";
                    } catch(err) {
                        node.innerHTML = String.format('<div>{0}</div>', String.localize('html_content_error'));
                    }
            
                }
            }
        }
    }
    );

// @define UI [disabled] Property
Object.property.define('disabled extends boolean'
    ,
    // nothing to override
    null
    ,
    // patches entity type attached to
    function(_super) {
        return {
            disabledChanged : function(ev, v) {
                this.domNode.disabled = v?'disabled':'';
                this.toggleDomNodeClass('disabled', v);
            }
        }
    }
    );

// @define UI html view.
Object.entity.define('html extends view', {
    properties:['html:html']
});
// @define UI [dhtml] entity
Object.entity.define('dhtml extends html', {
    methods: function(_super) {
        return {
            htmlChanged : function() {
                Object.dom.init(this);
            }
        }
    }
});

// @define UI label view.
Object.entity.define('label extends view', {
    properties:['caption:caption']
    ,
    domNodeType:'span'
});

// @define UI button view.
Object.entity.define('button extends view',{
    properties:['disabled:disabled', 'caption:caption', 'html:html']
    ,
    domNodeType:'button'
    ,
    alive:true
    ,
    style:'btn'
    ,
    tapped : function(ev){
        if (this.async) {
            var asyncEv = this.async();
            if (asyncEv) {
                this.setProperty('disabled', true);
                this.updateDomNodeClass('ui-busy');
                if (this.busyCaption) {
                    this.savedCaption = this.caption;
                    this.setProperty('caption',this.busyCaption);
                }
                var T = this;
                var _cb = asyncEv.callback;
                asyncEv.callback = function(ev){
                    _cb && _cb.apply(T, arguments);
                    T.updateDomNodeClass('!ui-busy');
                    T.setProperty('disabled', false);
                    if (T.savedCaption) {
                        T.setProperty('caption',T.savedCaption);
                        T.savedCaption = null;
                    }
                };
                Object.notify(asyncEv);
            }
        } else if (this.action) {
            this.setProperty('disabled', true);
            this.updateDomNodeClass('ui-busy');
            this.action(ev);
            this.updateDomNodeClass('!ui-busy');
            this.setProperty('disabled', false);
        }
    }
});


/**
 * UI List view.
 */

// ## Item list view:
Object.entity.define('List extends box',{
    properties:['data','selection',':value']
    ,
    domNodeType:"ul"
    ,
    itemTemplate:'<a href="#">{name}</a>'
    ,
    dataIdKey:'id'
    ,
    itemDomNodeType : 'li'
    ,
    alive: true
    ,
    methods : function (_super) {
        var _childrenAdapterIterator = (function(datum, i, T) {
            this.push(T.childrenItemAdapter(datum, i));            
        }).iterator()
        ,
        _findItemByValueIterator = (function(w) {
            if (w.value && (w.value === this.value)) {
                this.setProperty('selection', w);
            }
        }).iterator();
        
        return {
            valueChanged : function(ev) {
                this.syncSelection();
            }
            ,
            dataChanged : function(ev) {
                this.setChildren(ev);
                this.syncSelection();
            }
            ,
            tapped : function(ev) {
                for (var w = ev.entity; w && (w!==this); w = w.parentEntity) {
                    if ((w.domNodeType===this.itemDomNodeType) && w.value){
                        this.setValue(w.value);
                        break;
                    }
                }
            }
            ,
            syncSelection : function() {
                _findItemByValueIterator(this.getChildren(),this);
            }
            ,
            selectionChanged : function(ev)
            {
                ev.oldValue && ev.oldValue.updateDomNodeClass('!active');
                ev.value && ev.value.updateDomNodeClass('active');
            }
            ,
            childrenAdapter :function(data) {
                return _childrenAdapterIterator(data, [], this);
            }
            ,
            childrenItemAdapter :function(datum, i) {
                return {
                    id: 'html',
                    domNodeType: this.itemDomNodeType,
                    style: this.itemStyle,
                    html: String.formatWithMap(this.itemTemplate, datum),
                    value: datum[this.dataIdKey],
                    datum: datum
                };
            }
        }
    }
});



