
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

  F.nextTick = function(ctx, fn) {
    if (arguments.length < 2) {
      (fn = ctx) && (ctx = null);
    }
    return setTimeout((function() {
      return fn.call(ctx);
    }), 5);
  };

  F.delayed = function(ms, ctx, fn) {
    if (arguments.length < 3) {
      (fn = ctx) && (ctx = null);
    }
    return setTimeout((function() {
      return fn.call(ctx);
    }), ms);
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
      return (O.error("bad-code: Object.parse: " + _error.message, s)).log() && null;
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
    var t;
    if (sep == null) {
      sep = '_';
    }
    if (s != null ? s.length : void 0) {
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = s.split(sep);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          _results.push(String.capitalize(t));
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
    Date.monthName = function(m, lang, id) {
      return String.localize("" + _nn(m + 1));
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
        exp = -2;
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
      r = "";
      if (this.type && this.host) {
        r = this.type + "://";
      }
      if (this.host) {
        r += this.host;
      }
      r += (this.host ? '/' : '') + this.path.join('/');
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
      r = new Uri(s);
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
      r.id = s;
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

      return Err;

    })();
    return function(err, details) {
      return ((err != null ? err.isError : void 0) ? err : new Err(err)).addDetails(details);
    };
  })();


  /*
  Logging.
   */

  O.log = (function(_this) {
    return function(x) {
      var e, _ref;
      return (_ref = _this.console) != null ? _ref.log.apply(_ref, (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          e = arguments[_i];
          _results.push(e);
        }
        return _results;
      }).apply(_this, arguments)) : void 0;
    };
  })(this);

}).call(this);
