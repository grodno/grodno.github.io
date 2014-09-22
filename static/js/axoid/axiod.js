// Generated by CoffeeScript 1.7.1

/*
AXOID.JS
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function(global) {
    "use strict";
    var A, ENTITY, EntityProperty, EntityPrototype, Event, F, F0, O, PROP, _ref;
    _ref = [Function, Array, Object], F = _ref[0], A = _ref[1], O = _ref[2];
    F0 = function(x) {
      return x;
    };
    O.log = function(x) {
      var args, c, e;
      if (!global.DEBUG) {
        return x;
      }
      c = global.console;
      args = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          e = arguments[_i];
          _results.push(e);
        }
        return _results;
      }).apply(this, arguments);
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
      if (!err) {
        err = {
          message: "unknown"
        };
      }
      if (typeof err === "string") {
        err = {
          reason: err
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
      function Uri() {
        this.isUri = true;
        this.params = {};
      }

      Uri.prototype.toString = function() {
        var n, r, sep, v, _ref1;
        r = "";
        if (this.type) {
          r = this.type + ":";
        }
        r += (this.domain ? "//" + this.domain : (this.type ? "*" : ""));
        if (this.path) {
          r += '/' + this.path.join('/');
        }
        sep = '?';
        _ref1 = this.params;
        for (n in _ref1) {
          if (!__hasProp.call(_ref1, n)) continue;
          v = _ref1[n];
          r += sep + n + "=" + encodeURIComponent(v);
          if (sep === '?') {
            sep = '&';
          }
        }
        if (this.hash) {
          r += "#" + this.hash;
        }
        return r;
      };

      Uri.parse = function(s) {
        var p, r, v, _i, _len, _ref1, _ref2;
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
        if ((p = s.indexOf("://")) > -1) {
          r.type = s.slice(0, +(p - 1) + 1 || 9e9);
          s = s.slice(p + 1);
        }
        if ((p = s.indexOf("#")) > -1) {
          r.hash = s.slice(p + 1);
          s = s.slice(0, +(p - 1) + 1 || 9e9);
        }
        r.id = s;
        _ref1 = s.split("?"), s = _ref1[0], r.query = _ref1[1];
        if (r.query) {
          _ref2 = r.query.split("&");
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            v = _ref2[_i];
            if ((p = v.split("=")).length > 1) {
              r.params[p[0]] = decodeURIComponent(p[1]);
            }
          }
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
      var DEFERED, LISTENERS, Record, _defer, _notify, _obj;

      LISTENERS = {};

      DEFERED = {};

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
        (DEFERED[key] || (DEFERED[key] = [])).push(this);
        return O.log("!!! Defer event for [" + key + "]");
      };

      _notify = function(obj) {
        var rec;
        rec = obj != null ? obj.first : void 0;
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
            this.obj.first = this.next || null;
          }
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
        if (u.uri) {
          O.update(this, u);
        } else {
          this.uri = u;
        }
        this.uri = O.Uri.parse(this.uri);
      }

      Event.prototype.fire = function(c) {
        var key, obj;
        if (c) {
          this.callback = c;
        }
        if (!(key = this.uri.type)) {
          throw "No target specified for event " + (this.uri.toString());
        }
        if (!(obj = LISTENERS[key])) {
          return _defer.call(this, key);
        }
        return _notify.call(this, obj);
      };

      Event.prototype.isEvent = true;

      Event.prototype.callback = function() {};

      Event.listen = function(key, handler, target) {
        var ev, list, _i, _len, _results;
        new Record(handler, target).add(_obj(key, true));
        if (list = DEFERED[key]) {
          _results = [];
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            ev = list[_i];
            _results.push(ev.fire());
          }
          return _results;
        }
      };

      Event.unlisten = function(key) {
        return delete LISTENERS[key];
      };

      Event.notifyPropertyChanged = function(key, propId, ev) {
        var _ref1;
        return _notify.call(ev, (_ref1 = LISTENERS[key]) != null ? _ref1[propId] : void 0);
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
            if (!__hasProp.call(obj, n)) continue;
            x = obj[n];
            fn.call(ctx, x, n, opts);
          }
        }
      }
      return ctx;
    };
    F.perform = function(ctx, factory) {
      var flow, locked, newCb, results, tick;
      locked = 1;
      results = [null, void 0];
      tick = function() {
        var op, _args, _sError;
        if (!--locked && (op = flow.operations.shift())) {
          locked = 1;
          _args = [].concat(results);
          results = [null, void 0];
          try {
            if (!global.DEBUG) {
              _sError = new Error;
            }
            return op.apply(flow.context, _args);
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
          return tick();
        };
      };
      flow = {
        context: ctx,
        next: newCb(1),
        wait: function() {
          var pos;
          pos = results.length;
          results[pos] = void 0;
          locked += 1;
          return newCb(pos);
        }
      };
      flow.operations = factory.call(ctx, flow);
      return tick();
    };
    O.require = (function() {
      var createCb, _cache;
      _cache = {};
      createCb = function(ctx) {
        return function(err, r) {
          var cb;
          if (err) {
            O.error(err).log();
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
      return function(list, cb) {
        if (!(list != null ? list.length : void 0)) {
          return cb(null, 0);
        }
        return F.perform(list, function(flow) {
          return [
            function() {
              var ctx, x, _i, _len;
              for (_i = 0, _len = list.length; _i < _len; _i++) {
                x = list[_i];
                if (x && (ctx = _cache[x] || (_cache[x] = {
                  q: [],
                  x: x
                })) && !ctx.isDone) {
                  ctx.q.push(flow.wait());
                  if (ctx.q.length === 1) {
                    O.fire(x, createCb(ctx));
                  }
                }
              }
              return flow.next(null, list.length);
            }, cb
          ];
        });
      };
    })();

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
      } : key || F0;
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
          if (!__hasProp.call(extra, n)) continue;
          obj[n] = extra[n];
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
          obj = obj[k = key.slice(p1, +(p - 1) + 1 || 9e9)] || (obj[k] = {});
        }
        return obj[key.slice(p1)] = val;
      } else {
        while (obj && (p = key.indexOf(".", p1 = p + 1)) > -1) {
          obj = obj[key.slice(p1, +(p - 1) + 1 || 9e9)];
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
        return F.call(F, 'window', "return " + s)();
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
          var _i, _len, _ref1, _results;
          _ref1 = s.split(sep);
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            t = _ref1[_i];
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
        var args, e;
        if (!s) {
          return '';
        }
        args = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            e = arguments[_i];
            _results.push(e);
          }
          return _results;
        }).apply(this, arguments);
        return s.replace(RE, function(s, d) {
          return args[+d + 1] || '';
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
        RE = /\$\{([\?\+]?[\w\.]+?)\}/gm;
        compile = function(s, tId) {
          var body, fn, src, _reg;
          _reg = {};
          src = [];
          body = s.replace(RE, function(s, path) {
            var id, opt, prop, req, _ref1;
            if ((opt = path[0] === "?") || (req = path[0] === "+")) {
              path = path.slice(1);
            }
            _ref1 = path.split("."), id = _ref1[0], prop = _ref1[1];
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
                optional: opt,
                entityId: id,
                propName: prop
              });
            }
            return "$V[\"" + path + "\"]";
          });
          fn = (function() {
            try {
              return new Function("$V", "return " + body + ";");
            } catch (_error) {
              return function() {
                O.error(_error, "Wrong binding expression", compiled.body).log();
                return _error.message;
              };
            }
          })();
          return {
            sources: src,
            expression: fn,
            values: null
          };
        };
        return function(T, propName, value) {
          var fn, handler, ps, _bind, _i, _len, _ref1;
          handler = compile(value, T.id);
          fn = function() {
            var v;
            v = handler.values;
            handler.values = null;
            return T.prop(propName, handler.expression.call(T, v));
          };
          _bind = function(ev) {
            var hasPending, p, val, w, _i, _len, _ref1;
            hasPending = handler.values !== null;
            handler.values = {};
            _ref1 = handler.sources;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              p = _ref1[_i];
              if (!(w = O.entity(p.entityId))) {
                handler.values = null;
                return T.log("Expression have no source yet: " + p.id + " -> " + propName);
              }
              val = w.prop(p.propName);
              if ((val === void 0 && !p.optional) || (p.required && !val)) {
                handler.values = null;
                return T.log("Expression have no value yet: " + p.id + " -> " + propName);
              }
              handler.values[p.id] = val;
            }
            if (!hasPending) {
              return setTimeout(fn, 10);
            }
          };
          _ref1 = handler.sources;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            ps = _ref1[_i];
            Event.listen(ps.id, _bind, T);
          }
          return _bind();
        };
      })(),
      BIND2: function(T, prop, path, dbound) {
        var sId, sProp, _bind, _ref1;
        _ref1 = path.split('.'), sId = _ref1[0], sProp = _ref1[1];
        _bind = function(ev) {
          var S, val;
          if (!(S = O.entity(sId))) {
            return;
          }
          val = S.prop(sProp);
          if (val === void 0) {

          } else {
            T.prop(prop, val);
          }
          if (!dbound) {
            return dbound = PROP.BIND2(S, sProp, T.id + "." + prop, true);
          }
        };
        Event.listen(path, _bind, T);
        if (!dbound) {
          _bind();
        }
        return true;
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
                _super[n] = this[n] || F0;
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

      EntityProperty.prototype.extractDefaults = function(T, defaults) {
        var n;
        n = this.id;
        if (T[n]) {
          defaults[n] = T[n];
          T[n] = void 0;
        }
        n = this.id + 'Expression';
        if (T[n]) {
          defaults[n] = T[n];
          T[n] = void 0;
        }
        n = this.id + 'Binding';
        if (T[n]) {
          defaults[n] = T[n];
          T[n] = void 0;
        }
        if (!this.asyncTarget) {
          n = this.id + 'Uri';
          if (T[n]) {
            defaults[n] = T[n];
            T[n] = void 0;
          }
          n = this.id + 'UriExpression';
          if (T[n]) {
            defaults[n] = T[n];
            return T[n] = void 0;
          }
        }
      };

      EntityProperty.prototype.init = function(T, defs) {
        var expr, v;
        if ((v = defs[this.id]) !== void 0) {
          T.prop(this.id, {
            isEvent: true,
            value: v,
            force: true
          });
        }
        if (defs["" + this.id + "Uri"] || defs["" + this.id + "UriExpression"]) {
          PROP.GET("" + this.id + "Uri").init(T, defs);
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
        return T[this.id];
      };

      EntityProperty.prototype.setter = function(T, v, ev) {
        return T[this.id] = v;
      };

      EntityProperty.prototype.comparator = function(v1, v2) {
        return v1 === v2;
      };

      EntityProperty.prototype.asyncAdapter = function(err, value) {
        if (err) {
          this.error(err);
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
        var m, n, _ref1, _super;
        if (!fn) {
          return this;
        }
        _ref1 = fn(_super = {});
        for (n in _ref1) {
          if (!__hasProp.call(_ref1, n)) continue;
          m = _ref1[n];
          _super[n] = this[n] || F0;
          this[n] = m;
        }
        return this;
      },
      parseMeta: function(m) {
        var id, _ref1;
        if (typeof m === "string") {
          m = {
            id: m
          };
        }
        if (!m.typeId) {
          id = m.id;
          _ref1 = __indexOf.call(id, ':') >= 0 ? id.split(":") : [null, id], m.id = _ref1[0], m.typeId = _ref1[1];
        }
        return m;
      },
      defineType: function(m) {
        var _ref1;
        _ref1 = m.id.split(" extends "), m.id = _ref1[0], m.superId = _ref1[1];
        return this.TYPES[m.id] = m;
      },
      getCtor: function(t) {
        if ((t = this.TYPES[t])) {
          return t.ctor || (t.ctor = this.createCtor(t));
        }
      },
      createCtor: (function() {
        var PKEYS, _applyType;
        PKEYS = ['id', 'superId', 'properties', 'methods'];
        _applyType = function(t) {
          var k, p, pId, v, _i, _len, _ref1;
          if (t.superId) {
            _applyType.call(this, ENTITY.TYPES[t.superId]);
          }
          if (t.properties) {
            _ref1 = t.properties;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              pId = _ref1[_i];
              if (this.properties[pId]) {
                O.log('Duplicate property', pId, this);
              } else {
                (this.properties[(p = PROP.GET(pId)).id] = p).attachToEntityCtor(this);
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
          ENTITY.applyMixin.call(this.prototype, t.methods);
          return this;
        };
        return function(type) {
          var ctor, k, v;
          ctor = function(id, options) {
            var k, v, _ref1;
            this.id = id;
            this._finalizers = [];
            this._id = "E" + (ENTITY.TOTAL++);
            _ref1 = this.constructor.options;
            for (k in _ref1) {
              if (!__hasProp.call(_ref1, k)) continue;
              v = _ref1[k];
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
          for (k in EntityPrototype) {
            if (!__hasProp.call(EntityPrototype, k)) continue;
            v = EntityPrototype[k];
            ctor.prototype[k] = v;
          }
          ctor.type = type;
          ctor.options = {};
          ctor.properties = {};
          return _applyType.call(ctor, type, {});
        };
      })(),
      findUnresolvedType: function(typeId) {
        var type;
        if (!(type = this.TYPES[typeId])) {
          return typeId;
        }
        if (type.superId) {
          return this.findUnresolvedType(type.superId);
        }
        return null;
      },
      resolveType: function(typeId, cb) {
        return O.require(["entity://" + typeId], (function(_this) {
          return function(err) {
            var utype;
            if (!_this.TYPES[typeId]) {
              throw new Error("Can't resolve type " + typeId);
            }
            if ((utype = _this.findUnresolvedType(typeId))) {
              return _this.resolveType(utype, cb);
            } else {
              return cb();
            }
          };
        })(this));
      },
      createInlineCtor: function(meta) {
        return this.createCtor({
          id: "T" + (this.TOTAL++),
          options: meta,
          superId: meta.typeId,
          properties: meta.properties || [],
          methods: meta.methods
        });
      },
      create: function(meta, cb) {
        var Ctor, obj, typeId, utype;
        meta = this.parseMeta(meta);
        typeId = meta.typeId;
        if ((utype = this.findUnresolvedType(typeId))) {
          return this.resolveType(utype, (function(_this) {
            return function(err) {
              if (!err) {
                return _this.create(meta, cb);
              }
            };
          })(this));
        }
        Ctor = meta.properties || meta.methods ? this.createInlineCtor(meta) : this.getCtor(typeId);
        obj = new Ctor(meta.id, meta);
        if (obj.id) {
          this.ALL[obj.id] = obj;
        }
        return obj.launch(cb);
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
    EntityPrototype = {
      launch: function(cb) {
        this.init();
        return typeof cb === "function" ? cb(null, this) : void 0;
      },
      init: function() {
        var defaults, n, p, ref, target, _ref1, _ref2;
        defaults = {};
        _ref1 = this.constructor.properties;
        for (n in _ref1) {
          p = _ref1[n];
          p.extractDefaults(this, defaults);
        }
        _ref2 = this.constructor.properties;
        for (n in _ref2) {
          p = _ref2[n];
          p.init(this, defaults);
        }
        if (ref = this.referrer) {
          ref = (ref.split ? ref.split(".") : ref);
          if (target = (ref[0] === "parent" ? this.parentEntity : ENTITY.get(ref[0]))) {
            target[ref[1]] = this;
            this.addFinalizer(function() {
              return target[ref[1]] = null;
            });
          }
        }
        return this.isInited = true;
      },
      done: function() {
        var fn, _i, _len, _ref1;
        this.isDone = true;
        if (this.id) {
          delete ENTITY.ALL[this.id];
        }
        if (this._finalizers) {
          _ref1 = this._finalizers;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            fn = _ref1[_i];
            fn.call(this, this);
          }
          return this._finalizers = null;
        }
      },
      addFinalizer: function(fn) {
        if (!this.isDone) {
          return this._finalizers.push(fn);
        }
      },
      prop: function(key, value) {
        var p;
        if (this.isDone) {
          return null;
        }
        p = this.constructor.properties;
        if (arguments.length === 1) {
          return (p[key] ? p[key].getter(this) : this[key]);
        }
        return (p[key] || (p[key] = PROP.GET(key))).setValue(this, value);
      },
      propertyChanged: function(ev, v, propId) {
        var _ref1;
        if ((_ref1 = this["" + propId + "Changed"]) != null) {
          _ref1.call(this, ev, v);
        }
        return Event.notifyPropertyChanged(this.id, propId, ev);
      },
      error: function(err, message, info) {
        return Object.error(err, message, info || this).log();
      },
      log: function(x) {
        var args, e;
        if (!global.DEBUG) {
          return x;
        }
        args = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            e = arguments[_i];
            _results.push(e);
          }
          return _results;
        }).apply(this, arguments);
        args[0] = "" + this + ":" + x;
        return O.log.apply(O, args);
      },
      toString: function() {
        return "[Entity:" + this.constructor.type.id + ":" + this.id + ":" + this._id + "]";
      }
    };

    /*
    API
     */
    O.entity = function(id) {
      return ENTITY.get(id);
    };
    O.entity.listen = function(id, fn, target) {
      return Event.listen(id, fn, target);
    };
    O.entity.unlisten = function(id) {
      return Event.unlisten(id);
    };
    O.fire = function(ev, cb) {
      return (ev.isEvent ? ev : new Event(ev)).fire(cb);
    };
    O.entity.define = function(meta) {
      return ENTITY.defineType(meta);
    };
    O.entity.defineProperty = function(meta) {
      return PROP.TYPES[meta.id] = meta;
    };
    O.entity.create = function(meta, cb) {
      return ENTITY.create(meta, cb);
    };
    O.entity.prop = function(id, key, value) {
      var _ref1;
      return (_ref1 = ENTITY.get(id)) != null ? _ref1.prop(key, value) : void 0;
    };
    return O.entity;
  })(this);

}).call(this);
