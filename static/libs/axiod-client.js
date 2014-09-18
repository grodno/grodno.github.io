
/*
Axio: Web DOM API.
 */
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Object.dom = (function(_win) {
  var _ALIVE_EVENTS_KEYS, _ALIVE_HANDLER, _createEvent, _doc;
  _doc = _win.document;
  _createEvent = function(evt) {
    var e, r;
    r = {};
    e = void 0;
    if (_win.event) {
      r.internal = _win.event;
      r.target = e = _win.event.srcElement;
    } else {
      r.internal = evt;
      e = evt.target;
      while (e && e.nodeType !== 1) {
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
  _ALIVE_EVENTS_KEYS = ["mousedown", "mouseup", "click", "mousemove", "mouseover", "mouseout"];
  _ALIVE_HANDLER = function(ev0) {
    var T, ev, type;
    T = this;
    if (!T.disabled) {
      ev = _createEvent(ev0);
      type = ev.internal.type;
      switch (type) {
        case "mousedown":
          T.updateDomNodeClass(T.stylePressed);
          T.touchBegin && T.touchBegin(ev);
          break;
        case "mouseup":
          T.touchEnd && T.touchEnd(ev);
          T.updateDomNodeClass("!" + T.stylePressed);
          break;
        case "click":
          T.tapped && T.tapped(ev);
          break;
        case "mousemove":
          T.mouseMove && T.mouseMove(ev);
          break;
        case "mouseover":
          T.updateDomNodeClass(T.styleHovered);
          T.mouseOver && T.mouseOver(ev);
          break;
        case "mouseout":
          T.mouseOut && T.mouseOut(ev);
          T.updateDomNodeClass("!" + T.styleHovered);
      }
    }
    return true;
  };
  return {
    document: _win.document,
    createEvent: _createEvent,
    STYLE_LINE_FIXED: "overflow:hidden;white-space:nowrap;cursor:pointer;",
    STYLE_TEXTLINE: "white-space:nowrap;line-height:1.5em;vertical-align:middle;",
    createElement: function(type, attrs) {
      if (type == null) {
        type = "DIV";
      }
      return Object.update(_doc.createElement(type), attrs);
    },
    createComplexElement: function(tag, attrs) {
      var div, r;
      div = this.DOM_FACTORY || (this.DOM_FACTORY = _doc.createElement("div"));
      div.innerHTML = tag;
      r = div.firstChild;
      div.removeChild(r);
      return Object.update(r, attrs);
    },
    appendToHead: function(el) {
      var fjs;
      fjs = _doc.getElementsByTagName("head")[0];
      return fjs.appendChild(el);
    },
    appendCss: function(href) {
      return this.appendToHead(this.createElement("link", {
        rel: "stylesheet",
        href: href
      }));
    },
    getElementById: function(id) {
      return _doc.getElementById(id) || null;
    },
    removeElement: function(e) {
      var _ref;
      return e != null ? (_ref = e.parentNode) != null ? _ref.removeChild(e) : void 0 : void 0;
    },
    alive: function(T) {
      return this.listenEvents(T, _ALIVE_EVENTS_KEYS, function(ev0) {
        return _ALIVE_HANDLER.call(T, ev0);
      });
    },
    listenEvents: function(T, key, fn, fl) {
      var keys, node, _i, _len;
      node = (T ? T.domNode : _doc);
      keys = (key.split ? key.split(" ") : key);
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        if (node.addEventListener) {
          node.addEventListener(key, fn, fl);
        } else {
          node.attachEvent("on" + key, fn, fl);
        }
      }
      return node;
    },
    stopEvent: function(ev) {
      var e;
      e = ev != null ? ev.internal : void 0;
      if (e != null) {
        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }
      }
      return e != null ? e.cancelBubble = true : void 0;
    },
    isKeyboardCode: function(ev, code) {
      if (ev == null) {
        ev = _win.event || {};
      }
      return ev.keyCode === code || ev.charCode === code || ev.which === code;
    },
    KEY_CODE: {
      ESCAPE: 27,
      ENTER: 13,
      TAB: 8
    },
    viewportSize: function() {
      var scr;
      scr = _win.screen;
      return {
        width: scr.availWidth,
        height: scr.availHeight
      };
    },
    getTotalOffset: function(p) {
      var r;
      r = {
        top: 0,
        left: 0,
        width: p.clientWidth,
        height: p.clientHeight
      };
      while (p) {
        r.top += p.offsetTop - p.scrollTop;
        r.left += p.offsetLeft - p.scrollLeft;
        p = p.offsetParent;
      }
      return r;
    },
    handleError: function(err) {
      return Object.error(err).log();
    },
    updateClass: function(elt, delta) {
      var cl, clss, _i, _len, _ref;
      if (!(elt && delta)) {
        return elt;
      }
      clss = elt.className.split(" ");
      delta = delta.split(" ");
      for (_i = 0, _len = delta.length; _i < _len; _i++) {
        cl = delta[_i];
        if (cl) {
          if (cl[0] === "!") {
            if (cl === "!*") {
              clss = [];
            } else {
              if (_ref = cl.slice(1), __indexOf.call(clss, _ref) >= 0) {
                clss[p] = "";
              }
            }
          } else {
            if (__indexOf.call(clss, cl) < 0) {
              clss.push(cl);
            }
          }
        }
      }
      elt.className = ((function() {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = clss.length; _j < _len1; _j++) {
          cl = clss[_j];
          if (cl) {
            _results.push(cl);
          }
        }
        return _results;
      })()).join(' ');
      return elt;
    },
    init: (function() {
      var applyWidgetInit, fn_camelCase, handleError, re_dashAlpha, _getAllWidgets;
      re_dashAlpha = /-([\da-z])/g;
      fn_camelCase = function(all, letter) {
        return letter.toUpperCase();
      };
      _getAllWidgets = function(e, all) {
        var c, _i, _len, _ref;
        if (all == null) {
          all = [];
        }
        if (_doc.querySelectorAll) {
          return e.querySelectorAll("[x-widget]");
        }
        all.push.apply(all, ((function() {
          var _i, _len, _ref, _results;
          if (c.getAttribute("x-widget")) {
            _ref = e.children;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              c = _ref[_i];
              _results.push(c);
            }
            return _results;
          }
        })()));
        _ref = e.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _getAllWidgets(c, all);
        }
        return all;
      };
      applyWidgetInit = function(v) {
        var a, id, meta, n, z, _i, _len, _ref;
        meta = {
          options: {
            domNode: v,
            parentEntity: this.parentEntity
          },
          onCreated: function(err) {
            if (err) {
              return handleError(err, meta);
            }
          }
        };
        _ref = v.attributes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          if (!(!(n = a.name).indexOf("x-"))) {
            continue;
          }
          z = v.getAttribute(n);
          if (z[0] === '@') {
            z = Object.parse(z.slice(1));
          }
          meta.options[n.slice(2).replace(re_dashAlpha, fn_camelCase)] = z;
        }
        id = v.getAttribute("id");
        meta.id = (id ? id + ":" : "") + meta.options["widget"];
        return Object.entity.create(meta);
      };
      handleError = function(err, meta) {
        var node;
        Object.error(err("wrong_widget", meta)).log();
        node = Object.dom.createElement();
        meta.domNode.appendChild(node);
        return Object.entity.create({
          typeId: "Html",
          parentEntity: meta.parentEntity,
          style: "alert-error",
          html: "Error: " + (err.message || ("can't create UI view: " + meta.id))
        });
      };
      return function(root, options) {
        var onCreated;
        onCreated = function(err, rr) {
          var ctx, node, _i, _len, _ref, _results;
          ctx = Object.update({
            handleError: handleError,
            parentEntity: rr
          }, options);
          _ref = _getAllWidgets(rr.domNode);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            _results.push(applyWidgetInit.call(ctx, node));
          }
          return _results;
        };
        if (root) {
          return onCreated(null, root);
        }
        return Object.entity.create({
          typeId: "Box",
          domNode: _doc.body,
          onCreated: onCreated
        });
      };
    })()
  };
})(window);


/*
Basic Dom UI properties.
 */

Object.entity.defineProperty({
  id: "Node",
  methods: function() {
    return {
      init: function(T) {
        var attrs, node, _ref;
        if (!(node = T.domNode = T._options.domNode)) {
          attrs = {};
          if (T.id !== T._id) {
            attrs.id = T.id;
          }
          node = T.domNode = Object.dom.createElement(T.domNodeType, Object.update(attrs, T.domNodeAttrs));
        }
        T.contentNode = node;
        node.entity = T;
        if (T.alive) {
          Object.dom.alive(T);
        }
        if (!node.parentNode || !node.parentNode.parentNode) {
          if ((_ref = T.parentEntity) != null) {
            _ref.contentNode.appendChild(node);
          }
        }
        return T.addFinalizer(this.done);
      },
      done: function(T) {
        var e;
        if (!(e = T.domNode)) {
          return;
        }
        Object.dom.removeElement(e);
        delete e.entity;
        delete T.domNode;
        return delete T.contentNode;
      }
    };
  }
});

Object.entity.defineProperty({
  id: "Style",
  methods: function() {
    return {
      init: function(T) {
        var r;
        r = T.domNode;
        if (T.css) {
          r.style.cssText += T.css;
        }
        if (T.styleExpression) {
          Object.property.bind(T, this.id, T.styleExpression);
        }
        return T.domNodeClass((T.style || "") + " " + (r.className || ""));
      },
      getter: function(T) {
        return T.domNode.className;
      },
      setter: function(T, v, ev) {
        if (typeof v === "string") {
          return T.domNodeClass(v);
        } else {
          return T.domNodeStyle(v);
        }
      }
    };
  },
  mixin: function(_super) {
    return {
      domNodeStyle: function(delta) {
        var n, st, v;
        if (!((st = this.domNode.style) && delta)) {
          return st;
        }
        for (n in delta) {
          v = delta[n];
          if (st[n] !== v) {
            st[n] = v;
          }
        }
        return st;
      },
      domNodeClass: function(delta) {
        return Object.dom.updateClass(this.domNode, delta);
      },
      toggleDomNodeClass: function(cl, flag) {
        return Object.dom.updateClass(this.domNode, (flag ? cl : "!" + cl));
      }
    };
  }
});

Object.entity.defineProperty({
  id: "Hidden",
  methods: function() {
    return {
      getter: function(T) {
        return T.domNode.style.display === "none";
      },
      setter: function(T, v) {
        return T.domNode.style.display = (v ? "none" : this.displayType || "");
      }
    };
  },
  mixin: function(_super) {
    return {
      display: function(f, bForceParents) {
        var p;
        this.setHidden(!f);
        if (f && bForceParents && (p = this)) {
          while ((p = p.parentEntity)) {
            p.display(f);
          }
        }
        return this;
      },
      switchDisplay: function() {
        return this.setHidden(!this.isHidden());
      },
      isHidden: function() {
        return this.prop("hidden");
      },
      setHidden: function(f) {
        return this.prop("hidden", f);
      }
    };
  }
});

Object.entity.defineProperty({
  id: "Children",
  methods: function(_super) {
    var _addOp;
    _addOp = function(T, e, ch) {
      return function() {
        var cb;
        cb = this.cb();
        T.createChild(e, function(err, e) {
          e && ch.push(e);
          return cb();
        });
        return true;
      };
    };
    return {
      createAsyncValueCallback: function(T) {
        return function(err, value) {
          if (!T._done) {
            T.updateDomNodeClass("!ui-busy");
            return T.prop(propId, T.childrenAsyncAdapter(err, value));
          }
        };
      },
      setAsyncValue: function(T, url) {
        T.updateDomNodeClass("ui-busy");
        _super.setAsyncValue.call(this, T, url);
      },
      setValue: function(T, ev, url) {
        var ch, e, i, l, ops, p, requires, v;
        requires = ev.requires || T.childrenRequires;
        if (requires) {
          p = this;
          Object.require(requires, function(err) {
            ev.requires = T.childrenRequires = null;
            if (err) {
              ev.value = ["label://alert/alert-error?caption=no_required_scripts for content"];
            }
            p.setValue(T, ev);
          });
        } else {
          if (url) {
            this.setAsyncValue(T, url);
          } else {
            T.removeAllChildren();
            v = (T.childrenAdapter || Function.NONE).call(T, ev.value, ev);
            ops = [];
            if (v && v.length > 0) {
              ch = T.getChildren();
              i = 0;
              l = v.length;
              e = void 0;
              while (i < l) {
                e = v[i];
                if (e) {
                  ops.push(_addOp(T, e, ch));
                }
                i++;
              }
            }
            ops.push(function() {
              T.childrenChanged && T.childrenChanged(ev, v);
            });
            Function.perform(ops);
          }
        }
      },
      done: function(T) {
        T.removeAllChildren();
        _super.done.call(this, T);
      }
    };
  },
  mixin: function(_super) {
    return {
      createChild: function(r, cb) {
        var cb2, ch, e;
        if (Array.isArray(r)) {
          ch = (r.length > 1 ? Array.slice(r, 1) : null);
          r = (typeof r[0] === "string" ? Object.entity.create.parseMeta(r[0]) : r[0]);
          if (ch) {
            r.children = ch;
          }
        }
        r = (typeof r === "string" ? Object.entity.create.parseMeta(r) : r);
        cb2 = (function(_this) {
          return function(err, e) {
            _this.getChildren().push(e);
            if (typeof _this.childrenChanged === "function") {
              _this.childrenChanged({
                value: [r]
              });
            }
            return typeof cb === "function" ? cb() : void 0;
          };
        })(this);
        e = Object.entity.create(Object.update({
          id: "box",
          parentEntity: this
        }, r), cb2);
        return e;
      },
      getChildren: function() {
        return this._children || (this._children = []);
      },
      removeAllChildren: function() {
        var ch, _i, _len, _ref;
        _ref = this._children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          ch.done();
        }
        return this._children = [];
      },
      setChildren: function(meta) {
        return this.prop("children", meta);
      },
      childrenAsyncAdapter: function(err, value) {
        if (err) {
          return {
            id: "html",
            html: String.localize(err.reason || "unknown_error")
          };
        } else {
          return value;
        }
      }
    };
  }
});

Object.entity.defineProperty({
  id: "Caption",
  methods: function() {
    return {
      setter: function(T, v, ev) {
        var e, hidden;
        if (v == null) {
          v = '';
        }
        T._state[this.id] = v;
        e = this.getCaptionElt();
        hidden = v === "none";
        if (e) {
          e.display(!(e.hidden || hidden));
          v = this.getCaptionHtml(v, ev);
          try {
            return e.domNode.innerHTML = (hidden || !v ? "" : v);
          } catch (_error) {
            return Object.error(_error, "Caption").log();
          }
        }
      },
      comparator: Function.FALSE
    };
  },
  mixin: function(_super) {
    return {
      getCaptionElt: function() {
        return this.captionElt || this;
      },
      getCaptionHtml: function(v, ev) {
        var icon;
        return ((icon = this.prop('icon')) ? '<i class="icon-#{icon}"></i> ' : "") + String.localize(v, ev.quantity);
      }
    };
  }
});

Object.entity.defineProperty({
  id: "Html",
  methods: function(_super) {
    return {
      setValueAsync: function(T, ev, asyncUrl) {
        this.setter(T, T.asyncPlaceholder || null, ev);
        return _super.setAsyncValue.call(this, T, ev, asyncUrl);
      },
      getter: function(T) {
        var _ref;
        return (_ref = T.contentNode) != null ? _ref.innerHTML : void 0;
      },
      setter: function(T, v) {
        var msg;
        if (v == null) {
          v = "<div>&nbsp;</div>";
        }
        try {
          if (v != null ? v.error : void 0) {
            throw v.error;
          }
          return T.contentNode.innerHTML = v;
        } catch (_error) {
          msg = String.localize("html_error") + ": " + _error.message;
          return T.contentNode.innerHTML = "<div style='color:red;'>" + msg + "</div>";
        }
      }
    };
  }
});

Object.entity.defineProperty({
  id: "Disabled",
  methods: function() {
    return {
      setter: function(T, v) {
        return T._state[this.id] = !!v;
      },
      comparator: function(a, b) {
        return !a === !b;
      }
    };
  },
  mixin: function(_super) {
    return {
      disabledChanged: function(ev, v) {
        this.domNode.disabled = (v ? "disabled" : "");
        return this.toggleDomNodeClass("disabled", v);
      }
    };
  }
});


/*
Basic Dom UI views.
 */

Object.entity.define({
  id: "View",
  properties: ["domNode:Node", "style:Style", "hidden:Hidden"]
});

Object.entity.define({
  id: "Box extends View",
  properties: ["children:Children"]
});

Object.entity.define({
  id: "Html extends View",
  properties: ["html:Html"]
});

Object.entity.define({
  id: "Widget extends View",
  properties: ["html:Html", "data", "template"],
  methods: function(_super) {
    return {
      templateChanged: function(ev, v) {
        return this.redraw();
      },
      dataChanged: function(ev, v) {
        return this.redraw();
      },
      redraw: function() {
        var ctx, data, tmpl;
        if (!((tmpl = this.prop('template')) && (data = this.prop('data')))) {
          return;
        }
        ctx = Object.clone(data, window.ENV);
        return this.prop('html', String.template(tmpl, ctx));
      },
      htmlChanged: function() {
        return Object.dom.init(this);
      }
    };
  }
});

Object.entity.define({
  id: "Label extends dom.View",
  properties: ["caption:Caption"],
  options: {
    domNodeType: "span"
  }
});

Object.entity.define({
  id: "Button extends View",
  properties: ["disabled:Disabled", "caption:Caption", "html:Html"],
  options: {
    domNodeType: "button",
    alive: true,
    style: "btn"
  },
  methods: {
    tapped: function(ev) {
      var cb;
      if (this.async) {
        if ((ev = this.async())) {
          this.prop("disabled", true);
          this.updateDomNodeClass("ui-busy");
          if (this.busyCaption) {
            this.savedCaption = this.prop("caption");
            this.prop("caption", this.busyCaption);
          }
          cb = ev.callback;
          return Object.fire(ev, (function(_this) {
            return function(ev) {
              if (cb != null) {
                cb.apply(_this, arguments);
              }
              _this.updateDomNodeClass("!ui-busy");
              _this.prop("disabled", false);
              if (_this.savedCaption) {
                _this.prop("caption", _this.savedCaption);
                return _this.savedCaption = null;
              }
            };
          })(this));
        }
      } else if (this.action) {
        this.prop("disabled", true);
        this.updateDomNodeClass("ui-busy");
        this.action(ev);
        this.updateDomNodeClass("!ui-busy");
        return this.prop("disabled", false);
      }
    }
  }
});


/*
UI List view.
 */

Object.entity.define({
  id: "List extends Box",
  properties: ["data", "selection", "value:Value"],
  options: {
    domNodeType: "ul",
    itemTemplate: '<a href="#">{name}</a>',
    dataIdKey: "id",
    itemDomNodeType: "li",
    alive: true
  },
  methods: function(_super) {
    return {
      valueChanged: function(ev) {
        return this.syncSelection();
      },
      dataChanged: function(ev) {
        return this.setChildren(ev, (function(_this) {
          return function() {
            return _this.syncSelection();
          };
        })(this));
      },
      tapped: function(ev) {
        var w;
        w = ev.entity;
        while (w && (w !== this)) {
          if ((w.domNodeType === this.itemDomNodeType) && w.value) {
            this.setValue(w.value);
            break;
          }
          w = w.parentEntity;
        }
        return w;
      },
      syncSelection: function() {
        var val, w, _i, _len, _ref;
        val = this.prop('value');
        _ref = this.getChildren();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          w = _ref[_i];
          if (w.prop('value' === val)) {
            this.prop("selection", w);
            break;
          }
        }
        return w;
      },
      selectionChanged: function(ev) {
        var _ref, _ref1;
        if ((_ref = ev.oldValue) != null) {
          _ref.domNodeClass("!active");
        }
        return (_ref1 = ev.value) != null ? _ref1.domNodeClass("active") : void 0;
      },
      childrenAdapter: function(data) {
        var datum, i, _i, _len, _results;
        _results = [];
        for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
          datum = data[i];
          _results.push(this.childrenItemAdapter(datum, i));
        }
        return _results;
      },
      childrenItemAdapter: function(datum, i) {
        return {
          id: "html",
          domNodeType: this.itemDomNodeType,
          style: this.itemStyle,
          html: String.formatWithMap(this.itemTemplate, datum),
          value: datum[this.dataIdKey],
          datum: datum
        };
      }
    };
  }
});


/*
HttpService.
 */

Object.entity.define({
  id: "HttpService extends EventHandler",
  methods: function(_super) {
    var MIME, PARSERS, _error, _negotiateResultType, _newRequest;
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
    _error = function(st, text, ev) {
      if (!st || (st >= 200 && st < 300) || (st === 304)) {
        return null;
      } else {
        return {
          reason: "http_transport",
          message: ("Remote error: code " + st + ". ") + ev.uri + '\n' + (text || ''),
          code: st
        };
      }
    };
    _negotiateResultType = function(u) {
      var p, r, urlId;
      urlId = u.path.slice(-1)[0];
      r = "js";
      if (urlId && (p = urlId.lastIndexOf(".")) > -1) {
        r = urlId.slice(p + 1);
      }
      return r;
    };
    return {
      createEventHandlerImpl: function() {
        return function(ev) {
          var dataType, h, headers, rq, v;
          try {
            rq = _newRequest();
            if (ev.uri.domain === '*') {
              ev.uri.domain = window.location.hostname;
            }
            ev.uri.type = ev.uri.params.ssl ? 'https' : window.location.protocol.slice(0, -1);
            dataType = ev.dataType || _negotiateResultType(ev.uri);
            rq.open(ev.method || (ev.payload ? "POST" : "GET"), "" + ev.uri, true);
            rq.onreadystatechange = function() {
              if ((this.readyState === 4) && (!ev.completed)) {
                ev.completed = true;
                this.onreadystatechange = Function.NONE;
                ev.callback(_error(this.status, this.statusText, ev), (ev.unmarshaller || PARSERS[dataType] || Function.NONE)(this.responseText));
              }
              return false;
            };
            headers = Object.update({
              Accept: MIME[dataType] || "*",
              Language: String.LANGUAGE
            }, ev.headers);
            for (h in headers) {
              v = headers[h];
              if (v) {
                rq.setRequestHeader(h, v);
              }
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
            ev.callback(Object.error(_error, "remote_error:" + ev.uri).log());
          }
        };
      }
    };
  }
});

Object.entity.define({
  id: "ScriptService extends EventHandler",
  methods: function(_super) {
    var counter, isIE8, onloadjs, registry, _createScriptTag, _doc;
    registry = window._JSONP = {};
    counter = 0;
    _doc = window.document;
    isIE8 = !!_doc.all;
    onloadjs = function(msg) {
      var js;
      js = msg.tag;
      if (isIE8) {
        js.onreadystatechange = function() {
          if (js.readyState === "loaded" || js.readyState === "complete") {
            js.onreadystatechange = "";
            msg.func();
          }
        };
      } else {
        js.onload = msg.func;
        js.onerror = msg.errfn;
      }
    };
    _createScriptTag = function(attrs) {
      var e;
      e = _doc.createElement("script");
      e.type = "text/javascript";
      e.charset = "utf-8";
      Object.update(e, attrs);
      return e;
    };
    return {
      createEventHandlerImpl: function() {
        return function(ev) {
          var ok, script, sid, u;
          script = _createScriptTag(ev.scriptAttrs);
          if (!ev.noAsynMode) {
            script.async = "async";
          }
          if (ev.scriptId) {
            script.id = ev.scriptId;
          }
          u = ev.uri;
          if (u.type === "script") {
            u.type = "http";
          }
          if (this.jsonp) {
            sid = "n" + counter++;
            u.params[u.params.jsonp || "callback"] = escape("window._JSONP." + sid);
            registry[sid] = function(r) {
              return typeof ev.callback === "function" ? ev.callback(null, r) : void 0;
            };
            ok = function() {
              script.parentNode.removeChild(script);
              return delete registry[sid];
            };
          } else {
            ok = function() {
              return typeof ev.callback === "function" ? ev.callback(null, null, this) : void 0;
            };
          }
          onloadjs({
            tag: script,
            ok: ok,
            err: function() {
              return ev.callback(Object.error("remote_error", "JSONP script error: " + u));
            }
          });
          script.src = "" + u;
          return Object.dom.appendToHead(script);
        };
      }
    };
  }
});

Object.entity.define({
  id: 'Application',
  properties: ['title', 'page', 'index'],
  methods: function(_super) {
    return {
      titleChanged: function(ev, v) {
        return window.document.title = v;
      },
      dataChanged: function(ev, data) {
        _super.dataChanged.call(this, ev, data);
        return this.prop('title', ENV.TITLE || '-');
      },
      navigate: function(h) {
        var hashes;
        if (!h) {
          return;
        }
        hashes = h.split('-');
        this.prop('page', hashes[0]);
        return this.prop('index', hashes[1] || "");
      },
      init: function() {
        var APP, CODE_MAPPING;
        APP = this;
        CODE_MAPPING = this._options.codeMap || {};
        Object.entity.create({
          id: "remote:HttpService"
        });
        Object.entity.create({
          id: "setting:ValueStorage",
          options: {
            storage: window.localStorage
          }
        });
        Object.entity.create({
          id: "html:EventHandler",
          methods: function(_super) {
            return {
              handleEvent: function(ev) {
                ev.uri = Object.Uri.parse("remote://*/html/" + ev.uri.domain + ".html");
                return Object.fire(ev);
              }
            };
          }
        });
        Object.entity.create({
          id: "entity:CodeLoader",
          methods: function(_super) {
            return {
              resolveUri: function(uri) {
                var id, m;
                if ((m = CODE_MAPPING[id = uri.domain])) {
                  m = Object.uri.parse(m);
                  if (m.domen) {
                    return m;
                  } else {
                    id = m.path[0];
                  }
                }
                return "remote://*/js/" + (id.replace('.', '/')) + ".js?v=" + (this.getVersion());
              }
            };
          }
        });
        _super.init.call(this);
        (window.onhashchange = (function(_this) {
          return function() {
            return _this.navigate(window.location.hash.slice(2) || 'home');
          };
        })(this))();
        this.domNode = window.document.body;
        return Object.dom.init(this);
      }
    };
  }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRDpcXHd3d1xcYXhpb2RcXGpzXFxheGlvZC1jbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEOlxcd3d3XFxheGlvZFxcc3JjXFxqc1xcYXhpb2QtY2xpZW50LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOztHQUFBO0FBQUEsSUFBQSxxSkFBQTs7QUFBQSxNQUlNLENBQUMsR0FBUCxHQUFhLENBQUMsU0FBQyxJQUFELEdBQUE7QUFFVixNQUFBLHNEQUFBO0FBQUEsRUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLFFBQVosQ0FBQTtBQUFBLEVBRUEsWUFBQSxHQUFlLFNBQUMsR0FBRCxHQUFBO0FBQ1gsUUFBQSxJQUFBO0FBQUEsSUFBQSxDQUFBLEdBQUksRUFBSixDQUFBO0FBQUEsSUFDQSxDQUFBLEdBQUksTUFESixDQUFBO0FBRUEsSUFBQSxJQUFHLElBQUksQ0FBQyxLQUFSO0FBQ0ksTUFBQSxDQUFDLENBQUMsUUFBRixHQUFhLElBQUksQ0FBQyxLQUFsQixDQUFBO0FBQUEsTUFDQSxDQUFDLENBQUMsTUFBRixHQUFXLENBQUEsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBRDFCLENBREo7S0FBQSxNQUFBO0FBSUksTUFBQSxDQUFDLENBQUMsUUFBRixHQUFhLEdBQWIsQ0FBQTtBQUFBLE1BQ0EsQ0FBQSxHQUFJLEdBQUcsQ0FBQyxNQURSLENBQUE7QUFFaUIsYUFBTSxDQUFBLElBQU0sQ0FBQyxDQUFDLFFBQUYsS0FBZ0IsQ0FBNUIsR0FBQTtBQUFqQixRQUFBLENBQUEsR0FBSSxDQUFDLENBQUMsVUFBTixDQUFpQjtNQUFBLENBRmpCO0FBQUEsTUFHQSxDQUFDLENBQUMsTUFBRixHQUFXLENBSFgsQ0FKSjtLQUZBO0FBVWlCLFdBQU0sQ0FBQSxJQUFNLENBQUEsQ0FBSyxDQUFDLE1BQWxCLEdBQUE7QUFBakIsTUFBQSxDQUFBLEdBQUksQ0FBQyxDQUFDLFVBQU4sQ0FBaUI7SUFBQSxDQVZqQjtBQUFBLElB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QSxRQUFELENBQVcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFLLFNBQXJCLElBQTZCLE1BQXhDLEVBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QixDQUFBLENBQUEsQ0FwQ0EsQ0FBQTtBQUFBLFFBc0NBLElBQUMsQ0FBQSxPQUFELEdBQVUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQXRDMUIsQ0FBQTtlQXVDQSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQVgsQ0FBZ0IsSUFBaEIsRUF6Q0U7TUFBQSxDQWJOO01BRk07RUFBQSxDQUhWO0NBREosQ0F2eUJBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcbkF4aW86IFdlYiBET00gQVBJLiBcbiMjI1xuXG5PYmplY3QuZG9tID0gKChfd2luKSAtPlxuICAgIFxuICAgIF9kb2MgPSBfd2luLmRvY3VtZW50XG4gICAgXG4gICAgX2NyZWF0ZUV2ZW50ID0gKGV2dCkgLT5cbiAgICAgICAgciA9IHt9XG4gICAgICAgIGUgPSB1bmRlZmluZWRcbiAgICAgICAgaWYgX3dpbi5ldmVudFxuICAgICAgICAgICAgci5pbnRlcm5hbCA9IF93aW4uZXZlbnRcbiAgICAgICAgICAgIHIudGFyZ2V0ID0gZSA9IF93aW4uZXZlbnQuc3JjRWxlbWVudFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByLmludGVybmFsID0gZXZ0XG4gICAgICAgICAgICBlID0gZXZ0LnRhcmdldFxuICAgICAgICAgICAgZSA9IGUucGFyZW50Tm9kZSB3aGlsZSBlIGFuZCBlLm5vZGVUeXBlIGlzbnQgMVxuICAgICAgICAgICAgci50YXJnZXQgPSBlXG4gICAgICAgIGUgPSBlLnBhcmVudE5vZGUgd2hpbGUgZSBhbmQgbm90IGUuZW50aXR5XG4gICAgICAgIHIuZW50aXR5ID0gZSBhbmQgZS5lbnRpdHlcbiAgICAgICAgclxuXG4gICAgX0FMSVZFX0VWRU5UU19LRVlTID0gW1xuICAgICAgICBcIm1vdXNlZG93blwiXG4gICAgICAgIFwibW91c2V1cFwiXG4gICAgICAgIFwiY2xpY2tcIlxuICAgICAgICBcIm1vdXNlbW92ZVwiXG4gICAgICAgIFwibW91c2VvdmVyXCJcbiAgICAgICAgXCJtb3VzZW91dFwiXG4gICAgXVxuICAgIF9BTElWRV9IQU5ETEVSID0gKGV2MCkgLT5cbiAgICAgICAgVCA9IHRoaXNcbiAgICAgICAgdW5sZXNzIFQuZGlzYWJsZWRcbiAgICAgICAgICAgIGV2ID0gX2NyZWF0ZUV2ZW50KGV2MClcbiAgICAgICAgICAgIHR5cGUgPSBldi5pbnRlcm5hbC50eXBlXG4gICAgICAgICAgICBzd2l0Y2ggdHlwZVxuICAgICAgICAgICAgICB3aGVuIFwibW91c2Vkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgVC51cGRhdGVEb21Ob2RlQ2xhc3MgVC5zdHlsZVByZXNzZWRcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICNfbGFzdFRvdWNoZWRFbnRpdHk9ZXZ0LmVudGl0eTtcbiAgICAgICAgICAgICAgICAgICAgVC50b3VjaEJlZ2luIGFuZCBULnRvdWNoQmVnaW4oZXYpXG4gICAgICAgICAgICAgIHdoZW4gXCJtb3VzZXVwXCJcbiAgICAgICAgICAgICAgICAgICAgVC50b3VjaEVuZCBhbmQgVC50b3VjaEVuZChldilcbiAgICAgICAgICAgICAgICAgICAgVC51cGRhdGVEb21Ob2RlQ2xhc3MgXCIhXCIgKyBULnN0eWxlUHJlc3NlZFxuICAgICAgICAgICAgICB3aGVuIFwiY2xpY2tcIlxuICAgICAgICAgICAgICAgICAgICBULnRhcHBlZCBhbmQgVC50YXBwZWQoZXYpXG4gICAgICAgICAgICAgIHdoZW4gXCJtb3VzZW1vdmVcIlxuICAgICAgICAgICAgICAgICAgICBULm1vdXNlTW92ZSBhbmQgVC5tb3VzZU1vdmUoZXYpXG4gICAgICAgICAgICAgIHdoZW4gXCJtb3VzZW92ZXJcIlxuICAgICAgICAgICAgICAgICAgICBULnVwZGF0ZURvbU5vZGVDbGFzcyBULnN0eWxlSG92ZXJlZFxuICAgICAgICAgICAgICAgICAgICBULm1vdXNlT3ZlciBhbmQgVC5tb3VzZU92ZXIoZXYpXG4gICAgICAgICAgICAgIHdoZW4gXCJtb3VzZW91dFwiXG4gICAgICAgICAgICAgICAgICAgIFQubW91c2VPdXQgYW5kIFQubW91c2VPdXQoZXYpXG4gICAgICAgICAgICAgICAgICAgIFQudXBkYXRlRG9tTm9kZUNsYXNzIFwiIVwiICsgVC5zdHlsZUhvdmVyZWRcbiAgICAgICAgdHJ1ZVxuXG4gICAgXG4gICAgI2NyZWF0ZXMgVUkgZXZlbnRcbiAgICBkb2N1bWVudDogX3dpbi5kb2N1bWVudFxuICAgIGNyZWF0ZUV2ZW50OiBfY3JlYXRlRXZlbnRcbiAgICBcbiAgICAjIGNvbW1vbiBzdHlsZXNcbiAgICBTVFlMRV9MSU5FX0ZJWEVEIDogXCJvdmVyZmxvdzpoaWRkZW47d2hpdGUtc3BhY2U6bm93cmFwO2N1cnNvcjpwb2ludGVyO1wiXG4gICAgU1RZTEVfVEVYVExJTkUgOiBcIndoaXRlLXNwYWNlOm5vd3JhcDtsaW5lLWhlaWdodDoxLjVlbTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7XCJcbiAgICBcbiAgICAjIGNyZWF0ZXMgYSBuZXcgRE9NIEVsZW1lbnRcbiAgICBjcmVhdGVFbGVtZW50OiAodHlwZT1cIkRJVlwiLCBhdHRycykgLT5cbiAgICAgICAgT2JqZWN0LnVwZGF0ZSBfZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSksIGF0dHJzXG5cbiAgICBjcmVhdGVDb21wbGV4RWxlbWVudDogKHRhZywgYXR0cnMpIC0+XG4gICAgICAgIFxuICAgICAgICAjIGhhY2sgZm9yIHR5cGUgc2V0IG9uIElFOFxuICAgICAgICBkaXYgPSBARE9NX0ZBQ1RPUlkgb3IgKEBET01fRkFDVE9SWSA9IF9kb2MuY3JlYXRlRWxlbWVudChcImRpdlwiKSlcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IHRhZ1xuICAgICAgICByID0gZGl2LmZpcnN0Q2hpbGRcbiAgICAgICAgZGl2LnJlbW92ZUNoaWxkIHJcbiAgICAgICAgT2JqZWN0LnVwZGF0ZSByLCBhdHRyc1xuXG4gICAgYXBwZW5kVG9IZWFkOiAoZWwpIC0+XG4gICAgICAgIGZqcyA9IF9kb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdXG4gICAgICAgIGZqcy5hcHBlbmRDaGlsZCBlbFxuXG4gICAgYXBwZW5kQ3NzOiAoaHJlZikgLT4gQGFwcGVuZFRvSGVhZCBAY3JlYXRlRWxlbWVudCBcImxpbmtcIiwgcmVsOiBcInN0eWxlc2hlZXRcIiwgaHJlZjogaHJlZlxuXG4gICAgIyBmaW5kcyBhIERPTSBFbGVtZW50IGZyb20gcGFyZW50XG4gICAgZ2V0RWxlbWVudEJ5SWQ6IChpZCkgLT4gX2RvYy5nZXRFbGVtZW50QnlJZChpZCkgb3IgbnVsbFxuXG4gICAgIyByZW1vdmVzIGEgRE9NIEVsZW1lbnQgZnJvbSBwYXJlbnRcbiAgICByZW1vdmVFbGVtZW50OiAoZSkgLT4gZT8ucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQgZSBcblxuICAgICMgbWFrZXMgZW50aXR5IHZpZXcgYWxpdmVcbiAgICBhbGl2ZTogKFQpIC0+XG4gICAgICAgIEBsaXN0ZW5FdmVudHMgVCwgX0FMSVZFX0VWRU5UU19LRVlTLCAoZXYwKSAtPlxuICAgICAgICAgICAgX0FMSVZFX0hBTkRMRVIuY2FsbCBULCBldjBcblxuICAgICMgYmluZCBoYW5kbGVyIGZvciBlbnRpdHkgRE9NIGV2ZW50XG4gICAgbGlzdGVuRXZlbnRzOiAoVCwga2V5LCBmbiwgZmwpIC0+XG4gICAgICAgIG5vZGUgPSAoaWYgVCB0aGVuIFQuZG9tTm9kZSBlbHNlIF9kb2MpXG4gICAgICAgIGtleXMgPSAoaWYga2V5LnNwbGl0IHRoZW4ga2V5LnNwbGl0KFwiIFwiKSBlbHNlIGtleSlcbiAgICAgICAgZm9yIGtleSBpbiBrZXlzXG4gICAgICAgICAgICBpZiBub2RlLmFkZEV2ZW50TGlzdGVuZXJcbiAgICAgICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIga2V5LCBmbiwgZmwgIywgZmFsc2VcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBub2RlLmF0dGFjaEV2ZW50IFwib25cIiArIGtleSwgZm4sIGZsXG4gICAgICAgIG5vZGVcblxuICAgICMgc3RvcHMgZXZlbnQgYnViYmxpbmdcbiAgICBzdG9wRXZlbnQ6IChldikgLT5cbiAgICAgICAgZSA9IGV2Py5pbnRlcm5hbFxuICAgICAgICBlPy5zdG9wUHJvcGFnYXRpb24/KClcbiAgICAgICAgZT8uY2FuY2VsQnViYmxlID0gdHJ1ZVxuXG4gICAgIyByZXR1cm5zIHNpemUgb2YgY2xpZW50IHZpZXdwb3J0XG4gICAgaXNLZXlib2FyZENvZGU6IChldiA9IF93aW4uZXZlbnQgb3Ige30sIGNvZGUpIC0+IGV2LmtleUNvZGUgaXMgY29kZSBvciBldi5jaGFyQ29kZSBpcyBjb2RlIG9yIGV2LndoaWNoIGlzIGNvZGVcblxuICAgIEtFWV9DT0RFOlxuICAgICAgICBFU0NBUEU6IDI3XG4gICAgICAgIEVOVEVSOiAxM1xuICAgICAgICBUQUI6IDhcblxuICAgICMgcmV0dXJucyBzaXplIG9mIGNsaWVudCB2aWV3cG9ydFxuICAgIHZpZXdwb3J0U2l6ZTogLT5cbiAgICAgICAgc2NyID0gX3dpbi5zY3JlZW5cbiAgICAgICAgd2lkdGg6IHNjci5hdmFpbFdpZHRoXG4gICAgICAgIGhlaWdodDogc2NyLmF2YWlsSGVpZ2h0XG5cbiAgICAjIHJldHVybnMgdG90YWwgb2Zmc2V0IG9mIGVsZW1lbnQgXG4gICAgZ2V0VG90YWxPZmZzZXQ6IChwKSAtPlxuICAgICAgICByID1cbiAgICAgICAgICAgIHRvcDogMFxuICAgICAgICAgICAgbGVmdDogMFxuICAgICAgICAgICAgd2lkdGg6IHAuY2xpZW50V2lkdGhcbiAgICAgICAgICAgIGhlaWdodDogcC5jbGllbnRIZWlnaHRcblxuICAgICAgICB3aGlsZSBwXG4gICAgICAgICAgICByLnRvcCArPSBwLm9mZnNldFRvcCAtIHAuc2Nyb2xsVG9wXG4gICAgICAgICAgICByLmxlZnQgKz0gcC5vZmZzZXRMZWZ0IC0gcC5zY3JvbGxMZWZ0XG4gICAgICAgICAgICBwID0gcC5vZmZzZXRQYXJlbnRcbiAgICAgICAgclxuXG4gICAgIyBVSSBlcnJvciBoYW5kbGVyXG4gICAgaGFuZGxlRXJyb3I6IChlcnIpIC0+IE9iamVjdC5lcnJvcihlcnIpLmxvZygpXG5cbiAgICAjIHNldHMvcmVtb3ZlIGNsYXNzIGZvciBlbHQuIFxuICAgICMgQ2xhc3NlcyB0byByZW1vdmUgaGF2ZSB0byBiZSBwcmVmaXhlZCB3aXRoICchJyBzaWduLlxuICAgIHVwZGF0ZUNsYXNzOiAoZWx0LCBkZWx0YSkgLT5cbiAgICAgICAgcmV0dXJuIGVsdCB1bmxlc3MgZWx0IGFuZCBkZWx0YVxuXG4gICAgICAgIGNsc3MgPSBlbHQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKVxuICAgICAgICBkZWx0YSA9IGRlbHRhLnNwbGl0KFwiIFwiKVxuICAgICAgICBcbiAgICAgICAgZm9yIGNsIGluIGRlbHRhXG4gICAgICAgICAgICBpZiBjbFxuICAgICAgICAgICAgICAgIGlmIGNsWzBdIGlzIFwiIVwiXG4gICAgICAgICAgICAgICAgICAgIGlmIGNsIGlzIFwiISpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzcyA9IFtdXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsc3NbcF0gPSBcIlwiIGlmIGNsWzEuLl0gaW4gY2xzc1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY2xzcy5wdXNoIGNsIHVubGVzcyBjbCBpbiBjbHNzXG4gICAgICAgIGVsdC5jbGFzc05hbWUgPSAoY2wgZm9yIGNsIGluIGNsc3Mgd2hlbiBjbCkuam9pbignICcpXG4gICAgICAgIGVsdFxuXG4gICAgIyBDcmVhdGVzIEVudGl0aWVzIGZyb20gZ2l2ZW4gRE9NIHRyZWUuXG4gICAgaW5pdDogKC0+XG4gICAgICAgIFxuICAgICAgICByZV9kYXNoQWxwaGEgPSAvLShbXFxkYS16XSkvZ1xuICAgICAgICBcbiAgICAgICAgZm5fY2FtZWxDYXNlID0gKGFsbCwgbGV0dGVyKSAtPiBsZXR0ZXIudG9VcHBlckNhc2UoKVxuXG4gICAgICAgIF9nZXRBbGxXaWRnZXRzID0gKGUsIGFsbD1bXSkgLT5cbiAgICAgICAgICAgIHJldHVybiAgZS5xdWVyeVNlbGVjdG9yQWxsIFwiW3gtd2lkZ2V0XVwiIGlmIF9kb2MucXVlcnlTZWxlY3RvckFsbFxuXG4gICAgICAgICAgICBhbGwucHVzaCAoYyBmb3IgYyBpbiBlLmNoaWxkcmVuIGlmIGMuZ2V0QXR0cmlidXRlKFwieC13aWRnZXRcIikpLi4uXG4gICAgICAgICAgICAoX2dldEFsbFdpZGdldHMgYywgYWxsKSBmb3IgYyBpbiBlLmNoaWxkcmVuXG4gICAgICAgICAgICBhbGxcbiAgICAgICAgXG4gICAgICAgIGFwcGx5V2lkZ2V0SW5pdCA9ICh2KSAtPlxuICAgICAgICAgICAgbWV0YSA9IFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IFxuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlIDogdlxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRFbnRpdHkgOiBAcGFyZW50RW50aXR5ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBvbkNyZWF0ZWQgOiAoZXJyKSAtPiBoYW5kbGVFcnJvciBlcnIsIG1ldGEgaWYgZXJyIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgYSBpbiB2LmF0dHJpYnV0ZXMgd2hlbiBub3QgKG49YS5uYW1lKS5pbmRleE9mKFwieC1cIilcbiAgICAgICAgICAgICAgICB6ID12LmdldEF0dHJpYnV0ZShuKVxuICAgICAgICAgICAgICAgIGlmIHpbMF0gaXMgJ0AnXG4gICAgICAgICAgICAgICAgICAgIHogPSBPYmplY3QucGFyc2UoelsxLi5dKVxuICAgICAgICAgICAgICAgIG1ldGEub3B0aW9uc1tuWzIuLl0ucmVwbGFjZShyZV9kYXNoQWxwaGEsIGZuX2NhbWVsQ2FzZSldID0geiBcbiAgICAgICAgICAgIGlkID0gdi5nZXRBdHRyaWJ1dGUoXCJpZFwiKVxuICAgICAgICAgICAgbWV0YS5pZCA9ICgoaWYgaWQgdGhlbiAoaWQrXCI6XCIpIGVsc2UgXCJcIikpICsgbWV0YS5vcHRpb25zW1wid2lkZ2V0XCJdXG5cbiAgICAgICAgICAgIE9iamVjdC5lbnRpdHkuY3JlYXRlIG1ldGFcblxuICAgICAgICBoYW5kbGVFcnJvciA9IChlcnIsIG1ldGEpIC0+XG4gICAgICAgICAgICBPYmplY3QuZXJyb3IoZXJyIFwid3Jvbmdfd2lkZ2V0XCIsIG1ldGEpLmxvZygpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIG5vZGUgPSBPYmplY3QuZG9tLmNyZWF0ZUVsZW1lbnQoKVxuICAgICAgICAgICAgbWV0YS5kb21Ob2RlLmFwcGVuZENoaWxkIG5vZGVcbiAgICAgICAgICAgIE9iamVjdC5lbnRpdHkuY3JlYXRlXG4gICAgICAgICAgICAgICAgdHlwZUlkOiBcIkh0bWxcIlxuICAgICAgICAgICAgICAgIHBhcmVudEVudGl0eTogbWV0YS5wYXJlbnRFbnRpdHlcbiAgICAgICAgICAgICAgICBzdHlsZTogXCJhbGVydC1lcnJvclwiXG4gICAgICAgICAgICAgICAgaHRtbDogXCJFcnJvcjogXCIgKyAoZXJyLm1lc3NhZ2Ugb3IgKFwiY2FuJ3QgY3JlYXRlIFVJIHZpZXc6IFwiICsgbWV0YS5pZCkpXG5cbiAgICAgICAgXG4gICAgICAgICMgaW5pdGlhbGl6ZXMgYWxsIHdpZGdldHMgb3ZlciBET00gdHJlZVxuICAgICAgICAocm9vdCwgb3B0aW9ucykgLT5cbiAgICAgICAgXG4gICAgICAgICAgICBvbkNyZWF0ZWQ9IChlcnIsIHJyKSAtPlxuICAgICAgICAgICAgICAgIGN0eCA9IE9iamVjdC51cGRhdGUoaGFuZGxlRXJyb3I6IGhhbmRsZUVycm9yLCBwYXJlbnRFbnRpdHk6IHJyLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgIChhcHBseVdpZGdldEluaXQuY2FsbCBjdHgsIG5vZGUpIGZvciBub2RlIGluIF9nZXRBbGxXaWRnZXRzKHJyLmRvbU5vZGUpXG5cbiAgICAgICAgICAgIHJldHVybiBvbkNyZWF0ZWQobnVsbCwgcm9vdCkgaWYgcm9vdFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBPYmplY3QuZW50aXR5LmNyZWF0ZSBcbiAgICAgICAgICAgICAgICB0eXBlSWQ6IFwiQm94XCJcbiAgICAgICAgICAgICAgICBkb21Ob2RlOiBfZG9jLmJvZHlcbiAgICAgICAgICAgICAgICBvbkNyZWF0ZWQ6IG9uQ3JlYXRlZFxuXG4gICAgKSgpXG4gICAgXG4pKHdpbmRvdylcblxuXG4jIyNcbkJhc2ljIERvbSBVSSBwcm9wZXJ0aWVzLlxuIyMjXG5cbiMgcHJvcGVydHkgVGhlIFtkb21Ob2RlXSBwcm9wZXJ0eSBvZiB2aWV3XG4jIHJlbGF0ZWQgZW50aXR5IGF0dHJpYnV0ZXM6XG4jIEBhdHRyIGRvbU5vZGVUeXBlIC0gRE9NIG5vZGUgdGFnIFxuIyBAYXR0ciBkb21Ob2RlQXR0cnMgLSBET00gbm9kZSBhdHRyaWJ1dGVzXG4jIEBhdHRyIGFsaXZlIC0gZm9yY2UgRE9NIGV2ZW50IGxpc3RlbmluZ1xuT2JqZWN0LmVudGl0eS5kZWZpbmVQcm9wZXJ0eSBcbiAgICBpZDpcIk5vZGVcIlxuICAgIG1ldGhvZHM6IC0+XG5cbiAgICAgICAgIyBmaXJzdCB2YWx1ZSBpbml0XG4gICAgICAgIGluaXQ6IChUKSAtPlxuXG4gICAgICAgICAgICAjIGNyZWF0ZSBpZiBub25lXG4gICAgICAgICAgICB1bmxlc3MgKG5vZGUgPSBULmRvbU5vZGUgPSBULl9vcHRpb25zLmRvbU5vZGUpXG4gICAgICAgICAgICAgICAgYXR0cnMgPSB7fVxuICAgICAgICAgICAgICAgIGF0dHJzLmlkID0gVC5pZCBpZiBULmlkIGlzbnQgVC5faWRcbiAgICAgICAgICAgICAgICBub2RlID0gVC5kb21Ob2RlID0gT2JqZWN0LmRvbS5jcmVhdGVFbGVtZW50KFQuZG9tTm9kZVR5cGUsIE9iamVjdC51cGRhdGUoYXR0cnMsIFQuZG9tTm9kZUF0dHJzKSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyBjaGlsZHJlbiBhcHBlbmRlZCB0byBcbiAgICAgICAgICAgIFQuY29udGVudE5vZGUgPSBub2RlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMgYmFjayByZWZlcmVuY2VcbiAgICAgICAgICAgIG5vZGUuZW50aXR5ID0gVFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjIG1ha2UgYWxpdmUgaWYgbmVlZGVkXG4gICAgICAgICAgICBPYmplY3QuZG9tLmFsaXZlIFQgaWYgVC5hbGl2ZVxuICAgICAgICAgICAgVC5wYXJlbnRFbnRpdHk/LmNvbnRlbnROb2RlLmFwcGVuZENoaWxkIG5vZGUgICAgaWYgKG5vdCBub2RlLnBhcmVudE5vZGUgb3Igbm90IG5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlKVxuICAgICAgICAgICAgVC5hZGRGaW5hbGl6ZXIgQGRvbmVcblxuICAgICAgICAjIGRvbmUgcHJvcGVydHkgd2l0aCBlbnRpdHkgaW5zdGFuY2VcbiAgICAgICAgZG9uZTogKFQpIC0+XG4gICAgICAgICAgICByZXR1cm4gdW5sZXNzIGUgPSBULmRvbU5vZGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgT2JqZWN0LmRvbS5yZW1vdmVFbGVtZW50IGVcbiAgICAgICAgICAgIGRlbGV0ZSBlLmVudGl0eSBcbiAgICAgICAgICAgIGRlbGV0ZSBULmRvbU5vZGVcbiAgICAgICAgICAgIGRlbGV0ZSBULmNvbnRlbnROb2RlXG5cbiMgQHByb3BlcnR5IFRoZSBbc3R5bGVdIHByb3BlcnR5IG9mIHZpZXdcbiMgcmVsYXRlZCBlbnRpdHkgYXR0cmlidXRlczpcbiMgQGF0dHIgY3NzIC0gY3VzdG9tIERPTSBub2RlIHN0eWxlIFxuT2JqZWN0LmVudGl0eS5kZWZpbmVQcm9wZXJ0eSBcbiAgICBpZDogXCJTdHlsZVwiXG4gICAgbWV0aG9kczogIC0+XG4gICAgXG4gICAgICAgICMgQGluaXQgXG4gICAgICAgIGluaXQ6IChUKSAtPlxuICAgICAgICAgICAgciA9IFQuZG9tTm9kZVxuICAgICAgICAgICAgci5zdHlsZS5jc3NUZXh0ICs9IFQuY3NzICAgIGlmIFQuY3NzXG4gICAgICAgICAgICBPYmplY3QucHJvcGVydHkuYmluZCBULCBAaWQsIFQuc3R5bGVFeHByZXNzaW9uICAgIGlmIFQuc3R5bGVFeHByZXNzaW9uXG4gICAgICAgICAgICBULmRvbU5vZGVDbGFzcyAoVC5zdHlsZSBvciBcIlwiKSArIFwiIFwiICsgKHIuY2xhc3NOYW1lIG9yIFwiXCIpXG5cbiAgICAgICAgI0BnZXQgdmFsdWUgZ2V0dGVyLlxuICAgICAgICBnZXR0ZXI6IChUKSAtPiBULmRvbU5vZGUuY2xhc3NOYW1lXG5cbiAgICAgICAgI0BzZXR0ZXIgdmFsdWVcbiAgICAgICAgc2V0dGVyOiAoVCwgdiwgZXYpIC0+XG4gICAgICAgICAgICBpZiB0eXBlb2YgdiBpcyBcInN0cmluZ1wiIHRoZW4gVC5kb21Ob2RlQ2xhc3MgdiBlbHNlIFQuZG9tTm9kZVN0eWxlIHZcblxuICAgIG1peGluOiAoX3N1cGVyKSAtPlxuICAgIFxuICAgICAgICAjIFNldHMgVUkgc3R5bGUgYXR0cmlidXRlc1xuICAgICAgICBkb21Ob2RlU3R5bGU6IChkZWx0YSkgLT5cbiAgICAgICAgICAgIHJldHVybiBzdCB1bmxlc3MgKHN0ID0gQGRvbU5vZGUuc3R5bGUpIGFuZCBkZWx0YVxuICAgICAgICAgICAgc3Rbbl0gPSB2IGZvciBuLCB2IG9mIGRlbHRhIHdoZW4gc3Rbbl0gaXNudCB2XG4gICAgICAgICAgICBzdFxuXG4gICAgICAgICMgVXBkYXRlcyBVSSBzdHlsZSBjbGFzc1xuICAgICAgICBkb21Ob2RlQ2xhc3M6IChkZWx0YSkgLT4gT2JqZWN0LmRvbS51cGRhdGVDbGFzcyBAZG9tTm9kZSwgZGVsdGFcblxuICAgICAgICAjIFNldHMvVW5zZXRzIFVJIHN0eWxlIGNsYXNzXG4gICAgICAgIHRvZ2dsZURvbU5vZGVDbGFzczogKGNsLCBmbGFnKSAtPiBPYmplY3QuZG9tLnVwZGF0ZUNsYXNzIEBkb21Ob2RlLCAoKGlmIGZsYWcgdGhlbiBjbCBlbHNlIChcIiFcIiArIGNsKSkpXG5cbiMgQHByb3BlcnR5IFRoZSBbaGlkZGVuXSBwcm9wZXJ0eSBvZiB2aWV3XG4jIHJlbGF0ZWQgZW50aXR5IGF0dHJpYnV0ZXM6XG4jIEBhdHRyIGRpc3BsYXlUeXBlIC0gdHlwZSBvZiBkaXNwbGF5OiAnaW5saW5lJywgJ2Jsb2NrJywgJ2lubGluZS1ibG9jaydcbk9iamVjdC5lbnRpdHkuZGVmaW5lUHJvcGVydHkgXG4gICAgaWQ6IFwiSGlkZGVuXCIsIFxuICAgIG1ldGhvZHM6ICAtPlxuICAgICAgICBnZXR0ZXI6IChUKSAtPiBULmRvbU5vZGUuc3R5bGUuZGlzcGxheSBpcyBcIm5vbmVcIlxuICAgICAgICBzZXR0ZXI6IChULCB2KSAtPiBULmRvbU5vZGUuc3R5bGUuZGlzcGxheSA9IChpZiB2IHRoZW4gXCJub25lXCIgZWxzZSAoQGRpc3BsYXlUeXBlIG9yIFwiXCIpKVxuICAgICAgICAgICAgXG4gICAgbWl4aW46ICAoX3N1cGVyKSAtPlxuICAgIFxuICAgICAgICAjIFNldHMgYW4gRWxlbWVudCBcImRpc3BsYXlcIiBmbGFnLlxuICAgICAgICBkaXNwbGF5OiAoZiwgYkZvcmNlUGFyZW50cykgLT5cbiAgICAgICAgICAgIEBzZXRIaWRkZW4gbm90IGZcbiAgICAgICAgICAgIGlmIGYgYW5kIGJGb3JjZVBhcmVudHMgYW5kIChwID0gQClcbiAgICAgICAgICAgICAgICBwLmRpc3BsYXkgZiB3aGlsZSAocCA9IHAucGFyZW50RW50aXR5KVxuICAgICAgICAgICAgQFxuXG4gICAgICAgICMgc3dpdGNoZXMgYW4gRWxlbWVudCBcImRpc3BsYXlcIiBmbGFnLlxuICAgICAgICBzd2l0Y2hEaXNwbGF5OiAtPiBAc2V0SGlkZGVuIG5vdCBAaXNIaWRkZW4oKVxuXG4gICAgICAgICMgIGlzIGhpZGRlblxuICAgICAgICBpc0hpZGRlbjogKCkgLT4gQHByb3AgXCJoaWRkZW5cIlxuXG4gICAgICAgICMgc2V0cyBhbiBFbGVtZW50IFwiZGlzcGxheVwiIGZsYWcuXG4gICAgICAgIHNldEhpZGRlbjogKGYpIC0+IEBwcm9wIFwiaGlkZGVuXCIsIGZcblxuXG4jIEBwcm9wZXJ0eSBVSSBbY2hpbGRyZW5dIHByb3BlcnR5XG4jIFVzZWQgYnkgW2JveF0gZW50aXR5IGFuZCBpdHMgZGVzY2VuZGFudHMuXG4jIEBhdHRyIGNoaWxkcmVuQXN5bmNBZGFwdGVyIC0gYWRhcHQgcmVzdWx0IG9mIGFzeW5jIGZldGNoaW5nXG4jIEBhdHRyIGNoaWxkcmVuQWRhcHRlciAtIGFkYXB0IG1ldGEgZGF0YSBiZWZvcmUgc2V0XG5PYmplY3QuZW50aXR5LmRlZmluZVByb3BlcnR5IFxuICAgIGlkOiBcIkNoaWxkcmVuXCJcbiAgICBtZXRob2RzOiAoX3N1cGVyKSAtPlxuICAgICAgICBcbiAgICAgICAgX2FkZE9wID0gKFQsIGUsIGNoKSAtPlxuICAgICAgICAgICAgLT5cbiAgICAgICAgICAgICAgICBjYiA9IEBjYigpXG4gICAgICAgICAgICAgICAgVC5jcmVhdGVDaGlsZCBlLCAoZXJyLCBlKSAtPlxuICAgICAgICAgICAgICAgICAgICBlIGFuZCBjaC5wdXNoKGUpXG4gICAgICAgICAgICAgICAgICAgIGNiKClcbiAgICAgICAgICAgICAgICB0cnVlXG5cbiAgICAgICAgXG4gICAgICAgICMgQ2FsbGJhY2sgdXNlZCBpbiBTZXRzIHByb3BlcnR5IHZhbHVlIGZyb20gYXN5bmMgdXJsLlxuICAgICAgICAjIHVzZWQgaW4gUHJvcGVydHkuc2V0QXN5bmNWYWx1ZSgpIGFzIGNhbGxiYWNrXG4gICAgICAgICMgY2FsbHMgZXZlbnQgYWRhcHRlcnM6IGZyb20gZW50aXR5IG9yIGRlZmF1bHQgaWYgbm9uZVxuICAgICAgICBjcmVhdGVBc3luY1ZhbHVlQ2FsbGJhY2s6IChUKSAtPlxuICAgICAgICAgICAgKGVyciwgdmFsdWUpIC0+XG4gICAgICAgICAgICAgICAgdW5sZXNzIFQuX2RvbmVcbiAgICAgICAgICAgICAgICAgICAgVC51cGRhdGVEb21Ob2RlQ2xhc3MgXCIhdWktYnVzeVwiXG4gICAgICAgICAgICAgICAgICAgIFQucHJvcCBwcm9wSWQsIFQuY2hpbGRyZW5Bc3luY0FkYXB0ZXIoZXJyLCB2YWx1ZSlcblxuICAgICAgICBcbiAgICAgICAgIyBTZXRzIHByb3BlcnR5IHZhbHVlIGZyb20gYXN5bmMgdXJsLlxuICAgICAgICBzZXRBc3luY1ZhbHVlOiAoVCwgdXJsKSAtPlxuICAgICAgICAgICAgVC51cGRhdGVEb21Ob2RlQ2xhc3MgXCJ1aS1idXN5XCJcbiAgICAgICAgICAgIF9zdXBlci5zZXRBc3luY1ZhbHVlLmNhbGwgdGhpcywgVCwgdXJsXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBcbiAgICAgICAgIyBzZXRzIHZhbHVlXG4gICAgICAgIHNldFZhbHVlOiAoVCwgZXYsIHVybCkgLT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyBjaGVja3MgaWYgY29kZSBkZXBlbmRlbmNpZXMgc3BlY2lmaWVkXG4gICAgICAgICAgICByZXF1aXJlcyA9IGV2LnJlcXVpcmVzIG9yIFQuY2hpbGRyZW5SZXF1aXJlc1xuICAgICAgICAgICAgaWYgcmVxdWlyZXNcbiAgICAgICAgICAgICAgICBwID0gdGhpc1xuICAgICAgICAgICAgICAgIE9iamVjdC5yZXF1aXJlIHJlcXVpcmVzLCAoZXJyKSAtPlxuICAgICAgICAgICAgICAgICAgICBldi5yZXF1aXJlcyA9IFQuY2hpbGRyZW5SZXF1aXJlcyA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgZXYudmFsdWUgPSBbXCJsYWJlbDovL2FsZXJ0L2FsZXJ0LWVycm9yP2NhcHRpb249bm9fcmVxdWlyZWRfc2NyaXB0cyBmb3IgY29udGVudFwiXSAgICBpZiBlcnJcbiAgICAgICAgICAgICAgICAgICAgcC5zZXRWYWx1ZSBULCBldlxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGlmIHVybFxuICAgICAgICAgICAgICAgICAgICBAc2V0QXN5bmNWYWx1ZSBULCB1cmxcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAjIHJlbW92ZXMgYWxsIGN1cnJlbnRseSBhZGRlZFxuICAgICAgICAgICAgICAgICAgICBULnJlbW92ZUFsbENoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAgICAgdiA9IChULmNoaWxkcmVuQWRhcHRlciBvciBGdW5jdGlvbi5OT05FKS5jYWxsKFQsIGV2LnZhbHVlLCBldilcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICNULnRyYWNlKCdzZXQgY2hpbGRyZW4nLHYpO1xuICAgICAgICAgICAgICAgICAgICBvcHMgPSBbXVxuICAgICAgICAgICAgICAgICAgICBpZiB2IGFuZCB2Lmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoID0gVC5nZXRDaGlsZHJlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgbCA9IHYubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICBlID0gdW5kZWZpbmVkXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIGkgPCBsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZSA9IHZbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHMucHVzaCBfYWRkT3AoVCwgZSwgY2gpICAgIGlmIGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICMgY2FsbGJhY2sgaW50byBlbnRpdHkgaWYgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIG9wcy5wdXNoIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICBULmNoaWxkcmVuQ2hhbmdlZCBhbmQgVC5jaGlsZHJlbkNoYW5nZWQoZXYsIHYpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgICAgICAgICBGdW5jdGlvbi5wZXJmb3JtIG9wc1xuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgZG9uZTogKFQpIC0+XG4gICAgICAgICAgICAjIGNhc2NhZGUgZG9uZVxuICAgICAgICAgICAgVC5yZW1vdmVBbGxDaGlsZHJlbigpXG4gICAgICAgICAgICBfc3VwZXIuZG9uZS5jYWxsIHRoaXMsIFRcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgIyBAcGF0Y2ggZW50aXR5IHR5cGVcbiAgICBtaXhpbjogKF9zdXBlcikgLT5cbiAgICAgICAgXG4gICAgICAgICMgQ3JlYXRlcyBhIG5ldyBjaGlsZC5cbiAgICAgICAgY3JlYXRlQ2hpbGQ6IChyLCBjYikgLT5cbiAgICAgICAgICAgIGlmIEFycmF5LmlzQXJyYXkocilcbiAgICAgICAgICAgICAgICBjaCA9IChpZiAoci5sZW5ndGggPiAxKSB0aGVuIEFycmF5LnNsaWNlKHIsIDEpIGVsc2UgbnVsbClcbiAgICAgICAgICAgICAgICByID0gKGlmICh0eXBlb2YgKHJbMF0pIGlzIFwic3RyaW5nXCIpIHRoZW4gT2JqZWN0LmVudGl0eS5jcmVhdGUucGFyc2VNZXRhKHJbMF0pIGVsc2UgclswXSlcbiAgICAgICAgICAgICAgICByLmNoaWxkcmVuID0gY2ggICAgaWYgY2hcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHIgPSAoaWYgKHR5cGVvZiAocikgaXMgXCJzdHJpbmdcIikgdGhlbiBPYmplY3QuZW50aXR5LmNyZWF0ZS5wYXJzZU1ldGEocikgZWxzZSByKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYjIgPSAoZXJyLCBlKSA9PlxuICAgICAgICAgICAgICAgIEBnZXRDaGlsZHJlbigpLnB1c2ggZVxuICAgICAgICAgICAgICAgIEBjaGlsZHJlbkNoYW5nZWQ/KHZhbHVlOiBbcl0pXG4gICAgICAgICAgICAgICAgY2I/KClcblxuICAgICAgICAgICAgZSA9IE9iamVjdC5lbnRpdHkuY3JlYXRlKE9iamVjdC51cGRhdGUoXG4gICAgICAgICAgICAgICAgaWQ6IFwiYm94XCJcbiAgICAgICAgICAgICAgICBwYXJlbnRFbnRpdHk6IHRoaXNcbiAgICAgICAgICAgICwgciksIGNiMilcbiAgICAgICAgICAgIGVcblxuICAgICAgICAjIGdldHMgbGlzdCBvZiBjaGlsZHJlblxuICAgICAgICBnZXRDaGlsZHJlbjogLT4gIEBfY2hpbGRyZW4gb3IgKEBfY2hpbGRyZW4gPSBbXSlcblxuICAgICAgICBcbiAgICAgICAgIyBpbnZva2VzIGRvbmUoKSBmb3IgZWFjaCBhbmQgdGhlbiByZW1vdmVzIGFsbCBjaGlsZHJlblxuICAgICAgICByZW1vdmVBbGxDaGlsZHJlbjogLT5cbiAgICAgICAgICAgIGNoLmRvbmUoKSBmb3IgY2ggaW4gQF9jaGlsZHJlblxuICAgICAgICAgICAgQF9jaGlsZHJlbiA9IFtdXG5cbiAgICAgICAgIyBjcmVhdGVzIGEgc2V0IG9mIGNoaWxkcmVuIGJ5IGdpdmVuIHsjbWV0YX1cbiAgICAgICAgc2V0Q2hpbGRyZW46IChtZXRhKSAtPiBAcHJvcCBcImNoaWxkcmVuXCIsIG1ldGFcblxuICAgICAgICAjIEBhZG9wdCBhc3luYyB2YWx1ZS5cbiAgICAgICAgY2hpbGRyZW5Bc3luY0FkYXB0ZXI6IChlcnIsIHZhbHVlKSAtPlxuICAgICAgICAgICAgaWYgZXJyIHRoZW4gaWQ6IFwiaHRtbFwiLCBodG1sOiBTdHJpbmcubG9jYWxpemUoZXJyLnJlYXNvbiBvciBcInVua25vd25fZXJyb3JcIikgZWxzZSB2YWx1ZVxuXG4jIEBkZWZpbmUgVGhlIFtjYXB0aW9uXSBwcm9wZXJ0eS5cbk9iamVjdC5lbnRpdHkuZGVmaW5lUHJvcGVydHkgXG4gICAgaWQ6IFwiQ2FwdGlvblwiXG4gICAgbWV0aG9kczogLT5cbiAgICBcbiAgICAgICAgIyBzZXR0ZXJcbiAgICAgICAgc2V0dGVyOiAoVCwgdj0nJywgZXYpIC0+XG4gICAgICAgICAgICBULl9zdGF0ZVtAaWRdID0gdlxuICAgICAgICAgICAgZSA9IEBnZXRDYXB0aW9uRWx0KClcbiAgICAgICAgICAgIGhpZGRlbiA9ICh2IGlzIFwibm9uZVwiKVxuICAgICAgICAgICAgaWYgZVxuICAgICAgICAgICAgICAgIGUuZGlzcGxheSBub3QgKGUuaGlkZGVuIG9yIGhpZGRlbilcbiAgICAgICAgICAgICAgICB2ID0gQGdldENhcHRpb25IdG1sKHYsIGV2KVxuICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICBlLmRvbU5vZGUuaW5uZXJIVE1MID0gKGlmIChoaWRkZW4gb3Igbm90IHYpIHRoZW4gXCJcIiBlbHNlIHYpXG4gICAgICAgICAgICAgICAgY2F0Y2ggXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5lcnJvcihfZXJyb3IsIFwiQ2FwdGlvblwiKS5sb2coKVxuXG4gICAgICAgICMgdmFsdWUgY29tcGFyYXRvclxuICAgICAgICBjb21wYXJhdG9yOiBGdW5jdGlvbi5GQUxTRVxuXG4gICAgIyBwYXRjaGVzIGVudGl0eSB0eXBlIGF0dGFjaGVkIHRvXG4gICAgbWl4aW46IChfc3VwZXIpIC0+XG4gICAgICAgIGdldENhcHRpb25FbHQ6ICAtPiBAY2FwdGlvbkVsdCBvciBAXG4gICAgXG4gICAgICAgIGdldENhcHRpb25IdG1sOiAodiwgZXYpIC0+ICAoKGlmIChpY29uID0gQHByb3AgJ2ljb24nKSB0aGVuICc8aSBjbGFzcz1cImljb24tI3tpY29ufVwiPjwvaT4gJyBlbHNlIFwiXCIpKSArIFN0cmluZy5sb2NhbGl6ZSh2LCBldi5xdWFudGl0eSlcblxuXG4jIEBkZWZpbmUgVGhlIFtodG1sXSBwcm9wZXJ0eS5cbk9iamVjdC5lbnRpdHkuZGVmaW5lUHJvcGVydHkgIFxuICAgIGlkOiBcIkh0bWxcIiBcbiAgICBtZXRob2RzOihfc3VwZXIpIC0+XG4gICAgICAgIFxuICAgICAgICAjIFNldHMgcHJvcGVydHkgdmFsdWUgYXN5bmNseS5cbiAgICAgICAgc2V0VmFsdWVBc3luYzogKFQsIGV2LCBhc3luY1VybCkgLT5cbiAgICAgICAgICAgIEBzZXR0ZXIgVCwgKFQuYXN5bmNQbGFjZWhvbGRlciBvciBudWxsKSwgZXZcbiAgICAgICAgICAgIF9zdXBlci5zZXRBc3luY1ZhbHVlLmNhbGwgdGhpcywgVCwgZXYsIGFzeW5jVXJsXG4gICAgXG4gICAgICAgIGdldHRlcjogKFQpIC0+IFQuY29udGVudE5vZGU/LmlubmVySFRNTFxuICAgIFxuICAgICAgICAjIHNldHRlclxuICAgICAgICBzZXR0ZXI6IChULCB2PVwiPGRpdj4mbmJzcDs8L2Rpdj5cIikgLT5cbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgdi5lcnJvciBpZiB2Py5lcnJvclxuICAgICAgICAgICAgICAgICAgICBULmNvbnRlbnROb2RlLmlubmVySFRNTCA9IHZcbiAgICAgICAgICAgICAgICBjYXRjaCBcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gU3RyaW5nLmxvY2FsaXplKFwiaHRtbF9lcnJvclwiKStcIjogXCIgKyBfZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICBULmNvbnRlbnROb2RlLmlubmVySFRNTCA9IFwiPGRpdiBzdHlsZT0nY29sb3I6cmVkOyc+I3ttc2d9PC9kaXY+XCJcblxuIyBAZGVmaW5lIFVJIFtkaXNhYmxlZF0gUHJvcGVydHlcbk9iamVjdC5lbnRpdHkuZGVmaW5lUHJvcGVydHkgIFxuICAgIGlkOiBcIkRpc2FibGVkXCJcbiAgICBtZXRob2RzOiAtPlxuICAgIFxuICAgICAgICAjIHNldHRlclxuICAgICAgICBzZXR0ZXI6IChULCB2KSAtPiBULl9zdGF0ZVtAaWRdID0gISF2ICMgbmFycm93IHRvIGJvb2xlYW5cblxuICAgICAgICAjIHZhbHVlIGNvbXBhcmF0b3JcbiAgICAgICAgY29tcGFyYXRvcjogKGEsIGIpIC0+ICFhIGlzICFiICMgY29tcGFyZXMgYXMgYm9vbGVhblxuXG4gICAgIyBwYXRjaGVzIGVudGl0eSB0eXBlIGF0dGFjaGVkIHRvXG4gICAgbWl4aW46KF9zdXBlcikgLT5cbiAgICAgICAgXG4gICAgICAgIGRpc2FibGVkQ2hhbmdlZDogKGV2LCB2KSAtPlxuICAgICAgICAgICAgQGRvbU5vZGUuZGlzYWJsZWQgPSAoaWYgdiB0aGVuIFwiZGlzYWJsZWRcIiBlbHNlIFwiXCIpXG4gICAgICAgICAgICBAdG9nZ2xlRG9tTm9kZUNsYXNzIFwiZGlzYWJsZWRcIiwgdlxuXG4jIyNcbkJhc2ljIERvbSBVSSB2aWV3cy5cbiMjI1xuXG4jIGVudGl0eSBVSSBbdmlld10gZW50aXR5IHR5cGUuIFxuIyBUaGlzIGlzIHJvb3QgZW50aXR5IHR5cGUgZm9yIGFsbCBvdGhlciB0eXBlcyBvZiBVSSB2aWV3cy5cbiMgSXQganVzdCBhdHRhY2hlcyB0aHJlZSBjb3JlIFVJIHByb3BlcnRpZXM6IFtkb21Ob2RlXSwgW3N0eWxlXSBhbmQgW2hpZGRlbl0uXG5PYmplY3QuZW50aXR5LmRlZmluZSBcbiAgICBpZDpcIlZpZXdcIlxuICAgIHByb3BlcnRpZXM6IFtcImRvbU5vZGU6Tm9kZVwiLFwic3R5bGU6U3R5bGVcIixcImhpZGRlbjpIaWRkZW5cIl1cblxuIyBlbnRpdHkgVUkgW2JveF0gZW50aXR5IHR5cGUuIFxuIyBTaW1wbGVzdCBVSSBjb250YWluZXIuIFxuIyBJdCBqdXN0IGV4dGVuZCAgW3ZpZXddIGVudGl0eSB0eXBlIHdpdGggW2NoaWxkcmVuXSBwcm9wZXJ0eS5cbk9iamVjdC5lbnRpdHkuZGVmaW5lXG4gICAgaWQ6IFwiQm94IGV4dGVuZHMgVmlld1wiLFxuICAgIHByb3BlcnRpZXM6IFtcImNoaWxkcmVuOkNoaWxkcmVuXCJdXG5cbiMgQGRlZmluZSBVSSBodG1sIHZpZXcuXG5PYmplY3QuZW50aXR5LmRlZmluZSAgXG4gICAgaWQ6IFwiSHRtbCBleHRlbmRzIFZpZXdcIixcbiAgICBwcm9wZXJ0aWVzOiBbXCJodG1sOkh0bWxcIl1cblxuIyBAZGVmaW5lIFVJIGh0bWwgdmlldy5cbk9iamVjdC5lbnRpdHkuZGVmaW5lICBcbiAgICBpZDogXCJXaWRnZXQgZXh0ZW5kcyBWaWV3XCIsXG4gICAgcHJvcGVydGllczogW1wiaHRtbDpIdG1sXCIsXCJkYXRhXCIsXCJ0ZW1wbGF0ZVwiXVxuICAgIG1ldGhvZHM6IChfc3VwZXIpIC0+XG4gICAgICAgIHRlbXBsYXRlQ2hhbmdlZDogKGV2LCB2KSAtPiBAcmVkcmF3KClcbiAgICAgICAgXG4gICAgICAgIGRhdGFDaGFuZ2VkOiAoZXYsIHYpIC0+IEByZWRyYXcoKVxuICAgICAgICBcbiAgICAgICAgcmVkcmF3OiAoKSAtPlxuICAgICAgICAgICAgcmV0dXJuIHVubGVzcyAodG1wbD0gQHByb3AgJ3RlbXBsYXRlJykgYW5kIChkYXRhPSBAcHJvcCAnZGF0YScpXG4gICAgICAgICAgICBjdHggPSBPYmplY3QuY2xvbmUgZGF0YSwgd2luZG93LkVOVlxuICAgICAgICAgICAgQHByb3AgJ2h0bWwnLCBTdHJpbmcudGVtcGxhdGUodG1wbCwgY3R4KVxuXG4gICAgICAgIGh0bWxDaGFuZ2VkOiAtPlxuICAgICAgICAgICAgT2JqZWN0LmRvbS5pbml0IEBcblxuIyBAZGVmaW5lIFVJIGxhYmVsIHZpZXcuXG5PYmplY3QuZW50aXR5LmRlZmluZSAgXG4gICAgaWQ6IFwiTGFiZWwgZXh0ZW5kcyBkb20uVmlld1wiLFxuICAgIHByb3BlcnRpZXM6IFtcImNhcHRpb246Q2FwdGlvblwiXVxuICAgIG9wdGlvbnM6XG4gICAgICAgIGRvbU5vZGVUeXBlOiBcInNwYW5cIlxuXG5cbiMgQGRlZmluZSBVSSBidXR0b24gdmlldy5cbk9iamVjdC5lbnRpdHkuZGVmaW5lICBcblxuICAgIGlkOiBcIkJ1dHRvbiBleHRlbmRzIFZpZXdcIlxuICAgIFxuICAgIHByb3BlcnRpZXM6IFsgXCJkaXNhYmxlZDpEaXNhYmxlZFwiLCBcImNhcHRpb246Q2FwdGlvblwiLCBcImh0bWw6SHRtbFwiXVxuICAgIFxuICAgIG9wdGlvbnM6XG4gICAgICAgIGRvbU5vZGVUeXBlOiBcImJ1dHRvblwiXG4gICAgICAgIGFsaXZlOiB0cnVlXG4gICAgICAgIHN0eWxlOiBcImJ0blwiXG4gICAgICAgIFxuICAgIG1ldGhvZHM6XG4gICAgICAgIHRhcHBlZDogKGV2KSAtPlxuICAgICAgICAgICAgaWYgQGFzeW5jXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGV2ID0gQGFzeW5jKCkpXG4gICAgICAgICAgICAgICAgICAgIEBwcm9wIFwiZGlzYWJsZWRcIiwgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBAdXBkYXRlRG9tTm9kZUNsYXNzIFwidWktYnVzeVwiXG4gICAgICAgICAgICAgICAgICAgIGlmIEBidXN5Q2FwdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgQHNhdmVkQ2FwdGlvbiA9IEBwcm9wIFwiY2FwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBAcHJvcCBcImNhcHRpb25cIiwgQGJ1c3lDYXB0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgY2IgPSBldi5jYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZmlyZSBldiwgKGV2KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgY2I/LmFwcGx5KEAsIGFyZ3VtZW50cylcbiAgICAgICAgICAgICAgICAgICAgICAgIEB1cGRhdGVEb21Ob2RlQ2xhc3MgXCIhdWktYnVzeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBAcHJvcCBcImRpc2FibGVkXCIsIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBAc2F2ZWRDYXB0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQHByb3AgXCJjYXB0aW9uXCIsIEBzYXZlZENhcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAc2F2ZWRDYXB0aW9uID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGVsc2UgaWYgQGFjdGlvblxuICAgICAgICAgICAgICAgIEBwcm9wIFwiZGlzYWJsZWRcIiwgdHJ1ZVxuICAgICAgICAgICAgICAgIEB1cGRhdGVEb21Ob2RlQ2xhc3MgXCJ1aS1idXN5XCJcbiAgICAgICAgICAgICAgICBAYWN0aW9uIGV2XG4gICAgICAgICAgICAgICAgQHVwZGF0ZURvbU5vZGVDbGFzcyBcIiF1aS1idXN5XCJcbiAgICAgICAgICAgICAgICBAcHJvcCBcImRpc2FibGVkXCIsIGZhbHNlXG5cbiMjI1xuVUkgTGlzdCB2aWV3LlxuIyMjXG5PYmplY3QuZW50aXR5LmRlZmluZSAgXG5cbiAgICBpZDogXCJMaXN0IGV4dGVuZHMgQm94XCJcbiAgICBcbiAgICBwcm9wZXJ0aWVzOiBbXCJkYXRhXCIsIFwic2VsZWN0aW9uXCIsIFwidmFsdWU6VmFsdWVcIl1cbiAgICBcbiAgICBvcHRpb25zOlxuICAgICAgICBkb21Ob2RlVHlwZTogXCJ1bFwiXG4gICAgICAgIGl0ZW1UZW1wbGF0ZTogJzxhIGhyZWY9XCIjXCI+e25hbWV9PC9hPidcbiAgICAgICAgZGF0YUlkS2V5OiBcImlkXCJcbiAgICAgICAgaXRlbURvbU5vZGVUeXBlOiBcImxpXCJcbiAgICAgICAgYWxpdmU6IHRydWVcbiAgICAgICAgXG4gICAgbWV0aG9kczogKF9zdXBlcikgLT5cblxuICAgICAgICB2YWx1ZUNoYW5nZWQ6IChldikgLT4gICBAc3luY1NlbGVjdGlvbigpXG5cbiAgICAgICAgZGF0YUNoYW5nZWQ6IChldikgLT4gQHNldENoaWxkcmVuIGV2LCA9PkBzeW5jU2VsZWN0aW9uKClcblxuICAgICAgICB0YXBwZWQ6IChldikgLT5cbiAgICAgICAgICAgIHcgPSBldi5lbnRpdHlcbiAgICAgICAgICAgIHdoaWxlIHcgYW5kICh3IGlzbnQgQClcbiAgICAgICAgICAgICAgICBpZiAody5kb21Ob2RlVHlwZSBpcyBAaXRlbURvbU5vZGVUeXBlKSBhbmQgdy52YWx1ZVxuICAgICAgICAgICAgICAgICAgICBAc2V0VmFsdWUgdy52YWx1ZVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIHcgPSB3LnBhcmVudEVudGl0eVxuICAgICAgICAgICAgd1xuXG4gICAgICAgIHN5bmNTZWxlY3Rpb246IC0+XG4gICAgICAgICAgICB2YWw9IEBwcm9wICd2YWx1ZSdcbiAgICAgICAgICAgIGZvciB3IGluIEBnZXRDaGlsZHJlbigpXG4gICAgICAgICAgICAgICAgaWYgdy5wcm9wICd2YWx1ZScgaXMgdmFsXG4gICAgICAgICAgICAgICAgICAgIEBwcm9wIFwic2VsZWN0aW9uXCIsIHdcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB3XG5cbiAgICAgICAgc2VsZWN0aW9uQ2hhbmdlZDogKGV2KSAtPlxuICAgICAgICAgICAgZXYub2xkVmFsdWU/LmRvbU5vZGVDbGFzcyhcIiFhY3RpdmVcIilcbiAgICAgICAgICAgIGV2LnZhbHVlPy5kb21Ob2RlQ2xhc3MoXCJhY3RpdmVcIilcblxuICAgICAgICBjaGlsZHJlbkFkYXB0ZXI6IChkYXRhKSAtPiAgQGNoaWxkcmVuSXRlbUFkYXB0ZXIoZGF0dW0sIGkpIGZvciBkYXR1bSwgaSBpbiBkYXRhXG5cbiAgICAgICAgY2hpbGRyZW5JdGVtQWRhcHRlcjogKGRhdHVtLCBpKSAtPlxuICAgICAgICAgICAgaWQ6IFwiaHRtbFwiXG4gICAgICAgICAgICBkb21Ob2RlVHlwZTogQGl0ZW1Eb21Ob2RlVHlwZVxuICAgICAgICAgICAgc3R5bGU6IEBpdGVtU3R5bGVcbiAgICAgICAgICAgIGh0bWw6IFN0cmluZy5mb3JtYXRXaXRoTWFwKEBpdGVtVGVtcGxhdGUsIGRhdHVtKVxuICAgICAgICAgICAgdmFsdWU6IGRhdHVtW0BkYXRhSWRLZXldXG4gICAgICAgICAgICBkYXR1bTogZGF0dW1cbiAgICBcblxuIyMjXG5IdHRwU2VydmljZS5cbiMjI1xuT2JqZWN0LmVudGl0eS5kZWZpbmUgIFxuXG4gICAgaWQ6IFwiSHR0cFNlcnZpY2UgZXh0ZW5kcyBFdmVudEhhbmRsZXJcIlxuXG4gICAgbWV0aG9kczogKF9zdXBlcikgLT4gICAgXG5cbiAgICAgICAgIyBNSU1FIHR5cGUgYnkgZXh0ZW5zaW9uIHJlZ2lzdHJ5LiBVc2VkIGZvciBYSFIuXG4gICAgICAgIE1JTUUgPVxuICAgICAgICAgICAganNvbjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIGpzOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgaHRtbDogXCJ0ZXh0L2h0bWxcIlxuICAgICAgICAgICAgdHh0OiBcInRleHQvcGxhaW5cIlxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICMgUGFyc2VycyBmb3IgZ2l2ZW4gcmVzb3VyY2UgdHlwZVxuICAgICAgICBQQVJTRVJTID1cbiAgICAgICAgICAgIGpzOiBPYmplY3QucGFyc2VcbiAgICAgICAgICAgIGpzb246IE9iamVjdC5wYXJzZVxuICAgICAgICAgICAgdXJpOiBPYmplY3QucGFyc2VVcmlcbiAgICAgICAgXG4gICAgICAgIF9uZXdSZXF1ZXN0ID0gLT5cbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgIG5ldyB3aW5kb3dbXCJYTUxIdHRwUmVxdWVzdFwiXSgpXG4gICAgICAgICAgICBjYXRjaCBcbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIilcbiAgICBcbiAgICAgICAgX2Vycm9yID0gKHN0LCB0ZXh0LCBldikgLT5cbiAgICAgICAgICAgIChpZiAobm90IHN0IG9yIChzdCA+PSAyMDAgYW5kIHN0IDwgMzAwKSBvciAoc3QgaXMgMzA0KSkgdGhlbiBudWxsIGVsc2VcbiAgICAgICAgICAgICAgICByZWFzb246IFwiaHR0cF90cmFuc3BvcnRcIlxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUmVtb3RlIGVycm9yOiBjb2RlICN7c3R9LiBcIiArIGV2LnVyaSsnXFxuJyArICh0ZXh0IG9yICcnKVxuICAgICAgICAgICAgICAgIGNvZGU6IHN0XG4gICAgICAgICAgICApXG4gICAgXG4gICAgICAgIF9uZWdvdGlhdGVSZXN1bHRUeXBlID0gKHUpIC0+XG4gICAgICAgICAgICB1cmxJZCA9IHUucGF0aFstMS4uXVswXVxuICAgICAgICAgICAgciA9IFwianNcIlxuICAgICAgICAgICAgciA9IHVybElkW3AgKyAxLi5dIGlmIHVybElkIGFuZCAocCA9IHVybElkLmxhc3RJbmRleE9mKFwiLlwiKSkgPiAtMVxuICAgICAgICAgICAgclxuICAgICAgICAgICAgXG4gICAgICAgICMgY3JlYXRlcyBFdmVudCBoYW5kbGVyIGltcGxlbWVudGF0aW9uXG4gICAgICAgIGNyZWF0ZUV2ZW50SGFuZGxlckltcGw6IC0+XG4gICAgICAgICAgICAoZXYpIC0+XG4gICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgIHJxID0gX25ld1JlcXVlc3QoKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZXYudXJpLmRvbWFpbiA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSBpZiBldi51cmkuZG9tYWluIGlzICcqJ1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZXYudXJpLnR5cGUgPSBpZiBldi51cmkucGFyYW1zLnNzbCB0aGVuICdodHRwcycgZWxzZSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2xbMC4uLTJdXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IGV2LmRhdGFUeXBlIG9yIF9uZWdvdGlhdGVSZXN1bHRUeXBlKGV2LnVyaSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJxLm9wZW4gZXYubWV0aG9kIG9yICgoaWYgZXYucGF5bG9hZCB0aGVuIFwiUE9TVFwiIGVsc2UgXCJHRVRcIikpLCBcIlwiICsgZXYudXJpLCB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHJxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IC0+XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQHJlYWR5U3RhdGUgaXMgNCkgYW5kIChub3QgZXYuY29tcGxldGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2LmNvbXBsZXRlZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAb25yZWFkeXN0YXRlY2hhbmdlID0gRnVuY3Rpb24uTk9ORVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2LmNhbGxiYWNrIF9lcnJvcihAc3RhdHVzLCBAc3RhdHVzVGV4dCwgZXYpLCAoZXYudW5tYXJzaGFsbGVyIG9yIFBBUlNFUlNbZGF0YVR5cGVdIG9yIEZ1bmN0aW9uLk5PTkUpKEByZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IE9iamVjdC51cGRhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBBY2NlcHQ6IE1JTUVbZGF0YVR5cGVdIG9yIFwiKlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBMYW5ndWFnZTogU3RyaW5nLkxBTkdVQUdFXG4gICAgICAgICAgICAgICAgICAgICwgZXYuaGVhZGVycylcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJxLnNldFJlcXVlc3RIZWFkZXIgaCwgdiBmb3IgaCwgdiBvZiBoZWFkZXJzIHdoZW4gdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiBldi5wYXlsb2FkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB0eXBlb2YgKGV2LnBheWxvYWQpIGlzIFwib2JqZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBycS5zZXRSZXF1ZXN0SGVhZGVyIFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldi5wYXlsb2FkID0gSlNPTi5zdHJpbmdpZnkoZXYucGF5bG9hZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJxLnNlbmQgZXYucGF5bG9hZFxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBycS5zZW5kIG51bGxcbiAgICAgICAgICAgICAgICBjYXRjaCBcbiAgICAgICAgICAgICAgICAgICAgZXYuY2FsbGJhY2sgT2JqZWN0LmVycm9yKF9lcnJvciwgXCJyZW1vdGVfZXJyb3I6XCIgKyBldi51cmkpLmxvZygpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIFxuT2JqZWN0LmVudGl0eS5kZWZpbmUgIFxuXG4gICAgaWQ6IFwiU2NyaXB0U2VydmljZSBleHRlbmRzIEV2ZW50SGFuZGxlclwiXG4gICAgXG4gICAgbWV0aG9kczogKF9zdXBlcikgLT5cbiAgICAgICAgXG4gICAgICAgIHJlZ2lzdHJ5ID0gd2luZG93Ll9KU09OUCA9IHt9XG4gICAgICAgIGNvdW50ZXIgPSAgMFxuICAgICAgICBfZG9jID0gd2luZG93LmRvY3VtZW50XG4gICAgICAgIGlzSUU4ID0gISFfZG9jLmFsbFxuICAgICAgICBcbiAgICAgICAgb25sb2FkanMgPSAobXNnKSAtPlxuICAgICAgICAgICAganMgPSBtc2cudGFnXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMgSUU4IGhhY2s6IG9ubG9hZCBldmVudCBmb3Igc2NyaXB0c1xuICAgICAgICAgICAgaWYgaXNJRThcbiAgICAgICAgICAgICAgICBqcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAtPlxuICAgICAgICAgICAgICAgICAgICBpZiBqcy5yZWFkeVN0YXRlIGlzIFwibG9hZGVkXCIgb3IganMucmVhZHlTdGF0ZSBpcyBcImNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZy5mdW5jKClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgIyBtb3N0IGJyb3dzZXJzXG4gICAgICAgICAgICAgICAganMub25sb2FkID0gbXNnLmZ1bmNcbiAgICAgICAgICAgICAgICBqcy5vbmVycm9yID0gbXNnLmVycmZuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgXG4gICAgICAgIF9jcmVhdGVTY3JpcHRUYWcgPSAoYXR0cnMpIC0+XG4gICAgICAgICAgICBlID0gX2RvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXG4gICAgICAgICAgICBlLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiXG4gICAgICAgICAgICBlLmNoYXJzZXQgPSBcInV0Zi04XCJcbiAgICAgICAgICAgIE9iamVjdC51cGRhdGUgZSwgYXR0cnNcbiAgICAgICAgICAgIGVcbiAgICAgICAgICAgIFxuICAgICAgICAjIGNyZWF0ZXMgRXZlbnQgaGFuZGxlciBpbXBsZW1lbnRhdGlvblxuICAgICAgICBjcmVhdGVFdmVudEhhbmRsZXJJbXBsOiAtPlxuICAgICAgICAgICAgKGV2KSAtPlxuICAgICAgICAgICAgICAgIHNjcmlwdCA9IF9jcmVhdGVTY3JpcHRUYWcgZXYuc2NyaXB0QXR0cnNcbiAgICAgICAgICAgICAgICBzY3JpcHQuYXN5bmMgPSBcImFzeW5jXCIgdW5sZXNzIGV2Lm5vQXN5bk1vZGVcbiAgICAgICAgICAgICAgICBzY3JpcHQuaWQgPSBldi5zY3JpcHRJZCBpZiBldi5zY3JpcHRJZFxuICAgIFxuICAgICAgICAgICAgICAgIHUgPSBldi51cmlcbiAgICAgICAgICAgICAgICB1LnR5cGUgPSBcImh0dHBcIiBpZiB1LnR5cGUgaXMgXCJzY3JpcHRcIlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIEBqc29ucFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzaWQgPSBcIm5cIiArIGNvdW50ZXIrK1xuICAgICAgICAgICAgICAgICAgICB1LnBhcmFtc1t1LnBhcmFtcy5qc29ucCBvciBcImNhbGxiYWNrXCJdID0gZXNjYXBlKFwid2luZG93Ll9KU09OUC4je3NpZH1cIilcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnlbc2lkXSA9IChyKSAtPiBldi5jYWxsYmFjaz8gbnVsbCwgclxuICAgICAgICAgICAgICAgICAgICBvayA9IC0+XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCBzY3JpcHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZWdpc3RyeVtzaWRdXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgb2sgPSAtPiBldi5jYWxsYmFjaz8gbnVsbCwgbnVsbCwgdGhpc1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9ubG9hZGpzIFxuICAgICAgICAgICAgICAgICAgICB0YWc6c2NyaXB0XG4gICAgICAgICAgICAgICAgICAgIG9rOiBva1xuICAgICAgICAgICAgICAgICAgICBlcnI6IC0+IGV2LmNhbGxiYWNrIE9iamVjdC5lcnJvcihcInJlbW90ZV9lcnJvclwiLCBcIkpTT05QIHNjcmlwdCBlcnJvcjogI3t1fVwiKVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBzY3JpcHQuc3JjID0gXCJcIiArIHVcbiAgICAgICAgICAgICAgICBPYmplY3QuZG9tLmFwcGVuZFRvSGVhZCBzY3JpcHRcbiAgICAgICAgXG5cbk9iamVjdC5lbnRpdHkuZGVmaW5lXG4gICAgaWQgOiAnQXBwbGljYXRpb24nIFxuICAgIHByb3BlcnRpZXMgOiBbJ3RpdGxlJywgJ3BhZ2UnLCAnaW5kZXgnXVxuXG4gICAgbWV0aG9kcyA6IChfc3VwZXIpIC0+XG5cbiAgICAgICAgdGl0bGVDaGFuZ2VkOiAoZXYsIHYpLT5cbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC50aXRsZSA9IHZcbiAgICAgICAgXG4gICAgICAgIGRhdGFDaGFuZ2VkOiAoZXYsIGRhdGEpLT5cbiAgICAgICAgICAgIF9zdXBlci5kYXRhQ2hhbmdlZC5jYWxsIEAsIGV2LCBkYXRhXG4gICAgICAgICAgICBAcHJvcCAndGl0bGUnLCAoRU5WLlRJVExFIG9yICctJylcbiAgICAgICAgICAgIFxuICAgICAgICBuYXZpZ2F0ZTogKGgpLT5cbiAgICAgICAgICAgIHJldHVybiB1bmxlc3MgaFxuICAgICAgICAgICAgaGFzaGVzID0gaC5zcGxpdCAnLSdcbiAgICAgICAgICAgIEBwcm9wICdwYWdlJywgaGFzaGVzWzBdXG4gICAgICAgICAgICBAcHJvcCAnaW5kZXgnLCAoaGFzaGVzWzFdIG9yIFwiXCIpXG5cbiAgICAgICAgaW5pdDogLT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQVBQID0gQFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBDT0RFX01BUFBJTkcgPSBAX29wdGlvbnMuY29kZU1hcCBvciB7fVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBPYmplY3QuZW50aXR5LmNyZWF0ZVxuICAgICAgICAgICAgICAgIGlkOiBcInJlbW90ZTpIdHRwU2VydmljZVwiXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIE9iamVjdC5lbnRpdHkuY3JlYXRlXG4gICAgICAgICAgICAgICAgaWQ6IFwic2V0dGluZzpWYWx1ZVN0b3JhZ2VcIlxuICAgICAgICAgICAgICAgIG9wdGlvbnM6XG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2U6IHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgT2JqZWN0LmVudGl0eS5jcmVhdGVcbiAgICAgICAgICAgICAgICBpZDogXCJodG1sOkV2ZW50SGFuZGxlclwiICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtZXRob2RzIDogKF9zdXBlcikgLT5cbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRXZlbnQ6IChldikgLT4gXG4gICAgICAgICAgICAgICAgICAgICAgICBldi51cmkgPSBPYmplY3QuVXJpLnBhcnNlKFwicmVtb3RlOi8vKi9odG1sLyN7ZXYudXJpLmRvbWFpbn0uaHRtbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmZpcmUgZXZcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgT2JqZWN0LmVudGl0eS5jcmVhdGVcbiAgICAgICAgICAgICAgICBpZDogXCJlbnRpdHk6Q29kZUxvYWRlclwiXG4gICAgICAgICAgICAgICAgbWV0aG9kcyA6IChfc3VwZXIpIC0+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlVXJpOiAodXJpKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG0gPSBDT0RFX01BUFBJTkdbaWQgPSB1cmkuZG9tYWluXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gT2JqZWN0LnVyaS5wYXJzZShtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIG0uZG9tZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gbS5wYXRoWzBdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVtb3RlOi8vKi9qcy8je2lkLnJlcGxhY2UoJy4nLCcvJyl9LmpzP3Y9I3tAZ2V0VmVyc2lvbigpfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIF9zdXBlci5pbml0LmNhbGwgQFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjaG9vayBvbiBoYXNoIGNoYW5nZWRcbiAgICAgICAgICAgICh3aW5kb3cub25oYXNoY2hhbmdlID0gPT4gQG5hdmlnYXRlICh3aW5kb3cubG9jYXRpb24uaGFzaFsyLi5dIG9yICdob21lJykpKClcblxuICAgICAgICAgICAgQGRvbU5vZGU9IHdpbmRvdy5kb2N1bWVudC5ib2R5XG4gICAgICAgICAgICBPYmplY3QuZG9tLmluaXQoQClcbiAgICAgICAgICAgIFxuXG4iXX0=
