(function() {
  var Record,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Record = (function() {
    function Record() {}

    Record.prototype.addLast = function(e) {
      if (this.last) {
        (this.last.next = e).prev = this.last;
      } else {
        this.first = e;
      }
      this.last = e;
      return this;
    };

    Record.prototype.detachMe = function() {
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

    Record.prototype.addChild = function(e) {
      e.detachMe();
      return (e.parent = this).addLast(e);
    };

    Record.prototype.setParent = function(p) {
      this.detachMe();
      if (this.parent = p) {
        return p.addLast(this);
      }
    };

    Record.prototype.setNext = function(e) {
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

    Record.prototype.setAttr = function(k, v) {
      this.attrs[k] = v;
      return this;
    };

    Record.prototype.setText = function(v) {
      this.text = v;
      return this;
    };

    Record.prototype.setTag = function(v) {
      this.tag = v;
      return this;
    };

    Record.prototype.setKind = function(v) {
      if (this.kind) {
        this.flags[this.kind] = 0;
      }
      this.kind = v;
      this.flags[this.kind] = 1;
      return this;
    };

    Record.prototype.setFlags = function(delta) {
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

    Record.prototype.doInBetween = function(next, op) {
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

    Record.prototype.splitTill = function(ending) {
      return this.doInBetween(ending.next, 'detachMe');
    };

    Record.prototype.eachChildInDeep = function(op) {
      var p;
      p = this.first;
      while (p) {
        p.eachChildInDeep(op);
        op.call(this, p);
        p = p.next;
      }
      return this;
    };

    Record.prototype.nextWord = function() {
      var next2, _ref;
      if ((next2 = (_ref = this.next) != null ? _ref.next : void 0) && next2.kind === 'word') {
        return next2;
      } else {
        return null;
      }
    };

    Record.prototype.surroundWith = function(opts) {
      var p;
      p = new Lexion(opts);
      this.setNext(p).setParent(p);
      return p;
    };

    return Record;

  })();

  this.Lexion = (function(_super) {
    __extends(Lexion, _super);

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
      if (this.text) {
        this.lowerText = this.text.toLowerCase();
      }
      if (this.parent) {
        this.parent.addLast(this);
      }
    }

    Lexion.prototype.executeRegExp = function(s, re, op) {
      var e, pastLastIndex, text;
      pastLastIndex = 0;
      while ((e = re.exec(s))) {
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
      var TAGS_INFO, parseAttrs, re, reAttrs, reDigits, textOp;
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
        var flags, opts;
        flags = {};
        opts = {
          tag: 'span',
          kind: 'word',
          text: text,
          flags: flags,
          parent: this
        };
        if (e) {
          opts.tag = 'i';
          if (text === '.') {
            flags['dot'] = 1;
          }
          if (text === ',') {
            flags['comma'] = 1;
          }
          if (text === '-') {
            flags['dash'] = 1;
          }
          opts.kind = text === ' ' ? 'space' : 'sign';
        } else {
          if (text.match(reDigits)) {
            opts.kind = 'number';
          } else {
            flags[text] = 1;
            flags['l' + text.length] = 1;
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
        return this.executeRegExp(this.text, re, function(text, e) {
          var elt, elts, opts, tag, tagInfo, textx, txtc, txts, _i, _len, _ref, _results;
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
            if (textx = text.trim()) {
              _ref = textx.split('.');
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                txts = _ref[_i];
                elts = new Lexion({
                  kind: 'sentence',
                  tag: 'p',
                  parent: stack[0]
                });
                _results.push((function() {
                  var _j, _len1, _ref1, _results1;
                  _ref1 = txts.split(',');
                  _results1 = [];
                  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                    txtc = _ref1[_j];
                    elt = new Lexion({
                      kind: 'clause',
                      tag: 'span',
                      parent: elts
                    });
                    _results1.push(elt.executeRegExp(txtc, /[^a-zа-я0-9]/gi, textOp));
                  }
                  return _results1;
                })());
              }
              return _results;
            }
          }
        });
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
        this.setFlags(r.best.root);
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
      fl = ((function() {
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
      }).call(this)).join(' ');
      if (fl) {
        fl = " class=\"" + fl + "\"";
      }
      opentag = "" + this.tag + (fl || '') + attrs;
      if (p = this.first) {
        inner = [];
        while (p) {
          inner.push(p.toHtml(ngap + 1));
          p = p.next;
        }
        return "" + gap + "<" + opentag + ">(" + this.tag + ":" + (inner.join('')) + gap + ")</" + this.tag + ">";
      } else if (this.text) {
        t = this.text.replace(/\s+/g, ' ');
        return "" + gap + "<" + opentag + ">" + t + "</" + this.tag + ">";
      } else {
        return "" + gap + "<" + opentag + "/>";
      }
    };

    return Lexion;

  })(Record);

}).call(this);
