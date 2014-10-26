
/*
AXOID.JS - Entity, its Properties and Events
 */


/*
Event
 */

(function() {
  var Entity, Event, Property,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Event = (function() {
    var DEFERED, LISTENERS, REGISTRY_BY_TARGET, Record, _compileExpression, _defer, _notify, _obj;

    LISTENERS = {};

    DEFERED = {};

    REGISTRY_BY_TARGET = {};

    _obj = function(key, force) {
      var k, obj, p, p1;
      obj = LISTENERS;
      p1 = -1;
      while ((p = key.indexOf(".", p1 = p + 1)) > -1) {
        obj = obj[k = key.slice(p1, +(p - 1) + 1 || 9e9)] || (obj[k] = {});
      }
      return obj[k = key.slice(p1)] || (force && (obj[k] = {}));
    };

    _defer = function(key) {
      return (DEFERED[key] || (DEFERED[key] = [])).push(this);
    };

    _notify = function(obj) {
      var rec;
      rec = obj != null ? obj.first : void 0;
      while (rec) {
        try {
          rec.handler.call(rec.target, this);
        } catch (_error) {
          Object.error('notify: ' + _error.message, Object.update(_error, {
            op: ('' + rec.handler).replace(/\n+/g, '').slice(9, 151)
          })).log();
        }
        rec = rec.next;
      }
      return this;
    };

    _compileExpression = function(s, tId) {
      var body, fn, src, _reg;
      if (tId == null) {
        tId = this.id;
      }
      _reg = {};
      src = [];
      body = s.replace(/<(@?[\w\.$ ]+?)>/gm, function(s, path) {
        var flag, id, prop, _ref, _ref1;
        _ref = path.split(' '), path = _ref[0], flag = _ref[1];
        _ref1 = path[0] === '@' ? [tId, path.slice(1)] : path.split("."), id = _ref1[0], prop = _ref1[1];
        if (!prop) {
          prop = "value";
        }
        path = id + "." + prop;
        if (!id) {
          throw new Error("No id for binding source in " + s);
        }
        if (!_reg[path]) {
          _reg[path] = 1;
          src.push({
            id: path,
            flag: flag,
            entityId: id,
            propName: prop
          });
        }
        return "$[\"" + path + "\"]";
      });
      fn = (function() {
        try {
          return new Function('$', "return " + (body.replace('@', 'this.')) + ";");
        } catch (_error) {
          Object.error("bad-code: Wrong binding expression: " + body, _error).log();
          return function() {
            return _error.message;
          };
        }
      })();
      return {
        sources: src,
        message: s,
        expression: fn
      };
    };

    Record = (function() {
      function Record(handler, target) {
        var t;
        this.handler = handler;
        this.target = target != null ? target : null;
        if ((t = (target != null ? target._id : void 0) || target)) {
          (REGISTRY_BY_TARGET[t] || (REGISTRY_BY_TARGET[t] = [])).push(this);
        }
      }

      Record.prototype.remove = function() {
        if (this.next) {
          this.next.prev = this.prev;
        } else {
          this.obj.last = this.prev || null;
        }
        if (this.prev) {
          this.prev.next = this.next;
        } else {
          this.obj.first = this.next || null;
        }
        this.obj = null;
        return this;
      };

      Record.prototype.add = function(obj) {
        this.obj = obj;
        if (obj.last) {
          (obj.last.next = this).prev = obj.last;
        } else {
          obj.first = this;
        }
        return obj.last = this;
      };

      return Record;

    })();

    function Event(u) {
      if (u) {
        Object.update(this, u);
      }
      if (this.uri) {
        this.uri = Object.Uri.parse(this.uri);
      }
    }

    Event.prototype.isEvent = true;

    Event.prototype.callback = function() {};

    Event.prototype.update = function(delta) {
      return Object.update(this, delta);
    };

    Event.prototype.addTrace = function(s) {
      if (s) {
        return (this.trace || (this.trace = [])).push(s);
      }
    };

    Event.prototype.fire = function(cb) {
      var key, obj;
      if (!(key = this.uri.type)) {
        throw "No target specified for event " + (this.uri.toString());
      }
      if (cb) {
        this.callback = cb;
      }
      if (obj = LISTENERS[key]) {
        return _notify.call(this, obj);
      } else {
        _defer.call(this, key);
        return Object.log("!!! Defer event for [" + key + "]");
      }
    };

    Event.isEvent = function(e) {
      return e.isEvent;
    };

    Event.listen = function(key, handler, target, dbgMessage) {
      var ev, list, _i, _len;
      if (!key) {
        throw new Error("No key to listen " + target);
      }
      new Record(handler, target, dbgMessage).add(_obj(key, true));
      if (list = DEFERED[key]) {
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          ev = list[_i];
          ev.fire();
        }
        return delete DEFERED[key];
      }
    };

    Event.unlisten = function(key) {
      return delete LISTENERS[key];
    };

    Event.removeForTarget = function(T) {
      var e, key, reg, _i, _j, _len, _len1, _ref;
      _ref = [T.id, T._id];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (key) {
          if ((reg = REGISTRY_BY_TARGET[key])) {
            for (_j = 0, _len1 = reg.length; _j < _len1; _j++) {
              e = reg[_j];
              e.remove();
            }
            delete REGISTRY_BY_TARGET[key];
          }
        }
      }
      return this;
    };

    Event.notifyPropertyChanged = function(key, ev) {
      var obj;
      if (obj = LISTENERS[key]) {
        return _notify.call(ev, obj[ev.propId]);
      }
    };

    Event.require = (function(_cache) {
      var createCb, performRequire;
      if (_cache == null) {
        _cache = {};
      }
      createCb = function(ctx) {
        return function(err, r) {
          var cb;
          if (err) {
            Object.error(err).log();
          }
          if (!err) {
            ctx.isDone = 1;
          }
          while ((cb = ctx.q.shift())) {
            cb(err, r);
          }
          return 1;
        };
      };
      return performRequire = function(dependencies, cb) {
        if (!(dependencies != null ? dependencies.length : void 0)) {
          return cb(null, 0);
        }
        return Function.perform(dependencies, function(flow) {
          return [
            function() {
              var ctx, x, _i, _len;
              for (_i = 0, _len = dependencies.length; _i < _len; _i++) {
                x = dependencies[_i];
                if (x && (ctx = _cache[x] || (_cache[x] = {
                  q: [],
                  x: x
                })) && !ctx.isDone) {
                  ctx.q.push(flow.wait());
                  if (ctx.q.length === 1) {
                    Object.event.fire(x, createCb(ctx));
                  }
                }
              }
              return flow.next(null, dependencies.length);
            }, cb
          ];
        });
      };
    })();

    Event.bindPropertyExpression = function(T, propName, value) {
      var handler, locked, ps, _bind, _i, _len, _log, _ref;
      handler = _compileExpression.call(T, value, T.id);
      locked = false;
      _log = function(s) {
        if (Object.DEBUG) {
          return Object.log("binding: " + T + "[" + propName + "] " + s);
        }
      };
      _bind = function(ev) {
        var e, p, val, values, _i, _len, _ref;
        if (locked) {
          return _log("Locked");
        }
        values = {};
        _ref = handler.sources;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (!(e = Entity.get(p.entityId))) {
            return _log("No source of " + p.id);
          }
          if (!(val = e.prop(p.propName)) && ((val === void 0 && p.flag !== 'optional') || (p.flag === 'required'))) {
            return _log("No value from " + p.id);
          }
          values[p.id] = val;
        }
        locked = true;
        value = handler.expression.call(T, values);
        if (Object.DEBUG) {
          _log("= [" + handler.message + "] (" + (('' + value).replace('\n', ' ').slice(0, 31)) + ")");
        }
        try {
          return T.prop(propName, value);
        } finally {
          locked = false;
        }
      };
      _ref = handler.sources;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ps = _ref[_i];
        this.listen(ps.id, _bind, T);
      }
      return _bind();
    };

    Event.doubleBindProperty = function(tId, tProp, path, monitor) {
      var s0, sId, sProp, val, _bind, _log, _ref, _ref1;
      if (monitor == null) {
        monitor = {
          locked: false
        };
      }
      _ref = path.split('.'), sId = _ref[0], sProp = _ref[1];
      if (!sProp) {
        _ref1 = [path + '.value', 'value'], path = _ref1[0], sProp = _ref1[1];
      }
      _log = function(s) {
        if (Object.DEBUG) {
          return Object.log("duplex: " + tId + "[" + tProp + "] " + s);
        }
      };
      _bind = function(ev) {
        if (monitor.locked) {
          return _log("Locked");
        }
        monitor.locked = true;
        if (Object.DEBUG) {
          _log("= [" + path + "] (" + (('' + ev.value).replace('\n', ' ').slice(0, 31)) + ")");
        }
        try {
          return (Entity.get(tId)).prop(tProp, ev.value);
        } finally {
          monitor.locked = false;
        }
      };
      this.listen(path, _bind, tId);
      if (!monitor.reverse) {
        if ((s0 = Entity.get(sId)) && ((val = s0.prop(sProp)) !== void 0)) {
          _bind({
            entity: s0,
            value: val
          });
        }
        monitor.reverse = true;
        this.doubleBindProperty(sId, sProp, tId + "." + tProp, monitor);
      }
      return true;
    };

    return Event;

  })();


  /*
  Property
   */

  Property = (function() {
    var ALL, STUB, TYPES;

    STUB = function() {};

    ALL = {};

    TYPES = {};

    function Property(id) {
      var ftor, ids, methods, n, typeId, _super;
      this.id = id;
      this._id = this.id;
      if (this.id.slice(-3) === "Uri") {
        this.asyncTarget = this.id.slice(0, -3);
      }
      ids = this.id.split(':');
      if ((typeId = ids[1])) {
        this.id = ids[0];
        this.type = TYPES[typeId];
        if (!this.type) {
          throw new Error("ERROR: No such property type: " + typeId);
        }
        if (ftor = this.type.methods) {
          methods = ftor(_super = {});
          for (n in methods) {
            if (typeof methods[n] === "function") {
              _super[n] = this[n] || STUB;
            }
            this[n] = methods[n];
          }
        }
        this.mixin = this.type.mixin;
      }
    }

    Property.prototype.attachToEntityCtor = function(ctor) {
      if (this.mixin) {
        return Entity.applyMixin.call(ctor.prototype, this.mixin, this);
      }
    };

    Property.prototype.extractDefaults = function(T, defaults) {
      var n;
      if (defaults == null) {
        defaults = {};
      }
      if (T[n = this.id] && (defaults[n] = T[n])) {
        T[n] = void 0;
      }
      if (T[n = this.id + 'Expression'] && (defaults[n] = T[n])) {
        T[n] = void 0;
      }
      if (T[n = this.id + 'Binding'] && (defaults[n] = T[n])) {
        T[n] = void 0;
      }
      if (!this.asyncTarget) {
        if (T[n = this.id + 'Uri'] && (defaults[n] = T[n])) {
          T[n] = void 0;
        }
        if (T[n = this.id + 'UriExpression'] && (defaults[n] = T[n])) {
          T[n] = void 0;
        }
      }
      return defaults;
    };

    Property.prototype.init = function(T, defs) {
      var expr, v;
      if ((v = defs[this.id]) !== void 0) {
        T.prop(this.id, {
          isEvent: true,
          value: v,
          force: true
        });
      }
      if (defs["" + this.id + "Uri"] || defs["" + this.id + "UriExpression"]) {
        Property.instance("" + this.id + "Uri").init(T, defs);
      }
      if ((expr = defs["" + this.id + "Binding"])) {
        Event.doubleBindProperty(T.id, this.id, expr);
      }
      if ((expr = defs["" + this.id + "Expression"])) {
        return Event.bindPropertyExpression(T, this.id, expr);
      }
    };

    Property.prototype.done = function(T) {
      return T[this.id] = null;
    };

    Property.prototype.getter = function(T) {
      return T[this.id];
    };

    Property.prototype.setter = function(T, v, ev) {
      return T[this.id] = v;
    };

    Property.prototype.comparator = function(v1, v2) {
      return v1 === v2;
    };

    Property.prototype.asyncAdapter = function(err, value) {
      if (err) {
        return null;
      } else {
        return value || null;
      }
    };

    Property.prototype.createAsyncValueCallback = function(T) {
      var uuid;
      uuid = T._monitor[this.id] = Object.math.uuid();
      return (function(_this) {
        return function(err, value) {
          if (!T.isDone && (uuid === T._monitor[_this.id])) {
            return T.prop(_this.id, (T["" + _this.id + "AsyncAdapter"] || _this.asyncAdapter).call(T, err, value));
          }
        };
      })(this);
    };

    Property.prototype.setValueForUri = function(T, uri) {
      return Object.event.fire(uri, this.createAsyncValueCallback(T));
    };

    Property.prototype.setValue = function(T, ev) {
      var v;
      if (!(ev != null ? ev.isEvent : void 0)) {
        ev = Object.event.create({
          value: ev
        });
      }
      ev.propId = this.id;
      ev.entity = T;
      ev.oldValue = this.getter(T);
      if (((v = ev.value) !== void 0) && (ev.force || !this.comparator(v, ev.oldValue))) {
        this.setter(T, v, ev);
        if (this.asyncTarget && v) {
          T.prop(this.asyncTarget, Object.event.create({
            value: null,
            uri: v,
            force: true
          }));
        }
        T.propertyChanged(ev);
      }
      if (ev.uri) {
        this.setValueForUri(T, ev.uri);
      }
      return ev;
    };

    Property.define = function(meta) {
      return TYPES[meta.id] = meta;
    };

    Property.instance = function(id) {
      return ALL[id] || (ALL[id] = new Property(id));
    };

    return Property;

  })();


  /*
  Entity
   */

  Entity = (function() {
    var ALL, STUB, TOTAL, TYPES;

    function Entity() {}

    STUB = function() {};

    ALL = {};

    TYPES = {};

    TOTAL = 0;

    Entity.prototype.launch = function(cb) {
      this.init();
      return typeof cb === "function" ? cb(null, this) : void 0;
    };

    Entity.prototype.init = function() {
      var n, p, _ref;
      _ref = this.constructor.properties;
      for (n in _ref) {
        p = _ref[n];
        p.init(this, p.extractDefaults(this));
      }
      if (this.onEvent) {
        Event.listen(this.id, this.onEvent, this);
      }
      return typeof this.onInited === "function" ? this.onInited(this) : void 0;
    };

    Entity.prototype.done = function() {
      var n, p, _ref;
      this.isDone = true;
      if (this.id) {
        delete ALL[this.id];
        Event.unlisten(this.id);
      }
      _ref = this.constructor.properties;
      for (n in _ref) {
        p = _ref[n];
        p.done(this);
      }
      return Event.removeForTarget(this);
    };

    Entity.prototype.prop = function(key, value) {
      var p;
      if (this.isDone) {
        return null;
      }
      p = this.constructor.properties;
      if (arguments.length === 1) {
        return (p[key] ? p[key].getter(this) : this[key]);
      }
      (p[key] || (p[key] = Property.instance(key))).setValue(this, value);
      return value;
    };

    Entity.prototype.propertyChanged = function(ev) {
      var _ref;
      if ((_ref = this["" + ev.propId + "Changed"]) != null) {
        _ref.call(this, ev, ev.value);
      }
      if (this.id) {
        return Event.notifyPropertyChanged(this.id, ev);
      }
    };

    Entity.prototype.error = function(e, details) {
      return Object.error(e).addPrefix(this).addDetails(details).log();
    };

    Entity.prototype.log = function(x) {
      var args, e;
      args = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          e = arguments[_i];
          _results.push(e);
        }
        return _results;
      }).apply(this, arguments);
      args[0] = "" + this + ": " + x;
      return Object.log.apply(Object, args);
    };

    Entity.prototype.toString = function() {
      if (this.id) {
        return "[" + this.id + "]";
      } else {
        return "[" + this.constructor.type.id + ":" + this._id + "]";
      }
    };

    Entity.applyMixin = function(fn, p) {
      var m, n, _ref, _super;
      if (!fn) {
        return this;
      }
      _ref = fn(_super = {}, p);
      for (n in _ref) {
        if (!__hasProp.call(_ref, n)) continue;
        m = _ref[n];
        _super[n] = this[n] || STUB;
        this[n] = m;
      }
      return this;
    };

    Entity.parseMeta = function(m) {
      var id, _ref;
      if (typeof m === "string") {
        m = {
          id: m
        };
      }
      if (!m.typeId) {
        id = m.id;
        _ref = __indexOf.call(id, ':') >= 0 ? id.split(":") : [null, id], m.id = _ref[0], m.typeId = _ref[1];
      }
      return m;
    };

    Entity.defineType = function(m) {
      var _ref;
      _ref = m.id.split(" extends "), m.id = _ref[0], m.superId = _ref[1];
      return TYPES[m.id] = m;
    };

    Entity.getCtor = function(t) {
      if ((t = TYPES[t])) {
        return t.ctor || (t.ctor = this.createCtor(t));
      }
    };

    Entity.createCtor = (function() {
      var PKEYS, _applyType;
      PKEYS = ['id', 'superId', 'properties', 'methods'];
      _applyType = function(t) {
        var k, p, pId, v, _i, _len, _ref;
        if (t.superId) {
          _applyType.call(this, TYPES[t.superId]);
        }
        if (t.properties) {
          _ref = t.properties;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            pId = _ref[_i];
            if (this.properties[pId]) {
              Object.error("bad-code: Duplicate property " + pId + " in type " + t.id).log();
            } else {
              (this.properties[(p = Property.instance(pId)).id] = p).attachToEntityCtor(this);
            }
          }
        }
        for (k in t) {
          if (!__hasProp.call(t, k)) continue;
          v = t[k];
          if (__indexOf.call(PKEYS, k) < 0) {
            this.options[k] = v;
          }
        }
        Entity.applyMixin.call(this.prototype, t.methods);
        return this;
      };
      return function(type) {
        var ctor, k, v, _ref;
        ctor = function(id, options) {
          var k, v, _ref;
          this.id = id;
          this._id = "E" + (TOTAL++);
          this._monitor = {};
          _ref = this.constructor.options;
          for (k in _ref) {
            if (!__hasProp.call(_ref, k)) continue;
            v = _ref[k];
            this[k] = v;
          }
          if (options) {
            for (k in options) {
              if (!__hasProp.call(options, k)) continue;
              v = options[k];
              if (__indexOf.call(PKEYS, k) < 0) {
                this[k] = v;
              }
            }
          }
          return this;
        };
        _ref = Entity.prototype;
        for (k in _ref) {
          if (!__hasProp.call(_ref, k)) continue;
          v = _ref[k];
          ctor.prototype[k] = v;
        }
        ctor.type = type;
        ctor.options = {};
        ctor.properties = {};
        return _applyType.call(ctor, type, {});
      };
    })();

    Entity.findUnresolvedType = function(typeId) {
      var type;
      if (!(type = TYPES[typeId])) {
        return typeId;
      }
      if (type.superId) {
        return this.findUnresolvedType(type.superId);
      } else {
        return null;
      }
    };

    Entity.resolveType = function(typeId, cb) {
      return Object.event.require(["entity://" + typeId], (function(_this) {
        return function(err) {
          var utype;
          if (!TYPES[typeId]) {
            throw new Error("Can't resolve type " + typeId);
          }
          if ((utype = _this.findUnresolvedType(typeId))) {
            return _this.resolveType(utype, cb);
          }
          return cb();
        };
      })(this));
    };

    Entity.createInlineCtor = function(meta) {
      return this.createCtor({
        id: "T" + (TOTAL++),
        options: meta,
        superId: meta.typeId,
        properties: meta.properties || [],
        methods: meta.methods
      });
    };

    Entity.create = function(meta, cb) {
      var Ctor, obj, typeId, utype;
      meta = this.parseMeta(meta);
      typeId = meta.typeId;
      if ((utype = this.findUnresolvedType(typeId))) {
        return this.resolveType(utype, ((function(_this) {
          return function(err) {
            if (!err) {
              return _this.create(meta, cb);
            }
          };
        })(this)));
      }
      Ctor = meta.properties || meta.methods ? this.createInlineCtor(meta) : this.getCtor(typeId);
      obj = new Ctor(meta.id, meta);
      if (obj.id) {
        ALL[obj.id] = obj;
      }
      obj.launch(cb);
      return obj;
    };

    Entity.get = function(id) {
      if (id._id) {
        return id;
      } else {
        if (id) {
          return ALL[id];
        }
      }
    };

    return Entity;

  })();


  /* 
  API - `Everything is Entities with Events between`
   */

  Object.event = {
    create: function(delta) {
      return new Event(delta);
    },
    fire: function(event, callback) {
      return this.create(event.uri ? event : {
        uri: event
      }).fire(callback);
    },
    require: function(dependencies, callback) {
      return Event.require(dependencies, callback);
    }
  };

  Object.entity = {
    define: function(meta) {
      return Entity.defineType(meta);
    },
    defineProperty: function(meta) {
      return Property.define(meta);
    },
    create: function(meta, callback) {
      return Entity.create(meta, callback);
    }
  };

}).call(this);
