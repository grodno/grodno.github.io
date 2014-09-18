
/*
AXIOD.JS Framework.
 */
var __hasProp = {}.hasOwnProperty,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

(function(global) {
  "use strict";
  var A, ENTITY, Entity, EntityProperty, Event, F, O, PROP, _ownProp, _ref, _ref1, _slice;
  _ref = [Function, Array, Object], F = _ref[0], A = _ref[1], O = _ref[2];
  _ref1 = [O.prototype.hasOwnProperty, A.prototype.slice], _ownProp = _ref1[0], _slice = _ref1[1];

  /*
  Function.NONE.  Widely used as a stub.
  @return first argument
   */
  F.NONE = function(x) {
    return x;
  };
  O.log = function(x) {
    var args, c;
    if (!global.DEBUG) {
      return x;
    }
    c = global.console;
    args = _slice.call(arguments, 0);
    if (c != null ? c.log : void 0) {
      if (c.log.apply) {
        c.log.apply(c, args);
      } else {
        c.log(args.join(", "));
      }
    }
    return x;
  };
  O.error = function(err, message, details) {
    if (typeof err === "string") {
      err = {
        message: err
      };
    }
    err.reason = err.reason || "unknown";
    err.message = [message || '', err.message || ('' + err)].join(' ');
    err.details = details || err.details || '';
    err.log = function() {
      var c;
      c = global.console;
      if (!this.stack) {
        this.stack = (new Error).stack;
      }
      if (c != null ? c.error : void 0) {
        c.error(this.reason, this.message, this.details, this.stack);
      } else {
        O.log.apply(O, ["ERROR:", this]);
      }
      return this;
    };
    return err;
  };
  O.Uri = (function() {
    function Uri(id) {
      this.id = id;
      this.isUri = true;
      this.params = {};
    }

    Uri.prototype.toString = function() {
      var n, r, sep, v, _ref2;
      r = "";
      if (this.type) {
        r = this.type + ":";
      }
      r += (this.domain ? "//" + this.domain : (this.type ? "*" : ""));
      if (this.path) {
        r += '/' + this.path.join('/');
      }
      sep = '?';
      _ref2 = this.params;
      for (n in _ref2) {
        if (!__hasProp.call(_ref2, n)) continue;
        v = _ref2[n];
        if (sep === '?') {
          sep = '&';
        }
        r += sep + n + "=" + encodeURIComponent(v);
      }
      if (this.hash) {
        r += "#" + this.hash;
      }
      return r;
    };

    Uri.parse = function(s) {
      var p, r, v, _i, _len, _ref2, _ref3;
      if (s != null ? s.isUri : void 0) {
        return s;
      }
      r = new Uri(s);
      if (!s) {
        return r;
      }
      if (!s.split) {
        s = "" + s;
      }
      if ((p = s.lastIndexOf("#")) > -1) {
        r.hash = s.slice(p + 1);
        s = s.slice(0, +(p - 1) + 1 || 9e9);
      }
      _ref2 = s.split("?"), s = _ref2[0], r.query = _ref2[1];
      if (r.query) {
        _ref3 = r.query.split("&");
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          v = _ref3[_i];
          if ((p = v.split("=")).length > 1) {
            r.params[p[0]] = decodeURIComponent(p[1]);
          }
        }
      }
      if ((p = s.indexOf("://")) > -1) {
        r.type = s.slice(0, +(p - 1) + 1 || 9e9);
        s = s.slice(p + 1);
      }
      p = s.split("/");
      if (p[0] === "") {
        p.shift();
        if (p[0] === "") {
          p.shift();
          r.domain = p.shift();
        }
      }
      r.path = p;
      return r;
    };

    return Uri;

  })();
  Event = (function() {
    var LISTENERS, Record, _notify, _obj;

    LISTENERS = {};

    _obj = function(key, force) {
      var k, obj, p, p1;
      obj = LISTENERS;
      p1 = -1;
      while ((p = key.indexOf(".", p1 = p + 1)) > -1) {
        obj = obj[k = key.slice(p1, +p + 1 || 9e9)] || (obj[k] = {});
      }
      return obj[k = key.slice(p1)] || (force && (obj[k] = {}));
    };

    _notify = function(obj, key) {
      var rec;
      if (!(obj = obj != null ? obj[key] : void 0)) {
        return typeof this.callback === "function" ? this.callback(O.error("No event listeners for: [" + this.uri.type + "].")) : void 0;
      }
      rec = obj.first;
      while (rec) {
        try {
          rec.handler.call(rec.target, this);
        } catch (_error) {
          O.error(_error, 'event notify:', {
            op: ('' + rec.handler).replace(/\s+/g, '').slice(9, 151),
            target: rec.target
          }).log();
        }
        rec = rec.next;
      }
      return this;
    };

    Record = (function() {
      function Record(handler, target) {
        this.handler = handler;
        this.target = target != null ? target : null;
        if (target != null) {
          if (typeof target.addFinalizer === "function") {
            target.addFinalizer((function(_this) {
              return function() {
                return _this.remove();
              };
            })(this));
          }
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
          this.obj.first = null;
        }
        return this;
      };

      Record.prototype.add = function(obj) {
        this.obj = obj;
        if (obj.last) {
          return (obj.last.next = this).prev = obj.last;
        } else {
          return obj.first = obj.last = this;
        }
      };

      return Record;

    })();

    function Event(u) {
      this.uri = u.isUri ? u : O.Uri.parse(u);
    }

    Event.prototype.fire = function(c) {
      var key, obj, p, p1;
      if (c) {
        this.callback = c;
      }
      p = -1;
      key = this.uri.type;
      obj = LISTENERS;
      while (obj && (p = key.indexOf(".", p1 = p + 1)) > -1) {
        obj = obj[key.slice(p1, +p + 1 || 9e9)];
      }
      if (p1) {
        key = key.slice(p1);
      }
      return _notify.call(this, obj, key);
    };

    Event.prototype.isEvent = true;

    Event.prototype.callback = function() {};

    Event.listen = function(key, handler, target) {
      return new Record(handler, target).add(_obj(key, true));
    };

    Event.unlisten = function(key) {
      var obj;
      if (obj = _obj(key)) {
        return delete obj[key];
      }
    };

    Event.notify = function(key1, key2, ev) {
      return _notify.call(ev, LISTENERS[key1], key2);
    };

    return Event;

  })();

  /*
    That iterator call {#fn} for each entry of {#obj} on {#ctx} passing datum, index and {#opts}.
    @return {#ctx}
   */
  F.iterate = function(fn, obj, ctx, opts) {
    var i, ln, n, x, _i, _len;
    if (obj) {
      ln = obj.length;
      if (ln === +ln) {
        for (i = _i = 0, _len = obj.length; _i < _len; i = ++_i) {
          x = obj[i];
          fn.call(ctx, x, i, opts);
        }
      } else {
        for (n in obj) {
          x = obj[n];
          if (_ownProp.call(obj, i)) {
            fn.call(ctx, x, n, opts);
          }
        }
      }
    }
    return ctx;
  };

  /*
    Performs flow of asynchronous operations in order.
    Invoke this.done() as callback inside each function.
    Invoke this.wait() to obtain some more callbacks for parallel flow.
   */
  F.flow = function() {
    var ctx, locked, newCb, next, op, operations, results, _i, _len;
    operations = [];
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      op = arguments[_i];
      operations = operations.concat(op);
    }
    locked = 1;
    results = [null, void 0];
    next = function() {
      var _args, _sError;
      if (!--locked && (op = operations.shift())) {
        locked = 1;
        _args = [].concat(results);
        results = [null, void 0];
        try {
          if (!global.DEBUG) {
            _sError = new Error;
          }
          return op.apply(ctx, _args);
        } catch (_error) {
          return O.error(_error, 'flow-op:', {
            op: ('' + op).replace(/\s+/g, '').slice(9, 151),
            args: _args
          }).log();
        }
      }
    };
    newCb = function(pos) {
      return function(err, v) {
        if (!(results[pos] === void 0)) {
          return;
        }
        if (err) {
          results[0] = O.error(err).log();
        }
        results[pos] = v;
        return next();
      };
    };
    ctx = {
      done: newCb(1),
      wait: function() {
        var pos;
        pos = results.length;
        results[pos] = void 0;
        locked += 1;
        return newCb(pos);
      }
    };
    return next();
  };
  O.require = (function(_cache) {
    return function(list, cb) {
      var _starter;
      if (!(list != null ? list.length : void 0)) {
        return cb(null, 0);
      }
      _starter = function() {
        var ctx, x, _i, _len;
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          x = list[_i];
          if (x && (ctx = _cache[x] || (_cache[x] = {
            q: []
          })) && !ctx.isDone) {
            ctx.q.push(this.wait());
            if (ctx.q.length === 1) {
              O.fire(x, function(err) {
                if (err) {
                  O.error(err).log();
                }
                if (!err) {
                  ctx.isDone = x;
                }
                while ((cb = ctx.q.shift())) {
                  cb.apply(null, arguments);
                }
                return x;
              });
            }
          }
        }
        return this.done(null, list.length);
      };
      return F.flow(_starter, cb);
    };
  })({});

  /*
  makes array-like projection
  @return slice of {#arr} or empty array.
  @safe for no {#arr)
   */
  A.slice = function(arr, from, sz) {
    if (arr) {
      return _slice.call(arr, from, sz);
    } else {
      return [];
    }
  };

  /*
  @return item of {#arr} at {#p=0} position or null.
  negative p sumed with array length
  @safe for no {#arr)
   */
  A.item = function(arr, p) {
    if (arr) {
      return _slice.call(arr, p, p + 1)[0];
    } else {
      return null;
    }
  };

  /*
  @find item of {#arr} with {#key='id'} attribute value matching {#val}.
  @return item found or null if none
   */
  A.find = function(arr, fn, key) {
    var i, r, x, _i, _len;
    if (arr) {
      if (typeof fn !== "function") {
        fn = (function(e) {
          if (e[key] === fn) {
            return e;
          } else {
            return null;
          }
        });
      }
      for (i = _i = 0, _len = arr.length; _i < _len; i = ++_i) {
        x = arr[i];
        if ((r = fn.call(arr, x, i))) {
          return r;
        }
      }
      null;
    }
    return null;
  };
  A.sortBy = function(a, key, dir) {
    var getter, rdir;
    if (!dir) {
      dir = 1;
    }
    rdir = dir * -1;
    getter = typeof key === "string" ? function(s) {
      return s != null ? s[key] : void 0;
    } : key || F.NONE;
    return a.sort(function(s1, s2) {
      var v1, v2;
      if ((v1 = getter(s1)) > (v2 = getter(s2))) {
        return dir;
      } else {
        if (v1 < v2) {
          return rdir;
        } else {
          return 0;
        }
      }
    });
  };
  O.update = function(obj, extra) {
    var n;
    if (obj && extra) {
      for (n in extra) {
        if (_ownProp.call(extra, n)) {
          obj[n] = extra[n];
        }
      }
    }
    return obj;
  };
  O.prop = function(obj, key, val) {
    var k, p, p1;
    if (!obj) {
      return null;
    }
    p = -1;
    if (arguments.length > 2) {
      while ((p = key.indexOf(".", p1 = p + 1)) > -1) {
        obj = obj[k = key.slice(p1, +p + 1 || 9e9)] || (obj[k] = {});
      }
      return obj[key.slice(p1)] = val;
    } else {
      while (obj && (p = key.indexOf(".", p1 = p + 1)) > -1) {
        obj = obj[key.slice(p1, +p + 1 || 9e9)];
      }
      return obj != null ? obj[key.slice(p1)] : void 0;
    }
  };
  O.clone = function(obj, extra) {
    var n, r;
    if (!obj) {
      return null;
    }
    r = new obj.constructor();
    for (n in obj) {
      if (!__hasProp.call(obj, n)) continue;
      r[n] = obj[n];
    }
    if (extra) {
      for (n in extra) {
        if (!__hasProp.call(extra, n)) continue;
        r[n] = extra[n];
      }
    }
    return r;
  };
  O.parse = function(s) {
    if (!s) {
      return null;
    }
    try {
      return F.call(F, "return " + s)();
    } catch (_error) {
      return (O.error("bad-code", "Object.parse: " + _error.message, s)).log() && null;
    }
  };

  /*
  Working with Strings.
   */
  String.capitalize = function(s) {
    if (s != null ? s.length : void 0) {
      return s.toString()[0].toUpperCase() + s.slice(1);
    } else {
      return "";
    }
  };
  String.camelize = function(s, sep) {
    var t;
    if (sep == null) {
      sep = '_';
    }
    if (s != null ? s.length : void 0) {
      return ((function() {
        var _i, _len, _ref2, _results;
        _ref2 = s.split(sep);
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          t = _ref2[_i];
          _results.push(String.capitalize(t));
        }
        return _results;
      })()).join('');
    } else {
      return '';
    }
  };
  String.localize = function(s) {
    if (s) {
      return String.capitalize(String.camelize(s));
    } else {
      return "";
    }
  };
  String.format = (function() {
    var RE;
    RE = /\{(\d+)\}/gm;
    return function(s) {
      var args;
      if (!s) {
        return '';
      }
      args = A.slice(arguments, 1);
      return s.replace(RE, function(s, d) {
        return args[+d] || '';
      });
    };
  })();
  String.template = (function() {
    var FN2, RE, RE2;
    RE = /\{\{(\w+?)\}\}/gm;
    RE2 = /\{\{#(\w+?)\}\}([\s\S]+?)\{\{\/(\w+?)\}\}/gm;
    FN2 = function(s, k, c) {
      var ctx, e;
      return k + c;
      if (!(ctx = this[k])) {
        return '';
      }
      if (ctx.length) {
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = ctx.length; _i < _len; _i++) {
            e = ctx[_i];
            _results.push(String.template(c, e));
          }
          return _results;
        })()).join('');
      } else {
        return String.template(c, ctx);
      }
    };
    return function(s, map) {
      if (!s) {
        return '';
      } else {
        return s.replace(RE, function(s, k) {
          return O.prop(map, k) || '';
        });
      }
    };
  })();

  /*
  properties
   */
  PROP = {
    TYPES: {},
    ALL: {},
    GET: function(id) {
      return this.ALL[id] || (this.ALL[id] = new EntityProperty(id));
    },
    BIND: (function() {
      var RE, compile;
      RE = /\$\{([\w\.]+?)\}/gm;
      compile = function(s, tId) {
        var src, _reg;
        _reg = {};
        return {
          sources: src = [],
          body: s.replace(RE, function(s, path) {
            var id, prop, req, _ref2;
            if ((path[0] === "*") || (req = path[0] === "+")) {
              path = path.slice(1);
            }
            _ref2 = path.split("."), id = _ref2[0], prop = _ref2[1];
            if (!prop) {
              prop = "value";
            }
            if (!id) {
              id = tId;
            }
            path = id + "." + prop;
            if (!_reg[path]) {
              _reg[path] = 1;
              src.push({
                id: path,
                required: req,
                entityId: id,
                propName: prop
              });
            }
            return "$V[\"" + path + "\"]";
          })
        };
      };
      return function(T, propName, value) {
        var compiled, fn, ps, _bind, _i, _len, _ref2;
        compiled = compile(value, T.id);
        fn = (function() {
          try {
            return new Function("$V", "return " + compiled.body + ";");
          } catch (_error) {
            return function() {
              O.error(_error, "Wrong binding expression", compiled.body).log();
              return _error.message;
            };
          }
        })();
        _bind = function(ev) {
          var p, val, values, w, _i, _len, _ref2;
          values = {};
          _ref2 = compiled.sources;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            p = _ref2[_i];
            if (!(w = O.entity(p.entityId))) {
              return O.log("Expression have no source yet: " + p.id + " -> " + T + "." + propName);
            }
            val = values[p.id] = w.prop(p.propName);
            if ((val === void 0) || (p.required && !val)) {
              return O.log("Expression have no value yet: " + p.id + " -> " + T + "." + propName);
            }
          }
          return T.prop(propName, fn.call(T, values));
        };
        _ref2 = compiled.sources;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          ps = _ref2[_i];
          Event.listen(ps.id, _bind, T);
        }
        return _bind();
      };
    })(),
    BIND2: function(T, prop, path, dbound) {
      var sId, sProp, _bind, _ref2;
      _ref2 = path.split('.'), sId = _ref2[0], sProp = _ref2[1];
      _bind = function(ev) {
        var S, val;
        if (!(S = O.entity(sId))) {
          return;
        }
        val = S.prop(sProp);
        if (val === void 0) {
          O.log("Binging is not ready for " + T + "." + prop);
        } else {
          O.log(("Binging for " + T + "." + prop) + val);
          T.prop(prop, val);
        }
        if (!dbound) {
          PROP.BIND2(S, sProp, T.id + "." + prop, true);
          return dbound = true;
        }
      };
      Event.listen(path, _bind, T);
      if (!dbound) {
        return _bind();
      }
    }
  };
  EntityProperty = (function() {
    function EntityProperty(id) {
      var ftor, ids, methods, n, type, typeId, _super;
      this.id = id;
      this._id = this.id;
      if (this.id.slice(-3) === "Uri") {
        this.asyncTarget = this.id.slice(0, -3);
      }
      ids = this.id.split(':');
      if ((typeId = ids[1])) {
        this.id = ids[0];
        type = PROP.TYPES[typeId];
        if (!type) {
          throw new Error("ERROR: No such property type: " + typeId);
        }
        if (ftor = type.methods) {
          methods = ftor(_super = {});
          for (n in methods) {
            if (typeof methods[n] === "function") {
              _super[n] = this[n] || F.NONE;
            }
            this[n] = methods[n];
          }
        }
        this.mixin = type.mixin;
      }
    }

    EntityProperty.prototype.attachToEntityCtor = function(ctor) {
      if (this.mixin) {
        return ENTITY.applyMixin.call(ctor.prototype, this.mixin);
      }
    };

    EntityProperty.prototype.init = function(T) {
      var defs, expr, v;
      if ((v = (defs = T._options)[this.id]) !== void 0) {
        T.prop(this.id, {
          isEvent: true,
          value: v,
          force: true
        });
      }
      if (defs["" + this.id + "Uri"] || defs["" + this.id + "UriExpression"]) {
        PROP.GET("" + this.id + "Uri").init(T);
      }
      if ((expr = defs["" + this.id + "Expression"])) {
        PROP.BIND(T, this.id, expr);
      }
      if ((expr = defs["" + this.id + "Binding"])) {
        PROP.BIND2(T, this.id, expr);
      }
      return T.addFinalizer(this.done);
    };

    EntityProperty.prototype.done = function(T) {
      return delete T[this.id];
    };

    EntityProperty.prototype.getter = function(T) {
      return T._state[this.id];
    };

    EntityProperty.prototype.setter = function(T, v, ev) {
      return T._state[this.id] = v;
    };

    EntityProperty.prototype.comparator = function(v1, v2) {
      return v1 === v2;
    };

    EntityProperty.prototype.asyncAdapter = function(err, value) {
      if (err) {
        return {
          error: Object.error(err).log()
        };
      }
      return value || null;
    };

    EntityProperty.prototype.setValueForUri = function(T, uri) {
      return O.fire(uri, (function(_this) {
        return function(err, value) {
          if (!T.isDone) {
            return T.prop(_this.id, (T["" + _this.id + "AsyncAdapter"] || _this.asyncAdapter).call(T, err, value));
          }
        };
      })(this));
    };

    EntityProperty.prototype.setValue = function(T, ev) {
      var v;
      ev = (ev != null ? ev.isEvent : void 0) ? ev : {
        value: ev
      };
      ev.propId = this.id;
      ev.entity = T;
      ev.oldValue = this.getter(T);
      if (((v = ev.value) !== void 0) && (ev.force || !this.comparator(v, ev.oldValue))) {
        this.setter(T, v, ev);
        if (this.asyncTarget && v) {
          T.prop(this.asyncTarget, {
            isEvent: true,
            value: null,
            uri: v,
            force: true
          });
        }
        T.propertyChanged(ev, v, this.id);
      }
      if (ev.uri) {
        this.setValueForUri(T, ev.uri);
      }
      return ev;
    };

    return EntityProperty;

  })();

  /*
  Entity
   */
  ENTITY = {
    ALL: {},
    TYPES: {},
    TOTAL: 0,
    applyMixin: function(fn) {
      var m, n, _ref2, _super;
      if (!fn) {
        return this;
      }
      _ref2 = fn(_super = {});
      for (n in _ref2) {
        if (!__hasProp.call(_ref2, n)) continue;
        m = _ref2[n];
        _super[n] = this[n] || F.NONE;
        this[n] = m;
      }
      return this;
    },
    parseMeta: function(m) {
      var id, _ref2;
      if (typeof m === "string") {
        m = O.parse(m);
      }
      if (!m.typeId) {
        id = m.id;
        _ref2 = __indexOf.call(id, ':') >= 0 ? id.split(":") : [null, id], m.id = _ref2[0], m.typeId = _ref2[1];
      }
      return m;
    },
    defineType: function(m) {
      var ids, _ref2;
      ids = m.id.split(" extends ");
      return this.TYPES[ids[0]] = {
        id: ids[0],
        options: m.options || {},
        superIds: ((_ref2 = ids[1]) != null ? _ref2.split(',') : void 0) || [],
        properties: m.properties || [],
        methods: m.methods || F.NONE
      };
    },
    getCtor: function(t) {
      if ((t = this.TYPES[t])) {
        return t.ctor || (t.ctor = this.createCtor(t));
      }
    },
    createCtor: (function() {
      var _applySuperType;
      _applySuperType = function(t) {
        var m, methods, n, p, sctor, _ref2, _ref3, _super;
        sctor = t.ctor || (t.ctor = ENTITY.createCtor(t));
        _ref2 = sctor.properties;
        for (n in _ref2) {
          if (!__hasProp.call(_ref2, n)) continue;
          p = _ref2[n];
          if (this.properties[n]) {
            O.log('Duplicate property', p, this);
          }
          (this.properties[n] = p).attachToEntityCtor(this);
        }
        O.update(this.options, sctor.options);
        methods = t.methods(_super = {});
        _ref3 = sctor.prototype;
        for (n in _ref3) {
          if (!__hasProp.call(_ref3, n)) continue;
          m = _ref3[n];
          if (!(n !== 'constructor' && typeof m === "function")) {
            continue;
          }
          if (methods[n]) {
            _super[n] = m;
            m = methods[n];
          }
          this.prototype[n] = m;
        }
        return this;
      };
      return function(type) {
        var ctor, id, p, superId, _i, _j, _len, _len1, _ref2, _ref3;
        ctor = function(id, options) {
          this.id = id;
          this._state = {};
          this._finalizers = [];
          this._id = "E" + (ENTITY.TOTAL++);
          this._options = O.clone(this.constructor.options, options);
          return this;
        };
        ctor.prototype = new Entity();
        ctor.type = type;
        ctor.options = {};
        ctor.properties = {};
        _ref2 = type.superIds;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          superId = _ref2[_i];
          _applySuperType.call(ctor, this.TYPES[superId]);
        }
        _ref3 = type.properties;
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          id = _ref3[_j];
          (ctor.properties[(p = PROP.GET(id)).id] = p).attachToEntityCtor(ctor);
        }
        O.update(ctor.options, type.options);
        ENTITY.applyMixin.call(ctor.prototype, type.methods);
        return ctor.prototype.constructor = ctor;
      };
    })(),
    resolveTypes: function(typeIds, cb) {
      var t, urls;
      urls = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = typeIds.length; _i < _len; _i++) {
          t = typeIds[_i];
          if (!this.TYPES[t]) {
            _results.push("entity://" + t);
          }
        }
        return _results;
      }).call(this);
      if (!urls.length) {
        return cb();
      }
      return O.require(urls, function(err) {
        var subTypes, _i, _len;
        if (err || !((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = typeIds.length; _i < _len; _i++) {
            t = typeIds[_i];
            if (!this.TYPES[t]) {
              _results.push(t);
            }
          }
          return _results;
        }).call(this)).length) {
          return O.error(err, "ERROR: Can't resolve some in types: [" + (typeIds.join(',')) + "] ").log();
        }
        subTypes = [];
        for (_i = 0, _len = typeIds.length; _i < _len; _i++) {
          t = typeIds[_i];
          if (!this.TYPES[t].ctor) {
            subTypes.push.apply(subTypes, this.TYPES[t].superIds);
          }
        }
        return this.resolveTypes(subTypes, cb);
      });
    },
    create: function(meta) {
      var cb2, ctor, obj, type, typeId;
      meta = this.parseMeta(meta);
      typeId = meta.typeId;
      type = this.TYPES[typeId];
      if (!(ctor = type != null ? type.ctor : void 0)) {
        cb2 = (function(_this) {
          return function(err) {
            _this.getCtor(typeId);
            if (!err) {
              return _this.create(meta);
            }
          };
        })(this);
        return this.resolveTypes((type ? type.superIds : [typeId]), cb2);
      }
      if (meta.properties || meta.methods) {
        ctor = this.createCtor({
          id: "T" + (ENTITY.TOTAL++),
          options: meta.options,
          superIds: typeId.split(',') || [],
          properties: meta.properties || [],
          methods: meta.methods || F.NONE
        });
      }
      obj = new ctor(meta.id, meta.options);
      if (obj.id) {
        this.ALL[obj.id] = obj;
      }
      if (obj.requires) {
        O.require(obj.requires, function(err) {
          if (!err) {
            obj.init();
          }
          return typeof meta.onCreate === "function" ? meta.onCreate(err, obj) : void 0;
        });
      } else {
        obj.init();
        if (typeof meta.onCreate === "function") {
          meta.onCreate(null, obj);
        }
      }
      return O.entity;
    },
    get: function(id) {
      if (id._id) {
        return id;
      } else {
        if (id) {
          return this.ALL[id];
        }
      }
    }
  };
  Entity = (function() {
    function Entity() {}

    Entity.prototype.init = function() {
      var n, p, ref, target, _ref2;
      _ref2 = this.constructor.properties;
      for (n in _ref2) {
        p = _ref2[n];
        if (p.init) {
          p.init(this);
        }
      }
      if (ref = this.referrer) {
        ref = (ref.split ? ref.split(".") : ref);
        if (target = (ref[0] === "parent" ? this.parentEntity : $(ref[0]))) {
          target[ref[1]] = this;
        }
      }
      if (this.id && this.onEvent) {
        Event.listen(this.id, this.onEvent, this);
      }
      return this.addFinalizer((function(_this) {
        return function() {
          O.unlisten(_this.id);
          if (target) {
            delete target[ref[1]];
          }
          delete ENTITY.ALL[_this.id];
          return _this.isDone = true;
        };
      })(this));
    };

    Entity.prototype.done = function() {
      var fn, _i, _len, _ref2;
      _ref2 = this._finalizers;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        fn = _ref2[_i];
        fn.call(this);
      }
      return delete this._finalizers;
    };

    Entity.prototype.addFinalizer = function(fn) {
      if (!this.isDone) {
        return this._finalizers.push(fn);
      }
    };

    Entity.prototype.prop = function(key, value) {
      var p;
      if (this.isDone) {
        return null;
      }
      p = this.constructor.properties;
      if (arguments.length === 1) {
        return (p[key] ? p[key].getter(this) : this._state[key]);
      }
      return (p[key] || (p[key] = PROP.GET(key))).setValue(this, value);
    };

    Entity.prototype.propertyChanged = function(ev, v, propId) {
      var _ref2;
      if ((_ref2 = this["" + propId + "Changed"]) != null) {
        _ref2.call(this, ev, v);
      }
      return Event.notify(this.id, propId, ev);
    };

    Entity.prototype.toString = function() {
      return "[Entity:" + this.constructor.type.id + ":" + this.id + ":" + this._id + "]";
    };

    return Entity;

  })();

  /*
  API
   */
  O.fire = function(ev, cb) {
    return (ev.isEvent ? ev : new Event(ev)).fire(cb);
  };
  O.entity = function(id) {
    return ENTITY.get(id);
  };
  O.entity.define = function(meta) {
    return ENTITY.defineType(meta);
  };
  O.entity.defineProperty = function(meta) {
    return PROP.TYPES[meta.id] = meta;
  };
  O.entity.create = function(meta) {
    return ENTITY.create(meta);
  };
  O.entity.prop = function(id, key, value) {
    var _ref2;
    return (_ref2 = ENTITY.get(id)) != null ? _ref2.prop(key, value) : void 0;
  };
  return O.entity;
})(typeof global === "undefined" ? this : global);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRDpcXHd3d1xcYXhpb2RcXGpzXFxheGlvZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkQ6XFx3d3dcXGF4aW9kXFxzcmNcXGpzXFxheGlvZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7R0FBQTtBQUFBLElBQUE7dUpBQUE7O0FBQUEsQ0FHQyxTQUFDLE1BQUQsR0FBQTtBQUdHLEVBQUEsWUFBQSxDQUFBO0FBQUEsTUFBQSxtRkFBQTtBQUFBLEVBR0EsT0FBVSxDQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLE1BQWxCLENBQVYsRUFBQyxXQUFELEVBQUcsV0FBSCxFQUFLLFdBSEwsQ0FBQTtBQUFBLEVBSUEsUUFBcUIsQ0FBQyxDQUFDLENBQUEsU0FBRSxDQUFBLGNBQUosRUFBb0IsQ0FBQyxDQUFBLFNBQUUsQ0FBQSxLQUF2QixDQUFyQixFQUFDLG1CQUFELEVBQVcsaUJBSlgsQ0FBQTtBQU1BO0FBQUE7OztLQU5BO0FBQUEsRUFVQSxDQUFDLENBQUMsSUFBRixHQUFTLFNBQUMsQ0FBRCxHQUFBO1dBQVEsRUFBUjtFQUFBLENBVlQsQ0FBQTtBQUFBLEVBYUEsQ0FBQyxDQUFDLEdBQUYsR0FBUSxTQUFDLENBQUQsR0FBQTtBQUNKLFFBQUEsT0FBQTtBQUFBLElBQUEsSUFBQSxDQUFBLE1BQXNCLENBQUMsS0FBdkI7QUFBQSxhQUFPLENBQVAsQ0FBQTtLQUFBO0FBQUEsSUFDQSxDQUFBLEdBQUksTUFBTSxDQUFDLE9BRFgsQ0FBQTtBQUFBLElBRUEsSUFBQSxHQUFPLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBWixFQUF1QixDQUF2QixDQUZQLENBQUE7QUFHQSxJQUFBLGdCQUFHLENBQUMsQ0FBRSxZQUFOO0FBQ0ksTUFBQSxJQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBVDtBQUNJLFFBQUEsQ0FBQyxDQUFDLEdBQUYsVUFBTSxJQUFOLENBQUEsQ0FESjtPQUFBLE1BQUE7QUFHSSxRQUFBLENBQUMsQ0FBQyxHQUFG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QWtCLElBQWxCLEVBQVY7RUFBQSxDQWp4QmxCLENBQUE7QUFBQSxFQW94QkEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFULEdBQTBCLFNBQUMsSUFBRCxHQUFBO1dBQVUsSUFBSSxDQUFDLEtBQU0sQ0FBQSxJQUFJLENBQUMsRUFBTCxDQUFYLEdBQXNCLEtBQWhDO0VBQUEsQ0FweEIxQixDQUFBO0FBQUEsRUF3eEJBLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBVCxHQUFrQixTQUFDLElBQUQsR0FBQTtXQUFVLE1BQU0sQ0FBQyxNQUFQLENBQWMsSUFBZCxFQUFWO0VBQUEsQ0F4eEJsQixDQUFBO0FBQUEsRUE0eEJBLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBVCxHQUFnQixTQUFDLEVBQUQsRUFBSyxHQUFMLEVBQVUsS0FBVixHQUFBO0FBQW9CLFFBQUEsS0FBQTttREFBYyxDQUFFLElBQWhCLENBQXFCLEdBQXJCLEVBQXlCLEtBQXpCLFdBQXBCO0VBQUEsQ0E1eEJoQixDQUFBO1NBK3hCQSxDQUFDLENBQUMsT0FseUJMO0FBQUEsQ0FBRCxDQUFBLENBb3lCSyxNQUFBLENBQUEsTUFBQSxLQUFtQixXQUF0QixHQUF1QyxJQUF2QyxHQUFpRCxNQXB5Qm5ELENBSEEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIiMjI1xuQVhJT0QuSlMgRnJhbWV3b3JrLlxuIyMjXG4oKGdsb2JhbCkgLT5cblxuICAgICMgc3RyaWN0IG1vZGUgb25cbiAgICBcInVzZSBzdHJpY3RcIlxuICAgIFxuICAgICMgc29tZSBpbnRlcm5hbCBzaG9ydGN1dHNcbiAgICBbRixBLE9dID0gW0Z1bmN0aW9uLCBBcnJheSwgT2JqZWN0XVxuICAgIFtfb3duUHJvcCwgX3NsaWNlXSA9IFtPOjpoYXNPd25Qcm9wZXJ0eSwgQTo6c2xpY2VdXG4gIFxuICAgICMjI1xuICAgIEZ1bmN0aW9uLk5PTkUuICBXaWRlbHkgdXNlZCBhcyBhIHN0dWIuXG4gICAgQHJldHVybiBmaXJzdCBhcmd1bWVudFxuICAgICMjI1xuICAgIEYuTk9ORSA9ICh4KSAtPiAgeCBcbiAgICBcbiAgICAjIERlZmF1bHQgbG9nZ2luZy5cbiAgICBPLmxvZyA9ICh4KSAtPlxuICAgICAgICByZXR1cm4geCB1bmxlc3MgZ2xvYmFsLkRFQlVHXG4gICAgICAgIGMgPSBnbG9iYWwuY29uc29sZVxuICAgICAgICBhcmdzID0gX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuICAgICAgICBpZiBjPy5sb2dcbiAgICAgICAgICAgIGlmIGMubG9nLmFwcGx5XG4gICAgICAgICAgICAgICAgYy5sb2cgYXJncy4uLlxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGMubG9nIGFyZ3Muam9pbihcIiwgXCIpIyBJRThcbiAgICAgICAgeCAgXG5cbiAgICAjICBuYXJyb3cgZXJyb3IgdG8gcmVxdWxhciBmb3JtOiB7IHJlYXNvbjonJywgbWVzc2FnZTonJywgaW5mbzonJ31cbiAgICBPLmVycm9yID0gKGVyciwgbWVzc2FnZSwgZGV0YWlscykgLT5cbiAgICAgICAgZXJyID0gbWVzc2FnZTogZXJyICBpZiB0eXBlb2YgKGVycikgaXMgXCJzdHJpbmdcIlxuICAgICAgICBlcnIucmVhc29uID0gIGVyci5yZWFzb24gb3IgXCJ1bmtub3duXCJcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSBbKG1lc3NhZ2Ugb3IgJycpLCAoZXJyLm1lc3NhZ2Ugb3IgKCcnK2VycikpXS5qb2luKCcgJylcbiAgICAgICAgZXJyLmRldGFpbHMgPSBkZXRhaWxzIG9yIGVyci5kZXRhaWxzIG9yICcnXG4gICAgICAgIGVyci5sb2cgPSAtPiBcbiAgICAgICAgICAgIGMgPSBnbG9iYWwuY29uc29sZVxuICAgICAgICAgICAgKEBzdGFjayA9IChuZXcgRXJyb3IpLnN0YWNrKSB1bmxlc3MgQHN0YWNrXG4gICAgICAgICAgICBpZiBjPy5lcnJvciB0aGVuIGMuZXJyb3IgQHJlYXNvbiwgQG1lc3NhZ2UsIEBkZXRhaWxzLCBAc3RhY2sgZWxzZSBPLmxvZyBbXCJFUlJPUjpcIiwgQF0uLi5cbiAgICAgICAgICAgIEBcbiAgICAgICAgZXJyXG5cbiAgICAjIFVSSSBvYmplY3Q6IHR5cGU6Ly9pZD8ocDE9djEpKiNoYXNoXG4gICAgY2xhc3MgTy5VcmkgXG4gICAgXG4gICAgICAgIGNvbnN0cnVjdG9yOiAgKEBpZCkgLT5cbiAgICAgICAgICBAaXNVcmkgPSB0cnVlXG4gICAgICAgICAgQHBhcmFtcyA9IHt9XG4gICAgXG4gICAgICAgIHRvU3RyaW5nIDogLT5cbiAgICAgICAgICAgIHIgPVwiXCJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgKHIgPSBAdHlwZSArIFwiOlwiKSBpZiBAdHlwZVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHIgKz0gKGlmIEBkb21haW4gdGhlbiBcIi8vXCIgKyBAZG9tYWluIGVsc2UgKGlmIEB0eXBlIHRoZW4gXCIqXCIgZWxzZSBcIlwiKSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgKHIgKz0gICcvJyArIEBwYXRoLmpvaW4oJy8nKSkgaWYgQHBhdGhcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2VwPSc/J1xuICAgICAgICAgICAgZm9yIG93biBuLHYgb2YgQHBhcmFtc1xuICAgICAgICAgICAgICAgIChzZXAgPSAnJicpIGlmIHNlcCBpcyAnPydcbiAgICAgICAgICAgICAgICByICs9IHNlcCArIG4gKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2KVxuXG4gICAgICAgICAgICBpZiBAaGFzaCBcbiAgICAgICAgICAgICAgICByICs9IFwiI1wiICsgQGhhc2hcbiAgICAgICAgICAgIHJcbiAgICBcbiAgICAgICAgQHBhcnNlIDogKHMpIC0+XG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHMgIGlmIHM/LmlzVXJpXG4gICAgICAgICAgXG4gICAgICAgICAgciA9IG5ldyBVcmkocylcbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gciAgdW5sZXNzIHNcbiAgICAgICAgICBcbiAgICAgICAgICBzID0gXCJcIiArIHMgIHVubGVzcyBzLnNwbGl0XG4gICAgICAgICAgXG4gICAgICAgICAgIyBleHRyYWN0IGhhc2g6XG4gICAgICAgICAgaWYgKHAgPSBzLmxhc3RJbmRleE9mKFwiI1wiKSkgPiAtMVxuICAgICAgICAgICAgci5oYXNoID0gc1twKzEuLl1cbiAgICAgICAgICAgIHMgPSBzWzAuLnAtMV1cblxuICAgICAgICAgICMgZXh0cmFjdCBxdWVyeTpcbiAgICAgICAgICBbcywgci5xdWVyeV0gPSBzLnNwbGl0KFwiP1wiKVxuICAgICAgICAgIGlmIHIucXVlcnlcbiAgICAgICAgICAgIChyLnBhcmFtc1twWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwWzFdKSBmb3IgdiBpbiByLnF1ZXJ5LnNwbGl0KFwiJlwiKSB3aGVuIChwID0gdi5zcGxpdChcIj1cIikpLmxlbmd0aCA+IDEpXG5cbiAgICAgICAgICAjIGV4dHJhY3QgdHlwZTpcbiAgICAgICAgICBpZiAocCA9IHMuaW5kZXhPZihcIjovL1wiKSkgPiAtMVxuICAgICAgICAgICAgci50eXBlID0gc1swLi5wLTFdXG4gICAgICAgICAgICBzID0gc1twKzEuLl1cbiAgICAgICAgICBcbiAgICAgICAgICAjIHdvcmsgd2l0aCBwYXRoOlxuICAgICAgICAgIHAgPSBzLnNwbGl0KFwiL1wiKVxuICAgICAgICAgIGlmIHBbMF0gaXMgXCJcIlxuICAgICAgICAgICAgcC5zaGlmdCgpXG4gICAgICAgICAgICBpZiBwWzBdIGlzIFwiXCJcbiAgICAgICAgICAgICAgICBwLnNoaWZ0KClcbiAgICAgICAgICAgICAgICByLmRvbWFpbiA9IHAuc2hpZnQoKVxuICAgICAgICAgIHIucGF0aCA9IHBcbiAgICAgICAgICBcbiAgICAgICAgICByXG5cbiAgICAjIEV2ZW50IG9iamVjdFxuICAgIGNsYXNzIEV2ZW50IFxuICAgICAgICBcbiAgICAgICAgTElTVEVORVJTID0ge31cbiAgICAgICAgXG4gICAgICAgIF9vYmogPSAoa2V5LCBmb3JjZSkgLT5cbiAgICAgICAgICBvYmogPSBMSVNURU5FUlNcbiAgICAgICAgICBwMSA9IC0xXG4gICAgICAgICAgb2JqID0gKG9ialtrID0ga2V5W3AxLi5wXV0gb3IgKG9ialtrXSA9IHt9KSkgd2hpbGUgKHAgPSBrZXkuaW5kZXhPZihcIi5cIiwgcDEgPSBwICsgMSkpID4gLTFcbiAgICAgICAgICBvYmpbayA9IGtleVtwMS4uXV0gb3IgKGZvcmNlIGFuZCAob2JqW2tdID0ge30pKVxuICAgICAgICBcbiAgICAgICAgX25vdGlmeSA9IChvYmosIGtleSkgLT5cbiAgICAgICAgICAgIHJldHVybiBAY2FsbGJhY2s/KE8uZXJyb3IoXCJObyBldmVudCBsaXN0ZW5lcnMgZm9yOiBbI3tAdXJpLnR5cGV9XS5cIikpIHVubGVzcyAob2JqID0gb2JqP1trZXldKVxuICAgICAgICAgICAgIyBicm9hZGNhc3QgdG8gYWxsIGxpc3RlbmVyc1xuICAgICAgICAgICAgcmVjID0gb2JqLmZpcnN0XG4gICAgICAgICAgICB3aGlsZSByZWNcbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgcmVjLmhhbmRsZXIuY2FsbCByZWMudGFyZ2V0LCBAXG4gICAgICAgICAgICAgICAgY2F0Y2ggXG4gICAgICAgICAgICAgICAgICAgIE8uZXJyb3IoX2Vycm9yLCAnZXZlbnQgbm90aWZ5OicsIG9wOignJytyZWMuaGFuZGxlcikucmVwbGFjZSgvXFxzKy9nLCcnKVs5Li4xNTBdLHRhcmdldDpyZWMudGFyZ2V0ICkubG9nKClcbiAgICAgICAgICAgICAgICByZWMgPSByZWMubmV4dFxuICAgICAgICAgICAgQCAgXG4gICAgICAgICAgICBcbiAgICAgICAgY2xhc3MgUmVjb3JkXG4gICAgICAgIFxuICAgICAgICAgICAgY29uc3RydWN0b3I6ICAoQGhhbmRsZXIsIEB0YXJnZXQ9bnVsbCkgLT4gdGFyZ2V0Py5hZGRGaW5hbGl6ZXI/ID0+IEAucmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICByZW1vdmU6IC0+XG4gICAgICAgICAgICAgICAgaWYgQG5leHQgXG4gICAgICAgICAgICAgICAgICAgIEBuZXh0LnByZXYgPSBAcHJldlxuICAgICAgICAgICAgICAgIGVsc2UgXG4gICAgICAgICAgICAgICAgICAgIEBvYmoubGFzdCA9IEBwcmV2IG9yIG51bGxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgQHByZXZcbiAgICAgICAgICAgICAgICAgICAgQHByZXYubmV4dCA9IEBuZXh0XG4gICAgICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAgICAgICAgQG9iai5maXJzdCA9IG51bGxcbiAgICAgICAgICAgICAgICBAXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBhZGQ6IChAb2JqKSAtPiBcbiAgICAgICAgICAgICAgICBpZiBvYmoubGFzdCBcbiAgICAgICAgICAgICAgICAgICAgKG9iai5sYXN0Lm5leHQgPSBAKS5wcmV2ID0gb2JqLmxhc3QgXG4gICAgICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAgICAgICAgb2JqLmZpcnN0ID0gb2JqLmxhc3QgPSBAXG5cbiAgICAgICAgY29uc3RydWN0b3I6ICAodSkgLT5cbiAgICAgICAgICAgIEB1cmkgPSBpZiB1LmlzVXJpIHRoZW4gdSBlbHNlIE8uVXJpLnBhcnNlKHUpXG4gICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICNub3RpZnkgYnJvYWRjYXN0cyBldmVudCB0byBhbGwgaGFuZGxlcnMgdGhhdCBsaXN0ZW4gYXBwcm9wcmlhdGUgZXZlbnQgdHlwZVxuICAgICAgICBmaXJlOiAoYykgLT5cbiAgICAgICAgICBAY2FsbGJhY2sgPSBjIGlmIGNcbiAgICAgICAgXG4gICAgICAgICAgI3NlYXJjaCBidW5kbGVcbiAgICAgICAgICBwID0gLTFcbiAgICAgICAgICBrZXkgPSBAdXJpLnR5cGVcbiAgICAgICAgICBvYmogPSBMSVNURU5FUlNcbiAgICAgICAgICBvYmogPSBvYmpba2V5W3AxLi5wXV0gd2hpbGUgb2JqIGFuZCAocCA9IGtleS5pbmRleE9mKFwiLlwiLCBwMSA9IHAgKyAxKSkgPiAtMVxuICAgICAgICAgIGtleSA9IGtleVtwMS4uXSBpZiBwMVxuICAgICAgICAgIFxuICAgICAgICAgIF9ub3RpZnkuY2FsbCBALCBvYmosIGtleVxuXG4gICAgICAgIGlzRXZlbnQgOiB0cnVlXG4gICAgICAgIFxuICAgICAgICBjYWxsYmFjayA6IC0+XG4gICAgICAgIFxuICAgICAgICAjcmVnaXN0ZXIgYWRkcyBhbiBldmVudCB7I2hhbmRsZXJ9IGZvciB7I3R5cGV9XG4gICAgICAgIEBsaXN0ZW4gOiAoa2V5LCBoYW5kbGVyLCB0YXJnZXQpIC0+IG5ldyBSZWNvcmQoaGFuZGxlciwgdGFyZ2V0KS5hZGQoX29iaihrZXksIHRydWUpKVxuXG4gICAgICAgICNyZW1vdmVzIGFsbCBoYW5kbGVycyBmb3IgZ2l2ZW4gZXZlbnQgdHlwZVxuICAgICAgICBAdW5saXN0ZW4gOiAoa2V5KSAtPiBkZWxldGUgb2JqW2tleV0gIGlmIG9iaiA9IF9vYmooa2V5KVxuICAgICAgICBcbiAgICAgICAgIyBkaXJlY3Qgbm90aWZpY2F0aW9uXG4gICAgICAgIEBub3RpZnkgOiAoa2V5MSwga2V5MiwgZXYpIC0+IF9ub3RpZnkuY2FsbCBldiwgTElTVEVORVJTW2tleTFdLCBrZXkyXG4gICAgICAgIFxuXG4gICAgIyMjXG4gICAgICBUaGF0IGl0ZXJhdG9yIGNhbGwgeyNmbn0gZm9yIGVhY2ggZW50cnkgb2YgeyNvYmp9IG9uIHsjY3R4fSBwYXNzaW5nIGRhdHVtLCBpbmRleCBhbmQgeyNvcHRzfS5cbiAgICAgIEByZXR1cm4geyNjdHh9XG4gICAgIyMjXG4gICAgRi5pdGVyYXRlID0gKGZuLCBvYmosIGN0eCwgb3B0cykgLT5cbiAgICAgICAgaWYgb2JqXG4gICAgICAgICAgbG4gPSBvYmoubGVuZ3RoXG4gICAgICAgICAgaWYgbG4gaXMgK2xuXG4gICAgICAgICAgICBmbi5jYWxsIGN0eCwgeCwgaSwgb3B0cyBmb3IgeCwgaSBpbiBvYmpcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBmbi5jYWxsIGN0eCwgeCwgbiwgb3B0cyBmb3IgbiwgeCBvZiBvYmogd2hlbiBfb3duUHJvcC5jYWxsIG9iaiwgaVxuICAgICAgICBjdHhcblxuICAgICMjI1xuICAgICAgUGVyZm9ybXMgZmxvdyBvZiBhc3luY2hyb25vdXMgb3BlcmF0aW9ucyBpbiBvcmRlci5cbiAgICAgIEludm9rZSB0aGlzLmRvbmUoKSBhcyBjYWxsYmFjayBpbnNpZGUgZWFjaCBmdW5jdGlvbi5cbiAgICAgIEludm9rZSB0aGlzLndhaXQoKSB0byBvYnRhaW4gc29tZSBtb3JlIGNhbGxiYWNrcyBmb3IgcGFyYWxsZWwgZmxvdy5cbiAgICAjIyNcbiAgICBGLmZsb3cgPSAoKSAtPlxuICAgICAgICAgICAgXG4gICAgICAgIG9wZXJhdGlvbnMgPSBbXVxuICAgICAgICBvcGVyYXRpb25zID0gb3BlcmF0aW9ucy5jb25jYXQob3ApIGZvciBvcCBpbiBhcmd1bWVudHNcblxuICAgICAgICBsb2NrZWQgPSAxXG4gICAgICAgIHJlc3VsdHMgPSBbbnVsbCwgdW5kZWZpbmVkXVxuICAgICAgICBcbiAgICAgICAgIyBjYWxsYmFjayBmdW5jdGlvbiBwYXNzZWQgYXMgY29udGV4dCBmb3IgZWFjaCBvcGVyYXRpb25cbiAgICAgICAgbmV4dCA9ICgpIC0+XG5cbiAgICAgICAgICAgIGlmIG5vdCAtLWxvY2tlZCBhbmQgKG9wID0gb3BlcmF0aW9ucy5zaGlmdCgpKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbG9ja2VkID0gMVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBfYXJncyA9IFtdLmNvbmNhdCByZXN1bHRzXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IFtudWxsLCB1bmRlZmluZWRdXG4gICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgIF9zRXJyb3IgPSBuZXcgRXJyb3IgdW5sZXNzIGdsb2JhbC5ERUJVR1xuICAgICAgICAgICAgICAgICAgICBvcC5hcHBseShjdHgsIF9hcmdzKSBcbiAgICAgICAgICAgICAgICBjYXRjaCBcbiAgICAgICAgICAgICAgICAgICAgTy5lcnJvcihfZXJyb3IsICdmbG93LW9wOicsIG9wOignJytvcCkucmVwbGFjZSgvXFxzKy9nLCcnKVs5Li4xNTBdLCBhcmdzOl9hcmdzICkubG9nKClcblxuXG4gICAgICAgIG5ld0NiID0gKHBvcyktPiBcbiAgICAgICAgICAgIChlcnIsIHYpIC0+XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVubGVzcyAocmVzdWx0c1twb3NdIGlzIHVuZGVmaW5lZCkgIyBjYW4gYWZmZWN0IG9ubHkgb25jZSFcbiAgICAgICAgICAgICAgICByZXN1bHRzWzBdICAgPSBPLmVycm9yKGVycikubG9nKCkgaWYgZXJyXG4gICAgICAgICAgICAgICAgcmVzdWx0c1twb3NdID0gdlxuICAgICAgICAgICAgICAgIG5leHQoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICBjdHggPSBcbiAgICAgICAgICAjIHNraXAgY29kZSB0byBuZXh0IGluc2lkZSBvcFxuICAgICAgICAgIGRvbmUgOiBuZXdDYigxKVxuICAgICAgICAgICAgXG4gICAgICAgICAgIyB1c2VkIHRvIGNyZWF0ZSBwYXJhbGxlbCBjYWxsYmFja1xuICAgICAgICAgIHdhaXQgOiAtPlxuICAgICAgICAgICAgcG9zID0gcmVzdWx0cy5sZW5ndGhcbiAgICAgICAgICAgICMgZW5zdXJlIHNpemVcbiAgICAgICAgICAgIHJlc3VsdHNbcG9zXSA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgIyBpbmNyZW1lbnQgbG9ja2VkXG4gICAgICAgICAgICBsb2NrZWQrPTFcbiAgICAgICAgICAgIG5ld0NiKHBvcylcblxuICAgICAgICAjIHN0YXJ0IHdpdGggZmlyc3Qgb3BlcmF0aW9uXG4gIFxuICAgICAgICBuZXh0KClcbiAgICBcbiAgXG4gICAgIyBFbnN1cmUgYWxsIGRlcGVuZGVuY2llcyBhcmUgcmVzb2x2ZWQgYW5kIGludm9rZXMgY2FsbGJhY2sgYWZ0ZXIuXG4gICAgTy5yZXF1aXJlID0gKChfY2FjaGUpIC0+XG4gICAgICAgIChsaXN0LCBjYikgLT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGNiKG51bGwsIDApIHVubGVzcyBsaXN0Py5sZW5ndGhcbiAgICAgICAgICAgIF9zdGFydGVyID0gKCkgLT5cbiAgICAgICAgICAgICAgICBmb3IgeCBpbiBsaXN0XG4gICAgICAgICAgICAgICAgICAgIGlmIHggYW5kIChjdHggPSBfY2FjaGVbeF0gb3IgKF9jYWNoZVt4XSA9IHE6IFtdKSkgYW5kIG5vdCBjdHguaXNEb25lXG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgucS5wdXNoIEB3YWl0KClcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGN0eC5xLmxlbmd0aCBpcyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTy5maXJlIHgsIChlcnIpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE8uZXJyb3IoZXJyKS5sb2coKSBpZiBlcnJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmlzRG9uZSA9IHggdW5sZXNzIGVyclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYihhcmd1bWVudHMuLi4pICB3aGlsZSAoY2IgPSBjdHgucS5zaGlmdCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4ICAgICBcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBAZG9uZShudWxsLCBsaXN0Lmxlbmd0aClcbiAgICBcbiAgICAgICAgICAgIEYuZmxvdyBfc3RhcnRlciwgY2JcbiAgICApKHt9KSAgXG5cbiAgICAjIyNcbiAgICBtYWtlcyBhcnJheS1saWtlIHByb2plY3Rpb25cbiAgICBAcmV0dXJuIHNsaWNlIG9mIHsjYXJyfSBvciBlbXB0eSBhcnJheS5cbiAgICBAc2FmZSBmb3Igbm8geyNhcnIpXG4gICAgIyMjXG4gICAgQS5zbGljZSA9IChhcnIsIGZyb20sIHN6KSAtPiAoaWYgYXJyIHRoZW4gX3NsaWNlLmNhbGwoYXJyLCBmcm9tLCBzeikgZWxzZSBbXSlcbiAgICBcbiAgICBcbiAgICAjIyNcbiAgICBAcmV0dXJuIGl0ZW0gb2YgeyNhcnJ9IGF0IHsjcD0wfSBwb3NpdGlvbiBvciBudWxsLlxuICAgIG5lZ2F0aXZlIHAgc3VtZWQgd2l0aCBhcnJheSBsZW5ndGhcbiAgICBAc2FmZSBmb3Igbm8geyNhcnIpXG4gICAgIyMjXG4gICAgQS5pdGVtID0gKGFyciwgcCkgLT4gKGlmIGFyciB0aGVuIF9zbGljZS5jYWxsKGFyciwgcCwgcCsxKVswXSBlbHNlIG51bGwpXG5cbiAgXG4gICAgIyMjXG4gICAgQGZpbmQgaXRlbSBvZiB7I2Fycn0gd2l0aCB7I2tleT0naWQnfSBhdHRyaWJ1dGUgdmFsdWUgbWF0Y2hpbmcgeyN2YWx9LlxuICAgIEByZXR1cm4gaXRlbSBmb3VuZCBvciBudWxsIGlmIG5vbmVcbiAgICAjIyNcbiAgICBBLmZpbmQgPSAoYXJyLCBmbiwga2V5KSAtPlxuICAgICAgICBpZiBhcnJcbiAgICAgICAgICAgIGZuID0gKChlKSAtPiBpZiBlW2tleV0gaXMgZm4gdGhlbiBlIGVsc2UgbnVsbCkgdW5sZXNzIHR5cGVvZiAoZm4pIGlzIFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgZm9yIHgsIGkgaW4gYXJyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHIgaWYgKHIgPSBmbi5jYWxsKGFyciwgeCwgaSkpXG4gICAgICAgICAgICBudWxsXG4gICAgICAgIG51bGxcbiAgXG4gIFxuICAgICMgc29ydCBnaXZlbiB7I2F9cnJheSBpbiB7I2Rpcn1lY3Rpb24gdXNpbmcgeyNnZXR0ZXJ9IGZvciBjcml0ZXJpYVxuICAgIEEuc29ydEJ5ID0gKGEsIGtleSwgZGlyKSAtPlxuICAgICAgICBkaXIgPSAxIHVubGVzcyBkaXJcbiAgICAgICAgcmRpciA9IGRpciAqIC0xXG4gICAgICAgIGdldHRlciA9IGlmIHR5cGVvZiAoa2V5KSBpcyBcInN0cmluZ1wiIHRoZW4gKHMpIC0+IHM/W2tleV0gZWxzZSBrZXkgb3IgRi5OT05FXG4gICAgICAgIGEuc29ydCAoczEsIHMyKSAtPlxuICAgICAgICAgICAgaWYgKHYxID0gZ2V0dGVyKHMxKSkgPiAodjIgPSBnZXR0ZXIoczIpKSB0aGVuIGRpciBlbHNlIChpZiB2MSA8IHYyIHRoZW4gcmRpciBlbHNlIDApXG4gICAgXG4gICAgIyB1cGRhdGVzIHtvYmp9IHdpdGggb3duIGtleS92YWx1ZXMgZnJvbSB7ZXh0cmF9LlxuICAgIE8udXBkYXRlID0gKG9iaiwgZXh0cmEpIC0+XG4gICAgICAgIGlmIG9iaiBhbmQgZXh0cmFcbiAgICAgICAgICBvYmpbbl0gPSBleHRyYVtuXSBmb3IgbiBvZiBleHRyYSB3aGVuIF9vd25Qcm9wLmNhbGwoZXh0cmEsIG4pXG4gICAgICAgIG9ialxuXG4gICAgIyBnZXQvc2V0IHZhbHVlIG9mIHsjb2JqfSBwcm9wZXJ0eSBieSB7I2tleXN9IGluIGRlZXAuXG4gICAgTy5wcm9wID0gKG9iaiwga2V5LCB2YWwpIC0+XG4gICAgICAgICAgXG4gICAgICAgIHJldHVybiBudWxsIHVubGVzcyBvYmpcbiAgICAgICAgXG4gICAgICAgIHAgPSAtMVxuICAgIFxuICAgICAgICBpZiBhcmd1bWVudHMubGVuZ3RoPjJcbiAgICAgICAgICAob2JqID0gKG9ialtrID0ga2V5W3AxLi5wXV0gb3IgKG9ialtrXSA9IHt9KSkpIHdoaWxlIChwID0ga2V5LmluZGV4T2YoXCIuXCIsIHAxID0gcCArIDEpKSA+IC0xXG4gICAgICAgICAgb2JqW2tleVtwMS4uXV0gPSB2YWxcbiAgICAgICAgZWxzZVxuICAgICAgICAgIChvYmogPSBvYmpba2V5W3AxLi5wXV0pIHdoaWxlIG9iaiBhbmQgKHAgPSBrZXkuaW5kZXhPZihcIi5cIiwgcDEgPSBwICsgMSkpID4gLTFcbiAgICAgICAgICBvYmo/W2tleVtwMS4uXV1cbiAgICBcbiAgICAjIG51bGwtc2FmZSBjbG9uZSBvZiBvYmogd2l0aCBleHRyYSBpZiBhbnkuXG4gICAgTy5jbG9uZSA9IChvYmosIGV4dHJhKSAtPiBcbiAgICAgICAgcmV0dXJuIG51bGwgdW5sZXNzIG9iaiBcbiAgICAgICAgciA9IG5ldyAob2JqLmNvbnN0cnVjdG9yKSgpXG4gICAgICAgIHJbbl0gPSBvYmpbbl0gZm9yIG93biBuIG9mIG9ialxuICAgICAgICByW25dID0gZXh0cmFbbl0gZm9yIG93biBuIG9mIGV4dHJhIGlmIGV4dHJhXG4gICAgICAgIHJcbiAgICBcbiAgICAjIHJldHVybnMgb2JqZWN0IGV2YWx1YXRlZCBmcm9tIGdpdmVuIHMgb3IgbnVsbC5cbiAgICBPLnBhcnNlID0gKHMpIC0+XG4gICAgICAgIHJldHVybiBudWxsIHVubGVzcyBzXG4gICAgICAgIHRyeVxuICAgICAgICAgICAgRi5jYWxsKEYsIFwicmV0dXJuICN7c31cIikoKSBcbiAgICAgICAgY2F0Y2ggXG4gICAgICAgICAgICAoTy5lcnJvciBcImJhZC1jb2RlXCIsIFwiT2JqZWN0LnBhcnNlOiAje19lcnJvci5tZXNzYWdlfVwiLCBzKS5sb2coKSBhbmQgbnVsbFxuXG4gICAgIyMjXG4gICAgV29ya2luZyB3aXRoIFN0cmluZ3MuXG4gICAgIyMjXG4gICAgIyBAcmV0dXJuIGNhcGl0YWxpemVkIHsjc30gb3IgJydcbiAgICBTdHJpbmcuY2FwaXRhbGl6ZSA9IChzKSAtPiBcbiAgICAgICAgaWYgcz8ubGVuZ3RoIHRoZW4gcy50b1N0cmluZygpWzBdLnRvVXBwZXJDYXNlKCkgKyBzWzEuLl0gZWxzZSBcIlwiXG5cbiAgICAjIEByZXR1cm4gY2FtZWxpemUgeyNzfSBvciAnJ1xuICAgIFN0cmluZy5jYW1lbGl6ZSA9IChzLCBzZXA9J18nKSAtPiBcbiAgICAgICAgaWYgcz8ubGVuZ3RoIHRoZW4gKFN0cmluZy5jYXBpdGFsaXplKHQpIGZvciB0IGluIHMuc3BsaXQoc2VwKSkuam9pbignJykgZWxzZSAnJ1xuXG4gICAgIyBAcmV0dXJuIGxvY2FsaXplZCB7I3N9IG9yICcnXG4gICAgU3RyaW5nLmxvY2FsaXplID0gKHMpIC0+IFxuICAgICAgICBpZiBzIHRoZW4gU3RyaW5nLmNhcGl0YWxpemUoU3RyaW5nLmNhbWVsaXplKHMpKSBlbHNlIFwiXCJcblxuICAgICMgUmV0dXJucyBzdHJpbmcgZm9ybWF0dGVkIGJ5IHRlbXBsYXRlIGZpbGxlZCB3aXRoIHJlc3Qgb2YgYXJndW1lbnRzLlxuICAgICMgSWYgdGVtcGxhdGUgaXMgYSBmdW5jdGlvbiwgdGhlbiBpdCBpcyBpbnZva2VkIHdpdGggcmVzdCBvZiBhcmd1bWVudHMgcGFzc2VkXG4gICAgIyBAcmV0dXJuIHN0cmluZyByZXN1bHQuXG4gICAgU3RyaW5nLmZvcm1hdCA9ICgtPlxuICAgICAgICBSRSA9L1xceyhcXGQrKVxcfS9nbVxuICAgICAgICAocykgLT5cbiAgICAgICAgICAgIHJldHVybiAnJyB1bmxlc3Mgc1xuICAgICAgICAgICAgYXJncyA9IEEuc2xpY2UoYXJndW1lbnRzLDEpXG4gICAgICAgICAgICBzLnJlcGxhY2UgUkUsIChzLGQpIC0+XG4gICAgICAgICAgICAgICAgYXJnc1srZF0gb3IgJydcbiAgICApKClcblxuICAgICMgQHJldHVybiBzdHJpbmcgZm9ybWF0dGVkIGJ5IHRlbXBsYXRlIGFuZCBrZXkvdmFsdWUgbWFwIHVzZWQgZm9yIHBsYWNlaG9sZGVyIHN1YnN0aXR1dGlvbi5cbiAgICBTdHJpbmcudGVtcGxhdGUgPSAoLT5cbiAgICAgICAgUkUgPS9cXHtcXHsoXFx3Kz8pXFx9XFx9L2dtXG4gICAgICAgIFJFMiA9IC9cXHtcXHsjKFxcdys/KVxcfVxcfShbXFxzXFxTXSs/KVxce1xce1xcLyhcXHcrPylcXH1cXH0vZ21cbiAgICAgICAgRk4yID0gKHMsayxjKSAtPiBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGsrY1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJycgdW5sZXNzIGN0eD1AW2tdXG4gICAgICAgICAgICAgICAgICAgIGlmIGN0eC5sZW5ndGggXG4gICAgICAgICAgICAgICAgICAgICAgICAoU3RyaW5nLnRlbXBsYXRlKGMsZSkgZm9yIGUgaW4gY3R4KS5qb2luKCcnKVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcudGVtcGxhdGUoYyxjdHgpXG5cbiAgICAgICAgKHMsIG1hcCkgLT5cbiAgICAgICAgICAgIHVubGVzcyBzIHRoZW4gJycgZWxzZSBcbiAgICAgICAgICAgICAgICBzXG4gICAgICAgICAgICAgICAgIy5yZXBsYWNlKFJFMiwgRk4yKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFJFLCAocyxrKSAtPiBPLnByb3AobWFwLGspIG9yICcnIClcbiAgICApKClcblxuICAgICMjI1xuICAgIHByb3BlcnRpZXNcbiAgICAjIyNcbiAgICBQUk9QID0gXG4gICAgICAgICMgcHJvcGVydHkgdHlwZXNcbiAgICAgICAgVFlQRVMgOiB7fSBcbiAgICAgICAgXG4gICAgICAgICMgYWxsIHByb3BlcnRpZXMgcmVnaXN0cnlcbiAgICAgICAgQUxMIDoge30gXG4gICAgICAgIFxuICAgICAgICAjIHByb3BlcnR5IGluc3RhbmNlXG4gICAgICAgIEdFVCA6IChpZCkgLT4gQEFMTFtpZF0gb3IgKEBBTExbaWRdID0gbmV3IEVudGl0eVByb3BlcnR5KGlkKSlcbiAgICAgICAgXG4gICAgICAgICMgYmluZHMgcHJvcGVydHkgdmFsdWUgd2l0aCBleHByZXNzaW9uXG4gICAgICAgIEJJTkQgOiAoLT5cbiAgICAgICAgICAgIFJFID0vXFwkXFx7KFtcXHdcXC5dKz8pXFx9L2dtXG4gICAgICAgICAgICAjIHBhcnNlcyBhbmQgY29tcGlsZSBiaW5kaW5nIGZyb20gZXhwcmVzc2lvblxuICAgICAgICAgICAgY29tcGlsZSA9IChzLCB0SWQpIC0+XG4gICAgICAgICAgICAgICAgX3JlZz17fVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNvdXJjZXM6IHNyYyA9IFtdXG4gICAgICAgICAgICAgICAgYm9keTogcy5yZXBsYWNlIFJFLCAocywgcGF0aCktPlxuXG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoWzEuLl0gIGlmIChwYXRoWzBdIGlzIFwiKlwiKSBvciAocmVxID0gcGF0aFswXSBpcyBcIitcIilcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFtpZCwgcHJvcF0gPSBwYXRoLnNwbGl0KFwiLlwiKVxuICAgICAgICAgICAgICAgICAgICBwcm9wID0gXCJ2YWx1ZVwiIHVubGVzcyBwcm9wXG4gICAgICAgICAgICAgICAgICAgIGlkID0gdElkIHVubGVzcyBpZFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBwYXRoID0gaWQgKyBcIi5cIiArIHByb3BcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB1bmxlc3MgX3JlZ1twYXRoXSBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlZ1twYXRoXSA9IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjLnB1c2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiByZXFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlJZDogaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZTogcHJvcFxuXG4gICAgICAgICAgICAgICAgICAgIFwiJFZbXFxcIiN7cGF0aH1cXFwiXVwiXG4gICAgXG4gICAgXG4gICAgICAgICAgICAoVCwgcHJvcE5hbWUsIHZhbHVlKSAtPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbXBpbGVkID0gY29tcGlsZSh2YWx1ZSwgVC5pZClcbiAgICAgICAgICAgICAgICBmbiA9IHRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKFwiJFZcIiwgXCJyZXR1cm4gXCIgKyBjb21waWxlZC5ib2R5ICsgXCI7XCIpXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIFxuICAgICAgICAgICAgICAgICAgICAgICAgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPLmVycm9yKF9lcnJvciwgXCJXcm9uZyBiaW5kaW5nIGV4cHJlc3Npb25cIiwgY29tcGlsZWQuYm9keSkubG9nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICMgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgIF9iaW5kID0gKGV2KSAtPiBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0ge31cbiAgICAgICAgICAgICAgICAgICAgZm9yIHAgaW4gY29tcGlsZWQuc291cmNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgKHcgPSBPLmVudGl0eShwLmVudGl0eUlkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTy5sb2coXCJFeHByZXNzaW9uIGhhdmUgbm8gc291cmNlIHlldDogI3twLmlkfSAtPiAje1R9LiN7cHJvcE5hbWV9XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbHVlc1twLmlkXSA9IHcucHJvcChwLnByb3BOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCBpcyB1bmRlZmluZWQpIG9yIChwLnJlcXVpcmVkIGFuZCBub3QgdmFsKSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE8ubG9nKFwiRXhwcmVzc2lvbiBoYXZlIG5vIHZhbHVlIHlldDogI3twLmlkfSAtPiAje1R9LiN7cHJvcE5hbWV9XCIpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgVC5wcm9wIHByb3BOYW1lLCBmbi5jYWxsKFQsIHZhbHVlcylcblxuICAgICAgICAgICAgICAgICMgc3Vic2NyaWJlIGFsbFxuICAgICAgICAgICAgICAgIEV2ZW50Lmxpc3Rlbihwcy5pZCwgX2JpbmQsIFQpIGZvciBwcyBpbiBjb21waWxlZC5zb3VyY2VzXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIyBwZXJmb3JtIGJpbmRpbmcgaW1tZWRpYXRlbHkhISFcbiAgICAgICAgICAgICAgICBfYmluZCgpXG4gICAgICAgICAgICBcbiAgICAgICAgKSgpICBcbiAgICAgICAgXG4gICAgICAgIEJJTkQyOiAoVCwgcHJvcCwgcGF0aCwgZGJvdW5kKSAtPlxuICAgICAgICAgICAgW3NJZCwgc1Byb3BdID0gcGF0aC5zcGxpdCgnLicpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgX2JpbmQgPSAoZXYpIC0+IFxuICAgICAgICAgICAgICAgIHJldHVybiB1bmxlc3MgUyA9IE8uZW50aXR5IHNJZFxuICAgICAgICAgICAgICAgIHZhbCA9ICBTLnByb3Agc1Byb3BcbiAgICAgICAgICAgICAgICBpZiB2YWwgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIE8ubG9nIChcIkJpbmdpbmcgaXMgbm90IHJlYWR5IGZvciAje1R9LiN7cHJvcH1cIilcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIE8ubG9nIChcIkJpbmdpbmcgZm9yICN7VH0uI3twcm9wfVwiK3ZhbClcbiAgICAgICAgICAgICAgICAgICAgVC5wcm9wIHByb3AsIHZhbFxuICAgICAgICAgICAgICAgIHVubGVzcyBkYm91bmRcbiAgICAgICAgICAgICAgICAgICAgUFJPUC5CSU5EMiBTLCBzUHJvcCwgVC5pZCArIFwiLlwiICsgcHJvcCwgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBkYm91bmQgPXRydWVcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAjIHN1YnNjcmliZVxuICAgICAgICAgICAgRXZlbnQubGlzdGVuKHBhdGgsIF9iaW5kLCBUKVxuXG4gICAgICAgICAgICB1bmxlc3MgZGJvdW5kXG4gICAgICAgICAgICAgICAgIyBwZXJmb3JtIGJpbmRpbmcgaW1tZWRpYXRlbHkhISFcbiAgICAgICAgICAgICAgICBfYmluZCgpXG4gICAgICAgICAgICAgICAgXG5cbiAgICBjbGFzcyBFbnRpdHlQcm9wZXJ0eSBcbiAgICBcbiAgICAgICAgY29uc3RydWN0b3I6IChAaWQpIC0+XG4gICAgICAgICAgICBAX2lkID1AaWRcbiAgICAgICAgICAgIEBhc3luY1RhcmdldCA9IEBpZFswLi4tNF0gaWYgQGlkWy0zLi5dIGlzIFwiVXJpXCJcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlkcyA9IEBpZC5zcGxpdCgnOicpXG4gICAgICAgICAgICBpZiAodHlwZUlkID0gaWRzWzFdKVxuICAgICAgICAgICAgICBAaWQgPSBpZHNbMF1cbiAgICAgICAgICAgICAgdHlwZSA9IFBST1AuVFlQRVNbdHlwZUlkXVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFUlJPUjogTm8gc3VjaCBwcm9wZXJ0eSB0eXBlOiBcIiArIHR5cGVJZCkgIHVubGVzcyB0eXBlXG4gICAgICAgICAgICAgIGlmIGZ0b3IgPSB0eXBlLm1ldGhvZHNcbiAgICAgICAgICAgICAgICAgIG1ldGhvZHMgPSBmdG9yKF9zdXBlciA9IHt9KVxuICAgICAgICAgICAgICAgICAgZm9yIG4gb2YgbWV0aG9kc1xuICAgICAgICAgICAgICAgICAgICBfc3VwZXJbbl0gPSBAW25dIG9yIEYuTk9ORSAgaWYgdHlwZW9mIChtZXRob2RzW25dKSBpcyBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgQFtuXSA9IG1ldGhvZHNbbl1cbiAgICAgICAgICAgICAgQG1peGluID0gdHlwZS5taXhpblxuICAgICAgICBcbiAgICAgICAgIyBpbnZva2VkIHdoZW4gcHJvcGVydHkgYXR0YWNoZWQgdG8gZW50aXR5IHR5cGVcbiAgICAgICAgIyBieSBkZWZhdWx0IGFwcGxpZXMgcGF0Y2hlcyB0byBlbnRpdHkgdHlwZVxuICAgICAgICBhdHRhY2hUb0VudGl0eUN0b3I6IChjdG9yKSAtPiBFTlRJVFkuYXBwbHlNaXhpbi5jYWxsKGN0b3I6OiwgQG1peGluKSBpZiBAbWl4aW5cblxuICAgICAgICAjIFByb3BlcnR5IGluaXRpYWxpemF0aW9uIGZvciBnaXZlbiBlbnRpdHlcbiAgICAgICAgIyBpbnZva2VkIGF0IGVudGl0eS5pbml0KClcbiAgICAgICAgIyBAcGFyYW0gVCAgZW50aXR5IGluc3RhbmNlXG4gICAgICAgIGluaXQ6IChUKSAtPlxuICAgICAgICAgICAgXG4gICAgICAgICAgIyBzZXQgaW5pdGlhbCB2YWx1ZSBpZiBhbnlcbiAgICAgICAgICB1bmxlc3MgKHYgPSAoZGVmcz1ULl9vcHRpb25zKVtAaWRdKSBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIFQucHJvcCBAaWQsIGlzRXZlbnQ6dHJ1ZSwgdmFsdWU6diwgZm9yY2U6IHRydWUgXG4gICAgICAgICAgXG4gICAgICAgICAgIyBkeW5hbWljYWxseSBpbml0IGFzeW5jIHVybCBpZiBhbnlcbiAgICAgICAgICBQUk9QLkdFVChcIiN7QGlkfVVyaVwiKS5pbml0KFQpIGlmIChkZWZzW1wiI3tAaWR9VXJpXCJdKSBvciAoZGVmc1tcIiN7QGlkfVVyaUV4cHJlc3Npb25cIl0pXG4gICAgICAgICAgXG4gICAgICAgICAgI2JpbmQgZXhwcmVzc2lvbiBpZiBhbnlcbiAgICAgICAgICBQUk9QLkJJTkQoVCwgQGlkLCBleHByKSBpZiAoZXhwciA9IGRlZnNbXCIje0BpZH1FeHByZXNzaW9uXCJdKVxuICAgICAgICAgIFBST1AuQklORDIoVCwgQGlkLCBleHByKSBpZiAoZXhwciA9IGRlZnNbXCIje0BpZH1CaW5kaW5nXCJdKVxuICAgICAgICAgIFxuICAgICAgICAgIFQuYWRkRmluYWxpemVyIEBkb25lXG5cbiAgICAgICAgIyBmaW5hbGl6ZXIgZm9yIGdpdmVuIHByb3BlcnR5LiBpbnZva2VkIGF0IGVudGl0eS5kb25lKClcbiAgICAgICAgZG9uZTogKFQpIC0+IGRlbGV0ZSBUW0BpZF1cblxuICAgICAgICAjIHZhbHVlIGdldHRlclxuICAgICAgICBnZXR0ZXI6IChUKSAtPiBULl9zdGF0ZVtAaWRdXG5cbiAgICAgICAgIyB2YWx1ZSBzZXR0ZXJcbiAgICAgICAgc2V0dGVyOiAoVCwgdiwgZXYpIC0+IFQuX3N0YXRlW0BpZF0gPSB2XG5cbiAgICAgICAgIyB2YWx1ZSBjb21wYXJhdG9yXG4gICAgICAgIGNvbXBhcmF0b3I6ICh2MSwgdjIpIC0+ICB2MSBpcyB2MlxuICAgICAgICBcbiAgICAgICAgIyBhc3luYyB2YWx1ZSBhZGFwdGVyLiB1c2VkIGluIHNldEFzeW5jVmFsdWUoKSBjYWxsYmFjayBieSBkZWZhdWx0LlxuICAgICAgICBhc3luY0FkYXB0ZXIgOiAoZXJyLCB2YWx1ZSkgLT4gXG4gICAgICAgICAgICByZXR1cm4gZXJyb3I6IE9iamVjdC5lcnJvcihlcnIpLmxvZygpIGlmIGVyclxuICAgICAgICAgICAgdmFsdWUgb3IgbnVsbFxuXG4gICAgICAgICMgQHNldCBhc3luYyBwcm9wZXJ0eSB2YWx1ZS5cbiAgICAgICAgc2V0VmFsdWVGb3JVcmk6IChULCB1cmkpIC0+IFxuICAgICAgICAgICAgTy5maXJlIHVyaSwgKGVyciwgdmFsdWUpID0+XG4gICAgICAgICAgICAgICAgVC5wcm9wIEBpZCwgKFRbXCIje0BpZH1Bc3luY0FkYXB0ZXJcIl0gb3IgQGFzeW5jQWRhcHRlcikuY2FsbChULCBlcnIsIHZhbHVlKSB1bmxlc3MgVC5pc0RvbmVcblxuICAgICAgICBcbiAgICAgICAgIyBAc2V0IHByb3BlcnR5IHZhbHVlLiBcbiAgICAgICAgIyBpbnZva2VkIGZyb20gZW50aXR5LnNldFByb3BlcnR5KClcbiAgICAgICAgIyBAcGFyYW0gVCAgZW50aXR5IGluc3RhbmNlXG4gICAgICAgICMgQHBhcmFtIGV2IGV2ZW50IG9iamVjdCBjb250YWluaW5nIHZhbHVlIHRvIHNldFxuICAgICAgICBzZXRWYWx1ZTogKFQsIGV2KSAtPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICBldiA9IGlmIChldj8uaXNFdmVudCkgdGhlbiBldiBlbHNlIHZhbHVlOmV2IFxuICAgICAgICAgICAgZXYucHJvcElkID0gQGlkXG4gICAgICAgICAgICBldi5lbnRpdHkgPSBUIFxuICAgICAgICAgICAgZXYub2xkVmFsdWUgPSBAZ2V0dGVyIFQgICAgICAgICAgICBcblxuICAgICAgICAgICAgaWYgKCh2ID0gZXYudmFsdWUpIGlzbnQgdW5kZWZpbmVkKSBhbmQgKGV2LmZvcmNlIG9yIG5vdCBAY29tcGFyYXRvcih2LCBldi5vbGRWYWx1ZSkpXG5cbiAgICAgICAgICAgICAgICAjIGFjdHVhbGx5IHNldFxuICAgICAgICAgICAgICAgIEBzZXR0ZXIgVCwgdiwgZXZcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAjIGFzeW5jIHNldCBmb3IgdGFyZ2V0IHByb3BlcnR5XG4gICAgICAgICAgICAgICAgVC5wcm9wKEBhc3luY1RhcmdldCwgaXNFdmVudDp0cnVlLHZhbHVlOm51bGwsIHVyaTogdiwgZm9yY2U6IHRydWUgKSBpZiBAYXN5bmNUYXJnZXQgYW5kIHZcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBULnByb3BlcnR5Q2hhbmdlZCBldiwgdiwgQGlkXG5cbiAgICAgICAgICAgIEBzZXRWYWx1ZUZvclVyaShULCBldi51cmkpIGlmIGV2LnVyaVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBldlxuIFxuICAgICMjI1xuICAgIEVudGl0eVxuICAgICMjI1xuICBcbiAgICBFTlRJVFkgPSBcbiAgICAgICAgIyBlbnRpdGllcyByZWdpc3RyeVxuICAgICAgICBBTEwgOiB7fVxuICAgICAgICBcbiAgICAgICAgIyBlbnRpdHkgdHlwZXMgcmVnaXN0cnlcbiAgICAgICAgVFlQRVMgOiB7fVxuICAgICAgICBcbiAgICAgICAgIyBlbnRpdHkgY291bnRlciB1c2VkIGFzIGd1aWRcbiAgICAgICAgVE9UQUwgOiAwXG4gICAgICAgIFxuICAgICAgICAjb3ZlcnJpZGVzIG1ldGhvZHMuXG4gICAgICAgIGFwcGx5TWl4aW4gOiAoZm4pIC0+XG4gICAgICAgICAgICByZXR1cm4gQCB1bmxlc3MgZm5cbiAgICAgICAgICAgIGZvciBvd24gbiwgbSBvZiBmbihfc3VwZXIgPSB7fSlcbiAgICAgICAgICAgICAgICBfc3VwZXJbbl0gPSBAW25dIG9yIEYuTk9ORVxuICAgICAgICAgICAgICAgIEBbbl0gPSBtXG4gICAgICAgICAgICBAXG4gICAgICAgIFxuXG4gICAgICAgICMgcGFyc2VzIG1ldGEgaW5mbyBmb3IgZW50aXR5XG4gICAgICAgIHBhcnNlTWV0YSA6IChtKSAtPlxuICAgICAgICAgICAgbSA9ICBPLnBhcnNlKG0pIGlmIHR5cGVvZiAobSkgaXMgXCJzdHJpbmdcIlxuICAgICAgICAgICAgIyBpZGVudGl0eVxuICAgICAgICAgICAgdW5sZXNzIG0udHlwZUlkXG4gICAgICAgICAgICAgICAgaWQgPSBtLmlkXG4gICAgICAgICAgICAgICAgW20uaWQsIG0udHlwZUlkXSA9IGlmICc6JyBpbiBpZCB0aGVuIGlkLnNwbGl0KFwiOlwiKSBlbHNlIFtudWxsLGlkXVxuICAgICAgICAgICAgbSBcbiAgICAgICAgICAgIFxuICAgICAgICAjIGp1c3QgcmVnaXN0ZXIgbWV0YSBhdCB0aGlzIHRpbWUuIEFjdHVhbCB0eXBlIGNvbnN0cnVjdG9yIHdpbGwgYmUgY3JlYXRlZCBvbiBkZW1hbmQuXG4gICAgICAgIGRlZmluZVR5cGUgOiAobSkgLT5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZHMgPSBtLmlkLnNwbGl0KFwiIGV4dGVuZHMgXCIpXG4gICAgICAgIFxuICAgICAgICAgICAgQFRZUEVTW2lkc1swXV0gPSBcbiAgICAgICAgICAgICAgICBpZCA6IGlkc1swXSAgICBcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBtLm9wdGlvbnMgb3Ige31cbiAgICAgICAgICAgICAgICBzdXBlcklkczogaWRzWzFdPy5zcGxpdCgnLCcpIG9yIFtdXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczogbS5wcm9wZXJ0aWVzIG9yIFtdXG4gICAgICAgICAgICAgICAgbWV0aG9kczogbS5tZXRob2RzICBvciBGLk5PTkUgICAgICAgICAgXG5cbiAgICAgICAgIyBnZXQgZW50aXR5IGNvbnN0cnVjdG9yIG9yIGNyZWF0ZXMvcmVnaXN0ZXIgYSBuZXcgb25lLlxuICAgICAgICBnZXRDdG9yIDogKHQpIC0+IHQuY3RvciBvciAodC5jdG9yID0gQGNyZWF0ZUN0b3IodCkpIGlmICh0ID0gQFRZUEVTW3RdKVxuICAgICAgICBcbiAgICAgICBcbiAgICAgICAgXG4gICAgICAgICNAY3JlYXRlcyBhIG5ldyBvbmUgZW50aXR5IGNvbnN0cnVjdG9yLlxuICAgICAgICBjcmVhdGVDdG9yIDogKC0+XG5cbiAgICAgICAgICAgIF9hcHBseVN1cGVyVHlwZSA9ICh0KSAtPlxuICAgICAgICAgICAgICAgICAgICBzY3RvciA9IHQuY3RvciBvciAodC5jdG9yID0gRU5USVRZLmNyZWF0ZUN0b3IodCkpXG4gICAgICAgICAgICAgICAgICAgIGZvciBvd24gbiwgcCBvZiBzY3Rvci5wcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBAcHJvcGVydGllc1tuXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE8ubG9nKCdEdXBsaWNhdGUgcHJvcGVydHknLCBwLCBAKVxuICAgICAgICAgICAgICAgICAgICAgICAgKEBwcm9wZXJ0aWVzW25dID0gcCkuYXR0YWNoVG9FbnRpdHlDdG9yKEApICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBPLnVwZGF0ZSBAb3B0aW9ucywgc2N0b3Iub3B0aW9uc1xuXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZHMgPSB0Lm1ldGhvZHMoX3N1cGVyID0ge30pXG4gICAgICAgICAgICAgICAgICAgIGZvciBvd24gbiwgbSBvZiAoc2N0b3I6Oikgd2hlbiAobiBpc250ICdjb25zdHJ1Y3RvcicgYW5kIHR5cGVvZiAobSkgaXMgXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgbWV0aG9kc1tuXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zdXBlcltuXSA9IG1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gbWV0aG9kc1tuXSBcbiAgICAgICAgICAgICAgICAgICAgICAgIEA6OltuXSA9IG1cbiAgICAgICAgICAgICAgICAgICAgQFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICh0eXBlKSAtPlxuICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGN0b3IgPSAoQGlkLCBvcHRpb25zKS0+XG4gICAgICAgICAgICAgICAgICAgIEBfc3RhdGUgPSB7fVxuICAgICAgICAgICAgICAgICAgICBAX2ZpbmFsaXplcnMgPSBbXVxuICAgICAgICAgICAgICAgICAgICBAX2lkID0gXCJFXCIgKyAoRU5USVRZLlRPVEFMKyspICMgdW5pcXVlIGlkZW50aXR5XG4gICAgICAgICAgICAgICAgICAgIEBfb3B0aW9ucyA9IE8uY2xvbmUoQGNvbnN0cnVjdG9yLm9wdGlvbnMsIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIEBcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGN0b3I6OiA9IG5ldyBFbnRpdHkoKVxuXG4gICAgICAgICAgICAgICAgY3Rvci50eXBlID0gdHlwZVxuICAgICAgICAgICAgICAgIGN0b3Iub3B0aW9ucyA9IHt9ICMgaW5jcmVtZW50YWwgd2l0aCBzdXBlcnNcbiAgICAgICAgICAgICAgICBjdG9yLnByb3BlcnRpZXMgPSB7fSAjIGluY3JlbWVudGFsIHdpdGggc3VwZXJzXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgX2FwcGx5U3VwZXJUeXBlLmNhbGwoY3RvciwgQFRZUEVTW3N1cGVySWRdKSBmb3Igc3VwZXJJZCBpbiB0eXBlLnN1cGVySWRzXG5cbiAgICAgICAgICAgICAgICAoY3Rvci5wcm9wZXJ0aWVzWyhwPVBST1AuR0VUKGlkKSkuaWRdID0gcCkuYXR0YWNoVG9FbnRpdHlDdG9yKGN0b3IpIGZvciBpZCBpbiB0eXBlLnByb3BlcnRpZXMgXG4gICAgICAgICAgICAgICAgTy51cGRhdGUgY3Rvci5vcHRpb25zLCB0eXBlLm9wdGlvbnNcbiAgICAgICAgICAgICAgICBFTlRJVFkuYXBwbHlNaXhpbi5jYWxsIGN0b3I6OiwgdHlwZS5tZXRob2RzXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgI08ubG9nKHR5cGUuaWQsIGN0b3IucHJvcGVydGllcylcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjdG9yOjpjb25zdHJ1Y3RvciA9IGN0b3JcbiAgICAgICAgKSgpXG4gICAgICAgICAgICBcbiAgICAgICAgI0BnZXQgZW50aXR5IGNvbnN0cnVjdG9yIG9yIGNyZWF0ZXMvcmVnaXN0ZXIgYSBuZXcgb25lLlxuICAgICAgICByZXNvbHZlVHlwZXMgOiAodHlwZUlkcywgY2IpIC0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHVybHMgPSAoXCJlbnRpdHk6Ly8je3R9XCIgZm9yIHQgaW4gdHlwZUlkcyB3aGVuIG5vdCBAVFlQRVNbdF0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBjYigpIHVubGVzcyB1cmxzLmxlbmd0aFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBPLnJlcXVpcmUgdXJscywgKGVycikgLT5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiBlcnIgb3Igbm90ICh0IGZvciB0IGluIHR5cGVJZHMgd2hlbiBub3QgQFRZUEVTW3RdKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE8uZXJyb3IoZXJyLCBcIkVSUk9SOiBDYW4ndCByZXNvbHZlIHNvbWUgaW4gdHlwZXM6IFsje3R5cGVJZHMuam9pbignLCcpfV0gXCIpLmxvZygpIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN1YlR5cGVzID0gW11cbiAgICAgICAgICAgICAgICBzdWJUeXBlcy5wdXNoIEBUWVBFU1t0XS5zdXBlcklkcy4uLiBmb3IgdCBpbiB0eXBlSWRzIHdoZW4gbm90IEBUWVBFU1t0XS5jdG9yXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgQHJlc29sdmVUeXBlcyhzdWJUeXBlcywgY2IpXG5cbiAgICAgICAgY3JlYXRlOihtZXRhKSAtPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtZXRhID0gQHBhcnNlTWV0YShtZXRhKVxuICAgICAgICAgICAgdHlwZUlkID0gbWV0YS50eXBlSWRcbiAgICAgICAgICAgIHR5cGUgPSBAVFlQRVNbdHlwZUlkXVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB1bmxlc3MgY3RvciA9IHR5cGU/LmN0b3JcbiAgICAgICAgICAgICAgICBjYjIgPSAoZXJyKSA9PiBcbiAgICAgICAgICAgICAgICAgICAgQGdldEN0b3IodHlwZUlkKVxuICAgICAgICAgICAgICAgICAgICBAY3JlYXRlIG1ldGEgdW5sZXNzIGVyclxuICAgICAgICAgICAgICAgIHJldHVybiBAcmVzb2x2ZVR5cGVzIChpZiB0eXBlIHRoZW4gdHlwZS5zdXBlcklkcyBlbHNlIFt0eXBlSWRdKSAsIGNiMiBcbiAgICAgICAgICAgXG4gICAgICAgICAgICAjIHJlZ3VsYXIgaW5zdGFuY2VcbiAgICAgICAgICAgIGlmIG1ldGEucHJvcGVydGllcyBvciBtZXRhLm1ldGhvZHNcbiAgICAgICAgICAgICAgICBjdG9yID0gQGNyZWF0ZUN0b3JcbiAgICAgICAgICAgICAgICAgICAgaWQgOiBcIlRcIiArIChFTlRJVFkuVE9UQUwrKykgICBcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogbWV0YS5vcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIHN1cGVySWRzOiB0eXBlSWQuc3BsaXQoJywnKSBvciBbXVxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBtZXRhLnByb3BlcnRpZXMgb3IgW11cbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kczogbWV0YS5tZXRob2RzICBvciBGLk5PTkUgXG5cbiAgICAgICAgICAgIG9iaiA9IG5ldyBjdG9yKG1ldGEuaWQsIG1ldGEub3B0aW9ucykgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMgcmVnaXN0ZXIgaWYgaGFzIGV4cGxpY2l0IGlkXG4gICAgICAgICAgICBAQUxMW29iai5pZF0gPSBvYmogaWYgb2JqLmlkXG5cbiAgICAgICAgICAgICMgcmVzb2x2ZSBkZXBlbmRlbmNpZXNcbiAgICAgICAgICAgIGlmIG9iai5yZXF1aXJlc1xuICAgICAgICAgICAgICAgIE8ucmVxdWlyZSBvYmoucmVxdWlyZXMsIChlcnIpIC0+XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbml0KCkgdW5sZXNzIGVyclxuICAgICAgICAgICAgICAgICAgICBtZXRhLm9uQ3JlYXRlPyhlcnIsIG9iailcbiAgICAgICAgICAgIGVsc2UgXG4gICAgICAgICAgICAgICAgb2JqLmluaXQoKVxuICAgICAgICAgICAgICAgIG1ldGEub25DcmVhdGU/KG51bGwsIG9iailcblxuICAgICAgICAgICAgTy5lbnRpdHkgIyBhbGxvdyBjaGFpbmluZ1xuXG4gICAgICAgIGdldCA6IChpZCkgLT4gaWYgaWQuX2lkIHRoZW4gaWQgZWxzZSBAQUxMW2lkXSBpZiBpZFxuXG4gICAgIyBAZGVmaW5lIFRoZSBiYXNpYyBbZW50aXR5XSBlbnRpdHkgdHlwZS5cbiAgICBjbGFzcyBFbnRpdHlcbiAgICBcbiAgICAgICAgIyBpbml0aWFsaXplcyBlbnRpdHlcbiAgICAgICAgaW5pdDogLT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyBpbml0IGFsbCBkZWNsYXJlZCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBwLmluaXQgQCBmb3IgbiwgcCBvZiBAY29uc3RydWN0b3IucHJvcGVydGllcyB3aGVuIHAuaW5pdFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjIGFzc2lnbiB0aGlzIGZvciBvdGhlciBlbnRpdGllc1xuICAgICAgICAgICAgaWYgcmVmID0gQHJlZmVycmVyXG4gICAgICAgICAgICAgICAgcmVmID0gKGlmIHJlZi5zcGxpdCB0aGVuIHJlZi5zcGxpdChcIi5cIikgZWxzZSByZWYpXG4gICAgICAgICAgICAgICAgaWYgdGFyZ2V0ID0gKChpZiAocmVmWzBdIGlzIFwicGFyZW50XCIpIHRoZW4gQHBhcmVudEVudGl0eSBlbHNlICQocmVmWzBdKSkpXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtyZWZbMV1dID0gQFxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgQGlkIGFuZCBAb25FdmVudFxuICAgICAgICAgICAgICAgIEV2ZW50Lmxpc3RlbiAgQGlkLCBAb25FdmVudCwgQFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBAYWRkRmluYWxpemVyID0+IFxuICAgICAgICAgICAgICAgIE8udW5saXN0ZW4gQGlkXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRhcmdldFtyZWZbMV1dIGlmIHRhcmdldFxuICAgICAgICAgICAgICAgIGRlbGV0ZSBFTlRJVFkuQUxMW0BpZF1cbiAgICAgICAgICAgICAgICBAaXNEb25lID0gdHJ1ZSAjIG1hcmsgZG9uZVxuXG4gICAgICAgICMgZG9uZSBlbnRpdHlcbiAgICAgICAgZG9uZTogLT5cbiAgICAgICAgICAgIGZuLmNhbGwgQCBmb3IgZm4gaW4gQF9maW5hbGl6ZXJzXG4gICAgICAgICAgICBkZWxldGUgQF9maW5hbGl6ZXJzXG5cbiAgICAgICAgIyBhZGQgYSBzb21lIGZpbmFsaXplciBmdW5jdGlvbiB0byBiZSBpbnZva2VkIGF0IGRvbmUoKTtcbiAgICAgICAgYWRkRmluYWxpemVyOiAoZm4pIC0+ICBAX2ZpbmFsaXplcnMucHVzaCBmbiB1bmxlc3MgQGlzRG9uZVxuICAgICAgICAgICAgXG4gICAgICAgICMgcHJvcGVydHkgZ2V0L3NldFxuICAgICAgICBwcm9wOiAoa2V5LCB2YWx1ZSkgLT5cbiAgICAgICAgICAgIHJldHVybiBudWxsIGlmIEBpc0RvbmVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcCA9IEBjb25zdHJ1Y3Rvci5wcm9wZXJ0aWVzXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIChpZiBwW2tleV0gdGhlbiBwW2tleV0uZ2V0dGVyKEApIGVsc2UgQF9zdGF0ZVtrZXldKSBpZiBhcmd1bWVudHMubGVuZ3RoIGlzIDEgIyBhcyBnZXR0ZXJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgKHBba2V5XSBvciAocFtrZXldID0gUFJPUC5HRVQoa2V5KSkpLnNldFZhbHVlIEAsIHZhbHVlXG4gICAgICAgICAgICBcbiAgICAgICAgcHJvcGVydHlDaGFuZ2VkOiAoZXYsIHYsIHByb3BJZCkgLT5cbiAgICAgICAgICAgICMgaG9va1xuICAgICAgICAgICAgQFtcIiN7cHJvcElkfUNoYW5nZWRcIl0/LmNhbGwoQCwgZXYsIHYpXG4gICAgICAgICAgICAjIG5vdGlmeSBkZXBlbmRlbnNpZXNcbiAgICAgICAgICAgIEV2ZW50Lm5vdGlmeSBAaWQsIHByb3BJZCwgZXZcblxuICAgICAgICAjIHRvU3RyaW5nXG4gICAgICAgIHRvU3RyaW5nOiAtPiBcIltFbnRpdHk6I3tAY29uc3RydWN0b3IudHlwZS5pZH06I3tAaWR9OiN7QF9pZH1dXCJcblxuICAgICMjI1xuICAgIEFQSSBcbiAgICAjIyNcbiAgICAgICAgXG4gICAgTy5maXJlID0gKGV2LCBjYikgLT4gKGlmIGV2LmlzRXZlbnQgdGhlbiBldiBlbHNlIG5ldyBFdmVudChldikpLmZpcmUgY2JcbiAgICBcbiAgICBPLmVudGl0eSA9IChpZCkgLT4gRU5USVRZLmdldChpZClcbiAgXG4gICAgIyBkZWZpbmUgYSBuZXcgZW50aXR5IHR5cGVcbiAgICBPLmVudGl0eS5kZWZpbmUgPSAobWV0YSkgLT4gRU5USVRZLmRlZmluZVR5cGUobWV0YSlcblxuICAgICMgZGVmaW5lcyBhIHByb3BlcnR5IHR5cGVcbiAgICBPLmVudGl0eS5kZWZpbmVQcm9wZXJ0eSA9IChtZXRhKSAtPiBQUk9QLlRZUEVTW21ldGEuaWRdID0gbWV0YVxuXG4gICAgIyBjcmVhdGVzIGEgbmV3IGVudGl0eSBpbnN0YW5jZS5cbiAgICAjIEBwYXJhbSByIC0gbWV0YWluZm8gb2JqZWN0IGZvciBpbnN0YW5jZTogXG4gICAgTy5lbnRpdHkuY3JlYXRlID0gKG1ldGEpIC0+IEVOVElUWS5jcmVhdGUobWV0YSlcblxuICAgICMgY3JlYXRlcyBhIG5ldyBlbnRpdHkgaW5zdGFuY2UuXG4gICAgIyBAcGFyYW0gciAtIG1ldGFpbmZvIG9iamVjdCBmb3IgaW5zdGFuY2U6IFxuICAgIE8uZW50aXR5LnByb3AgPSAoaWQsIGtleSwgdmFsdWUpIC0+IEVOVElUWS5nZXQoaWQpPy5wcm9wKGtleSx2YWx1ZSlcblxuXG4gICAgTy5lbnRpdHlcbiAgICBcbikoaWYgdHlwZW9mIChnbG9iYWwpIGlzIFwidW5kZWZpbmVkXCIgdGhlbiB0aGlzIGVsc2UgZ2xvYmFsKVxuIl19
