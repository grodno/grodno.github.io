// Generated by CoffeeScript 1.7.1
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Object.entity.defineProperty({
    id: "Liquid",
    methods: function() {
      return {
        comparator: Function.FALSE
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
    methods: function() {
      return {
        setter: function(T, meta, ev) {
          return Function.perform(T, function(flow) {
            return [
              function() {
                var m, _i, _len;
                for (_i = 0, _len = meta.length; _i < _len; _i++) {
                  m = meta[_i];
                  Object.entity.create(m, flow.wait());
                }
                return flow.next();
              }, function(err) {
                var e, i;
                if (err) {
                  Object.error(err, "" + this + ".onPluginsInitializing").log();
                }
                return typeof this.onPluginsInitialized === "function" ? this.onPluginsInitialized(err, this.plugins = (function() {
                  var _i, _len, _results;
                  _results = [];
                  for (i = _i = 0, _len = arguments.length; _i < _len; i = ++_i) {
                    e = arguments[i];
                    if (i > 1) {
                      _results.push(e);
                    }
                  }
                  return _results;
                }).apply(this, arguments)) : void 0;
              }
            ];
          });
        }
      };
    }
  });

  Object.entity.define({
    id: "EventHandlerWithPlugins extends EventHandler",
    properties: ["plugins:Plugins"],
    plugins: [],
    ready: false,
    methods: function(_super) {
      return {
        onPluginsInitialized: function() {
          return this.setIsReady();
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "Requires",
    mixin: function(_super) {
      return {
        launch: function(cb) {
          return Object.require(this.requires, (function(_this) {
            return function(err) {
              var e, i;
              if (err) {
                Object.error(err, "" + _this + ".onRequires").log();
              }
              if (typeof _this.onRequiredLoaded === "function") {
                _this.onRequiredLoaded.apply(_this, (function() {
                  var _i, _len, _results;
                  _results = [];
                  for (i = _i = 0, _len = arguments.length; _i < _len; i = ++_i) {
                    e = arguments[i];
                    if (i > 1) {
                      _results.push(e);
                    }
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


  /*
  Define Cache entity type
   */

  Object.entity.define({
    id: "Cache extends EventHandler",
    uriPattern: 'remote://{{domain}}/{{path}}?_ver={{version}}',
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
          return Object.fire({
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
                err = Object.error(err, "fetch data for versioned cache").log();
              }
              if (!err && (s = _this.cacheSerializer(data))) {
                CACHE[key] = data;
                _this.store(key, s);
              }
              return ev.callback(err, data);
            };
          })(this));
        }
      };
    }
  });

  Object.entity.define({
    id: "ValueStorage",
    properties: ["value:Value"],
    methods: function(_super) {
      return {
        init: function() {
          this.storage = this.createStorage();
          this.initStorage();
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
        initStorage: function() {
          var s;
          return this.value = (s = this.storage.getItem(this.id)) && Object.parse(s) || this.value || {};
        },
        propertyChanged: function(ev, value, propId) {
          _super.propertyChanged.call(this, ev, value, propId);
          if (propId !== 'value') {
            if (!this.valueDelta) {
              this.valueDelta = {};
              setTimeout((function(_this) {
                return function() {
                  var delta;
                  delta = _this.valueDelta;
                  _this.valueDelta = null;
                  return _this.setValue(Object.clone(_this.getValue(), delta));
                };
              })(this), 10);
            }
            return this.valueDelta[propId] = value;
          }
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

}).call(this);