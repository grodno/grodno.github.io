
/*
HttpService.
 */

(function() {
  Object.log = (function(c) {
    return function(x) {
      var args, e;
      if (x != null ? x.isError : void 0) {
        if (!x.stack) {
          x.stack = (new Error).stack;
        }
        if (typeof x.details === "function" ? x.details(length === 1) : void 0) {
          x.details = x.details[0];
        }
        if (c != null ? c.error : void 0) {
          c.error('' + x, x.details, x.stack);
          return;
        } else {
          args = ["ERROR:", '' + x, x.details, x.stack];
        }
      } else {
        args = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            e = arguments[_i];
            _results.push(e);
          }
          return _results;
        }).apply(this, arguments);
      }
      if (c != null ? c.log : void 0) {
        if (c.log.apply) {
          c.log.apply(c, args);
        } else {
          c.log(args.join(", "));
        }
      }
      return x;
    };
  })(this.console);

  Object.entity.define({
    id: "HttpService extends EventHandler",
    defaultHost: window.location.hostname,
    defaultProtocol: window.location.protocol.slice(0, -1),
    methods: function(_super) {
      var F0, MIME, PARSERS, _newRequest;
      F0 = function(x) {
        return x;
      };
      MIME = {
        json: "application/json",
        js: "application/json",
        html: "text/html",
        txt: "text/plain"
      };
      PARSERS = {
        js: Object.parse,
        json: Object.parse,
        uri: Object.parseUri
      };
      _newRequest = function() {
        try {
          return new window["XMLHttpRequest"]();
        } catch (_error) {
          try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
          } catch (_error) {}
        }
      };
      return {
        negotiateResultType: function(u, ev) {
          var p, r, urlId;
          urlId = u.path.slice(-1)[0];
          r = "js";
          if (urlId && (p = urlId.lastIndexOf(".")) > -1) {
            r = urlId.slice(p + 1);
          }
          return r;
        },
        negotiateError: function(st, text, ev) {
          if (!st || (st >= 200 && st < 300) || (st === 304)) {
            return null;
          }
          return Object.error("remote: " + st + " " + ev.uri + " " + (text || '')).addDetails(ev != null ? ev._err : void 0);
        },
        resolveMethod: function(ev) {
          return ev.method || (ev.payload ? "POST" : "GET");
        },
        resolveUri: function(uri, ev) {
          if (uri.host === '*') {
            uri.host = this.defaultHost;
          }
          uri.type = uri.params._ssl || ev.ssl ? 'https' : this.defaultProtocol;
          if (uri.params.ssl) {
            delete uri.params._ssl;
          }
          return "" + uri;
        },
        onRequestReady: function(rq, ev) {
          return ev.callback(this.negotiateError(rq.status, rq.statusText, ev), (ev.unmarshaller || PARSERS[ev.dataType] || F0)(rq.response));
        },
        resolveHeaders: function(ev) {
          return Object.update({
            'Accept': MIME[ev.dataType] || "*/*",
            'Language': String.LANGUAGE,
            'Content-Type': MIME[ev.dataType]
          }, ev.headers);
        },
        handleEvent: function(ev) {
          var T, h, resType, rq, v, _ref;
          try {
            T = this;
            rq = _newRequest();
            rq.open(this.resolveMethod(ev), this.resolveUri(ev.uri, ev), true);
            ev._err = new Error();
            if (!ev.dataType) {
              ev.dataType = this.negotiateResultType(ev.uri, ev);
            }
            rq.onreadystatechange = function() {
              if ((this.readyState === 4) && (!ev.completed)) {
                ev.completed = true;
                this.onreadystatechange = F0;
                T.onRequestReady(this, ev);
              }
              return false;
            };
            _ref = this.resolveHeaders(ev);
            for (h in _ref) {
              v = _ref[h];
              if (v) {
                rq.setRequestHeader(h, v);
              }
            }
            if (resType = ev.uri.params.responseType) {
              rq.responseType = resType;
            }
            if (ev.payload) {
              if (typeof ev.payload === "object") {
                rq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                ev.payload = JSON.stringify(ev.payload);
              }
              rq.send(ev.payload);
            } else {
              rq.send(null);
            }
          } catch (_error) {
            ev.callback(this.error("remote_error: " + ev.uri, _error));
          }
        }
      };
    }
  });

  Object.entity.define({
    id: "RawHttpService extends HttpService",
    methods: function(_super) {
      return {
        handleEvent: function(ev) {
          var T, h, headers, rq, v;
          try {
            T = this;
            rq = new XMLHttpRequest();
            ev._err = new Error();
            rq.open(this.resolveMethod(ev), this.resolveUri(ev.uri, ev), true);
            rq.onreadystatechange = function() {
              var arr, d;
              if ((this.readyState === 4) && (!ev.completed)) {
                ev.completed = true;
                this.onreadystatechange = function(x) {
                  return x;
                };
                arr = (function() {
                  var _i, _len, _ref, _results;
                  if (this.response) {
                    _ref = new Uint8Array(this.response);
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                      d = _ref[_i];
                      _results.push(String.fromCharCode(d));
                    }
                    return _results;
                  } else {
                    return [];
                  }
                }).call(this);
                ev.callback(T.negotiateError(this.status, this.statusText, ev), arr.join(""));
              }
              return false;
            };
            headers = Object.update({
              Language: String.LANGUAGE
            }, ev.headers);
            for (h in headers) {
              v = headers[h];
              if (v) {
                rq.setRequestHeader(h, v);
              }
            }
            rq.responseType = "arraybuffer";
            rq.send(null);
          } catch (_error) {
            ev.callback(this.error("remote_error: " + ev.uri, _error));
          }
        }
      };
    }
  });

  Object.entity.define({
    id: "ScriptService extends HttpService",
    scriptType: "text/javascript",
    methods: function(_super) {
      var counter, registry, _createScriptTag, _doc;
      registry = window._JSONP || (window._JSONP = {});
      counter = window._JSONP_COUNTER || (window._JSONP_COUNTER = 1);
      _doc = window.document;
      _createScriptTag = function(attrs) {
        var e;
        e = _doc.createElement("script");
        e.type = this.scriptType;
        e.charset = "utf-8";
        Object.update(e, attrs);
        return e;
      };
      return {
        handleEvent: function(ev) {
          var jsonp, script, sid, u;
          script = _createScriptTag.call(this, ev.scriptAttrs);
          if (!ev.noAsynMode) {
            script.async = "async";
          }
          if (ev.scriptId) {
            script.id = ev.scriptId;
          }
          u = ev.uri;
          ev._err = new Error();
          if (jsonp = u.params.jsonp) {
            sid = "n" + counter++;
            u.params[jsonp] = escape("window._JSONP." + sid);
            registry[sid] = function(r) {
              return typeof ev.callback === "function" ? ev.callback(null, (ev.unmarshaller ? ev.unmarshaller(r) : r)) : void 0;
            };
            script.onload = function() {
              script.parentNode.removeChild(script);
              return delete registry[sid];
            };
          } else {
            script.onload = function() {
              var cb;
              cb = ev.callback;
              ev.callback = null;
              return typeof cb === "function" ? cb(null, this) : void 0;
            };
          }
          script.onerror = function() {
            return ev.callback(Object.error("remote_error", "Script error: " + u));
          };
          script.src = this.resolveUri(u, ev);
          return Object.dom.appendToHead(script);
        }
      };
    }
  });

  Object.entity.define({
    id: 'EntityService extends ScriptService',
    scriptType: "text/javascript",
    methods: function(_super) {
      return {
        resolveUri: function(uri, ev) {
          uri.path = ('js/' + uri.host.replace(/\./g, '/') + '.js').split('/');
          uri.host = "";
          return _super.resolveUri.call(this, uri, ev);
        }
      };
    }
  });

  (function(global) {
    return Object.entity.define({
      id: "SocketClient",
      properties: ['requires:Requires'],
      ready: false,
      methods: function(_super) {
        return {
          launch: function(cb) {
            this.requires = ["script://" + this.channel + "/socket.io.js"];
            return _super.launch.call(this, cb);
          },
          init: function() {
            var io, socket;
            if (!(io = global.io)) {
              throw new Error('No Socket IO');
            }
            socket = io.connect(this.channel);
            socket.on("connect", ((function(_this) {
              return function() {
                return _this.onConnect();
              };
            })(this)));
            socket.on("message", ((function(_this) {
              return function(ev) {
                return _this.onMessage(ev);
              };
            })(this)));
            socket.on("disconnect", ((function(_this) {
              return function() {
                return _this.onDisconnect();
              };
            })(this)));
            return this.emit = function(ev, cb) {
              if (cb == null) {
                cb = ev.callback;
              }
              ev.uri = "" + ev.uri;
              delete ev.callback;
              return socket.json.emit("message", ev, cb);
            };
          },
          handleEvent: function(ev) {
            this.log("send", ev);
            return this.emit(ev);
          },
          onConnect: function(ev) {
            this.log("onConnect", ev);
            return _super.init.call(this);
          },
          onDisconnect: function(ev) {
            return this.log("onDisconnect", ev);
          },
          onMessage: function(ev) {
            this.log("onMessage", ev);
            if (ev.uri) {
              return Object.event.fire(ev);
            }
          }
        };
      }
    });
  })(this);

  Object.entity.define({
    id: "HtmlLoader extends Cache",
    uriPattern: 'remote://*/html/{{host}}.html',
    methods: function(_super) {
      return {
        init: function() {
          this.storage = this.createStorage();
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
        cacheDeserializer: function(s) {
          return s;
        },
        cacheSerializer: function(s) {
          return s;
        }
      };
    }
  });


  /*
  Define Cache entity type
   */

  Object.entity.define({
    id: "CodeLoader extends Cache",
    uriPattern: 'remote://*/js/{{host}}.js?_ver={{version}}',
    methods: function(_super) {
      return {
        fetchUnmarshaller: function(s) {
          return s;
        },
        cacheSerializer: function(s) {
          return this.evaluate(s);
        },
        cacheDeserializer: function(s) {
          return this.evaluate(s);
        },
        evaluate: function(s) {
          if (!s) {
            return null;
          }
          try {
            (Function.call(Function, s))();
          } catch (_error) {
            this.error(_error, "JS syntax:" + _error.message).log();
          }
          return s;
        }
      };
    }
  });

  Object.entity.define({
    id: "EntityLoader extends CodeLoader",
    methods: function(_super) {
      return {
        resolveUri: function(uri) {
          uri.host = uri.host.replace(/\./g, '/');
          return _super.resolveUri.call(this, uri);
        }
      };
    }
  });

  Object.entity.define({
    id: 'Settings',
    properties: ["value:Values"],
    storage: window.localStorage
  });

  Object.entity.define({
    id: 'webclient.HashNavigator',
    properties: ['page', 'index', "value:Values"],
    methods: function(_super) {
      var _loc, _toValue;
      _loc = window.location;
      _toValue = function(h) {
        var e, hashes, i, v, _i, _len;
        if (!h || h === '#') {
          h = '#!home';
        }
        v = {
          page: '',
          index: '',
          index1: ''
        };
        if (h[1] === '!') {
          hashes = h.slice(2).split('~');
          v.page = hashes[0];
          for (i = _i = 0, _len = hashes.length; _i < _len; i = ++_i) {
            e = hashes[i];
            if (i > 0) {
              v["index" + (i - 1 || '')] = e || "";
            }
          }
        }
        return v;
      };
      return {
        init: function() {
          _super.init.call(this);
          return window.onhashchange = (function(_this) {
            return function() {
              return _this.initValue();
            };
          })(this);
        },
        initValue: function() {
          return this.prop('value', _toValue(_loc.hash));
        },
        valueChanged: function(ev, v) {
          var e, h, i;
          if (!v) {
            return;
          }
          h = [];
          e = v.page;
          i = 0;
          while (e) {
            h.push(e);
            e = v["index" + (i || '')];
            i++;
          }
          if ((h = "#!" + (h.join('~'))) !== _loc.hash) {
            return _loc.hash = h;
          }
        }
      };
    }
  });

  Object.entity.define({
    id: 'webclient.Application',
    properties: ['title', "plugins:Plugins"],
    doc: window.document,
    domNode: window.document.body,
    methods: function(_super) {
      return {
        init: function() {
          var node, _i, _len, _ref, _results;
          _super.init.call(this);
          _ref = this.domNode.querySelectorAll("[data-widget]");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            _results.push(Object.dom.initWidget({
              domNode: node,
              _parent: this
            }));
          }
          return _results;
        },
        titleChanged: function(ev, v) {
          return this.doc.title = v;
        }
      };
    }
  });

}).call(this);
