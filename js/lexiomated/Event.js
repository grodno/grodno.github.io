(function() {
  var Lexon,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty;

  Lexon = (function() {
    function Lexon(opts) {
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

    Lexon.prototype.isMatched = (function() {
      var compile, impl, match, matchAny, _CACHE;
      _CACHE = {};
      match = function(conj) {
        var c0, r, val, _ref;
        val = conj.expr;
        r = conj.invert;
        c0 = conj.char0;
        if (c0 === "#") {
          if (this.text !== conj.rest0) {
            return r;
          }
        } else if (c0 === "@") {
          val = conj.rest0.split('.');
          if (!this[val[0]].apply(this, val.slice(1))) {
            return r;
          }
        } else if (val === "]") {
          if ((_ref = this.next) != null ? _ref.flags.space : void 0) {
            return r;
          }
        } else {
          if (!this.flags[val]) {
            return r;
          }
        }
        return !r;
      };
      matchAny = function(disj) {
        var conj, _i, _len, _ref;
        _ref = disj.conjuctions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          conj = _ref[_i];
          if (match.call(this, conj)) {
            return !disj.invert;
          }
        }
        return disj.invert;
      };
      compile = function(s) {
        var arr, c, ci, cl, cl1, conj, conjuctions, disj, len, r, _i, _j, _len, _len1, _ref;
        if (s == null) {
          s = '*';
        }
        if (r = _CACHE[s]) {
          return r;
        }
        r = _CACHE[s] = {
          disjunctions: []
        };
        if (r.isTrue = s === '*') {
          return r;
        }
        if (__indexOf.call(s, '<') >= 0) {
          arr = s.split("<");
          len = arr.length;
          s = arr[len - 1];
          r.prevChain = (function() {
            var _i, _ref, _results;
            _results = [];
            for (ci = _i = _ref = len - 2; _ref <= 0 ? _i <= 0 : _i >= 0; ci = _ref <= 0 ? ++_i : --_i) {
              _results.push(compile(arr[ci]));
            }
            return _results;
          })();
        }
        if (__indexOf.call(s, '>') >= 0) {
          arr = s.split(">");
          s = arr.shift();
          r.nextChain = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = arr.length; _i < _len; _i++) {
              c = arr[_i];
              _results.push(compile(c));
            }
            return _results;
          })();
        }
        if (!s || s === '*') {
          return r;
        }
        s = s.split(" ");
        for (_i = 0, _len = s.length; _i < _len; _i++) {
          cl = s[_i];
          if (!(cl)) {
            continue;
          }
          disj = {
            conjuctions: conjuctions = []
          };
          if (cl[0] === "!" && cl[1] === '(') {
            disj.invert = true;
            cl = cl.slice(2, 1);
          }
          _ref = cl.split("+");
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            cl1 = _ref[_j];
            if (!(cl1)) {
              continue;
            }
            conj = {
              invert: false
            };
            if (cl1[0] === "!") {
              conj.invert = true;
              cl1 = cl1.slice(1);
            }
            conj.expr = cl1;
            conj.char0 = cl1[0];
            conj.rest0 = cl1.slice(1);
            conjuctions.push(conj);
          }
          if (conjuctions.length === 1) {
            disj.single = conjuctions[0];
          }
          r.disjunctions.push(disj);
        }
        if (r.disjunctions.length === 1) {
          r.single = r.disjunctions[0].single;
        }
        return r;
      };
      impl = function(condition) {
        var c, disj, lx, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        if (condition.single) {
          if (!match.call(this, condition.single)) {
            return false;
          }
        } else {
          _ref = condition.disjunctions;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            disj = _ref[_i];
            if (disj.single) {
              if (!match.call(this, disj.single)) {
                return false;
              }
            } else {
              if (!matchAny.call(this, disj)) {
                return false;
              }
            }
          }
        }
        if (condition.nextChain) {
          lx = this;
          _ref1 = condition.nextChain;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            c = _ref1[_j];
            if (!((lx = lx.nextToken()) && impl.call(lx, c))) {
              return false;
            }
          }
        }
        if (condition.prevChain) {
          lx = this;
          _ref2 = condition.prevChain;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            c = _ref2[_k];
            if (!((lx = lx.prevToken()) && impl.call(lx, c))) {
              return false;
            }
          }
        }
        return true;
      };
      return function(s) {
        if (!s || s === '*') {
          return true;
        } else {
          return impl.call(this, compile(s));
        }
      };
    })();

    Lexon.prototype.setFlags = (function() {
      var fnResolveText;
      fnResolveText = function(cl, ev) {
        return cl.replace(/_/g, ' ').replace(/\$(\-?\d+)(?:\.([a-z][a-zA-Z0-9\.]+))?/g, function(s, n, method) {
          var next;
          if (!(next = ev['$' + n])) {
            return '';
          }
          if (!method) {
            return next.getText();
          }
          method = method.split('.');
          return next != null ? next['get' + String.capitalize(method[0])].apply(next, method.slice(1)) : void 0;
        });
      };
      return function(delta, ev) {
        var c0, ci, cl, i, lx, nextC, nextLxs, prevC, prevLxs, _i, _j, _k, _len, _len1, _len2, _ref;
        if (ev == null) {
          ev = {
            '$0': this
          };
        }
        if (!delta) {
          return this;
        }
        if (__indexOf.call(delta, '<') >= 0) {
          prevC = delta.split("<");
          delta = prevC[prevC.length - 1];
          prevC = (function() {
            var _i, _ref, _results;
            _results = [];
            for (ci = _i = _ref = prevC.length - 2; _ref <= 0 ? _i <= 0 : _i >= 0; ci = _ref <= 0 ? ++_i : --_i) {
              _results.push(prevC[ci]);
            }
            return _results;
          })();
          lx = this;
          prevLxs = (function() {
            var _i, _ref, _results;
            _results = [];
            for (ci = _i = 1, _ref = prevC.length; 1 <= _ref ? _i <= _ref : _i >= _ref; ci = 1 <= _ref ? ++_i : --_i) {
              if (lx && (lx = lx.prevToken())) {
                _results.push(ev['$-' + ci] = lx);
              }
            }
            return _results;
          })();
        }
        if (__indexOf.call(delta, '>') >= 0) {
          nextC = delta.split(">");
          delta = nextC.shift();
          lx = this;
          nextLxs = (function() {
            var _i, _ref, _results;
            _results = [];
            for (ci = _i = 1, _ref = nextC.length; 1 <= _ref ? _i <= _ref : _i >= _ref; ci = 1 <= _ref ? ++_i : --_i) {
              if (lx && (lx = lx.nextToken())) {
                _results.push(ev['$' + ci] = lx);
              }
            }
            return _results;
          })();
        }
        if (prevLxs) {
          for (i = _i = 0, _len = prevLxs.length; _i < _len; i = ++_i) {
            lx = prevLxs[i];
            lx.setFlags(prevC[i], ev);
          }
        }
        delta = delta.split(" ");
        for (_j = 0, _len1 = delta.length; _j < _len1; _j++) {
          cl = delta[_j];
          if (cl && (c0 = cl[0])) {
            if (c0 === "!") {
              this.flags[cl.slice(1)] = 0;
            } else if (c0 === "#") {
              if (cl === c0) {
                this.detachMe();
              } else {
                this.text = fnResolveText(cl.slice(1), ev);
              }
            } else if (c0 === "{") {
              (ev.parent = (ev.parent || this).surroundWith()).setFlags(cl.slice(1, -1).replace('_', ' ') + ' clause');
            } else if (c0 === "^") {
              if (cl[1] === '_') {
                (new Lexon({
                  flags: {
                    space: 1
                  }
                })).setParent(ev.parent || ev.$0);
                cl = cl.slice(1);
              }
              if ((_ref = (cl === c0 ? this : this.getSibling(cl.slice(1)))) != null) {
                _ref.setParent(ev.parent || ev.$0);
              }
            } else {
              this.flags[cl] = 1;
            }
          }
        }
        if (nextLxs) {
          for (i = _k = 0, _len2 = nextLxs.length; _k < _len2; i = ++_k) {
            lx = nextLxs[i];
            lx.setFlags(nextC[i], ev);
          }
        }
        return this;
      };
    })();

    Lexon.prototype.setAttr = function(k, v) {
      this.attrs[k] = v;
      return this;
    };

    Lexon.prototype.setText = function(v) {
      this.text = v;
      return this;
    };

    Lexon.prototype.getText = function() {
      return this.text;
    };

    Lexon.prototype.getTextSlice = function(s, e) {
      if (s == null) {
        s = 0;
      }
      if (e == null) {
        e = -1;
      }
      return this.text.slice(+s, +(+e) + 1 || 9e9);
    };

    Lexon.prototype.setTag = function(v) {
      this.tag = v;
      return this;
    };

    Lexon.prototype.getYear = function(gap) {
      if (gap == null) {
        gap = 0;
      }
      return (new Date()).getFullYear() + (+gap);
    };

    Lexon.prototype.between = function(s, e) {
      if (s == null) {
        s = 0;
      }
      if (e == null) {
        e = Number.MAX_VALUE;
      }
      return +this.text >= +s && +this.text <= +e;
    };

    Lexon.prototype.noNextSpace = function() {
      var _ref;
      return !((_ref = this.next) != null ? _ref.flags.space : void 0);
    };

    Lexon.prototype.addLast = function(e) {
      if (this.last) {
        (this.last.next = e).prev = this.last;
      } else {
        this.first = e;
      }
      this.last = e;
      return this;
    };

    Lexon.prototype.detachMe = function() {
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

    Lexon.prototype.addChild = function(e) {
      e.detachMe();
      (e.parent = this).addLast(e);
      return this;
    };

    Lexon.prototype.setParent = function(p) {
      this.detachMe();
      if (this.parent = p) {
        p.addLast(this);
      }
      return this;
    };

    Lexon.prototype.setNext = function(e) {
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

    Lexon.prototype.doInBetween = function(next, op) {
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

    Lexon.prototype.mergeFrom = function() {
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

    Lexon.prototype.eachChildInDeep = function(op) {
      var p;
      p = this.first;
      while (p) {
        op.call(this, p);
        p.eachChildInDeep(op);
        p = p.next;
      }
      return this;
    };

    Lexon.prototype.getSibling = function(n) {
      var next;
      if (n == null) {
        n = 1;
      }
      n = +n;
      next = this;
      if (n > 0) {
        while (n--) {
          if (!(next = next.nextToken())) {
            return null;
          }
        }
      } else if (n < 0) {
        while (n++) {
          if (!(next = next.prevToken())) {
            return null;
          }
        }
      }
      return next;
    };

    Lexon.prototype.nextToken = function() {
      var next;
      next = this.next;
      while (next && next.flags.space) {
        next = next.next;
      }
      return next;
    };

    Lexon.prototype.prevToken = function() {
      var next;
      next = this.prev;
      while (next && next.flags.space) {
        next = next.prev;
      }
      return next;
    };

    Lexon.prototype.surroundWith = function(opts) {
      var p;
      p = new Lexon(opts);
      this.setNext(p).setParent(p);
      return p;
    };

    Lexon.prototype.executeRegExp = function(s, re, op) {
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

    Lexon.prototype.parse = (function() {
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
        '—': 'dash',
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
        var fl, flags, opts;
        opts = {
          text: text,
          flags: flags = {},
          parent: this
        };
        if (e) {
          if (text !== ' ') {
            flags['sign'] = 1;
          }
          if (fl = SIGN_FLAGS[text]) {
            flags[fl] = 1;
          }
        } else if (text.match(reDigits)) {
          flags.number = 1;
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
        return new Lexon(opts);
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
              elt = new Lexon(opts);
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

    Lexon.prototype.toHtml = function(ngap) {
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
      tag = this.tag || 'span';
      this.attrs.title = fl + (this.attrs.title ? '\n' + this.attrs.title : '');
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
      fl = fl.length ? " class=\"" + fl + "\"" : '';
      opentag = "" + tag + fl + attrs;
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

    return Lexon;

  })();

  Object.entity.define({
    id: "lexiomated.Event",
    methods: function(_super) {
      return {
        init: function() {
          return _super.init.call(this);
        },
        parse: function() {
          this.rootElt = new Lexon({
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
            var condition, elseCond, flags, _results;
            _results = [];
            for (condition in rules) {
              flags = rules[condition];
              if (condition !== '::else') {
                if (typeof flags === 'string') {
                  if (elt.isMatched(condition)) {
                    _results.push(elt.setFlags(flags));
                  } else {
                    _results.push(void 0);
                  }
                } else {
                  if (elt.isMatched(condition)) {
                    _results.push(fn(elt, flags));
                  } else if (elseCond = flags['::else']) {
                    _results.push(fn(elt, {
                      '*': elseCond
                    }));
                  } else {
                    _results.push(void 0);
                  }
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
