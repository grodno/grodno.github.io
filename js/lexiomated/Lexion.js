(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty;

  this.Lexion = (function() {
    var addLast;

    addLast = function(e) {
      if (this.last) {
        (this.last.next = e).prev = this.last;
      } else {
        this.first = e;
      }
      this.last = e;
      return this;
    };

    function Lexion(opts) {
      this.attrs = {};
      Object.update(this, opts);
      if (!this.tag) {
        this.tag = 'span';
      }
      this.flags = {};
      this.flags[this.kind] = 1;
      if (this.text) {
        this.lowerText = this.text.toLowerCase();
      }
      if (this.parent) {
        addLast.call(this.parent, this);
      }
    }

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

    Lexion.prototype.addChild = function(e) {
      e.detachMe();
      return addLast.call(e.parent = this, e);
    };

    Lexion.prototype.setParent = function(p) {
      this.detachMe();
      if (this.parent = p) {
        return addLast.call(p, this);
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

    Lexion.prototype.splitTill = function(ending) {
      return this.doInBetween(ending.next, 'detachMe');
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

    Lexion.prototype.nextWord = function() {
      var next2, _ref;
      if ((next2 = (_ref = this.next) != null ? _ref.next : void 0) && next2.kind === 'word') {
        return next2;
      } else {
        return null;
      }
    };

    Lexion.prototype.surroundWith = function(opts) {
      var p;
      p = new Lexion(opts);
      this.setNext(p).setParent(p);
      return p;
    };

    Lexion.prototype.textRegistry = function(ctx) {
      var ch, e, _i, _j, _len, _len1, _ref, _ref1;
      if (ctx == null) {
        ctx = {
          text: '',
          registry: []
        };
      }
      if (this.children) {
        _ref = this.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          e.textRegistry(ctx);
        }
      } else if (this.text) {
        ctx.text += this.text;
        _ref1 = this.text;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          ch = _ref1[_j];
          ctx.registry.push(this);
        }
      } else {

      }
      return ctx;
    };

    Lexion.prototype.executeRegExp = function(re, op) {
      var ctx, e, pastLastIndex, s, text;
      pastLastIndex = 0;
      ctx = this.textRegistry();
      ctx.sourceElt = this;
      s = ctx.text;
      while ((e = re.exec(s))) {
        ctx.matching = e;
        if (e.index && (text = s.slice(pastLastIndex, +(e.index - 1) + 1 || 9e9))) {
          op.call(ctx, text, null);
        }
        op.call(ctx, e[0], e);
        pastLastIndex = re.lastIndex;
      }
      if ((text = s.slice(pastLastIndex))) {
        op.call(ctx, text, ctx.matching = null);
      }
      return ctx;
    };

    Lexion.prototype.parse = (function() {
      var TAGS_INFO, normalizeNumbersOp, parseAttrs, re, reAttrs, reDigits, textOp;
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
      re = /<(\/?)([a-z]{1,7})((?:\s+[a-z][a-z0-9\-]+(?:=(?:\w+|"?[^>"]*"?))?)*)(\/?)>/gi;
      reDigits = /^\d+$/;
      textOp = function(text, e) {
        var opts;
        opts = {
          tag: 'span',
          kind: 'word',
          text: text,
          parent: this.sourceElt
        };
        if (e) {
          opts.tag = 'i';
          opts.kind = text === ' ' ? 'space' : 'sign';
        } else {
          if (text.match(reDigits)) {
            opts.kind = 'number';
          }
        }
        if (opts) {
          return new Lexion(opts);
        }
      };
      normalizeNumbersOp = function(e) {
        var n, next, next2, s, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        if (e.kind === 'number') {
          if (_ref = (s = (_ref1 = e.prev) != null ? _ref1.text : void 0), __indexOf.call('-+', _ref) >= 0) {
            e.setText(s + e.text);
            e.prev.detachMe();
          }
          n = e;
          while ((next2 = (_ref2 = (next = n.next)) != null ? _ref2.next : void 0) && next2.kind === 'number' && next2.text.length === 3 && (_ref3 = next.text, __indexOf.call(' ,', _ref3) >= 0)) {
            e.splitTill(next2.next).setText(e.text + next.text + next2.text);
            n = next2;
          }
          if ((next2 = (_ref4 = (next = n.next)) != null ? _ref4.next : void 0) && next2.kind === 'number' && (_ref5 = next.text, __indexOf.call('.,', _ref5) >= 0)) {
            e.splitTill(next2.next).setText(e.text + next.text + next2.text);
            return n = next2;
          }
        }
      };
      return function() {
        var stack;
        stack = [this];
        this.executeRegExp(re, function(text, e) {
          var elt, opts, tag, tagInfo;
          if (e) {
            tag = e[2].toLowerCase();
            if (e[1] === '/') {
              if (tag === stack[0].tag && stack.length > 1) {
                return stack.shift();
              }
            } else {
              opts = {
                tag: tag,
                attrs: parseAttrs(e[3]),
                parent: stack[0]
              };
              if (e[4] === '/') {
                return new Lexion(opts);
              } else {
                elt = new Lexion(opts);
                tagInfo = TAGS_INFO[tag] || TAGS_INFO['*'];
                if (tagInfo.isContainer) {
                  elt.kind = 'box';
                  if (tagInfo.nonRecursive && stack[0].tag === tag) {
                    return stack[0] = elt;
                  } else {
                    return stack.unshift(elt);
                  }
                }
              }
            }
          } else {
            if (text = text.trim()) {
              elt = new Lexion({
                kind: 'text',
                tag: 'span',
                text: text,
                parent: stack[0]
              });
              return elt.executeRegExp(/[^a-zа-я0-9]/gi, textOp);
            }
          }
        });
        return this.eachChildInDeep(normalizeNumbersOp);
      };
    })();

    Lexion.prototype.toHtml = function(ngap) {
      var attrs, f, fl, gap, inner, k, opentag, p, r, t, v;
      if (ngap == null) {
        ngap = 0;
      }
      if (this.kind === 'space') {
        return ' ';
      }
      gap = '\n' + '\t'.multi(ngap);
      if ((r = this.word)) {
        this.setAttr('title', r);
      }
      attrs = ((function() {
        var _ref, _results;
        _ref = this.attrs;
        _results = [];
        for (k in _ref) {
          if (!__hasProp.call(_ref, k)) continue;
          v = _ref[k];
          if (v) {
            _results.push("" + k + "=\"" + v + "\"");
          }
        }
        return _results;
      }).call(this)).join(' ');
      fl = ((function() {
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
      }).call(this)).join(' ');
      fl = fl ? " class=\"" + fl + "\"" : '';
      opentag = "" + this.tag + fl + " " + attrs;
      if (p = this.first) {
        inner = [];
        while (p) {
          inner.push(p.toHtml(ngap + 1));
          p = p.next;
        }
        return "" + gap + "<" + opentag + "> " + (inner.join('')) + gap + "</" + this.tag + ">";
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
