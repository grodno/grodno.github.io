
/*
Axio: Web DOM API.
 */

(function() {
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
            if (T.stylePressed) {
              T.updateClass(T.stylePressed);
            }
            T.touchBegin && T.touchBegin(ev);
            break;
          case "mouseup":
            T.touchEnd && T.touchEnd(ev);
            if (T.stylePressed) {
              T.updateClass("!" + T.stylePressed);
            }
            break;
          case "click":
            T.tapped && T.tapped(ev);
            break;
          case "mousemove":
            T.mouseMove && T.mouseMove(ev);
            break;
          case "mouseover":
            if (T.styleHovered) {
              T.updateClass(T.styleHovered);
            }
            T.mouseOver && T.mouseOver(ev);
            break;
          case "mouseout":
            T.mouseOut && T.mouseOut(ev);
            if (T.styleHovered) {
              T.updateClass("!" + T.styleHovered);
            }
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
      listenTapped: function(T) {
        return this.listenEvents(T, ['click'], function(ev0) {
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
      stopEvent: function(e) {
        if (e = (e != null ? e.internal : void 0) || e) {
          if (typeof e.stopPropagation === "function") {
            e.stopPropagation();
          }
          e.cancelBubble = true;
          e.returnValue = false;
        }
        return false;
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
        var cl, clss, p, _i, _len;
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
                if ((p = clss.indexOf(cl.slice(1))) > -1) {
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
      initWidget: (function() {
        var handleError;
        handleError = function(err, meta) {
          var node;
          Object.error(err("wrong_widget", meta)).log();
          node = Object.dom.createElement();
          meta.domNode.appendChild(node);
          return Object.entity.create({
            typeId: "Html",
            parentView: meta.parentView,
            style: "alert-error",
            html: "Error: " + (err.message || ("can't create UI view: " + meta.id))
          });
        };
        return function(meta) {
          var elt, id, n, z, _ref;
          elt = meta.domNode;
          _ref = elt.dataset;
          for (n in _ref) {
            z = _ref[n];
            meta[n] = z;
          }
          id = elt.getAttribute("id");
          meta.id = (id ? id + ":" : "") + meta["widget"];
          return Object.entity.create(meta, function(err, obj) {
            var _ref1, _ref2;
            if (err) {
              return handleError(err, meta);
            }
            return (_ref1 = meta.parentView) != null ? (_ref2 = _ref1._subs) != null ? _ref2.push(obj) : void 0 : void 0;
          });
        };
      })()
    };
  })(this);


  /*
  Basic Dom UI properties.
   */

  Object.entity.defineProperty({
    id: "Node",
    methods: function() {
      return {
        init: function(T, defs) {
          var attrs, node, _ref, _ref1;
          if (!(node = defs.domNode)) {
            attrs = {};
            if (T.id) {
              attrs.id = T.id;
            }
            node = Object.dom.createElement(T.domNodeType, Object.update(attrs, T.domNodeAttrs));
          }
          T.domNode = T.contentNode = node;
          node.entity = T;
          if (!((_ref = node.parentNode) != null ? _ref.parentNode : void 0)) {
            if (T.domNodeNextSibling) {
              T.domNodeNextSibling.parentNode.insertBefore(node, T.domNodeNextSibling);
            } else {
              if ((_ref1 = T.parentView) != null) {
                _ref1.contentNode.appendChild(node);
              }
            }
          }
          if (T.tapped) {
            Object.dom.listenTapped(T);
          }
          return T.propertyChanged(Object.event.create({
            entity: T,
            propId: this.id,
            value: T.domNode
          }));
        },
        done: function(T) {
          var e;
          if (e = T.domNode) {
            Object.dom.removeElement(e);
            e.entity = null;
            T.domNode = null;
            return T.contentNode = null;
          }
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "Style",
    methods: function() {
      return {
        init: function(T, defs) {
          var r;
          r = T.domNode;
          if (T.css) {
            r.style.cssText += T.css;
          }
          if (defs.styleExpression) {
            Object.property.bind(T, this.id, defs.styleExpression);
          }
          return T.domNodeClass((defs.style || "") + " " + (r.className || ""));
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
            while ((p = p.parentView)) {
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
    id: "Caption",
    methods: function() {
      return {
        setter: function(T, v, ev) {
          var e, hidden;
          if (v == null) {
            v = '';
          }
          T[this.id] = v;
          e = T.getCaptionElt();
          hidden = v === "none";
          if (e) {
            e.display(!(e.hidden || hidden));
            v = T.getCaptionHtml(v, ev);
            try {
              return e.domNode.innerHTML = (hidden || !v ? "" : v);
            } catch (_error) {
              return T.error(_error, "Caption");
            }
          }
        },
        comparator: function() {
          return false;
        }
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
          return T[this.id] = !!v;
        },
        comparator: function(a, b) {
          return !a === !b;
        }
      };
    },
    mixin: function(_super) {
      return {
        init: function() {
          _super.init.call(this);
          return Object.dom.alive(this);
        },
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
    id: "Html extends View",
    properties: ["html:Html"]
  });

  Object.entity.define({
    id: "Widget extends Html",
    properties: ["data", "template"],
    methods: function(_super) {
      var _doneSubs;
      _doneSubs = function() {
        var s, _i, _len, _ref;
        if (this._subs) {
          _ref = this._subs;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            s = _ref[_i];
            s.done();
          }
        }
        return this._subs = [];
      };
      return {
        done: function() {
          _doneSubs.call(this);
          return _super.done.call(this);
        },
        htmlChanged: function() {
          var node, _i, _len, _ref, _results;
          _doneSubs.call(this);
          _ref = this.domNode.querySelectorAll("[data-widget]");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            _results.push(Object.dom.initWidget({
              domNode: node,
              parentView: this
            }));
          }
          return _results;
        },
        templateChanged: function(ev, v) {
          return this.redraw();
        },
        dataChanged: function(ev, v) {
          return this.redraw();
        },
        redraw: function() {
          var ctx, tmpl;
          if (!((tmpl = this.prop('template')) && (ctx = this.prop('data')))) {
            return;
          }
          return this.prop('html', String.template(tmpl, ctx));
        }
      };
    }
  });

  Object.entity.define({
    id: "Label extends View",
    properties: ["caption:Caption"],
    domNodeType: "span"
  });

  Object.entity.define({
    id: "Button extends View",
    properties: ["disabled:Disabled", "caption:Caption", 'counter'],
    domNodeType: "button",
    counter: 0,
    methods: function(_super) {
      return {
        tapped: function(ev) {
          this.prop("disabled", true);
          if (ev = this.createAsyncEvent()) {
            this.domNodeClass("ui-busy");
            if (this.busyCaption) {
              this.savedCaption = this.prop("caption");
              this.prop("caption", this.busyCaption);
            }
            return Object.event.fire(ev, (function(_this) {
              return function(err, result) {
                if (typeof ev.callback === "function") {
                  ev.callback(err, result);
                }
                if (!err) {
                  _this.incrementCounter();
                }
                _this.domNodeClass("!ui-busy");
                _this.prop("disabled", false);
                if (_this.savedCaption) {
                  _this.prop("caption", _this.savedCaption);
                  return _this.savedCaption = null;
                }
              };
            })(this));
          } else {
            this.incrementCounter();
            return Function.nextTick((function(_this) {
              return function() {
                return _this.prop("disabled", false);
              };
            })(this));
          }
        },
        createAsyncEvent: function() {
          if (this.action) {
            return {
              uri: this.action
            };
          } else {
            return null;
          }
        },
        incrementCounter: function() {
          return this.prop('counter', (this.prop('counter')) + 1);
        },
        counterChanged: function() {
          return this.prop('odd', !(this.prop('odd')));
        }
      };
    }
  });

  Object.entity.defineProperty({
    id: "Children",
    methods: function(_super) {
      var _child;
      _child = function(e, cb) {
        if (typeof e === "string") {
          e = Object.entity.create.parseMeta(e);
        }
        e = Object.update({
          id: "box",
          parentView: this
        }, e);
        return Object.entity.create(e, cb);
      };
      return {
        createAsyncValueCallback: function(T) {
          return (function(_this) {
            return function(err, value) {
              if (!T._done) {
                T.domNodeClass("!ui-busy");
                return T.prop(_this.id, T.childrenAsyncAdapter(err, value));
              }
            };
          })(this);
        },
        setValueForUri: function(T, url) {
          T.domNodeClass("ui-busy");
          return _super.setValueForUri.call(this, T, url);
        },
        setValue: function(T, ev) {
          if (!(ev != null ? ev.isEvent : void 0)) {
            ev = Object.event.create({
              value: ev
            });
          }
          if (ev.uri) {
            this.setValueForUri(T, ev.uri);
          }
          return Function.perform(T, function(flow) {
            return [
              function() {
                var ch, e, meta, _add, _i, _len;
                meta = this.childrenAdapter(ev.value, ev);
                if (!ev.noReset) {
                  this.removeAllChildren();
                }
                ch = this.getChildren();
                _add = (function(_this) {
                  return function(e) {
                    var cb, pos;
                    pos = ch.length;
                    ch.push(null);
                    cb = flow.wait();
                    return _child.call(_this, e, function(err, e) {
                      ch[pos] = e;
                      return cb(err, e);
                    });
                  };
                })(this);
                if (meta) {
                  for (_i = 0, _len = meta.length; _i < _len; _i++) {
                    e = meta[_i];
                    if (e) {
                      _add.call(this, e);
                    }
                  }
                }
                return flow.next();
              }, function() {
                var e, i, v;
                v = (function() {
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
                return this.childrenChanged({
                  value: v
                }, v);
              }
            ];
          });
        },
        done: function(T) {
          T.removeAllChildren();
          return _super.done.call(this, T);
        }
      };
    },
    mixin: function(_super) {
      return {
        createChild: function(e, cb) {
          return _child.call(this, e, (function(_this) {
            return function(err, e) {
              var ch;
              ch = _this.getChildren();
              ch.push(e);
              if (typeof _this.childrenChanged === "function") {
                _this.childrenChanged({
                  value: ch
                }, ch);
              }
              return typeof cb === "function" ? cb(err, e) : void 0;
            };
          })(this));
        },
        childrenAdapter: function(x) {
          return x;
        },
        childrenChanged: function(ev, v) {
          return ev;
        },
        getChildren: function() {
          return this._children || (this._children = []);
        },
        removeAllChildren: function() {
          var e, _i, _len, _ref;
          if (this._children) {
            _ref = this._children;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              e = _ref[_i];
              e.done();
            }
          }
          return this._children = [];
        },
        setChildren: function(meta) {
          return this.prop("children", meta);
        },
        childrenAsyncAdapter: function(err, value) {
          if (err) {
            return {
              id: "Html",
              html: String.localize(err.reason || "unknown_error")
            };
          } else {
            return value;
          }
        }
      };
    }
  });

  Object.entity.define({
    id: "Box extends View",
    properties: ["children:Children"]
  });


  /*
  UI List view.
   */

  Object.entity.define({
    id: "List extends View",
    properties: ["children:Children", 'itemTemplate', "data", "selection", "value:Value"],
    style: 'list-group',
    domNodeType: 'ul',
    itemType: 'Widget',
    itemStyle: 'list-group-item',
    itemTemplate: '<a href="#" onclick="return false;">{{name}}</a>',
    dataIdKey: 'id',
    itemDomNodeType: 'li',
    asyncDataPropertyName: null,
    itemActiveStyle: 'active',
    methods: function(_super) {
      var _reg;
      _reg = function(data, key, r) {
        var e, val, _i, _len;
        if (r == null) {
          r = {};
        }
        if (data) {
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            e = data[_i];
            if (val = e[key] || (e[key] = Object.math.uuid())) {
              r[val] = e;
            }
          }
        }
        return r;
      };
      return {
        dataAsyncAdapter: function(err, data) {
          if (err) {
            return 0;
          } else {
            return data;
          }
        },
        valueChanged: function(ev, value) {
          var _ref;
          this.prop('datum', (_ref = this.dataRegistry) != null ? _ref[value] : void 0);
          return this.syncSelection();
        },
        itemTemplateChanged: function(ev, template) {
          var ch, key, _ref, _results;
          _ref = this.childrenRegistry;
          _results = [];
          for (key in _ref) {
            ch = _ref[key];
            _results.push(ch.prop('template', template));
          }
          return _results;
        },
        childrenChanged: function(ev) {
          this.childrenRegistry = _reg(this.getChildren(), 'value');
          return this.syncSelection();
        },
        dataChanged: function(ev, data) {
          var val;
          if (data) {
            this.prop('dataCount', data.length);
          } else {
            this.prop('dataCount', data === null ? -1 : -2);
            data = [];
          }
          this.dataRegistry = _reg(data, this.dataIdKey);
          this.childrenRegistry = {};
          this.setChildren(ev);
          if (this.dataCount >= 0 && (val = this.getValue()) && !this.dataRegistry[val]) {
            return this.prop("value", null);
          }
        },
        syncSelection: function() {
          var _ref;
          return this.prop("selection", (_ref = this.childrenRegistry) != null ? _ref[this.getValue()] : void 0);
        },
        selectionChanged: function(ev) {
          var _ref, _ref1;
          if ((_ref = ev.oldValue) != null) {
            _ref.domNodeClass('!' + this.itemActiveStyle);
          }
          return (_ref1 = ev.value) != null ? _ref1.domNodeClass(this.itemActiveStyle) : void 0;
        },
        childrenAdapter: function(data, ev) {
          var datum, i, meta, _i, _len, _results;
          if (!data) {
            return [];
          }
          _results = [];
          for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
            datum = data[i];
            meta = this.childrenItemAdapter(datum, i);
            meta.domNodeNextSibling = typeof lastNode !== "undefined" && lastNode !== null ? lastNode.nextSibling : void 0;
            _results.push(meta);
          }
          return _results;
        },
        childrenItemAdapter: function(d, i, nextNode) {
          return {
            id: this.itemType,
            domNodeType: this.itemDomNodeType,
            style: this.itemStyle,
            template: this.itemTemplate,
            value: d[this.dataIdKey],
            data: d
          };
        },
        tapped: function(ev) {
          var v, w, _ref;
          w = ev.entity;
          while (w && (w !== this)) {
            if ((v = w.value) && ((_ref = this.childrenRegistry) != null ? _ref[v] : void 0)) {
              this.setValue(v);
              break;
            }
            w = w.parentView;
          }
          return w;
        }
      };
    }
  });


  /*
  UI D3 List view.
   */

  Object.entity.define({
    id: "D3List extends List",
    properties: ["delta"],
    methods: function(_super) {
      var _reg;
      _reg = function(data, key, r) {
        var e, val, _i, _len;
        if (r == null) {
          r = {};
        }
        if (data) {
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            e = data[_i];
            if (val = e[key]) {
              r[val] = e;
            }
          }
        }
        return r;
      };
      return {
        dataChanged: function(ev, data) {
          var val;
          ev.noReset = true;
          if (data) {
            this.prop('dataCount', data.length);
          } else {
            this.prop('dataCount', data === null ? -1 : -2);
            return;
          }
          this.dataRegistry = _reg(data, this.dataIdKey);
          this.childrenRegistry = {};
          this.setChildren(ev);
          if ((val = this.getValue()) && !this.dataRegistry[val]) {
            return this.prop("value", null);
          }
        },
        deltaChanged: function(ev, data) {
          this.dataRegistry = Object.update(this.dataRegistry || {}, _reg(data, this.dataIdKey));
          ev.noReset = true;
          if (!this.childrenRegistry) {
            this.childrenRegistry = {};
          }
          return this.setChildren(ev);
        },
        childrenAdapter: function(data, ev) {
          var ch, datum, e, existing, i, id, lastNode, meta, r, _i, _j, _len, _len1;
          if (!data) {
            return [];
          }
          r = [];
          ch = this._children;
          this._children = [];
          if (ch) {
            for (_i = 0, _len = ch.length; _i < _len; _i++) {
              e = ch[_i];
              if (id = e.value) {
                if (this.dataRegistry[id]) {
                  this._children.push(e);
                  this.childrenRegistry[id] = e;
                } else {
                  e.done();
                }
              }
            }
          }
          for (i = _j = 0, _len1 = data.length; _j < _len1; i = ++_j) {
            datum = data[i];
            if ((id = datum[this.dataIdKey]) === void 0) {
              id = datum[this.dataIdKey] = Object.math.uuid();
            }
            if (existing = this.childrenRegistry[id]) {
              lastNode = existing.domNode;
              this.updateChild(existing, datum);
            } else {
              meta = this.childrenItemAdapter(datum, i);
              meta.domNodeNextSibling = lastNode != null ? lastNode.nextSibling : void 0;
              r.push(meta);
            }
          }
          return r;
        },
        updateChild: function(e, d) {
          return e.prop('data', Object.event.create({
            value: d,
            force: true
          }));
        }
      };
    }
  });

}).call(this);
