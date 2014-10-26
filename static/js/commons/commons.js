
/* 
 Very common stuff used w/AXOIDs.
 */

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty;

  Object.entity.defineProperty({
    id: "Liquid",
    methods: function() {
      return {
        comparator: function() {
          return false;
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "Boolean",
    methods: function() {
      return {
        comparator: function(a, b) {
          return (!a) === (!b);
        },
        setter: function(T, v, ev) {
          return T[this.id] = !!v;
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "Uri",
    methods: function() {
      return {
        comparator: function(a, b) {
          return ('' + a) === ('' + b);
        },
        setter: function(T, v, ev) {
          return T[this.id] = Object.Uri.parse(v);
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "Number",
    methods: function() {
      return {
        comparator: function(a, b) {
          return Number(a) === Number(b);
        },
        setter: function(T, v, ev) {
          return T[this.id] = Number(v);
        }
      };
    },
    mixin: function(_super, prop) {
      var propid, r;
      r = {};
      propid = prop.id;
      r['increment' + String.capitalize(propid)] = function(delta) {
        if (delta == null) {
          delta = 1;
        }
        return this.prop(propid, ((this.prop(propid)) || 0) + delta);
      };
      return r;
    }
  });

  Object.entity.defineProperty({
    id: "Date",
    methods: function() {
      return {
        comparator: function(a, b) {
          return Date.compare(a, b) === 0;
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "Value",
    mixin: function(_super) {
      return {
        getValue: function() {
          return this.prop("value");
        },
        setValue: function(v) {
          return this.prop("value", v);
        },
        isEmptyValue: function(e) {
          return !this.getValue();
        },
        equalsToValue: function(v) {
          return v && (this.getValue() === ("" + v));
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "MultiValue",
    mixin: function(_super) {
      return {
        valueChanged: function(ev, v) {
          this.prop("mvalue", (v ? (v.split && v.length ? v.split(this.mvalueSeparator || ",") : ["" + v]) : []));
          _super.valueChanged.call(this, ev, v);
        },
        getMultiValue: function() {
          return this.mvalue || [];
        },
        equalsValue: function(v) {
          var _ref;
          return v && (_ref = "" + v, __indexOf.call(this.getMultiValue(), _ref) >= 0);
        },
        putIntoMultiValue: function(pk, v) {
          var changed, contained, i, mv, _i, _len;
          if (!pk) {
            return;
          }
          mv = this.getMultiValue();
          pk = "" + pk;
          contained = __indexOf.call(mv, pk) >= 0;
          changed = false;
          if (v === -1) {
            v = (contained ? 0 : 1);
          }
          if (v && !contained) {
            mv.push(pk);
            changed = true;
          }
          if ((!v) && contained) {
            for (i = _i = 0, _len = mv.length; _i < _len; i = ++_i) {
              pk = mv[i];
              if (pk === mv[i]) {
                mv.splice(i, 1);
                changed = true;
                break;
              }
            }
          }
          return changed && this.setValue(mv.sort().join(this.mvalueSeparator));
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "Plugins",
    mixin: function(_super) {
      return {
        launch: function(cb) {
          return Function.perform(this, function(flow) {
            return [
              function() {
                var m, _i, _len, _ref;
                if (this.plugins) {
                  _ref = this.plugins;
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    m = _ref[_i];
                    m._parent = this;
                    Object.entity.create(m, flow.wait());
                  }
                }
                return flow.next();
              }, function(err) {
                var e, i, id, p, _i, _len, _ref;
                if (err) {
                  this.error(err, "" + this + ".onPluginsInitializing");
                }
                this.plugins = (function() {
                  var _i, _len, _results;
                  _results = [];
                  for (i = _i = 0, _len = arguments.length; _i < _len; i = ++_i) {
                    e = arguments[i];
                    if (i > 1) {
                      _results.push(e);
                    }
                  }
                  return _results;
                }).apply(this, arguments);
                _ref = this.plugins;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  p = _ref[_i];
                  if (id = p.id) {
                    this[id] = p;
                  }
                }
                return _super.launch.call(this, cb);
              }
            ];
          });
        },
        done: function() {
          var p, _i, _len, _ref, _results;
          _super.done.call(this);
          _ref = this.plugins;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            p = _ref[_i];
            p.done();
            p._parent = null;
            if (p.id) {
              _results.push(this[p.id] = null);
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "Requires",
    mixin: function(_super) {
      return {
        launch: function(cb) {
          return Object.event.require(this.requires, (function(_this) {
            return function(err) {
              var e;
              if (err) {
                Object.error(err, "" + _this + ".onRequires").log();
              }
              if (typeof _this.onRequiredLoaded === "function") {
                _this.onRequiredLoaded.apply(_this, (function() {
                  var _i, _len, _results;
                  _results = [];
                  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
                    e = arguments[_i];
                    _results.push(e);
                  }
                  return _results;
                }).apply(_this, arguments));
              }
              return _super.launch.call(_this, cb);
            };
          })(this));
        }
      };
    }
  });

  Object.entity.define({
    id: "EventHandler",
    methods: function(_super) {
      return {
        onEvent: function(ev) {
          return this.handleEvent(ev, ev.uri);
        },
        handleEvent: function(ev, uri) {
          return ev.callback(this.error('bad-code: No EventHandler Implementation'));
        }
      };
    }
  });

  Object.entity.define({
    id: "Cache extends EventHandler",
    uriPattern: 'remote://{{host}}/{{path}}?_ver={{version}}',
    methods: function(_super) {
      var CACHE;
      CACHE = {};
      return {
        resolveUri: function(u) {
          u = Object.clone(u, u.params);
          u.path = u.path.join('/');
          if (!u.version) {
            u.version = this.getVersion();
          }
          return Object.Uri.parse(String.template(this.uriPattern, u));
        },
        cacheDeserializer: function(s) {
          if (!s) {
            return null;
          }
          if (typeof s === "object") {
            return s;
          } else {
            return Object.parse(s);
          }
        },
        cacheSerializer: function(s) {
          if (!s) {
            return null;
          }
          s = typeof s === "object" ? JSON.stringify(s) : s;
          if (s && s !== "{}") {
            return s;
          } else {
            return null;
          }
        },
        getVersion: function() {
          return '' + (this.version || 1);
        },
        fetch: function(uri, cb) {
          return Object.event.fire({
            uri: this.resolveUri(uri),
            callback: cb,
            unmarshaller: this.fetchUnmarshaller
          });
        },
        restore: function(key) {
          var s, ver, _ref;
          if (!(s = (_ref = this.storage) != null ? _ref[key] : void 0)) {
            return null;
          }
          ver = this.getVersion();
          if (ver === s.slice(0, +(ver.length - 1) + 1 || 9e9)) {
            return s.slice(ver.length + 1);
          } else {
            return null;
          }
        },
        store: function(key, s) {
          var _ref;
          try {
            return (_ref = this.storage) != null ? _ref.setItem(key, this.getVersion() + ":" + s) : void 0;
          } catch (_error) {}
        },
        handleEvent: function(ev) {
          var key, r, u;
          u = ev.uri;
          key = this.id + ':' + u.id;
          if ((r = CACHE[key] || (CACHE[key] = this.cacheDeserializer(this.restore(key))))) {
            return ev.callback(null, r);
          }
          return this.fetch(u, (function(_this) {
            return function(err, data) {
              var s;
              if ((err = (typeof s !== "undefined" && s !== null ? s.error : void 0) || err)) {
                err = _this.error(err, "fetch data for versioned cache");
              }
              if (!err && (s = _this.cacheSerializer(data))) {
                CACHE[key] = data = _this.cacheDeserializer(s);
                _this.store(key, s);
              }
              return ev.callback(err, data);
            };
          })(this));
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "Values",
    methods: function() {
      return {
        comparator: function() {
          return false;
        }
      };
    },
    mixin: function(_super) {
      return {
        init: function() {
          this.storage = this.createStorage();
          this.initValue(this.id);
          return _super.init.call(this);
        },
        createStorage: function() {
          return this.storage || {
            getItem: function(key) {
              return this[key];
            },
            setItem: function(key, value) {
              return this[key] = value;
            }
          };
        },
        initValue: function(key) {
          var s;
          return this.prop('value', (s = this.storage.getItem(key)) && Object.parse(s) || this.value || {});
        },
        prop: function(key, value) {
          var _ref;
          if (this.isDone) {
            return null;
          }
          if (arguments.length === 1) {
            return (key === 'value' ? this.value : (_ref = this.value) != null ? _ref[key] : void 0);
          }
          if (key === 'value' || key === 'valueUri') {
            return _super.prop.call(this, key, value);
          } else {
            if (!this.value) {
              this.value = {};
            }
            if (this.value[key] !== value) {
              this.value[key] = value;
              return this.propertyChanged.call(this, Object.event.create({
                entity: this,
                propId: key,
                value: value,
                oldValue: this.value[key]
              }));
            }
          }
        },
        propertyChanged: function(ev) {
          var olds, p, v, _ref, _ref1;
          _super.propertyChanged.call(this, ev);
          if (ev.propId === 'valueUri') {
            return;
          }
          if (ev.propId === 'value') {
            olds = ev.oldValue;
            if (olds) {
              for (p in olds) {
                if (!__hasProp.call(olds, p)) continue;
                v = olds[p];
                if (((_ref = ev.value) != null ? _ref[p] : void 0) === void 0) {
                  _super.propertyChanged.call(this, Object.event.create({
                    entity: this,
                    propId: p,
                    value: null,
                    oldValue: v
                  }));
                }
              }
            }
            if (ev.value) {
              _ref1 = ev.value;
              for (p in _ref1) {
                if (!__hasProp.call(_ref1, p)) continue;
                v = _ref1[p];
                if (v !== (olds != null ? olds[p] : void 0)) {
                  _super.propertyChanged.call(this, Object.event.create({
                    entity: this,
                    propId: p,
                    value: v,
                    oldValue: olds != null ? olds[p] : void 0
                  }));
                }
              }
            }
          } else {
            if (!this.valuePending) {
              this.valuePending = true;
              Function.delayed(50, this, function() {
                this.valuePending = false;
                return _super.propertyChanged.call(this, Object.event.create({
                  entity: this,
                  propId: 'value',
                  value: this.value,
                  oldValue: this.value
                }));
              });
            }
          }
          return ev;
        },
        valueChanged: function(ev, val) {
          this.persistValue(val);
          return _super.valueChanged.call(this, ev, val);
        },
        persistValue: function(v) {
          var s;
          try {
            if (this.storage.getItem(this.id) !== (s = JSON.stringify(v))) {
              return this.storage.setItem(this.id, s);
            }
          } catch (_error) {}
        }
      };
    }
  });

  Object.entity.define({
    id: "commons.EnumService extends commons.L10nService",
    methods: function(_super) {
      var _cache;
      _cache = {};
      return {
        onEvent: function(ev, u, key) {
          var k, r, v;
          if (u == null) {
            u = ev.uri;
          }
          if (key == null) {
            key = u.host;
          }
          if (r = _cache[key]) {
            return ev.callback(null, r);
          }
          if ((r = String.localize(key)) === String.camelize(key)) {
            return ev.callback(null, [
              {
                id: '',
                name: "[" + key + " enum not found]"
              }
            ]);
          }
          return ev.callback(null, typeof r === 'object' ? _cache[key] = (function() {
            var _results;
            _results = [];
            for (k in r) {
              v = r[k];
              _results.push({
                id: k,
                name: v
              });
            }
            return _results;
          })() : [
            {
              id: '',
              name: r
            }
          ]);
        }
      };
    }
  });

  Object.entity.define({
    id: "commons.L10nService",
    properties: ["requires:Requires"],
    requires: [],
    methods: function(_super) {
      return {
        onRequiredLoaded: function(err) {
          var b, _i, _len, _results;
          if (err) {
            return;
          }
          _results = [];
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            b = arguments[_i];
            _results.push(String.localize.add(b));
          }
          return _results;
        },
        onEvent: function(ev) {
          return ev.callback(null, String.localize(ev.uri.host));
        }
      };
    }
  });

}).call(this);
