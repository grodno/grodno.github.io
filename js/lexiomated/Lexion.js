(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty;

  this.Lexion = (function() {
    function Lexion(opts) {
      this.attrs = {};
      this.flags = {};
      Object.update(this, opts);
      if (!this.tag) {
        this.tag = 'span';
      }
      if (this.kind) {
        this.flags[this.kind] = 1;
      }
      if (this.parent) {
        this.parent.addLast(this);
      }
    }

    Lexion.prototype.setFlags = function(delta) {
      var cl, _i, _len;
      if (!(delta && (delta = delta.split(" ")).length)) {
        return this;
      }
      for (_i = 0, _len = delta.length; _i < _len; _i++) {
        cl = delta[_i];
        if (cl) {
          if (cl[0] === "!") {
            this.flags[cl.slice(1)] = 0;
          } else {
            this.flags[cl] = 1;
          }
        }
      }
      return this;
    };

    Lexion.prototype.isMatched = function(delta) {
      var cl, d, next, r, rest, _i, _j, _len, _ref;
      if (!(delta && (delta = delta.split(" ")).length)) {
        return this;
      }
      for (_i = 0, _len = delta.length; _i < _len; _i++) {
        cl = delta[_i];
        if (__indexOf.call(cl, '+') >= 0) {
          if (cl[0] === "!") {
            if (this.isMatchedAny(cl.slice(1).split("+"))) {
              return false;
            }
          } else {
            if (!this.isMatchedAny(cl.split("+"))) {
              return false;
            }
          }
        } else {
          if (cl[0] === "!") {
            if (this.flags[cl.slice(1)]) {
              return false;
            }
          } else {
            if (!this.flags[cl]) {
              return false;
            }
          }
        }
      }
      r = [this];
      if ((rest = arguments.length) === 1) {
        return r;
      }
      next = this.nextToken();
      for (d = _j = 1, _ref = rest - 1; 1 <= _ref ? _j <= _ref : _j >= _ref; d = 1 <= _ref ? ++_j : --_j) {
        if (!(next && next.isMatched(arguments[d]))) {
          return false;
        }
        r.push(next);
        next = next.nextToken();
      }
      return r;
    };

    Lexion.prototype.isMatchedAny = function(delta) {
      var cl, _i, _len;
      if (!delta) {
        return false;
      }
      for (_i = 0, _len = delta.length; _i < _len; _i++) {
        cl = delta[_i];
        if (cl[0] === "!") {
          if (!this.flags[cl.slice(1)]) {
            return true;
          }
        } else {
          if (this.flags[cl]) {
            return true;
          }
        }
      }
      return false;
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
      return (e.parent = this).addLast(e);
    };

    Lexion.prototype.setParent = function(p) {
      this.detachMe();
      if (this.parent = p) {
        return p.addLast(this);
      }
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

    Lexion.prototype.setAttr = function(k, v) {
      this.attrs[k] = v;
      return this;
    };

    Lexion.prototype.setText = function(v) {
      this.text = v;
      return this;
    };

    Lexion.prototype.setTag = function(v) {
      this.tag = v;
      return this;
    };

    Lexion.prototype.setKind = function(v) {
      if (this.kind) {
        this.flags[this.kind] = 0;
      }
      this.kind = v;
      this.flags[this.kind] = 1;
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
      while (next && next.kind === 'space') {
        next = next.next;
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
      var SIGN_FLAGS, TAGS_INFO, parseAttrs, re, reAttrs, reDigits, textOp;
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
      textOp = function(text, e) {
        var flags, opts;
        if (e) {
          opts = {
            tag: 'i',
            kind: SIGN_FLAGS[text] || 'sign',
            text: text,
            parent: this
          };
        } else {
          opts = {
            tag: 'span',
            kind: 'word',
            text: text,
            flags: flags = {},
            parent: this
          };
          if (text.match(reDigits)) {
            opts.kind = 'number';
          } else {
            flags[text] = 1;
            if (opts.text) {
              opts.lowerText = opts.text.toLowerCase();
            }
            if (text.toUpperCase() === text) {
              flags['abbr'] = 1;
            }
            if (String.capitalize(text) === text) {
              flags['capital'] = 1;
            }
          }
        }
        return new Lexion(opts);
      };
      return function() {
        var stack;
        stack = [this];
        this.executeRegExp(this.text, re, function(text, e) {
          var elt, opts, tag, tagInfo;
          if (e) {
            tag = e[2].toLowerCase();
            if (e[1] === '/') {
              if (tag === stack[0].tag && stack.length > 1) {
                stack.shift();
              }
            } else {
              opts = {
                kind: 'elt',
                tag: tag,
                attrs: parseAttrs(e[3]),
                parent: stack[0]
              };
              elt = new Lexion(opts);
              if (e[4] === '/') {

              } else {
                tagInfo = TAGS_INFO[tag] || TAGS_INFO['*'];
                if (tagInfo.isContainer) {
                  elt.kind = 'box';
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
      var attrs, best, f, fl, gap, inner, k, opentag, p, root, t, v, w;
      if (ngap == null) {
        ngap = 0;
      }
      if (this.kind === 'space') {
        return ' ';
      }
      gap = '\n' + '\t'.multi(ngap);
      if ((w = this.word)) {
        this.setAttr('title', w);
        if ((best = w.best) && (root = best.root)) {
          this.setFlags(root);
          this.setFlags(root + best.suffix);
        }
      }
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
          if (v && (v !== 'undefined')) {
            _results.push(f);
          }
        }
        return _results;
      }).call(this);
      if (fl.length) {
        fl = " class=\"" + (fl.join(' ')) + "\"";
      }
      opentag = "" + this.tag + (fl || '') + attrs;
      if (p = this.first) {
        inner = [];
        while (p) {
          inner.push(p.toHtml(ngap + 1));
          p = p.next;
        }
        return "" + gap + "<" + opentag + ">" + (inner.join('')) + gap + "</" + this.tag + ">";
      } else if (this.text) {
        t = this.text.replace(/\s+/g, ' ');
        return "" + gap + "<" + opentag + ">" + t + "</" + this.tag + ">";
      } else {
        return "" + gap + "<" + opentag + "/>";
      }
    };

    return Lexion;

  })();

}).call(this);
