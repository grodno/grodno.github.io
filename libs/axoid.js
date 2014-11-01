
/*
AXOID.JS - Infrastructure
 */

(function() {
  "use strict";

  /*
  Functions.
   */
  var F, O,
    __hasProp = {}.hasOwnProperty;

  F = Function;

  F.nextTick = function(ms, ctx, fn) {
    if (arguments.length === 1) {
      (fn = ms) && (ms = null) && (ctx = null);
    }
    if (arguments.length === 2) {
      (fn = ctx) && (ctx = ms) && (ms = null);
    }
    return setTimeout((function() {
      return fn.call(ctx);
    }), ms || 5);
  };

  F.iterate = function(fn, obj, ctx, opts) {
    var i, ln, n, x, _i, _len;
    if (obj) {
      ln = obj.length;
      if (ln === +ln) {
        for (i = _i = 0, _len = obj.length; _i < _len; i = ++_i) {
          x = obj[i];
          fn.call(ctx, x, i, opts);
        }
      } else {
        for (n in obj) {
          if (!__hasProp.call(obj, n)) continue;
          x = obj[n];
          fn.call(ctx, x, n, opts);
        }
      }
    }
    return ctx;
  };

  F.perform = function(ctx, factory) {
    var flow, locked, newCb, results, tick;
    locked = 1;
    results = [null, void 0];
    tick = function() {
      var op, _args;
      if (!--locked && (op = flow.operations.shift())) {
        locked = 1;
        _args = [].concat(results);
        results = [null, void 0];
        try {
          return op.apply(flow.context, _args);
        } catch (_error) {
          _error.op = ('' + op).slice(0, 151).replace(/\n+/g, ' ');
          return O.error(_error).addDetails(flow._error).log();
        }
      }
    };
    newCb = function(pos) {
      return function(err, v) {
        if (!(results[pos] === void 0)) {
          return;
        }
        if (err) {
          results[0] = O.error(err).log();
        }
        results[pos] = v;
        return tick();
      };
    };
    flow = {
      context: ctx,
      _error: new Error(),
      next: newCb(1),
      wait: function() {
        var pos;
        pos = results.length;
        results[pos] = void 0;
        locked += 1;
        return newCb(pos);
      }
    };
    flow.operations = factory.call(ctx, flow);
    return tick();
  };

  F.create = function(code, params) {
    if (code) {
      return Object.parse("(" + (params ? params.join(', ') : '') + ")->\n\t" + (code.replace(/\n/g, '\n\t')), {
        language: 'coffeescript'
      });
    } else {
      return null;
    }
  };


  /*
  Objects.
   */

  O = Object;

  O.update = function(obj, extra) {
    var n;
    if (obj && extra) {
      for (n in extra) {
        if (!__hasProp.call(extra, n)) continue;
        obj[n] = extra[n];
      }
    }
    return obj;
  };

  O.prop = function(obj, key, val) {
    var k, p, p1;
    if (!obj) {
      return null;
    }
    p = -1;
    if (arguments.length > 2) {
      while ((p = key.indexOf(".", p1 = p + 1)) > -1) {
        obj = obj[k = key.slice(p1, +(p - 1) + 1 || 9e9)] || (obj[k] = {});
      }
      return obj[key.slice(p1)] = val;
    } else {
      while (obj && (p = key.indexOf(".", p1 = p + 1)) > -1) {
        obj = obj[key.slice(p1, +(p - 1) + 1 || 9e9)];
      }
      return obj != null ? obj[key.slice(p1)] : void 0;
    }
  };

  O.clone = function(obj, delta) {
    var n, r;
    if (!obj) {
      return null;
    }
    r = new obj.constructor();
    for (n in obj) {
      if (!__hasProp.call(obj, n)) continue;
      r[n] = obj[n];
    }
    if (delta) {
      for (n in delta) {
        if (!__hasProp.call(delta, n)) continue;
        r[n] = delta[n];
      }
    }
    return r;
  };

  O.parse = function(s, opts) {
    if (!s) {
      return null;
    }
    try {
      if ((opts != null ? opts.language : void 0) === 'coffeescript') {
        s = CoffeeScript.compile(s, {
          bare: true
        });
      }
      return F.call(F, "return " + s).call(opts != null ? opts.ctx : void 0);
    } catch (_error) {
      return O.error("bad-code: Object.parse: " + _error.message).addDetails(s).log().end(null);
    }
  };


  /*
  Strings.
   */

  String.LANGUAGE = 'en';

  String.capitalize = function(s) {
    if (s != null ? s.length : void 0) {
      return s[0].toUpperCase() + s.slice(1);
    } else {
      return "";
    }
  };

  String.camelize = function(s, sep) {
    var i, t;
    if (sep == null) {
      sep = '_';
    }
    if (s != null ? s.length : void 0) {
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = s.split(sep);
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          t = _ref[i];
          _results.push(i ? String.capitalize(t) : t);
        }
        return _results;
      })()).join('');
    } else {
      return '';
    }
  };

  String.localize = (function(_cache) {
    var $;
    $ = function(s, l) {
      var _ref;
      if (l == null) {
        l = String.LANGUAGE;
      }
      if (s) {
        return ((_ref = _cache[l]) != null ? _ref[s] : void 0) || String.capitalize(String.camelize(s));
      } else {
        return "";
      }
    };
    $.get = function(s, l) {
      var _ref;
      if (l == null) {
        l = String.LANGUAGE;
      }
      if (s) {
        return ((_ref = _cache[l]) != null ? _ref[s] : void 0) || null;
      } else {
        return null;
      }
    };
    $.add = function(l, delta) {
      if (arguments.length === 1) {
        (delta = l) && (l = null);
      }
      if (!l) {
        l = String.LANGUAGE;
      }
      return O.update(_cache[l] || (_cache[l] = {}), delta);
    };
    return $;
  })({});

  String.format = function(s) {
    var args, e;
    if (!s) {
      return '';
    }
    args = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        e = arguments[_i];
        _results.push(e);
      }
      return _results;
    }).apply(this, arguments);
    return s.replace(/\{(\d+)\}/g, function(s, d) {
      return args[+d + 1] || '';
    });
  };

  String.template = (function() {
    var $, encoder, fn, parse;
    parse = function(s, x) {
      var RE, e, lastIndex, r, r0, stack, tag, text;
      r = {
        tag: 'top',
        children: []
      };
      stack = [];
      lastIndex = 0;
      RE = /{{([?\/:#]?)([a-zA-Z0-9\._]+)((\|[a-z]+)*)}}/g;
      while (e = RE.exec(s)) {
        if (e.index && (text = s.slice(lastIndex, +(e.index - 1) + 1 || 9e9))) {
          r.children.push({
            tag: '_',
            value: text
          });
        }
        tag = e[2];
        if ((e[1] === '?') || (e[1] === '#')) {
          stack.unshift(r);
          r.children.push(r0 = {
            tag: tag,
            children: [],
            flag: e[1]
          });
          r = r0;
        } else if (e[1] === '/') {
          r = stack.shift();
        } else if (e[1] === ':') {
          r = r['_' + tag] = {
            children: []
          };
        } else {
          r.children.push({
            tag: tag
          });
        }
        lastIndex = RE.lastIndex;
      }
      if (lastIndex && (s = s.slice(lastIndex))) {
        r.children.push({
          tag: '_',
          value: s
        });
      }
      return r;
    };
    fn = function(node, obj) {
      var e, n, r, tag, v, _i, _j, _len, _len1, _ref;
      r = [];
      if (node.children) {
        _ref = node.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          n = _ref[_i];
          if ((tag = n.tag) === '_') {
            r.push(n.value);
          } else {
            if ((v = tag === '.' ? obj : O.prop(obj, tag))) {
              if (Array.isArray(v)) {
                if (v.length) {
                  if (n.flag === '?') {
                    r.push(fn(n, obj));
                  } else {
                    for (_j = 0, _len1 = v.length; _j < _len1; _j++) {
                      e = v[_j];
                      if (e) {
                        r.push(fn(n, e));
                      }
                    }
                  }
                } else {
                  if (n._else) {
                    r.push(fn(n._else, n.flag === '?' ? obj : v));
                  }
                }
              } else {
                r.push(fn(n, n.flag === '?' ? obj : v));
              }
            } else {
              if (n._else) {
                r.push(fn(n._else, n.flag === '?' ? obj : v));
              }
            }
          }
        }
      } else {
        r.push($.writeValue(obj, r));
      }
      return r.join('');
    };
    $ = function(s, obj) {
      return fn(parse(s), obj);
    };
    $.filters = {};
    encoder = function(i) {
      return '&#' + i.charCodeAt(0) + ';';
    };
    $.writeValue = function(obj, r) {
      return ('' + obj).replace(/[\u00A0-\u9999<>\&]/g, encoder);
    };
    return $;
  })();


  /*
  Dates.
   */

  (function(MAXD, CURR) {
    var _nn;
    _nn = function(s) {
      return s && (s = "" + s) && (s.length < 2 ? "0" + s : s) || "00";
    };
    Date.PATTERN_PARSE = "yyyy-MM-dd";
    Date.PATTERN_FORMAT = "dd MMM yyyy";
    Date.daysInMonth = function(m, y) {
      return ((m === 1) && ((y % 4) === 0) ? 1 : 0) + MAXD[m];
    };
    Date.getTimeZone = function() {
      var l, m, t;
      l = -CURR.getTimezoneOffset();
      t = "" + Math.abs(l / 60);
      m = "" + Math.abs(l % 60);
      return "GMT" + (((l === 0) && "") || ("%2" + (l > 0 ? "B" : "D") + _nn(t) + ":" + _nn(m)));
    };
    Date.parse = function(s, pattern) {
      var d, p, r;
      if (pattern == null) {
        pattern = Date.PATTERN_PARSE;
      }
      if (!s) {
        return null;
      }
      if (s instanceof Date) {
        return s;
      }
      d = new Date();
      d.setDate(1);
      r = "" + pattern;
      if ((p = r.indexOf("yyyy")) > -1) {
        d.setFullYear(s.substr(p, 4));
      } else {
        if ((p = r.indexOf("yy")) > -1) {
          d.setFullYear(2000 + s.substr(p, 2));
        }
      }
      if ((p = r.indexOf("MM")) > -1) {
        d.setMonth(Number(s.substr(p, 2)) - 1);
      }
      if ((p = r.indexOf("dd")) > -1) {
        d.setDate(Number(s.substr(p, 2)));
      }
      d.setHours(((p = r.indexOf("HH")) > -1 ? s.substr(p, 2) : 12));
      d.setMinutes(((p = r.indexOf("mm")) > -1 ? s.substr(p, 2) : 0));
      d.setSeconds(((p = r.indexOf("ss")) > -1 ? s.substr(p, 2) : 0));
      return d;
    };
    Date.shiftedWithDays = function(d, lag) {
      var r;
      r = new Date();
      r.setTime((d || r).getTime() + ((lag || 0) * 86400000));
      return r;
    };
    Date.days = function(d) {
      if (!(d && d.getTime)) {
        return 0;
      }
      d = d.getTime();
      return (d - d % 86400000) / 86400000;
    };
    Date.compare = function(x, y) {
      if (x && y) {
        if (x.getTime && y.getTime) {
          if (x.getTime() > y.getTime()) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return 0;
        }
      } else {
        if (!x && !y) {
          return 0;
        } else {
          if (!!x) {
            return 1;
          } else {
            return -1;
          }
        }
      }
    };
    Date.monthName = function(m, lang) {
      var _ref;
      return (_ref = String.localize.get("MONTH", lang)) != null ? _ref[_nn(m + 1)] : void 0;
    };
    Date.format = function(d, pattern, lng) {
      var r;
      r = "";
      if (d && d.getFullYear) {
        r += pattern || Date.PATTERN_FORMAT;
        r = r.replace("yyyy", "" + d.getFullYear());
        r = r.replace("yy", "" + d.getFullYear());
        r = r.replace("MMMM", Date.monthName(d.getMonth(), lng));
        r = r.replace("MMM", Date.monthName(d.getMonth(), lng, "MONTH_SHORT"));
        r = r.replace("MM", _nn(d.getMonth() + 1));
        r = r.replace("dd", _nn(d.getDate()));
        r = r.replace("hh", _nn(d.getHours()));
        r = r.replace("mm", _nn(d.getMinutes()));
        r = r.replace("ss", _nn(d.getSeconds()));
      }
      return r;
    };
    return String.localize.add("en", {
      "DOW": {
        '1': "Su",
        '2': "Mo",
        '3': "Tu",
        '4': "We",
        '5': "Th",
        '6': "Fr",
        '7': "Sa"
      },
      "MONTH_SHORT": {
        '01': "Jan",
        '02': "Feb",
        '03': "Mar",
        '04': "Apr",
        '05': "May",
        '06': "Jun",
        '07': "Jul",
        '08': "Aug",
        '09': "Sep",
        '10': "Oct",
        '11': "Nov",
        '12': "Dec"
      },
      "MONTH": {
        '01': "January",
        '02': "February",
        '03': "March",
        '04': "April",
        '05': "May",
        '06': "June",
        '07': "July",
        '08': "August",
        '09': "September",
        '10': "October",
        '11': "November",
        '12': "December"
      }
    });
  })([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31], new Date());


  /*
  Math.
   */

  O.math = {
    decimalAdjust: function(type, value, exp) {
      if (typeof exp === "undefined" || +exp === 0) {
        return Math[type](value);
      }
      value = +value;
      exp = +exp;
      if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
        return NaN;
      }
      value = value.toString().split("e");
      value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
      value = value.toString().split("e");
      return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
    },
    round: function(value, exp) {
      if (exp == null) {
        exp = 0;
      }
      return this.decimalAdjust("round", value, exp);
    },
    uuid: function() {
      var d;
      d = Date.now();
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r;
        r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x7 | 0x8).toString(16);
      });
    },
    sort: function(a, key, dir) {
      var getter, rdir;
      if (!dir) {
        dir = 1;
      }
      rdir = dir * -1;
      getter = typeof key === "string" ? function(s) {
        return s != null ? s[key] : void 0;
      } : key || function() {};
      return a.sort(function(s1, s2) {
        var v1, v2;
        if ((v1 = getter(s1)) > (v2 = getter(s2))) {
          return dir;
        } else {
          if (v1 < v2) {
            return rdir;
          } else {
            return 0;
          }
        }
      });
    }
  };


  /*
  Uri
   */

  O.Uri = (function() {
    function Uri() {
      this.params = {};
    }

    Uri.prototype.isUri = true;

    Uri.prototype.toString = function() {
      var n, r, sep, v, _ref;
      r = (this.host ? (this.type ? "" + this.type + "://" + this.host + "/" : "//" + this.host + "/") : '') + this.path.join('/');
      sep = '?';
      _ref = this.params;
      for (n in _ref) {
        if (!__hasProp.call(_ref, n)) continue;
        v = _ref[n];
        r += sep + n + "=" + encodeURIComponent(v);
        if (sep === '?') {
          sep = '&';
        }
      }
      if (this.hash) {
        r += "#" + this.hash;
      }
      return r;
    };

    Uri.parse = function(s) {
      var p, r, v, _i, _len, _ref, _ref1;
      if (s != null ? s.isUri : void 0) {
        return s;
      }
      r = new Uri();
      if (!s) {
        return r;
      }
      if (!s.split) {
        s = "" + s;
      }
      if ((p = s.indexOf("://")) > -1) {
        r.type = s.slice(0, +(p - 1) + 1 || 9e9);
        s = s.slice(p + 1);
      }
      if ((p = s.indexOf("#")) > -1) {
        r.hash = s.slice(p + 1);
        s = s.slice(0, +(p - 1) + 1 || 9e9);
      }
      _ref = s.split("?"), s = _ref[0], r.query = _ref[1];
      if (r.query) {
        _ref1 = r.query.split("&");
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          v = _ref1[_i];
          if ((p = v.split("=")).length > 1) {
            r.params[p[0]] = decodeURIComponent(p[1]);
          }
        }
      }
      r.id = s;
      p = s.split("/");
      if (p[0] === "") {
        p.shift();
        if (p[0] === "") {
          p.shift();
          r.host = p.shift();
        }
      }
      r.path = p;
      return r;
    };

    return Uri;

  })();


  /*
  Errors.
   */

  O.error = (function() {
    var Err;
    Err = (function() {
      function Err(e) {
        this.details = [];
        if (typeof e === 'string') {
          if (e) {
            this.reason = e.split(':')[0];
          }
          if (e) {
            this.message = e;
          }
        } else {
          if (e.reason) {
            this.reason = e.reason;
          }
          if (e.message) {
            this.message = e.message;
          }
        }
      }

      Err.prototype.reason = 'unknown';

      Err.prototype.message = '';

      Err.prototype.isError = true;

      Err.prototype.addDetails = function() {
        var det, _i, _len;
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          det = arguments[_i];
          if (!(det)) {
            continue;
          }
          this.details.unshift(det);
          if (det.stack) {
            this.stack = det.stack;
          }
        }
        return this;
      };

      Err.prototype.addPrefix = function(p) {
        if (p) {
          this.prefix = '' + p;
        }
        return this;
      };

      Err.prototype.log = function() {
        O.log(this);
        return this;
      };

      Err.prototype.end = function(x) {
        return x;
      };

      Err.prototype.toString = function() {
        return "" + (this.prefix || '') + " " + this.message;
      };

      Err.prototype.printIntoLog = function(c) {
        var details, stack;
        details = (typeof this.details === "function" ? this.details(length === 1) : void 0) ? this.details[0] : this.details;
        stack = this.stack || (new Error).stack;
        return c.error(this.toString(), details, stack);
      };

      return Err;

    })();
    return function(err, details) {
      return ((err != null ? err.isError : void 0) ? err : new Err(err)).addDetails(details);
    };
  })();


  /*
  Logging.
   */

  Object.log = (function(c) {
    if (c == null) {
      c = {
        log: function() {}
      };
    }
    if (!c.log.apply) {
      c._log = c.log;
      c.log = function() {
        var s;
        return c._log(((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            s = arguments[_i];
            _results.push(s);
          }
          return _results;
        }).apply(this, arguments)).join(", "));
      };
    }
    if (!c.error) {
      c.error = function() {
        var s;
        return c.log.apply(c, ['ERROR: '].concat((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            s = arguments[_i];
            _results.push(s);
          }
          return _results;
        }).apply(this, arguments)));
      };
    }
    return function(x) {
      var e;
      if (x != null ? x.printIntoLog : void 0) {
        x.printIntoLog(c);
      } else {
        c.log.apply(c, (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            e = arguments[_i];
            _results.push(e);
          }
          return _results;
        }).apply(this, arguments));
      }
      return x;
    };
  })(this.console);

}).call(this);


/*
AXOID.JS - Entity, its Properties and Events
 */

(function() {
  var Entity, Event, Property,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Event = (function() {
    var DEFERED, LISTENERS, REGISTRY_BY_TARGET, Record, _compileExpression, _defer, _notify, _obj;

    LISTENERS = {};

    DEFERED = {};

    REGISTRY_BY_TARGET = {};

    _obj = function(key, force) {
      var k, obj, p, p1;
      obj = LISTENERS;
      p1 = -1;
      while ((p = key.indexOf(".", p1 = p + 1)) > -1) {
        obj = obj[k = key.slice(p1, +(p - 1) + 1 || 9e9)] || (obj[k] = {});
      }
      return obj[k = key.slice(p1)] || (force && (obj[k] = {}));
    };

    _defer = function(key) {
      return (DEFERED[key] || (DEFERED[key] = [])).push(this);
    };

    _notify = function(obj) {
      var rec;
      rec = obj != null ? obj.first : void 0;
      while (rec) {
        try {
          rec.handler.call(rec.target, this);
        } catch (_error) {
          Object.error('notify: ' + _error.message, Object.update(_error, {
            op: ('' + rec.handler).replace(/\n+/g, '').slice(9, 151)
          })).log();
        }
        rec = rec.next;
      }
      return this;
    };

    _compileExpression = function(s, tId) {
      var body, fn, src, _reg;
      if (tId == null) {
        tId = this.id;
      }
      _reg = {};
      src = [];
      body = s.replace(/<(@?[\w\.$ ]+?)>/gm, function(s, path) {
        var flag, id, prop, _ref, _ref1;
        _ref = path.split(' '), path = _ref[0], flag = _ref[1];
        _ref1 = path[0] === '@' ? [tId, path.slice(1)] : path.split("."), id = _ref1[0], prop = _ref1[1];
        if (!prop) {
          prop = "value";
        }
        path = id + "." + prop;
        if (!id) {
          throw new Error("No id for binding source in " + s);
        }
        if (!_reg[path]) {
          _reg[path] = 1;
          src.push({
            id: path,
            flag: flag,
            entityId: id,
            propName: prop
          });
        }
        return "$[\"" + path + "\"]";
      });
      fn = (function() {
        try {
          return new Function('$', "return " + (body.replace('@', 'this.')) + ";");
        } catch (_error) {
          Object.error("bad-code: Wrong binding expression: " + body, _error).log();
          return function() {
            return _error.message;
          };
        }
      })();
      return {
        sources: src,
        message: s,
        expression: fn
      };
    };

    Record = (function() {
      function Record(handler, target) {
        var t;
        this.handler = handler;
        this.target = target != null ? target : null;
        if ((t = (target != null ? target._id : void 0) || target)) {
          (REGISTRY_BY_TARGET[t] || (REGISTRY_BY_TARGET[t] = [])).push(this);
        }
      }

      Record.prototype.remove = function() {
        if (this.next) {
          this.next.prev = this.prev;
        } else {
          this.obj.last = this.prev || null;
        }
        if (this.prev) {
          this.prev.next = this.next;
        } else {
          this.obj.first = this.next || null;
        }
        this.obj = null;
        return this;
      };

      Record.prototype.add = function(obj) {
        this.obj = obj;
        if (obj.last) {
          (obj.last.next = this).prev = obj.last;
        } else {
          obj.first = this;
        }
        return obj.last = this;
      };

      return Record;

    })();

    function Event(u) {
      if (u) {
        Object.update(this, u);
      }
      if (this.uri) {
        this.uri = Object.Uri.parse(this.uri);
      }
    }

    Event.prototype.isEvent = true;

    Event.prototype.callback = function() {};

    Event.prototype.update = function(delta) {
      return Object.update(this, delta);
    };

    Event.prototype.addTrace = function(s) {
      if (s) {
        return (this.trace || (this.trace = [])).push(s);
      }
    };

    Event.prototype.fire = function(cb) {
      var key, obj;
      if (!(key = this.uri.type)) {
        throw "No target specified for event " + (this.uri.toString());
      }
      if (cb) {
        this.callback = cb;
      }
      if (obj = LISTENERS[key]) {
        return _notify.call(this, obj);
      } else {
        _defer.call(this, key);
        return Object.log("!!! Defer event for [" + key + "]");
      }
    };

    Event.isEvent = function(e) {
      return e.isEvent;
    };

    Event.listen = function(key, handler, target, dbgMessage) {
      var ev, list, _i, _len;
      if (!key) {
        throw new Error("No key to listen " + target);
      }
      new Record(handler, target, dbgMessage).add(_obj(key, true));
      if (list = DEFERED[key]) {
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          ev = list[_i];
          ev.fire();
        }
        return delete DEFERED[key];
      }
    };

    Event.unlisten = function(key) {
      return delete LISTENERS[key];
    };

    Event.unbindForTarget = function(T) {
      var e, key, reg, _i, _j, _len, _len1, _ref;
      _ref = [T.id, T._id];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (key) {
          if ((reg = REGISTRY_BY_TARGET[key])) {
            for (_j = 0, _len1 = reg.length; _j < _len1; _j++) {
              e = reg[_j];
              e.remove();
            }
            delete REGISTRY_BY_TARGET[key];
          }
        }
      }
      return this;
    };

    Event.notifyPropertyChanged = function(key, ev) {
      var obj;
      if (obj = LISTENERS[key]) {
        return _notify.call(ev, obj[ev.propId]);
      }
    };

    Event.require = (function(_cache) {
      var createCb, performRequire;
      if (_cache == null) {
        _cache = {};
      }
      createCb = function(ctx) {
        return function(err, r) {
          var cb;
          if (err) {
            Object.error(err).log();
          }
          if (!err) {
            ctx.isDone = 1;
          }
          while ((cb = ctx.q.shift())) {
            cb(err, r);
          }
          return 1;
        };
      };
      return performRequire = function(dependencies, cb) {
        if (!(dependencies != null ? dependencies.length : void 0)) {
          return cb(null, 0);
        }
        return Function.perform(dependencies, function(flow) {
          return [
            function() {
              var ctx, x, _i, _len;
              for (_i = 0, _len = dependencies.length; _i < _len; _i++) {
                x = dependencies[_i];
                if (x && (ctx = _cache[x] || (_cache[x] = {
                  q: [],
                  x: x
                })) && !ctx.isDone) {
                  ctx.q.push(flow.wait());
                  if (ctx.q.length === 1) {
                    Object.event.fire(x, createCb(ctx));
                  }
                }
              }
              return flow.next(null, dependencies.length);
            }, cb
          ];
        });
      };
    })();

    Event.bindPropertyExpression = function(T, propName, value) {
      var handler, locked, ps, _bind, _i, _len, _log, _ref;
      handler = _compileExpression.call(T, value, T.id);
      locked = false;
      _log = function(s) {
        if (Object.DEBUG) {
          return Object.log("binding: " + T + "[" + propName + "] " + s);
        }
      };
      _bind = function(ev) {
        var e, p, val, values, _i, _len, _ref;
        if (locked) {
          return;
        }
        values = {};
        _ref = handler.sources;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (!(e = Entity.get(p.entityId))) {
            return _log("No source of " + p.id);
          }
          if (!(val = e.prop(p.propName)) && ((val === void 0 && p.flag !== 'optional') || (p.flag === 'required'))) {
            return _log("No value from " + p.id);
          }
          values[p.id] = val;
        }
        locked = true;
        try {
          value = handler.expression.call(T, values);
          if (Object.DEBUG) {
            _log("= [" + handler.message + "] (" + (('' + value).replace('\n', ' ').slice(0, 31)) + ")");
          }
          return T.prop(propName, value);
        } finally {
          locked = false;
        }
      };
      _ref = handler.sources;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ps = _ref[_i];
        this.listen(ps.id, _bind, T);
      }
      return _bind();
    };

    Event.doubleBindProperty = function(tId, tProp, path, monitor) {
      var s0, sId, sProp, val, _bind, _log, _ref, _ref1;
      if (monitor == null) {
        monitor = {
          locked: false
        };
      }
      _ref = path.split('.'), sId = _ref[0], sProp = _ref[1];
      if (!sProp) {
        _ref1 = [path + '.value', 'value'], path = _ref1[0], sProp = _ref1[1];
      }
      _log = function(s) {
        if (Object.DEBUG) {
          return Object.log("duplex: " + tId + "[" + tProp + "] " + s);
        }
      };
      _bind = function(ev) {
        if (monitor.locked) {
          return;
        }
        monitor.locked = true;
        try {
          return (Entity.get(tId)).prop(tProp, ev.value);
        } finally {
          monitor.locked = false;
        }
      };
      this.listen(path, _bind, tId);
      if (!monitor.reverse) {
        if ((s0 = Entity.get(sId)) && ((val = s0.prop(sProp)) !== void 0)) {
          _bind({
            entity: s0,
            value: val
          });
        }
        monitor.reverse = true;
        this.doubleBindProperty(sId, sProp, tId + "." + tProp, monitor);
      }
      return true;
    };

    return Event;

  })();

  Property = (function() {
    var ALL, STUB, TYPES;

    STUB = function() {};

    ALL = {};

    TYPES = {};

    function Property(id) {
      var ftor, k, methods, typeId, v, _ref, _super;
      this.id = id;
      _ref = this.id.split(':'), this.id = _ref[0], typeId = _ref[1];
      if (this.id.slice(-3) === "Uri") {
        this.asyncTarget = this.id.slice(0, -3);
      }
      if (typeId) {
        if (!(this.type = TYPES[typeId])) {
          throw new Error("ERROR: No such property type: " + typeId);
        }
        if ((ftor = this.type.methods) && (methods = ftor(_super = {}))) {
          for (k in methods) {
            v = methods[k];
            if (typeof v === "function") {
              _super[k] = this[k] || STUB;
            }
            this[k] = v;
          }
        }
      }
    }

    Property.prototype.attachToEntityCtor = function(ctor) {
      var _ref;
      if ((_ref = this.type) != null ? _ref.mixin : void 0) {
        return Entity.applyMixin.call(ctor.prototype, this.type.mixin, this);
      }
    };

    Property.prototype.extractDefaults = function(T, defaults) {
      var n;
      if (T[n = this.id] && (defaults[n] = T[n])) {
        T[n] = void 0;
      }
      if (T[n = this.id + 'Expression'] && (defaults[n] = T[n])) {
        T[n] = void 0;
      }
      if (T[n = this.id + 'Binding'] && (defaults[n] = T[n])) {
        T[n] = void 0;
      }
      if (!this.asyncTarget) {
        if (T[n = this.id + 'Uri'] && (defaults[n] = T[n])) {
          T[n] = void 0;
        }
        if (T[n = this.id + 'UriExpression'] && (defaults[n] = T[n])) {
          T[n] = void 0;
        }
      }
      return defaults;
    };

    Property.prototype.init = function(T, defs) {
      var expr, v;
      if ((v = defs[this.id]) !== void 0) {
        T.prop(this.id, {
          isEvent: true,
          value: v,
          force: true
        });
      }
      if (defs["" + this.id + "Uri"] || defs["" + this.id + "UriExpression"]) {
        Property.instance("" + this.id + "Uri").init(T, defs);
      }
      if ((expr = defs["" + this.id + "Binding"])) {
        Event.doubleBindProperty(T.id, this.id, expr);
      }
      if ((expr = defs["" + this.id + "Expression"])) {
        return Event.bindPropertyExpression(T, this.id, expr);
      }
    };

    Property.prototype.done = function(T) {
      return T[this.id] = null;
    };

    Property.prototype.getter = function(T) {
      return T[this.id];
    };

    Property.prototype.setter = function(T, v, ev) {
      return T[this.id] = v;
    };

    Property.prototype.comparator = function(v1, v2) {
      return v1 === v2;
    };

    Property.prototype.asyncAdapter = function(err, value) {
      return Object.event.create({
        value: value || null,
        error: err
      });
    };

    Property.prototype.createAsyncValueCallback = function(T) {
      var uuid;
      uuid = T._monitor[this.id] = Object.math.uuid();
      return (function(_this) {
        return function(err, value) {
          if (!T.isDone && (uuid === T._monitor[_this.id])) {
            return T.prop(_this.id, (T["" + _this.id + "AsyncAdapter"] || _this.asyncAdapter).call(T, err, value));
          }
        };
      })(this);
    };

    Property.prototype.setValueForUri = function(T, uri) {
      return Object.event.fire(uri, this.createAsyncValueCallback(T));
    };

    Property.prototype.setValue = function(T, ev) {
      var uri, v;
      if (!(ev != null ? ev.isEvent : void 0)) {
        ev = Object.event.create({
          value: ev
        });
      }
      ev.propId = this.id;
      ev.entity = T;
      ev.oldValue = this.getter(T);
      if (ev.uri) {
        uri = ev.uri;
        ev.uri = null;
      }
      if (((v = ev.value) !== void 0) && (ev.force || !this.comparator(v, ev.oldValue))) {
        this.setter(T, v, ev);
        if (this.asyncTarget && v) {
          T.prop(this.asyncTarget, Object.event.create({
            value: null,
            uri: v,
            force: true
          }));
        }
        T.propertyChanged(ev);
      }
      if (uri) {
        this.setValueForUri(T, uri);
      }
      return ev;
    };

    Property.define = function(meta) {
      return TYPES[meta.id] = meta;
    };

    Property.instance = function(id) {
      return ALL[id] || (ALL[id] = new Property(id));
    };

    return Property;

  })();

  Entity = (function() {
    var ALL, STUB, TOTAL, TYPES;

    function Entity() {}

    STUB = function() {};

    ALL = {};

    TYPES = {};

    TOTAL = 0;

    Entity.prototype.launch = function(cb) {
      this.init();
      return typeof cb === "function" ? cb(null, this) : void 0;
    };

    Entity.prototype.init = function() {
      var defs, n, p, _ref, _ref1;
      defs = {};
      _ref = this.constructor.properties;
      for (n in _ref) {
        p = _ref[n];
        p.extractDefaults(this, defs);
      }
      _ref1 = this.constructor.properties;
      for (n in _ref1) {
        p = _ref1[n];
        p.init(this, defs);
      }
      if (this.onEvent) {
        Event.listen(this.id, this.onEvent, this);
      }
      return typeof this.onInited === "function" ? this.onInited(this) : void 0;
    };

    Entity.prototype.done = function() {
      var n, p, _ref;
      this.isDone = true;
      if (this.id) {
        delete ALL[this.id];
        Event.unlisten(this.id);
      }
      _ref = this.constructor.properties;
      for (n in _ref) {
        p = _ref[n];
        p.done(this);
      }
      return Event.unbindForTarget(this);
    };

    Entity.prototype.prop = function(key, value) {
      var p;
      if (this.isDone) {
        return null;
      }
      p = this.constructor.properties;
      if (arguments.length === 1) {
        return (p[key] ? p[key].getter(this) : this[key]);
      }
      (p[key] || (p[key] = Property.instance(key))).setValue(this, value);
      return value;
    };

    Entity.prototype.propertyChanged = function(ev) {
      var _ref;
      if ((_ref = this["" + ev.propId + "Changed"]) != null) {
        _ref.call(this, ev, ev.value);
      }
      if (this.id) {
        return Event.notifyPropertyChanged(this.id, ev);
      }
    };

    Entity.prototype.error = function(e, details) {
      return Object.error(e).addPrefix(this).addDetails(details).log();
    };

    Entity.prototype.log = function(x) {
      var args, e;
      args = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          e = arguments[_i];
          _results.push(e);
        }
        return _results;
      }).apply(this, arguments);
      args[0] = "" + this + ": " + x;
      return Object.log.apply(Object, args);
    };

    Entity.prototype.toString = function() {
      if (this.id) {
        return "[" + this.id + "]";
      } else {
        return "[" + this.constructor.type.id + ":" + this._id + "]";
      }
    };

    Entity.applyMixin = function(fn, p) {
      var m, n, _ref, _super;
      if (!fn) {
        return this;
      }
      _ref = fn(_super = {}, p);
      for (n in _ref) {
        if (!__hasProp.call(_ref, n)) continue;
        m = _ref[n];
        _super[n] = this[n] || STUB;
        this[n] = m;
      }
      return this;
    };

    Entity.parseMeta = function(m) {
      var id, _ref;
      if (typeof m === "string") {
        m = {
          id: m
        };
      }
      if (!m.typeId) {
        id = m.id;
        _ref = __indexOf.call(id, ':') >= 0 ? id.split(":") : [null, id], m.id = _ref[0], m.typeId = _ref[1];
      }
      return m;
    };

    Entity.defineType = function(m) {
      var _ref;
      _ref = m.id.split(" extends "), m.id = _ref[0], m.superId = _ref[1];
      return TYPES[m.id] = m;
    };

    Entity.getCtor = function(t) {
      if ((t = TYPES[t])) {
        return t.ctor || (t.ctor = this.createCtor(t));
      }
    };

    Entity.createCtor = (function() {
      var PKEYS, _applyType;
      PKEYS = ['id', 'superId', 'properties', 'methods'];
      _applyType = function(t) {
        var k, p, pId, v, _i, _len, _ref;
        if (t.superId) {
          _applyType.call(this, TYPES[t.superId]);
        }
        if (t.properties) {
          _ref = t.properties;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            pId = _ref[_i];
            if (this.properties[pId]) {
              Object.error("bad-code: Duplicate property " + pId + " in type " + t.id).log();
            } else {
              (this.properties[(p = Property.instance(pId)).id] = p).attachToEntityCtor(this);
            }
          }
        }
        for (k in t) {
          if (!__hasProp.call(t, k)) continue;
          v = t[k];
          if (__indexOf.call(PKEYS, k) < 0) {
            this.options[k] = v;
          }
        }
        Entity.applyMixin.call(this.prototype, t.methods);
        return this;
      };
      return function(type) {
        var ctor, k, v, _ref;
        ctor = function(id, options) {
          var k, v, _ref;
          this.id = id;
          this._id = "E" + (TOTAL++);
          this._monitor = {};
          _ref = this.constructor.options;
          for (k in _ref) {
            if (!__hasProp.call(_ref, k)) continue;
            v = _ref[k];
            this[k] = v;
          }
          if (options) {
            for (k in options) {
              if (!__hasProp.call(options, k)) continue;
              v = options[k];
              if (__indexOf.call(PKEYS, k) < 0) {
                this[k] = v;
              }
            }
          }
          return this;
        };
        _ref = Entity.prototype;
        for (k in _ref) {
          if (!__hasProp.call(_ref, k)) continue;
          v = _ref[k];
          ctor.prototype[k] = v;
        }
        ctor.type = type;
        ctor.options = {};
        ctor.properties = {};
        return _applyType.call(ctor, type, {});
      };
    })();

    Entity.findUnresolvedType = function(typeId) {
      var type;
      if (!(type = TYPES[typeId])) {
        return typeId;
      }
      if (type.superId) {
        return this.findUnresolvedType(type.superId);
      } else {
        return null;
      }
    };

    Entity.resolveType = function(typeId, cb) {
      return Object.event.require(["entity://" + typeId], (function(_this) {
        return function(err) {
          var utype;
          if (!TYPES[typeId]) {
            throw new Error("Can't resolve type " + typeId);
          }
          if ((utype = _this.findUnresolvedType(typeId))) {
            return _this.resolveType(utype, cb);
          }
          return cb();
        };
      })(this));
    };

    Entity.createInlineCtor = function(meta) {
      return this.createCtor({
        id: "T" + (TOTAL++),
        options: meta,
        superId: meta.typeId,
        properties: meta.properties || [],
        methods: meta.methods
      });
    };

    Entity.create = function(meta, cb) {
      var Ctor, obj, typeId, utype;
      meta = this.parseMeta(meta);
      typeId = meta.typeId;
      if ((utype = this.findUnresolvedType(typeId))) {
        return this.resolveType(utype, ((function(_this) {
          return function(err) {
            if (!err) {
              return _this.create(meta, cb);
            }
          };
        })(this)));
      }
      Ctor = meta.properties || meta.methods ? this.createInlineCtor(meta) : this.getCtor(typeId);
      obj = new Ctor(meta.id, meta);
      if (obj.id) {
        ALL[obj.id] = obj;
      }
      obj.launch(cb);
      return obj;
    };

    Entity.get = function(id) {
      if (id._id) {
        return id;
      } else {
        if (id) {
          return ALL[id];
        }
      }
    };

    return Entity;

  })();


  /* 
  API - `There are Entities tied by Events`
   */

  Object.event = {
    create: function(delta) {
      return new Event(delta);
    },
    fire: function(event, callback) {
      return this.create(event.uri ? event : {
        uri: event
      }).fire(callback);
    },
    require: function(dependencies, callback) {
      return Event.require(dependencies, callback);
    }
  };

  Object.entity = {
    define: function(meta) {
      return Entity.defineType(meta);
    },
    defineProperty: function(meta) {
      return Property.define(meta);
    },
    create: function(meta, callback) {
      return Entity.create(meta, callback);
    }
  };

}).call(this);

(function() {
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

}).call(this);

(function() {
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

}).call(this);

(function() {
  Object.entity.define({
    id: "EnumService extends commons.L10nService",
    methods: function(_super) {
      var CACHE;
      CACHE = {};
      return {
        prepareEnum: function(r) {
          var id, k, v, _results;
          _results = [];
          for (k in r) {
            v = r[k];
            if (id = +k || k) {
              if (typeof v === 'string') {
                _results.push({
                  id: id,
                  name: v
                });
              } else {
                v.id = id;
                _results.push(v);
              }
            }
          }
          return _results;
        },
        onEvent: function(ev, u, key) {
          var r;
          if (u == null) {
            u = ev.uri;
          }
          if (key == null) {
            key = u.host;
          }
          if (r = CACHE[key]) {
            return ev.callback(null, r);
          }
          if (!(r = String.localize.get(key))) {
            return ev.callback("not-found: enum [" + key + "]");
          }
          if (!(r = this.prepareEnum(r))) {
            return ev.callback("bad-code: enum [" + key + "]");
          }
          return ev.callback(null, CACHE[key] = r);
        }
      };
    }
  });

  Object.entity.define({
    id: "L10nService",
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
            if (b) {
              _results.push(String.localize.add(b));
            }
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


/* 
 Very common properties.
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
              Function.nextTick(50, this, function() {
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

}).call(this);


/*
HttpService.
 */

(function() {
  Object.entity.define({
    id: "HttpService extends EventHandler",
    defaultHost: window.location.hostname,
    defaultProtocol: window.location.protocol.slice(0, -1),
    methods: function(_super) {
      var F0, MIME, PARSERS, RQTOR, _newRequest;
      F0 = function(x) {
        return x;
      };
      MIME = {
        json: "application/json",
        js: "application/json",
        html: "text/html",
        txt: "text/plain"
      };
      RQTOR = window["XMLHttpRequest"] || (function() {
        try {
          return window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (_error) {}
      })();
      PARSERS = {
        js: Object.parse,
        json: Object.parse,
        uri: Object.parseUri
      };
      _newRequest = function() {
        return new RQTOR();
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
          return ev.callback(this.negotiateError(rq.status, rq.statusText, ev), (ev.unmarshaller || PARSERS[ev.dataType] || F0)(rq.responseText));
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

(function() {
  var __slice = [].slice;

  (function(global) {
    var IDB, IDBCursor, IDBKeyRange, NEXT, PREV, S4, guid, _CURSOR, _FIND, _OPS, _PUT, _STORE, _UPGRADE, _getDoc, _openCursorArgs;
    IDB = global.indexedDB || global.webkitIndexedDB || global.mozIndexedDB || global.msIndexedDB;
    IDBKeyRange = global.IDBKeyRange || global.webkitIDBKeyRange;
    IDBCursor = global.IDBCursor || global.webkitIDBCursor || global.mozIDBCursor || global.msIDBCursor;
    PREV = IDBCursor.PREV || "prev";
    NEXT = IDBCursor.NEXT || "next";
    S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    guid = function() {
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };
    _openCursorArgs = function(options) {
      var desc, lower, range, upper;
      desc = options.descend || (options.dir === "desc");
      if (!(range = options.range)) {
        return [null, !desc ? NEXT : PREV];
      }
      if (range instanceof Array) {
        lower = range[0], upper = range[1];
        if (upper === null) {
          return [IDBKeyRange.lowerBound(lower)];
        } else if (lower === null) {
          return [IDBKeyRange.upperBound(upper)];
        } else {
          if (desc = lower > upper) {
            return [IDBKeyRange.apply(null, __slice.call([upper, lower]).concat([PREV]))];
          } else {
            return [IDBKeyRange.apply(null, __slice.call([lower, upper]).concat([NEXT]))];
          }
        }
      }
      return [IDBKeyRange.only(range)];
    };
    _getDoc = function(store, ev) {
      var index, key, val;
      if (val = ev.id) {
        return store.get(val);
      }
      for (key in store.indexNames) {
        index = store.index(key);
        if (val = ev[index.keyPath]) {
          return index.get(val);
        }
      }
      return null;
    };
    _UPGRADE = (function() {
      var createStore, _idx;
      _idx = function(idx) {
        if (idx.keyPath) {
          return idx;
        } else {
          return {
            keyPath: idx
          };
        }
      };
      createStore = function(id, idx, indices) {
        var store, _i, _len, _results;
        if (idx == null) {
          idx = 'id';
        }
        if (indices == null) {
          indices = [];
        }
        store = this.createObjectStore(id, _idx(idx));
        _results = [];
        for (_i = 0, _len = indices.length; _i < _len; _i++) {
          idx = indices[_i];
          if (idx = _idx(idx)) {
            _results.push(store.createIndex(String.camelize(idx.keyPath, ","), idx.keyPath, idx.options));
          }
        }
        return _results;
      };
      return function(ev, cb) {
        var db, s, st, _i, _j, _len, _len1, _ref, _ref1, _results;
        this.log("Upgrade", ev.oldVersion, " => ", ev.newVersion);
        db = ev.target.result;
        _ref = db.objectStoreNames;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          db.deleteObjectStore(s);
        }
        if (!this.scheme) {
          throw new Error("No scheme for db " + this.id);
        }
        _ref1 = this.scheme;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          st = _ref1[_j];
          if ((st = st.id ? st : {
            id: st
          })) {
            _results.push(createStore.call(db, st.id, st.keyPath, st.indices));
          }
        }
        return _results;
      };
    })();
    _STORE = function() {
      var txType, _ref;
      txType = (_ref = this.operation) === "query" || _ref === "read" ? "readonly" : "readwrite";
      try {
        this.store = this.home.db.transaction(this.scope || [this.storeId], txType).objectStore(this.storeId);
        return this.next();
      } catch (_error) {
        return this.callback(this.home.error('db', 'can\'t obtain the store ' + this.storeId, _error));
      }
    };
    _CURSOR = function(store, options, next) {
      var cursor, elements, key, processed, skipped, src;
      if (options == null) {
        options = {};
      }
      key = options.key;
      src = key ? store.index(String.camelize(key, ",")) : store;
      if (!(cursor = src.openCursor.apply(src, _openCursorArgs(options)))) {
        return next("No cursor");
      }
      cursor.onerror = function(e) {
        return next(Object.error("failed", "cursor error", e));
      };
      elements = [];
      skipped = 0;
      processed = 0;
      cursor.onsuccess = function(e) {
        cursor = e.target.result;
        if (!cursor) {
          return next(null, elements);
        }
        if (options.limit && processed >= options.limit) {
          next(null, elements);
          e.target.transaction.abort();
        } else if (options.offset && options.offset > skipped) {
          skipped++;
          cursor["continue"]();
        } else {
          elements.push(cursor.value);
          processed++;
          cursor["continue"]();
        }
        return 0;
      };
      return 0;
    };
    _FIND = function() {
      var cb, req;
      cb = this.next;
      if (!(req = _getDoc(this.store, this.options))) {
        return cb("not_specified");
      }
      req.onsuccess = function(event) {
        var data, err;
        if (!(data = event.target.result)) {
          err = "not_found";
        }
        return cb(err, data);
      };
      req.onerror = function() {
        return cb("not_found");
      };
      return 0;
    };
    _PUT = [
      function() {
        var docs, on_;
        docs = [].concat(this.payload);
        on_ = (function(_this) {
          return function() {
            var doc, tx;
            if (!(doc = docs.shift())) {
              return _this.next();
            }
            if (!doc.id) {
              doc.id = guid();
            }
            doc.ts = Date.now().valueOf();
            tx = _this.store.put(doc);
            tx.onsuccess = on_;
            return tx.onerror = _this.next;
          };
        })(this);
        return on_();
      }, function() {
        this.home.prop('touch', Date.now());
        return this.next();
      }
    ];
    _OPS = {
      query: function() {
        return _CURSOR(this.store, this.options, this.next);
      },
      find: _FIND,
      field: [
        _FIND, function(err, data) {
          return this.next(err, data != null ? data[this.options.field] : void 0);
        }
      ],
      insert: _PUT,
      update: _PUT,
      upsert: _PUT,
      remove: function() {
        var tx;
        tx = store["delete"](this.payload[0].id);
        tx.oncomplete = this.next;
        return tx.onerror = (function(_this) {
          return function() {
            return _this.next("Not Deleted");
          };
        })(this);
      },
      clear: function() {
        var tx;
        tx = store.clear();
        tx.oncomplete = this.next;
        return tx.onerror = (function(_this) {
          return function() {
            return _this.next("Not cleared");
          };
        })(this);
      },
      sync: function() {
        var uri;
        if (uri = this.prop('syncDeltaUri')) {
          return this.prop('syncDeltaUri', uri);
        }
      }
    };
    return Object.entity.define({
      id: "IndexedDatabase extends EventHandler",
      properties: ['touch', "sync"],
      version: 1,
      methods: function(_super) {
        return {
          launch: function(cb) {
            var tx;
            tx = IDB.open(this.id, this.version);
            tx.onblocked = (function(_this) {
              return function(ev) {
                return _this.error("db", "blocked");
              };
            })(this);
            tx.onerror = (function(_this) {
              return function(ev) {
                return _this.error("db", "couldn't not connect", ev);
              };
            })(this);
            tx.onabort = (function(_this) {
              return function(ev) {
                return _this.error("db", "connection aborted", ev);
              };
            })(this);
            tx.onsuccess = (function(_this) {
              return function(ev) {
                _this.db = ev.target.result;
                return _super.launch.call(_this, cb);
              };
            })(this);
            return tx.onupgradeneeded = (function(_this) {
              return function(ev) {
                var _ref;
                if ((_ref = global.localStorage) != null) {
                  _ref[_this.id + 'LastSync'] = 0;
                }
                return _UPGRADE.call(_this, ev, function() {
                  return _super.launch.call(_this, cb);
                });
              };
            })(this);
          },
          init: function() {
            var _ref;
            _super.init.call(this);
            this.prop('lastSynchedTimestamp', (_ref = global.localStorage) != null ? _ref[this.id + 'LastSync'] : void 0);
            if (this.socketChannel) {
              return Object.entity.create({
                id: this.id + 'Socket:SocketClient',
                channel: this.socketChannel
              });
            }
          },
          done: function() {
            var _ref;
            if ((_ref = this.db) != null) {
              _ref.close();
            }
            return _super.done.call(this);
          },
          handleEvent: function(ev, u) {
            ev.home = this;
            ev.storeId = u.path[0].toLowerCase();
            ev.operation = u.host;
            ev.payload = ev.docs || [ev.doc];
            ev.options = Object.update(u.params, ev.options);
            return Function.perform(ev, function(flow) {
              this.next = flow.next;
              return [_STORE].concat(_OPS[this.operation], this.callback);
            });
          },
          syncChanged: function(ev, delta) {
            if (!delta) {
              return this._newSyncTs = Date.now();
            }
            return Function.perform(this, function(flow) {
              return [
                function() {
                  var docs, storeId;
                  for (storeId in delta) {
                    docs = delta[storeId];
                    if ((storeId = storeId.split('_')[0])) {
                      Object.event.fire({
                        uri: "db://upsert/" + storeId,
                        docs: docs,
                        callback: flow.wait()
                      });
                    }
                  }
                  return flow.next();
                }, function() {
                  return this.prop('lastSynchedTimestamp', this._newSyncTs);
                }
              ];
            });
          },
          lastSynchedTimestampChanged: function(ev, ts) {
            var fn, _ref;
            if ((_ref = global.localStorage) != null) {
              _ref.setItem(this.id + 'LastSync', ts);
            }
            if (this.syncPeriod) {
              fn = (function(_this) {
                return function() {
                  return _this.prop('lastSynchedTimestampByPeriod', ts);
                };
              })(this);
              return global.setTimeout(fn, this.syncPeriod);
            } else {
              if (!this.prop('lastSynchedTimestampOnce')) {
                return this.prop('lastSynchedTimestampOnce', ts);
              }
            }
          }
        };
      }
    });
  })(this);

}).call(this);

(function() {
  Object.entity.defineProperty({
    id: "SubmitSupport",
    mixin: function(_super) {
      var RE_TILDA;
      RE_TILDA = /~/g;
      return {
        validateFields: function() {
          var ev, ev0, f, firstInput, valid, _i, _len, _ref;
          ev = {
            stack: []
          };
          valid = true;
          if (this.fields) {
            _ref = this.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              f = _ref[_i];
              ev0 = Object.entity.get(f).checkIfValid();
              if (ev0.stack.length) {
                ev.stack.push.apply(ev.stack, ev0.stack);
              }
            }
            if (!(valid = !ev.stack.length)) {
              if (firstInput = ev.stack[0].entity.valueElt) {
                firstInput.domNode.focus();
              }
              this.error(ev);
            }
          }
          return valid;
        },
        fieldsValues: function() {
          var key, r, _i, _j, _len, _len1, _ref, _ref1;
          r = {};
          if (this.fields) {
            _ref = this.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              key = _ref[_i];
              Object.prop(r, key.replace(RE_TILDA, "."), Object.entity.get(key).getValue());
            }
          }
          if (this.inputs) {
            _ref1 = this.inputs;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              key = _ref1[_j];
              Object.prop(r, key.replace(RE_TILDA, "."), window.document.getElementById(key).value);
            }
          }
          return r;
        },
        getFields: function() {
          var key, r, _i, _len, _ref;
          r = {};
          if (this.fields) {
            _ref = this.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              key = _ref[_i];
              r[key] = Object.entity.get(key);
            }
          }
          return r;
        },
        create_onload_handler: function() {
          var T;
          T = this;
          return function(ev) {
            var doc, err, frame, value, win;
            if (!T.frameElt) {
              return;
            }
            frame = T.frameElt.domNode;
            doc = frame.contentDocument;
            win = frame.contentWindow || doc.window || frame;
            if (win.location.href === "about:blank") {
              return;
            }
            err = null;
            value = Object.parse(doc.body.innerText || doc.body.textContent || doc.body.innerHTML);
            if (!value) {
              value = {
                errors: [
                  {
                    reason: "server_error"
                  }
                ]
              };
            }
            if (value.errors && value.errors.length) {
              err = {
                stack: value.errors
              };
            }
            return T.onResult(err, value);
          };
        },
        onResult: function(err, value) {
          if (err) {
            return this.error(err);
          } else {
            return this.success(value);
          }
        },
        error: function(err) {
          return Object.dom.handleError(err, this);
        },
        success: function(x) {
          return x;
        }
      };
    }
  });

  Object.entity.define({
    id: "AsyncButton extends Button",
    properties: ["support:SubmitSupport"],
    busyCaption: "in_progress",
    methods: function(_super) {
      return {
        createAsyncDoc: function() {
          return this.fieldsValues();
        },
        async: function() {
          return this.validateFields() && this.createAsyncEvent();
        },
        createAsyncEvent: function() {
          return {
            uri: this.asyncUrl,
            doc: this.createAsyncDoc(),
            callback: this.createAsyncCallback()
          };
        },
        createAsyncCallback: function() {
          return this.onResult;
        }
      };
    }
  });

  Object.entity.define({
    id: "Form extends Box",
    properties: ["disabled:Disabled", "support:SubmitSupport", "value:Values"],
    domNodeType: "form",
    domNodeAttrs: {
      onsubmit: function() {
        return false;
      }
    },
    submit: function() {
      return this.domNode.submit();
    }
  });

  Object.entity.define({
    id: "SubmitForm extends Form",
    enctype: "application/x-www-form-urlencoded",
    method: "post",
    action: "#",
    methods: function(_super) {
      return {
        init: function() {
          var T, id;
          T = this;
          id = this.id;
          if (!this.domNode) {
            this.domNode = Object.dom.createComplexElement(String.format("<form enctype=\"{0}\" method=\"{1}\" target=\"{2}_target\" action=\"{3}\"></form>", this.enctype, this.method, this.id, this.action), this.domNodeAttrs);
          }
          Object.dom.listenEvents(this, "submit", function() {
            return T.validateFields();
          });
          _super.init.call(this);
          return this.createChild({
            id: id + "_target:View",
            onInited: function() {
              return T.frameElt = this;
            },
            domNode: Object.dom.createComplexElement("<iframe src=\"about:blank\" style=\"display:none;\" name=\"" + this.id + "_target\"></iframe>")
          }, function(err, e) {
            e && Object.dom.listenEvents(e, "load", this.create_onload_handler());
          });
        },
        childrenAdapter: function(ch) {
          return [].concat(ch);
        }
      };
    }
  });

  Object.entity.define({
    id: "SubmitButton extends View",
    methods: function(_super) {
      return {
        init: function() {
          this.domNode = Object.dom.createComplexElement("<input type=\"submit\"/>", {
            value: String.localize(this.caption)
          });
          return _super.init.call(this);
        }
      };
    }
  });

  Object.entity.define({
    id: "FileContent extends Field",
    methods: function(_super) {
      return {
        childrenAdapter: function(ch) {
          var T;
          return _super.childrenAdapter.call(T = this, [
            {
              id: this.id + "_input:View",
              onInited: function() {
                return T.valueElt = this;
              },
              domNode: Object.dom.createComplexElement(String.format("<input type=\"file\" class=\"{0}\" name=\"{1}\"/>", this.valueStyle, this.fileFieldName || this.id), {
                onchange: this.create_onchange_handler()
              })
            }
          ].concat(ch));
        },
        create_onchange_handler: function() {
          return (function(_this) {
            return function(ev) {
              var f, reader, _i, _len, _ref;
              _ref = ev.target.files;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                f = _ref[_i];
                reader = new FileReader();
                reader.onload = function(e) {
                  _this.prop('file', f);
                  return _this.prop('value', e.target.result);
                };
                reader.readAsBinaryString(f);
                return;
              }
            };
          })(this);
        }
      };
    }
  });

  Object.entity.define({
    id: "FileUploader extends Field",
    properties: ["attempt", "submitSupport:SubmitSupport"],
    methods: function(_super) {
      return {
        init: function() {
          if (!this.domNode) {
            this.domNode = Object.dom.createComplexElement(String.format("<form enctype=\"multipart/form-data\", method=\"post\" target=\"{0}_target\" action=\"{1}\"></form>", this.id, this.action), this.domNodeAttrs);
          }
          _super.init.call(this);
          Object.dom.listenEvents(this.frameElt, "load", this.create_onload_handler());
        },
        childrenAdapter: function(ch) {
          var T, id;
          T = this;
          id = this.id;
          return _super.childrenAdapter.call(this, [
            {
              id: id + "_input:View",
              onInited: function() {
                return T.valueElt = this;
              },
              domNode: Object.dom.createComplexElement(String.format("<input type=\"file\" class=\"{0}\" name=\"{1}\"/>", this.valueStyle, this.fileFieldName || id), {
                onchange: this.create_onchange_handler()
              })
            }, {
              id: id + "_link:View",
              onInited: function() {
                return T.linkElt = this;
              },
              domNodeType: "a",
              domNodeAttrs: {
                target: "_blank"
              }
            }, {
              onInited: function() {
                return T.frameElt = this;
              },
              id: id + "_target:View",
              domNode: Object.dom.createComplexElement("<iframe src=\"about:blank\" style=\"display:none;\" name=\"" + this.id + "_target\"></iframe>", {
                onload: this.create_onload_handler()
              })
            }
          ].concat(ch));
        },
        submit: function() {
          var _base;
          return typeof (_base = this.domNode).submit === "function" ? _base.submit() : void 0;
        },
        create_onchange_handler: function() {
          return function(ev) {
            return true;
          };
        },
        error: function(ev) {
          ev.alertEntity = this.linkElt;
          return _super.error.call(this, ev);
        },
        success: function(ev) {
          var a, url;
          url = "" + (ev && ev.uri || "");
          if (url) {
            a = this.linkElt.domNode;
            a.className = "";
            a.innerHTML = "link";
            this.setValue(a.href = "//" + url);
          }
          return this.prop("attempt", 1 + (this.prop("attempt" || 0)));
        }
      };
    }
  });


  /*
  UI field ancestor.
   */

  Object.entity.define({
    id: "Field extends Box",
    properties: ["caption:Caption", "value:Value", "disabled:Disabled", 'hint'],
    children: [],
    caption: "",
    style: "form-group",
    valueBoxStyle: "form-input-container",
    valueStyle: "form-control",
    captionStyle: "control-label",
    methods: function(_super) {
      return {
        init: function() {
          var _ref;
          this.caption = this.caption || ((_ref = this.id) != null ? _ref.split(".")[-1] : void 0);
          return _super.init.call(this);
        },
        childrenAdapter: function(ch) {
          var T;
          T = this;
          if (!(ch != null ? ch.length : void 0)) {
            ch = [
              {
                id: this.id + "_input:View",
                onInited: function() {
                  return T.valueElt = this;
                },
                style: this.valueStyle,
                tapped: function(ev) {
                  return T.doFocus(ev);
                }
              }
            ];
          }
          return [
            {
              id: this.id + "_label:Label",
              onInited: function() {
                return T.captionElt = this;
              },
              domNode: Object.dom.createComplexElement(String.format("<label class=\"{0}\" for=\"{1}_input\"/>", this.captionStyle, this.id))
            }, {
              id: "Box",
              style: this.valueBoxStyle,
              children: ch
            }
          ];
        },
        launchEditor: Function.NONE,
        doFocus: function(ev) {
          this.launchEditor(ev);
        },
        isEditable: function() {
          return !this.readOnly;
        },
        valueChanged: function(ev) {
          this.redrawValue();
        },
        redrawValue: function() {
          if (this.valueElt) {
            this.valueElt.domNode.innerHTML = this.getCValue();
          }
          this.domNodeClass("!error");
        },
        doneEditor: function(ev) {
          var value;
          value = ev.value;
          if (value === this.getValue()) {
            return;
          }
          ev.fromUI = true;
          ev.isEvent = true;
          this.setValue(ev);
        },
        addValidationRule: function(rule) {
          this.rules = (this.rules || []).concat(rule);
        },
        checkIfValid: function() {
          var e, err, rule, valid, _i, _j, _len, _len1, _ref, _ref1;
          err = {
            stack: []
          };
          if (this.isValueRequired() && this.isEmptyValue()) {
            err.stack.push({
              reason: "empty_required_field",
              message: String.localize("empty_required_field", String.localize(this.caption || this.id))
            });
          }
          if (rules) {
            _ref = this.rules;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              rule = _ref[_i];
              rule.call(this, err);
            }
          }
          valid = !err.stack.length;
          if (!valid) {
            _ref1 = err.stack;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              e = _ref1[_j];
              e.entity = this;
            }
          }
          this.toggleDomNodeClass("error", !valid);
          return err;
        },
        isValueRequired: function() {
          return this.valueRequired;
        },
        getCValue: function() {
          return this.getValue();
        },
        getCaptionHtml: function(v, ev) {
          return String.localize(v || this.id) + (this.valueRequired ? " <span class=\"required\">*</span>" : "");
        },
        disabledChanged: function(ev, v) {
          _super.disabledChanged.apply(this, arguments);
          return Object.prop(this, "valueElt.domNode.disabled", v);
        },
        hintChanged: function(ev, v) {
          var _ref;
          return (_ref = this.hintElt) != null ? _ref.prop('caption', v) : void 0;
        }
      };
    }
  });

  Object.entity.define({
    id: "Input extends Field",
    alive: true,
    maxLength: 128,
    inputTag: "input",
    inputType: "text",
    methods: function(_super) {
      return {
        childrenAdapter: function(ch) {
          ch = this.getInputChildrenMeta();
          return _super.childrenAdapter.call(this, ch);
        },
        getInputChildrenMeta: function(ch) {
          var T;
          T = this;
          return [
            {
              id: this.id + "_input:View",
              domNode: this.create_inputNode(),
              style: this.valueStyle,
              onInited: function() {
                return T.valueElt = this;
              }
            }
          ];
        },
        create_inputNode: function() {
          var _done;
          _done = this.create_onblur_handler();
          return Object.dom.createComplexElement(String.format("<{0} type=\"{1}\" name=\"{2}\" maxLength=\"{3}\"/>", this.inputTag, this.inputType, this.id, this.maxLength), Object.update({
            placeholder: String.localize(this.placeholder),
            onblur: _done,
            onfocusleave: _done,
            onkeydown: this.create_onkeydown_handler()
          }, this.inputNodeAttrs));
        },
        create_onblur_handler: function() {
          var T;
          T = this;
          return function(ev) {
            T.doneEditor({
              value: this.value
            });
            return true;
          };
        },
        create_onkeydown_handler: function() {
          var T;
          T = this;
          return function(ev) {
            ev = ev || window.event;
            if (ev.keyCode === 13) {
              T.doneEditor({
                value: this.value
              });
            }
            return true;
          };
        },
        redrawValue: function() {
          var _ref;
          if ((_ref = this.valueElt) != null) {
            _ref.domNode.value = this.getValue();
          }
          return this.domNodeClass("!ui-error");
        },
        tapped: function(ev) {
          var _ref;
          return (_ref = this.valueElt) != null ? _ref.domNode.focus() : void 0;
        },
        hintChanged: function(ev, v) {
          var _ref;
          return (_ref = this.valueElt) != null ? _ref.domNode.placeholder = v : void 0;
        }
      };
    }
  });

  Object.entity.define({
    id: "Textarea extends Input",
    inputTag: "textarea",
    maxLength: 8192
  });

  Object.entity.define({
    id: "PasswordInput extends Input",
    inputType: "password"
  });

  Object.entity.define({
    id: "DateInput extends Input",
    inputType: "date"
  });

  Object.entity.define({
    id: "Dropdown extends Input",
    properties: ["data"],
    dataIdKey: 'id',
    methods: function(_super) {
      var _newOption;
      _newOption = function(id, name, isv) {
        if (name == null) {
          name = '' + id;
        }
        if (isv == null) {
          isv = false;
        }
        return new Option(name, id, isv, isv);
      };
      return {
        getInputChildrenMeta: function(ch) {
          var T;
          T = this;
          return [
            {
              id: this.id + "_input:View",
              onInited: function() {
                return T.valueElt = this;
              },
              domNodeType: "select",
              style: this.valueStyle,
              domNodeAttrs: {
                onchange: this.create_onchange_handler()
              }
            }
          ];
        },
        tapped: function(ev) {
          var _ref;
          return (_ref = this.valueElt) != null ? _ref.domNode.focus() : void 0;
        },
        create_onchange_handler: function() {
          var T;
          T = this;
          return function(ev) {
            T.doneEditor({
              value: this.selectedIndex ? T.data[this.selectedIndex - 1][T.dataIdKey] : ''
            });
            return true;
          };
        },
        dataChanged: function(ev, data) {
          var d, i, id, isv, options, _i, _len;
          _super.dataChanged.call(this, ev, data);
          options = this.valueElt.domNode.options;
          options.length = 0;
          if (data === null) {
            options[0] = _newOption('', 'Loading...');
          } else {
            options[0] = _newOption('', '', !this.value);
            for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
              d = data[i];
              if (!(id = d[this.dataIdKey])) {
                continue;
              }
              isv = id === this.value;
              this.valueElt.domNode.options[i + 1] = _newOption(id, d.name, isv);
              if (isv) {
                this.prop('datum', d);
              }
            }
          }
          return ev;
        },
        redrawValue: function() {
          var d, i, id, _i, _len, _ref;
          if (this.data) {
            _ref = this.data;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              d = _ref[i];
              if (!((id = d[this.dataIdKey]) === this.value)) {
                continue;
              }
              this.prop('datum', d);
              this.valueElt.domNode.selectedIndex = i + 1;
              return;
            }
          }
          return this.valueElt.domNode.selectedIndex = 0;
        }
      };
    }
  });

  Object.entity.define({
    id: "Checkbox extends Field",
    captionStyle: "checkbox",
    childrenAdapter: function(ch) {
      var T, _done;
      T = this;
      _done = function(ev) {
        T.doneEditor({
          value: !!this.checked
        });
        return true;
      };
      return [
        {
          id: "Box",
          style: this.valueBoxStyle,
          children: [
            {
              id: "View",
              onInited: function() {
                return T.valueElt = this;
              },
              domNodeType: "input",
              style: this.valueStyle1,
              domNodeAttrs: {
                onchange: _done,
                type: "checkbox",
                value: true,
                disabled: this.disabled,
                checked: !!this.getValue()
              }
            }, {
              id: "View",
              onInited: function() {
                return T.captionElt = this;
              },
              domNodeType: "span",
              css: "display:inline;padding-left:8px"
            }
          ]
        }
      ];
    },
    redrawValue: function() {
      if (this.valueElt) {
        this.valueElt.domNode.checked = !!this.getValue();
      }
    }
  });

  Object.entity.define({
    id: "Fieldset extends Box",
    domNodeType: "fieldset",
    childrenAdapter: function(ch) {
      ch.unshift({
        id: this.id + "_label:Label",
        domNodeType: "legend",
        style: this.captionStyle,
        caption: this.caption
      });
      return ch;
    }
  });

}).call(this);


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
      getDataset: function(v) {
        var attr, ds, n, _i, _len, _ref;
        if (ds = v.dataset) {
          return ds;
        }
        ds = {};
        _ref = v.attributes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          attr = _ref[_i];
          if ((n = attr.name).slice(0, 5) === 'data-') {
            ds[String.camelize(n.slice(5), '-')] = v.getAttribute(n);
          }
        }
        return ds;
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
          _ref = Object.dom.getDataset(elt);
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
          T.toggleDomNodeClass('hidden', v);
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
            this.prop('dataCount', ev.error ? -2 : -1);
            data = [];
          }
          this.dataRegistry = _reg(data, this.dataIdKey);
          this.childrenRegistry = {};
          this.setChildren(data);
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

}).call(this);

(function() {
  Object.entity.define({
    id: "webclient.AceEditor extends View",
    properties: ['value', 'mode', 'theme'],
    css: "position: relative;height: 500px;",
    methods: function(_super) {
      return {
        init: function() {
          _super.init.call(this);
          return this.editor.getSession().on('change', (function(_this) {
            return function(e) {
              if (_this.defered) {
                return;
              }
              _this.defered = true;
              return Function.nextTick(1000, _this, function() {
                this.defered = false;
                this.isOnChange = true;
                this.prop('value', this.editor.getValue());
                return this.isOnChange = false;
              });
            };
          })(this));
        },
        domNodeChanged: function(ev, domNode) {
          this.editor = window.ace.edit(domNode);
          this.editor.setTheme("ace/theme/chrome");
          return this.editor.getSession().setMode("ace/mode/coffee");
        },
        valueChanged: function(ev, value) {
          if (!this.isOnChange) {
            return this.editor.setValue(value);
          }
        }
      };
    }
  });

}).call(this);


/*
UI D3 List view.
 */

(function() {
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
          if (!data) {
            this.prop('dataCount', ev.error ? -2 : -1);
            return;
          }
          this.dataRegistry = _reg(data, this.dataIdKey);
          this.childrenRegistry = {};
          this.setChildren(Object.event.create({
            value: data,
            noReset: true
          }));
          if ((val = this.getValue()) && !this.dataRegistry[val]) {
            return this.prop("value", null);
          }
        },
        deltaChanged: function(ev, data) {
          this.dataRegistry = Object.update(this.dataRegistry || {}, _reg(data, this.dataIdKey));
          if (!this.childrenRegistry) {
            this.childrenRegistry = {};
          }
          return this.setChildren(Object.event.create({
            value: data,
            noReset: true
          }));
        },
        childrenAdapter: function(data, ev) {
          var ch, counter, datum, e, existing, i, id, lastNode, meta, r, _i, _j, _len, _len1;
          r = [];
          ch = this._children;
          this._children = [];
          counter = 0;
          if (ch) {
            for (_i = 0, _len = ch.length; _i < _len; _i++) {
              e = ch[_i];
              if (id = e.value) {
                if (this.dataRegistry[id]) {
                  this._children.push(e);
                  this.childrenRegistry[id] = e;
                  counter++;
                } else {
                  e.done();
                }
              }
            }
          }
          if (data) {
            for (i = _j = 0, _len1 = data.length; _j < _len1; i = ++_j) {
              datum = data[i];
              if ((id = datum[this.dataIdKey]) === void 0) {
                id = datum[this.dataIdKey] = Object.math.uuid();
              }
              if (existing = this.childrenRegistry[id]) {
                lastNode = existing.domNode;
                this.updateChild(existing, datum);
              } else {
                counter++;
                meta = this.childrenItemAdapter(datum, i);
                meta.domNodeNextSibling = lastNode != null ? lastNode.nextSibling : void 0;
                r.push(meta);
              }
            }
          }
          this.prop('dataCount', counter);
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
