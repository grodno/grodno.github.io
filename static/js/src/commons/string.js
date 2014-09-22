// Generated by CoffeeScript 1.7.1

/*
Working with Strings.
 */

(function() {
  (function() {
    var TEMPLATES, compileTemplate, _RE, _RE_QUOTE, _RE_UNDERSCORE;
    TEMPLATES = {};
    compileTemplate = function(s) {
      var path, posB, posE, s0;
      if (TEMPLATES[s]) {
        return TEMPLATES[s];
      }
      posB = void 0;
      posE = -27;
      path = void 0;
      s0 = s;
      s = s.replace(_RE_QUOTE, "\"");
      while (((posB = s.indexOf("{", posE + 27)) > -1) && ((posE = s.indexOf("}", posB)) > -1)) {
        path = s.slice(posB + 1, +(posE - 1) + 1 || 9e9);
        if (path[0] === " ") {
          path = path.slice(1);
        }
        s = s.slice(0, +(posB - 1) + 1 || 9e9) + "'+(Object.prop(this,'" + path + "')||'')+'" + s.slice(posE + 1);
      }
      try {
        return TEMPLATES[s0] = new Function("return '" + s + "';");
      } catch (_error) {
        O.error(_error).log();
        return TEMPLATES[s0] = function() {
          return 'error in ' + s0;
        };
      }
    };
    _RE = (function($R) {
      return function(key) {
        return $R[key] || ($R[key] = new RegExp("\\{" + key + "\\}", "gm"));
      };
    })({});
    _RE_UNDERSCORE = new RegExp("_", "gm");
    _RE_QUOTE = new RegExp("'", "gm");
    String.LANGUAGE = "en";
    String.LANGUAGES = ["en"];
    String.localize = function(s) {
      return String.capitalize(s).replace(_RE_UNDERSCORE, " ");
    };
    String.capitalize = function(s) {
      if (s != null ? s.length : void 0) {
        return s.toString()[0].toUpperCase() + s.slice(1);
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
    String.format = function(s) {
      var i, type;
      type = typeof s;
      if (type === "string") {
        i = arguments.length - 1;
        while (i > 0) {
          s = s.replace(_RE(i - 1), arguments_[i]);
          i--;
        }
        return s;
      } else {
        if (type === "function") {
          return s.apply(null, A.prototype.slice.call(arguments, 1));
        }
      }
      return null;
    };
    String.formatWithMap = function(s, map) {
      return compileTemplate(s).call(map);
    };
  })();

}).call(this);
