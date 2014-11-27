(function() {
  var Lexion,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty;

  Lexion = (function() {
    function Lexion(opts) {
      this.attrs = {};
      this.flags = {};
      Object.update(this, opts);
      if (this.kind) {
        this.flags[this.kind] = 1;
      }
      if (this.parent) {
        this.parent.addLast(this);
      }
    }

    Lexion.prototype.isMatched = (function() {
      var isMatchedAny, match;
      match = function(cl) {
        var c0, _ref;
        c0 = cl[0];
        if (c0 === "#") {
          if (this.text !== cl.slice(1)) {
            return false;
          }
        } else if (c0 === "@") {
          cl = cl.slice(1).split('.');
          if (!this[cl[0]].apply(this, cl.slice(1))) {
            return false;
          }
        } else if (cl === "]") {
          if ((_ref = this.next) != null ? _ref.flags.space : void 0) {
            return false;
          }
        } else {
          if (!this.flags[cl]) {
            return false;
          }
        }
        return true;
      };
      isMatchedAny = function(delta) {
        var cl, _i, _len;
        if (!delta) {
          return false;
        }
        for (_i = 0, _len = delta.length; _i < _len; _i++) {
          cl = delta[_i];
          if (cl[0] === "!") {
            if (!match.call(this, cl.slice(1))) {
              return true;
            }
          } else {
            if (match.call(this, cl)) {
              return true;
            }
          }
        }
        return false;
      };
      return function(delta) {
        var c, ci, cl, lx, nextC, prevC, _i, _j, _k, _len, _len1, _ref;
        if (!delta || delta === '*') {
          return true;
        }
        if (__indexOf.call(delta, '<') >= 0) {
          prevC = delta.split("<");
          delta = prevC[prevC.length - 1];
        }
        if (__indexOf.call(delta, '>') >= 0) {
          nextC = delta.split(">");
          delta = nextC.shift();
        }
        if (delta && (delta !== '*')) {
          delta = delta.split(" ");
          for (_i = 0, _len = delta.length; _i < _len; _i++) {
            cl = delta[_i];
            if (cl) {
              if (__indexOf.call(cl, '+') >= 0) {
                if (cl[0] === "!") {
                  if (isMatchedAny.call(this, cl.slice(1).split("+"))) {
                    return false;
                  }
                } else {
                  if (!isMatchedAny.call(this, cl.split("+"))) {
                    return false;
                  }
                }
              } else {
                if (cl[0] === "!") {
                  if (match.call(this, cl.slice(1))) {
                    return false;
                  }
                } else {
                  if (!match.call(this, cl)) {
                    return false;
                  }
                }
              }
            }
          }
        }
        if (nextC) {
          lx = this;
          for (_j = 0, _len1 = nextC.length; _j < _len1; _j++) {
            c = nextC[_j];
            if (!((lx = lx.nextToken()) && lx.isMatched(c))) {
              return false;
            }
          }
        }
        if (prevC) {
          lx = this;
          for (ci = _k = _ref = prevC.length - 2; _ref <= 0 ? _k <= 0 : _k >= 0; ci = _ref <= 0 ? ++_k : --_k) {
            if (!((lx = lx.prevToken()) && lx.isMatched(prevC[ci]))) {
              return false;
            }
          }
        }
        return true;
      };
    })();

    Lexion.prototype.setFlags = (function() {
      var fnResolveText;
      fnResolveText = function(cl, T) {
        return cl.replace(/_/g, ' ').replace(/\$(\-?\d+)(?:\.([a-z][a-zA-Z0-9\.]*))?/g, function(s, n, method) {
          var next;
          n = +n;
          if (n === 0) {
            return T.text;
          }
          next = T;
          if (n > 0) {
            while (n--) {
              if (!(next = next.nextToken())) {
                return '';
              }
            }
          } else {
            while (n++) {
              if (!(next = next.prevToken())) {
                return '';
              }
            }
          }
          if (!method) {
            return next.getText();
          }
          method = method.split('.');
          return next != null ? next['get' + String.capitalize(method[0])].apply(next, method.slice(1)) : void 0;
        });
      };
      return function(delta, v) {
        var c, ci, cl, lx, lxx, nextC, prevC, _i, _j, _k, _len, _len1, _ref;
        if (v == null) {
          v = 1;
        }
        if (!delta) {
          return this;
        }
        if (__indexOf.call(delta, '<') >= 0) {
          prevC = delta.split("<");
          delta = prevC[prevC.length - 1];
        }
        if (__indexOf.call(delta, '>') >= 0) {
          nextC = delta.split(">");
          delta = nextC.shift();
        }
        delta = delta.split(" ");
        for (_i = 0, _len = delta.length; _i < _len; _i++) {
          cl = delta[_i];
          if (cl) {
            if (cl[0] === "!") {
              this.flags[cl.slice(1)] = 0;
            } else if (cl[0] === "#") {
              if (cl === '#') {
                this.detachMe();
              } else {
                this.text = fnResolveText(cl.slice(1), this);
              }
            } else {
              this.flags[cl] = v;
            }
          }
        }
        if (prevC) {
          lx = this.prevToken();
          for (ci = _j = _ref = prevC.length - 2; _ref <= 0 ? _j <= 0 : _j >= 0; ci = _ref <= 0 ? ++_j : --_j) {
            if (!(lx)) {
              continue;
            }
            lxx = lx.prevToken();
            lx.setFlags(prevC[ci]);
            lx = lxx;
          }
        }
        if (nextC) {
          lx = this.nextToken();
          for (_k = 0, _len1 = nextC.length; _k < _len1; _k++) {
            c = nextC[_k];
            if (!(lx)) {
              continue;
            }
            lxx = lx.nextToken();
            lx.setFlags(c);
            lx = lxx;
          }
        }
        return this;
      };
    })();

    Lexion.prototype.setAttr = function(k, v) {
      this.attrs[k] = v;
      return this;
    };

    Lexion.prototype.setText = function(v) {
      this.text = v;
      return this;
    };

    Lexion.prototype.getText = function() {
      return this.text;
    };

    Lexion.prototype.getTextSlice = function(s, e) {
      if (s == null) {
        s = 0;
      }
      if (e == null) {
        e = -1;
      }
      return this.text.slice(+s, +(+e) + 1 || 9e9);
    };

    Lexion.prototype.setTag = function(v) {
      this.tag = v;
      return this;
    };

    Lexion.prototype.numberBetween = function(s, e) {
      if (s == null) {
        s = 0;
      }
      if (e == null) {
        e = Number.MAX_VALUE;
      }
      return this.numValue > +s && this.numValue < +e;
    };

    Lexion.prototype.noNextSpace = function() {
      var _ref;
      return !((_ref = this.next) != null ? _ref.flags.space : void 0);
    };

    Lexion.prototype.addLast = function(e) {
      if (this.last) {
        (this.last.next = e).prev = this.last;
      } else {
        this.first = e;
      }
      this.last = e;
      return this;
    };

    Lexion.prototype.detachMe = function() {
      if (!this.parent) {
        return this;
      }
      if (this.next) {
        this.next.prev = this.prev;
      } else {
        this.parent.last = this.prev || null;
      }
      if (this.prev) {
        this.prev.next = this.next;
      } else {
        this.parent.first = this.next || null;
      }
      this.parent = this.prev = this.next = null;
      return this;
    };

    Lexion.prototype.addChild = function(e) {
      e.detachMe();
      (e.parent = this).addLast(e);
      return this;
    };

    Lexion.prototype.setParent = function(p) {
      this.detachMe();
      if (this.parent = p) {
        p.addLast(this);
      }
      return this;
    };

    Lexion.prototype.setNext = function(e) {
      e.detachMe();
      e.parent = this.parent;
      e.prev = this;
      e.next = this.next;
      if (this.next) {
        this.next.prev = e;
      }
      this.next = e;
      return this;
    };

    Lexion.prototype.doInBetween = function(next, op) {
      var e, i, p, pn;
      p = this.next;
      while (p && p !== next) {
        pn = p.next;
        p[op].apply(p, (function() {
          var _i, _len, _results;
          _results = [];
          for (i = _i = 0, _len = arguments.length; _i < _len; i = ++_i) {
            e = arguments[i];
            if (i > 1) {
              _results.push(e);
            }
          }
          return _results;
        }).apply(this, arguments));
        p = pn;
      }
      return this;
    };

    Lexion.prototype.mergeFrom = function() {
      var target, _i, _len;
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        target = arguments[_i];
        if (!(target)) {
          continue;
        }
        this.text += target.text;
        target.detachMe();
      }
      return this;
    };

    Lexion.prototype.eachChildInDeep = function(op) {
      var p;
      p = this.first;
      while (p) {
        p.eachChildInDeep(op);
        op.call(this, p);
        p = p.next;
      }
      return this;
    };

    Lexion.prototype.nextToken = function() {
      var next;
      next = this.next;
      while (next && next.flags.space) {
        next = next.next;
      }
      return next;
    };

    Lexion.prototype.prevToken = function() {
      var next;
      next = this.prev;
      while (next && next.flags.space) {
        next = next.prev;
      }
      return next;
    };

    Lexion.prototype.surroundWith = function(opts) {
      var p;
      p = new Lexion(opts);
      this.setNext(p).setParent(p);
      return p;
    };

    Lexion.prototype.executeRegExp = function(s, re, op) {
      var e, pastLastIndex, text;
      pastLastIndex = 0;
      while (e = re.exec(s)) {
        if (e.index && (text = s.slice(pastLastIndex, +(e.index - 1) + 1 || 9e9))) {
          op.call(this, text, null);
        }
        op.call(this, e[0], e);
        pastLastIndex = re.lastIndex;
      }
      if ((text = s.slice(pastLastIndex))) {
        op.call(this, text, null);
      }
      return this;
    };

    Lexion.prototype.parse = (function() {
      var SIGN_FLAGS, TAGS_INFO, parseAttrs, re, reAttrs, reCyr, reDigits, reLat, textOp;
      TAGS_INFO = {
        'div': {
          isContainer: true
        },
        'span': {
          isContainer: true
        },
        'p': {
          isContainer: true
        },
        'a': {
          isContainer: true,
          nonRecursive: true
        },
        'ul': {
          isContainer: true,
          nonRecursive: true
        },
        'li': {
          isContainer: true,
          nonRecursive: true
        },
        "*": {
          isContainer: false
        }
      };
      SIGN_FLAGS = {
        ' ': 'space',
        '.': 'dot',
        ',': 'comma',
        '+': 'plus',
        '-': 'minus',
        '$': 'dollar',
        '%': 'percent',
        '«': 'quote',
        '»': 'quote',
        '"': 'quote',
        '\'': 'quote',
        '*': 'asterisk'
      };
      reAttrs = /(\s+[a-z][a-z0-9\-]+)(?:=(\w+|['"]?[^>"]*['"]?))?/gi;
      parseAttrs = function(s) {
        var e, r, v;
        r = {};
        if (s) {
          while ((e = reAttrs.exec(s))) {
            v = e[2];
            r[e[1]] = v == null ? true : v[0] === '"' ? v.slice(1, -1) : v;
          }
        }
        return r;
      };
      re = /<(\/?)([a-z]{1,7})((?:\s+[a-z][a-z0-9\-]+(?:=(?:\w+|(?:['"]?[^>'"]*['"]?)))?)*)(\/?)>/gi;
      reDigits = /^\d+$/;
      reLat = /^[a-zA-Z]+$/;
      reCyr = /^[а-яА-Я]+$/;
      textOp = function(text, e) {
        var flags, opts;
        opts = {
          text: text,
          flags: flags = {},
          parent: this
        };
        if (e) {
          flags[SIGN_FLAGS[text] || 'sign'] = 1;
        } else if (text.match(reDigits)) {
          flags.number = 1;
          opts.numValue = +text;
          flags['lx' + text.length] = 1;
        } else {
          flags.word = 1;
          opts.lowerText = opts.text.toLowerCase();
          if (text.match(reLat)) {
            flags['lat'] = 1;
          } else if (text.match(reCyr)) {
            flags['cyr'] = 1;
          } else {
            flags['mixed'] = 1;
          }
          if (text.toUpperCase() === text) {
            flags['abbr'] = 1;
          }
          if (String.capitalize(text) === text) {
            flags['capital'] = 1;
          }
        }
        return new Lexion(opts);
      };
      return function() {
        var stack;
        stack = [this];
        this.executeRegExp(this.text, re, function(text, e) {
          var elt, flags, opts, tag, tagInfo;
          if (e) {
            tag = e[2].toLowerCase();
            if (e[1] === '/') {
              if (tag === stack[0].tag && stack.length > 1) {
                stack.shift();
              }
            } else {
              opts = {
                tag: tag,
                attrs: parseAttrs(e[3]),
                flags: flags = {
                  ex: 1
                },
                parent: stack[0]
              };
              elt = new Lexion(opts);
              if (e[4] === '/') {

              } else {
                tagInfo = TAGS_INFO[tag] || TAGS_INFO['*'];
                if (tagInfo.isContainer) {
                  flags.bx = 1;
                  if (tagInfo.nonRecursive && stack[0].tag === tag) {
                    stack[0] = elt;
                  } else {
                    stack.unshift(elt);
                  }
                }
              }
            }
          } else {
            stack[0].executeRegExp(text, /[^a-zа-я0-9іўё]/gi, textOp);
          }
          return elt;
        });
        return this;
      };
    })();

    Lexion.prototype.toHtml = function(ngap) {
      var attrs, f, fl, gap, inner, k, opentag, p, t, tag, v;
      if (ngap == null) {
        ngap = 0;
      }
      if (this.flags.space) {
        return ' ';
      }
      if (this.tag === 'img') {
        return ' ';
      }
      gap = '';
      attrs = ((function() {
        var _ref, _results;
        _ref = this.attrs;
        _results = [];
        for (k in _ref) {
          if (!__hasProp.call(_ref, k)) continue;
          v = _ref[k];
          if (v) {
            _results.push(" " + k + "=\"" + v + "\"");
          }
        }
        return _results;
      }).call(this)).join('');
      fl = (function() {
        var _ref, _results;
        _ref = this.flags;
        _results = [];
        for (f in _ref) {
          v = _ref[f];
          if (v) {
            _results.push(f);
          }
        }
        return _results;
      }).call(this);
      if (fl.length) {
        fl = " class=\"" + (fl.join(' ')) + "\"";
      }
      tag = this.tag || 'span';
      opentag = "" + tag + (fl || '') + attrs;
      if (p = this.first) {
        inner = [];
        while (p) {
          inner.push(p.toHtml(ngap + 1));
          p = p.next;
        }
        return "" + gap + "<" + opentag + ">" + (inner.join('')) + gap + "</" + tag + ">";
      } else if (this.text) {
        t = this.text.replace(/\s+/g, ' ');
        return "" + gap + "<" + opentag + ">" + t + "</" + tag + ">";
      } else {
        return "" + gap + "<" + opentag + "/>";
      }
    };

    return Lexion;

  })();

  Object.entity.define({
    id: "lexiomated.Event",
    methods: function(_super) {
      return {
        init: function() {
          return _super.init.call(this);
        },
        parse: function() {
          this.rootElt = new Lexion({
            kind: 'root',
            tag: 'article',
            text: this.input
          });
          return this.rootElt.parse();
        },
        eachMatched: function(condition, action, params) {
          this.rootElt.eachChildInDeep(function(elt) {
            if (elt.isMatched(condition)) {
              return action.call(this, elt, params);
            }
          });
          return this;
        },
        evaluateRules: (function() {
          var fn;
          fn = function(elt, rules) {
            var condition, flags, _results;
            _results = [];
            for (condition in rules) {
              flags = rules[condition];
              if (elt.isMatched(condition)) {
                if (typeof flags === 'string') {
                  _results.push(elt.setFlags(flags));
                } else {
                  _results.push(fn(elt, flags));
                }
              }
            }
            return _results;
          };
          return function(rules) {
            var condition, v, _results;
            _results = [];
            for (condition in rules) {
              v = rules[condition];
              _results.push(this.eachMatched(condition, fn, v));
            }
            return _results;
          };
        })(),
        isValidInput: function() {
          var s;
          if (!(s = this.input)) {
            return false;
          }
          if (!(s = this.input = s.replace(/\n/g, '').replace(/\s+/g, ' ').trim())) {
            return false;
          }
          if (s === 'null' || s === 'undefined') {
            return false;
          }
          return true;
        },
        toHtml: function() {
          return this.rootElt.toHtml();
        }
      };
    }
  });

}).call(this);
