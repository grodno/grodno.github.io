module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnVoid = fnVoid;
exports.fnThis = fnThis;
exports.fnThisProp = fnThisProp;
exports.fnThrow = fnThrow;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint no-console: 0 */

var undef = Object.undefined;

var _curry = function _curry(fn, args0, lengthLimit) {

  var fx = function fx(args) {
    return args.length >= lengthLimit ? fn.apply(undefined, _toConsumableArray(args)) : _curry(fn, args, lengthLimit - args.length);
  };

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fx([].concat(_toConsumableArray(args0), args));
  };
};

var isFunction = exports.isFunction = function isFunction(f) {
  return !!(f && f.constructor && f.call && f.apply);
};

var functionDisplayName = exports.functionDisplayName = function functionDisplayName(f) {
  return f.displayName || (f.displayName = f.name || (/^function\s+([\w\$]+)\s*\(/.exec(f.toString()) || [])[1] || 'C');
};

var log = exports.log = function log() {
  var _ref, _console;

  var code = ('' + (arguments.length <= 0 ? undefined : arguments[0])).toLowerCase();
  var mode = code.startsWith('error') ? 'error' : 'log';

  (_console = console)[mode].apply(_console, arguments);return _ref = arguments.length - 1, arguments.length <= _ref ? undefined : arguments[_ref];
};

function fnVoid() {}
function fnThis() {
  return this;
}
function fnThisProp(key) {
  return this[key];
}
function fnThrow(error) {
  var ErrorType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;
  throw new ErrorType(error);
}

var fnId = exports.fnId = function fnId(x) {
  return x;
};

var fnNull = exports.fnNull = function fnNull(x) {
  return null;
};

var fnTrue = exports.fnTrue = function fnTrue() {
  return true;
};

var fnFalse = exports.fnFalse = function fnFalse() {
  return false;
};

var compose = exports.compose = function compose() {
  for (var _len2 = arguments.length, ff = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    ff[_key2] = arguments[_key2];
  }

  return function (x0) {
    return ff.reduceRight(function (x, f) {
      return f(x);
    }, x0);
  };
};

var swap = exports.swap = function swap(f) {
  return function (a, b) {
    return f(b, a);
  };
};

var isSomething = exports.isSomething = function isSomething(a) {
  return a !== undef && a !== null;
};
var someOrNull = exports.someOrNull = function someOrNull(a) {
  return a === undef || a === null ? null : a;
};

var sum = exports.sum = function sum(a, b) {
  return a + b;
};
var and = exports.and = function and(a, b) {
  return a && b;
};
var or = exports.or = function or(a, b) {
  return a || b;
};

var curry = exports.curry = function curry(f) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return _curry(f, args, f.length);
};

var assert = exports.assert = function assert(b, error, errorType) {
  return b || fnThrow(error, errorType);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.undefOrNull = exports.isObject = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint no-cond-assign: "off" */
/* eslint no-eq-null: "off" */

exports.objId = objId;
exports.intoMethod = intoMethod;
exports.objForEach = objForEach;
exports.objMap = objMap;
exports.objToArray = objToArray;
exports.objFromArray = objFromArray;
exports.append = append;
exports.objGet = objGet;
exports.getter = getter;

var _fn = __webpack_require__(0);

var isObject = exports.isObject = function isObject(o) {
  return o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
};

var undefOrNull = exports.undefOrNull = function undefOrNull(o) {
  return o == null;
};

function objId(x) {

  return x ? x.id : null;
}

function intoMethod(f) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return f.apply(this, [this].concat(args));
  };
}

/**
 * Maps by object keys.
 * Nullable items excluded from result.
 * @param x source object
 * @param fn function to produce item
 * @returns {Array} of mapped items
 */
function objForEach(x, fn) {

  if (x && fn) {
    Object.keys(x).forEach(function (key, index) {
      return fn(x[key], key, index);
    });
  }

  return x;
}

function objMap(x, fn) {

  var result = {};

  if (!x) {
    return result;
  }

  Object.keys(x).forEach(function (key) {
    var value = fn(x[key], key);

    if (value != null) {
      result[key] = value;
    }
  });

  return result;
}

function objToArray(x) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (value, key) {
    return { value: value, key: key };
  };


  var result = [];

  if (!x) {
    return result;
  }

  Object.keys(x).forEach(function (key) {
    var value = fn(x[key], key);

    if (value != null) {
      result.push(value);
    }
  });

  return result;
}

/*
  [e,...] => { [fnKey(e)]: fnValue(e), ...}
*/
function objFromArray(arr) {
  var fnKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fn.fnId;
  var fnValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _fn.fnId;


  var result = {};

  if (!arr) {
    return result;
  }
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var e = _step.value;

      var key = fnKey(e);
      var value = fnValue(e);
      if (!undefOrNull(key) && !undefOrNull(value)) {
        result[key] = value;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

function append(a, b) {

  if (a.concat) {
    return a.concat(b);
  }

  return a + b;
}

function objGet(x, key) {

  return x && key ? getter.call(x, key) : Object.undefined;
}

function getter(k) {

  var posE = k.indexOf('.');

  if (posE === -1) {
    return this[k];
  }

  var posB = 0,
      rr = this;
  while (posE !== -1) {
    rr = rr[k.slice(posB, posE)];
    if (!rr) {
      return Object.undefined;
    }
    posB = posE + 1;
    posE = k.indexOf('.', posB);
  }

  return rr[k.slice(posB)];
}

// overrides methods with super.
Object.mixin = function (target, fn) {
  for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    params[_key2 - 2] = arguments[_key2];
  }

  var _super = {};
  var mix = fn && fn.apply(null, [_super].concat(params)) || {};
  Object.keys(mix).forEach(function (n) {
    var f = target[n];
    _super[n] = function (ctx) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return f && f.apply(ctx, args);
    };
    target[n] = mix[n];
  });
  return target;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = undefined;

var _Memoize = __webpack_require__(11);

var _Memoize2 = _interopRequireDefault(_Memoize);

var _Observable = __webpack_require__(12);

var _Observable2 = _interopRequireDefault(_Observable);

var _fn = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createRegistry = function createRegistry() {
  return _Memoize2.default.create(function (id) {
    return new _Observable2.default();
  });
};

/**
 * EventBus(Pub/Sub, EventChannel, event queue)
 * Event types, N-to-N observers decoupled from subjects.
 */
var apply = exports.apply = function apply($) {
  var registry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createRegistry();
  return Object.assign($, {
    subscribe: function subscribe(eventType, handler0) {
      var handlerId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : handler0.id;


      var handler = typeof handler0 === 'function' ? { handleEvent: handler0 } : handler0;

      (0, _fn.assert)((0, _fn.isFunction)(handler.handleEvent), 'handler.handleEvent is not a function');

      var observer = function observer(event) {
        return handler.handleEvent(event);
      };

      registry.get(eventType).addObserver(observer, handlerId);

      return handlerId;
    },
    unsubscribe: function unsubscribe(handlerId) {

      registry.forEach(function (o) {
        return o.removeObserver(handlerId);
      });
    },
    emitEvent: function emitEvent(event) {
      // RunLoop.post
      registry.get(event.type).notify(event);
    }
  });
};

var EventBus = function EventBus() {
  _classCallCheck(this, EventBus);

  apply(this);
};

EventBus.applyTo = apply;
exports.default = EventBus;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var props = function props($) {
  return $.constructor.$PROPS;
};

/**
 * A Property is an proxy on given key-value of a component state.
 */

var Property = function () {
  _createClass(Property, null, [{
    key: 'has',
    value: function has($, key) {

      return props($).has(key);
    }
  }, {
    key: 'get',
    value: function get($, key) {

      var prop = props($).get(key);

      return !prop ? Object.undefined : prop.get(key, $.state, $);
    }
  }, {
    key: 'install',
    value: function install(ctor) {
      var _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ctor['PROPS'] || {};

      if (ctor.hasOwnProperty('$PROPS')) {
        return;
      }

      ctor.$PROPS = new Map();

      var keys = ctor.$PROP_KEYS = Object.keys(_props);
      keys.forEach(function (key) {

        var p = _props[key];
        var prop = new Property(key, p);

        ctor.$PROPS.set(key, prop);

        var def = null;
        if (!prop.isWriteOnly && !ctor.prototype.__lookupGetter__(key)) {
          def = {};
          def.get = function () {
            return prop.get(this, key);
          };
        }
        if (!prop.isReadOnly && !ctor.prototype.__lookupSetter__(key)) {
          def = def || {};
          def.set = function (value) {
            return this.set(key, value);
          };
        }
        if (def) {
          Object.defineProperty(ctor.prototype, key, def);
        }
      });
    }
  }, {
    key: 'diff',
    value: function diff($, delta) {

      var diff = { info: [], payload: {} };

      if (delta) {

        props($).forEach(function (prop, key) {

          var oldValue = $.state[key];
          var value = delta[key];

          if (!prop.isReadOnly) {

            if (typeof value !== 'undefined' && !prop.isEqual(oldValue, value)) {

              diff.info.push({ key: key, prop: prop, value: value, oldValue: oldValue });

              diff.payload[key] = value;
            }
          }
        });
      }

      diff.isEmpty = !diff.info.length;

      return diff;
    }
  }, {
    key: 'update',
    value: function update($, payload) {

      if (payload) {

        props($).forEach(function (prop, key) {

          if (!prop.isReadOnly) {

            var value = payload[key];

            if (typeof value !== 'undefined') {

              prop.set($, key, value);
            }
          }
        });
      }

      return $;
    }
  }]);

  function Property(key, options) {
    _classCallCheck(this, Property);

    this.key = key;

    Object.assign(this, options);
  }

  _createClass(Property, [{
    key: 'isEqual',
    value: function isEqual(a, b) {

      return a === b;
    }
  }, {
    key: 'get',
    value: function get($, key) {

      var value = $.state[key];

      return value === Object.undefined ? this.default : value;
    }
  }, {
    key: 'set',
    value: function set($, key, value) {

      $.state[key] = value;
    }
  }]);

  return Property;
}();

Property.props = props;
exports.default = Property;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint no-eq-null: "off" */
/* eslint eqeqeq: "off" */


exports.parseDataset = parseDataset;
exports.applyDOMAttributes = applyDOMAttributes;
exports.setDOMAttribute = setDOMAttribute;
exports.removeDOMAttribute = removeDOMAttribute;

var _obj = __webpack_require__(1);

var flagAttrs = {
  disabled: 'yes',
  selected: 'true'
};

var instantAttrs = {
  value: 1,
  checked: 1
};
var parsePrimitive = function parsePrimitive(v) {

  if (v === 'null') {
    return null;
  } else if (v === 'undefined') {
    return Object.undefined;
  } else if (v === 'true') {
    return true;
  } else if (v === 'false') {
    return false;
  }

  var n = +v;
  if (!isNaN(n)) {
    return n;
  }

  return v;
};

function parseDataset(dataset) {
  return Object.keys(dataset).reduce(function (r, key) {
    r[key] = parsePrimitive(dataset[key]);
    return r;
  }, {});
}

var addEventListener = window.addEventListener ? function (e, eventName, listener) {
  return e.addEventListener(eventName, listener, false);
} : function (e, eventName, listener) {
  return e.attachEvent('on' + eventName, listener);
};

function applyDOMAttributes(e, _attrs) {

  if (_attrs) {

    var lastAttrs = e.$attributes || {};

    if (e.nodeName === '#text') {

      var text = _attrs.text;

      if (e.textContent !== text) {
        e.textContent = text == null ? '' : text;
      }
    } else {

      (0, _obj.objForEach)(lastAttrs, function (_value, key) {
        var value = _attrs[key];
        if (value == null) {
          removeDOMAttribute(e, key);
        }
      });

      (0, _obj.objForEach)(_attrs, function (value, key) {
        var lastValue = instantAttrs[key] ? e[key] : lastAttrs[key];
        if (value != null && value !== lastValue) {
          setDOMAttribute(e, key, value);
        }
      });
    }

    e.$attributes = _attrs;
  }
}

function setDOMAttribute(e, k, value) {

  if (typeof value === 'function') {
    var lstnrs = e.$listeners || (e.$listeners = {});
    if (lstnrs[k]) {
      e.removeEventListener(k, lstnrs[k]);
    }

    var fn = function fn(ev) {
      return value(Object.assign(ev, { dataset: parseDataset(ev.currentTarget.dataset) }));
    };
    lstnrs[k] = fn;
    addEventListener(e, k, fn);
  } else if (k === 'data') {

    Object.assign(e.dataset, Object.keys(value).reduce(function (r, key) {
      var v = value[key];
      if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) !== 'object') {
        r[key] = v;
      }
      return r;
    }, {}));
  } else if (flagAttrs[k]) {

    e[k] = value ? true : null;
  } else if (instantAttrs[k]) {

    e[k] = value;
  } else {

    e.setAttribute(k, value);
  }
}

function removeDOMAttribute(e, k) {

  if (e.$listeners && e.$listeners[k]) {

    e.removeEventListener(k, e.$listeners[k]);
  } else if (k === 'data') {

    e.dataset = {};
  } else if (flagAttrs[k]) {

    e[k] = null;
  } else if (instantAttrs[k]) {

    e[k] = null;
  } else {

    e.removeAttribute(k);
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xmlParse = exports.xmlStringify = exports.XmlNode = exports.Attributes = exports.parsePrimitive = exports.decodeXmlEntities = exports.RE_ATTRS = exports.RE_TAG = exports.RE_XML_COMMENT = exports.RE_XML_ENTITY = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint no-use-before-define: "off"*/


exports.escapeXml = escapeXml;

var _text = __webpack_require__(19);

var _fn = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// let COUNTER = 0;

var RE_XML_ENTITY = exports.RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g;

var RE_XML_COMMENT = exports.RE_XML_COMMENT = /\<\!\-\-((?!\-\-\>)[\s\S])*\-\-\>/g;

var RE_TAG = exports.RE_TAG = /(<)(\/?)([a-z][a-z0-9\:\.\-]*)((?:\s+[a-z][a-z0-9\-]+(?:=(?:\w+|(?:"[^"]*")))?)*)\s*(\/?)>/gi;

var RE_ATTRS = exports.RE_ATTRS = /\s+([a-z][a-z0-9\-]+)(?:=(\w+|"[^"]*"))?/gi;

var SUBST_XML_ENTITY = {
  amp: '&',
  gt: '>',
  lt: '<',
  quot: '"',
  nbsp: ' '
};

var FN_XML_ENTITY = function FN_XML_ENTITY(_s) {

  var s = _s.substring(1, _s.length - 1);

  return s[0] === '#' ? String.fromCharCode(+s.substring(1)) : SUBST_XML_ENTITY[s] || ' ';
};

var decodeXmlEntities = exports.decodeXmlEntities = function decodeXmlEntities() {
  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return s.replace(RE_XML_ENTITY, FN_XML_ENTITY);
};

var matchHtmlRegExp = /["'&<>]/g;

function escapeXml(unsafe) {
  return !unsafe ? '' : ('' + unsafe).replace(matchHtmlRegExp, function (m) {
    switch (m.charCodeAt(0)) {
      // "
      case 34:
        return '&quot;';
      // &
      case 38:
        return '&amp;';
      // '
      case 39:
        return '&#39;';
      // <
      case 60:
        return '&lt;';
      // >
      case 62:
        return '&gt;';

      default:
        return '';
    }
  });
}

var parsePrimitive = exports.parsePrimitive = function parsePrimitive(v) {

  if (v === 'null') {
    return null;
  } else if (v === 'undefined') {
    return Object.undefined;
  } else if (v === 'true') {
    return true;
  } else if (v === 'false') {
    return false;
  }

  var n = +v;
  if (!isNaN(n)) {
    return n;
  }

  return v;
};

var Attributes = exports.Attributes = {

  narrow: function narrow(attributes) {
    return typeof attributes === 'string' ? Attributes.parse(attributes) : attributes;
  },

  parse: function parse(s) {
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!s) {
      return null;
    }
    var found = false;
    for (var e = RE_ATTRS.exec(s); e; e = RE_ATTRS.exec(s)) {
      var val = e[2] || '"true"';
      r[e[1]] = parsePrimitive(decodeXmlEntities(val.slice(1, -1)));
      found = true;
    }
    return found ? r : null;
  },
  stringify: function stringify(obj) {
    return obj ? '' + Object.keys(obj).filter(function (k) {
      return obj[k];
    }).map(function (k) {
      return ' ' + k + '="' + escapeXml(obj[k]) + '"';
    }).join('') : '';
  }
};

var XmlNode = exports.XmlNode = function () {
  function XmlNode(tag, attributes, children) {
    var _this = this;

    _classCallCheck(this, XmlNode);

    this.$key = 0;
    this.tag = tag;
    this.attributes = Attributes.narrow(attributes);
    if (children && children.length) {
      children.forEach(function (e) {
        return _this.addChild(e);
      });
    }
  }

  _createClass(XmlNode, [{
    key: 'getChild',
    value: function getChild(index) {
      return this.children && this.children[index];
    }
  }, {
    key: 'addChild',
    value: function addChild(elt) {

      (this.children || (this.children = [])).push(elt);
      elt.$key = this.children.length - 1;
      return elt;
    }
  }, {
    key: 'addText',
    value: function addText(text, $key) {
      return this.addChild(new XmlNode('#text', { text: decodeXmlEntities(text) }));
    }
  }, {
    key: 'toString',
    value: function toString() {
      return xmlStringify(this);
    }
  }]);

  return XmlNode;
}();

function _stringify(elt, tab) {
  var _elt$tag = elt.tag,
      tag = _elt$tag === undefined ? 'p' : _elt$tag,
      attributes = elt.attributes,
      children = elt.children;

  if (tag === '#text') {
    return '' + tab + (escapeXml(attributes.text) || '');
  }

  var attrs = Attributes.stringify(attributes);
  var ch = children && children.map(function (c) {
    return typeof c === 'string' ? c : _stringify(c, '  ' + tab);
  }).join('\n');

  return tab + '<' + tag + attrs + (!ch ? '/>' : '>\n' + ch + '\n' + tab + '</' + tag + '>');
}

var xmlStringify = exports.xmlStringify = function xmlStringify(root) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return _stringify(root, '');
};

var xmlTokenizer = (0, _fn.curry)(_text.tokenizer, RE_TAG, function (stack, _ref, $key) {
  var _ref2 = _slicedToArray(_ref, 6),
      text = _ref2[0],
      isTag = _ref2[1],
      isClosingTag = _ref2[2],
      tag = _ref2[3],
      attributes = _ref2[4],
      isSingleTag = _ref2[5];

  var top = stack[0];
  // console.log(text, !!isTag, !!isClosingTag, !!isSingleTag, tag, attrs)

  if (!isTag) {

    if (text.trim()) {
      top.addText(text, $key);
    }
    return;
  }

  if (isClosingTag) {
    stack.shift();
    return;
  }

  var elt = top.addChild(new XmlNode(tag, attributes));

  if (!isSingleTag) {
    stack.unshift(elt);
  }
});

var xmlParse = exports.xmlParse = function xmlParse() {
  var _s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var s = _s.replace(RE_XML_COMMENT, '');
  var result = xmlTokenizer(s, [new XmlNode()]);

  if (result.length !== 1) {

    return new XmlNode('#text', { text: 'Parse error' });
  }

  return result[0].getChild(0);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.DomRenderer = exports.StringRenderer = exports.EventBus = undefined;

var _EventBus = __webpack_require__(2);

Object.defineProperty(exports, 'EventBus', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_EventBus).default;
  }
});

var _StringRenderer = __webpack_require__(17);

Object.defineProperty(exports, 'StringRenderer', {
  enumerable: true,
  get: function get() {
    return _StringRenderer.renderer;
  }
});

var _DOMRenderer = __webpack_require__(15);

Object.defineProperty(exports, 'DomRenderer', {
  enumerable: true,
  get: function get() {
    return _DOMRenderer.renderer;
  }
});
exports.bootstrap = bootstrap;

var _Component2 = __webpack_require__(13);

var _Component3 = _interopRequireDefault(_Component2);

var _obj = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = exports.Component = _Component3.default;

/**
 * Bootstraps framework with config object which contains following params:
 * @param renderer - function to be used to renderer components
 * @param Root - root component type
 * @param markup - used to implicitly create root component type id none specified
 * @param state - used to implicitly create root component type id none specified
 * @param parentElt - dom element container for DomRenderer
 * @param componentTypes list of types to registerType
 *
 * @return a function to be invoked to re-render root component
 */
function bootstrap(config) {
  var _class, _temp;

  var renderer = config.renderer,
      markup = config.markup,
      _config$state = config.state,
      state = _config$state === undefined ? {} : _config$state,
      Root = config.Root,
      _config$componentType = config.componentTypes,
      componentTypes = _config$componentType === undefined ? [] : _config$componentType;


  var $Root = Root || (_temp = _class = function (_Component) {
    _inherits($R, _Component);

    function $R() {
      _classCallCheck(this, $R);

      return _possibleConstructorReturn(this, ($R.__proto__ || Object.getPrototypeOf($R)).apply(this, arguments));
    }

    return $R;
  }(Component), _class.TEMPLATE = markup, _class.PROPS = (0, _obj.objMap)(state, function (val, key) {
    return {};
  }), _temp);

  Component.registerType.apply(Component, [$Root].concat(_toConsumableArray(componentTypes)));

  var root = new $Root(state);

  if (renderer.prepareRoot) {

    renderer.prepareRoot(root, config);
  }

  return function () {
    return root.render();
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint new-cap: 0 */


var _fn = __webpack_require__(0);

var _EventBus = __webpack_require__(2);

/**
 * A application is a singletone instance that
 *  - consists from independent modules
 *  - has life-cycle 'init' and 'done'
 *  - enables unified event-driven interaction between modules
 */
var application = {
  init: function init(modulesConfig) {

    (0, _fn.assert)(Array.isArray(modulesConfig), 'Modules config has to be an array');

    var modules = modulesConfig.map(function (cfg) {
      return new cfg.type(_extends({ application: application }, cfg));
    });

    application.done = function () {
      return Promise.all(modules.filter(function (m) {
        return (0, _fn.isFunction)(m.done);
      }).map(function (m) {
        return m.done();
      })).then(function () {
        return application;
      });
    };

    return Promise.all(modules.filter(function (m) {
      return (0, _fn.isFunction)(m.init);
    }).map(function (m) {
      return m.init();
    })).then(function () {
      return application;
    });
  }
};

(0, _EventBus.apply)(application);

exports.default = application;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _obj = __webpack_require__(1);

var _Entity2 = __webpack_require__(9);

var _Entity3 = _interopRequireDefault(_Entity2);

var _Property = __webpack_require__(3);

var _Property2 = _interopRequireDefault(_Property);

var _Application = __webpack_require__(7);

var _Application2 = _interopRequireDefault(_Application);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-console: 0 */


/**
 * A Component is an Entity that
 * 1) manages its state via properties
 * 2) supports parent/child relationships
 * 3) event-driven
 * 4) life-cycle hooks to be invoked from container
 */
var Component = function (_Entity) {
  _inherits(Component, _Entity);

  function Component(initialState, options) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, {}));

    Object.assign(_this, options);

    _Property2.default.update(_this, initialState);
    return _this;
  }

  ////////////////////////
  // Events
  ///////////////////////

  _createClass(Component, [{
    key: 'emitEvent',
    value: function emitEvent(event) {

      _Application2.default.emitEvent(event);
    }
  }, {
    key: 'subscribe',
    value: function subscribe(eventType, handler, handlerId) {

      this.$hasEventHandlers = true;

      return _Application2.default.subscribe(eventType, handler, handlerId || this._id);
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(handlerId) {

      _Application2.default.unsubscribe(handlerId || this._id);
    }

    ////////////////////////
    // Lifetime hooks
    ///////////////////////

  }, {
    key: 'onInit',
    value: function onInit() {

      this.$isInited = true;
    }
  }, {
    key: 'onDone',
    value: function onDone() {
      var _this2 = this;

      if (this.$isDone) {
        return;
      }

      this.$isDone = true;

      if (this.$hasEventHandlers) {

        _Application2.default.unsubscribe(this._id);
      }

      if (this.$finalizers) {

        this.$finalizers.forEach(function (fn) {
          return fn.call(_this2, _this2);
        });
        this.$finalizers = null;
      }

      if (this.$children) {

        this.forEachChild(function (c) {
          return c.onDone();
        });
        this.$children = null;
      }

      if (this.$parent) {

        this.$parent.removeChild(this.$key);
      }
    }
  }, {
    key: 'onError',
    value: function onError(error) {

      this.log('error', error);
    }
  }, {
    key: 'addFinalizer',
    value: function addFinalizer(fn) {

      (this.$finalizers || (this.$finalizers = [])).push(fn);
    }

    ////////////////////////
    // Children
    ////////////////////////

  }, {
    key: 'addChild',
    value: function addChild($key, c) {

      if (c.$parent && c.$parent !== this) {
        c.$parent.removeChild(c);
      }

      c.$key = $key;
      c.$parent = this;

      if (!this.$children) {
        this.$children = new Map();
      }

      this.$children.set($key, c);

      return this;
    }
  }, {
    key: 'getChild',
    value: function getChild($key) {

      return this.$children ? this.$children.get($key) : null;
    }
  }, {
    key: 'removeChild',
    value: function removeChild($key) {
      if (this.$children) {
        return this.$children.delete($key);
      }
    }
  }, {
    key: 'forEachChild',
    value: function forEachChild(fn) {
      if (this.$children) {
        return this.$children.forEach(fn);
      }
    }

    ////////////////////////
    // State
    ///////////////////////

  }, {
    key: 'keys',
    value: function keys() {

      return this.constructor.$PROP_KEYS;
    }
  }, {
    key: 'has',
    value: function has(key) {

      return _Property2.default.has(this, key);
    }
  }, {
    key: 'getByKeys',
    value: function getByKeys() {
      var _this3 = this;

      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.keys();


      return keys.reduce(function (r, key) {
        r[key] = _this3.get(key);return r;
      }, {});
    }
  }, {
    key: 'get',
    value: function get(key) {

      // memoized
      var memoized = this.$ && _obj.getter.call(this.$, key);
      if (typeof memoized !== 'undefined') {

        return memoized;
      }

      // from properties or own member
      var value = _obj.getter.call(this, key);
      if (typeof value !== 'undefined') {

        return typeof value === 'function' ? this.memoize(key, value.bind(this)) : value;
      }

      // not found
      return Object.undefined;
    }
  }, {
    key: 'update',
    value: function update(delta) {
      var _Property$diff = _Property2.default.diff(this, delta),
          info = _Property$diff.info,
          payload = _Property$diff.payload;

      if (info.length) {

        _Property2.default.update(this, payload);

        this.callChangedHooks(info);
      }

      return info;
    }

    ////////////////////////
    // Routines
    ///////////////////////

  }, {
    key: 'callChangedHooks',
    value: function callChangedHooks(changed) {
      var _this4 = this;

      changed.forEach(function (_ref) {
        var key = _ref.key,
            value = _ref.value,
            oldValue = _ref.oldValue;


        var hook = _this4.get(key + 'Changed');
        if (hook) {

          try {

            hook.call(_this4, { value: value, oldValue: oldValue, target: _this4, id: _this4.id });
          } catch (ex) {

            _this4.onError(_extends({}, ex, { message: 'Error in ' + key + ' hook: ' + ex.message }));
          }
        }
      });
    }
  }, {
    key: 'memoize',
    value: function memoize(key, value) {

      (this.$ || (this.$ = {}))[key] = value;

      return value;
    }
  }, {
    key: 'parent',
    get: function get() {

      return this.$parent;
    }
  }]);

  return Component;
}(_Entity3.default);

Component.install = function (c) {
  return _Property2.default.install(c);
};

exports.default = Component;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Identity2 = __webpack_require__(10);

var _Identity3 = _interopRequireDefault(_Identity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An Entity is an Identity that bears a state, but has no specific behavior.
 */
var Entity = function (_Identity) {
  _inherits(Entity, _Identity);

  function Entity(initialState) {
    _classCallCheck(this, Entity);

    var _this = _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).call(this));

    Object.defineProperty(_this, 'state', { value: _extends({}, initialState) });
    return _this;
  }

  _createClass(Entity, [{
    key: 'keys',
    value: function keys() {

      return Object.keys(this.state);
    }
  }, {
    key: 'has',
    value: function has(key) {

      return key in this.state;
    }
  }, {
    key: 'get',
    value: function get(key) {

      return this.state[key];
    }
  }, {
    key: 'set',
    value: function set(key, value) {

      return this.update(_defineProperty({}, key, value));
    }
  }, {
    key: 'update',
    value: function update(delta) {

      Object.assign(this.state, delta);

      return this;
    }
  }, {
    key: 'valueOf',
    value: function valueOf() {

      return this.state;
    }
  }, {
    key: 'map',
    value: function map(f) {

      return this.constructor(f(this.valueOf()));
    }
  }, {
    key: 'clone',
    value: function clone(delta) {

      return this.map(function (state) {
        return _extends({}, state, delta);
      });
    }
  }]);

  return Entity;
}(_Identity3.default);

exports.default = Entity;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fn = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lastId = 1;
/**
 * An Identity is something unique and can be distinguished from others.
 */

var Identity = function () {
  function Identity() {
    _classCallCheck(this, Identity);

    Object.defineProperty(this, '_id', { value: Identity.nextId() });
  }

  _createClass(Identity, [{
    key: 'isEquals',
    value: function isEquals(x) {

      return x && x._id === this._id;
    }

    /**
     * Gets string representation of component.
     */

  }, {
    key: 'toString',
    value: function toString() {

      return '' + this.constructor.name + this._id;
    }
  }, {
    key: 'log',
    value: function log() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _fn.log.apply(undefined, [this.toString()].concat(args));
    }
  }]);

  return Identity;
}();

Identity.nextId = function () {
  return lastId++;
};

exports.default = Identity;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Memoize = function () {
  _createClass(Memoize, null, [{
    key: 'create',
    value: function create(factory, keyFn, all) {

      var m = new Memoize(factory, keyFn, all);

      return m;
    }
  }]);

  function Memoize(factory) {
    var keyFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
      return x;
    };
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Map();

    _classCallCheck(this, Memoize);

    this.factory = factory;
    this.keyFn = keyFn;
    Object.defineProperty(this, 'all', { value: value });
  }

  _createClass(Memoize, [{
    key: 'remove',
    value: function remove(x) {

      var key = this.keyFn(x);

      if (this.all.has(key)) {

        this.all.delete(key);
      }
    }
  }, {
    key: 'forEach',
    value: function forEach(fn) {

      this.all.forEach(fn);
    }
  }, {
    key: 'get',
    value: function get(x) {

      var key = this.keyFn(x);

      if (!this.all.has(key)) {

        var value = this.factory(x);
        this.all.set(key, value);
        return value;
      }

      return this.all.get(key);
    }
  }]);

  return Memoize;
}();

exports.default = Memoize;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fn = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COUNTER = 0;

/**
 * Observable keeps all observers by itself 1-to-N.
 */

var Observable = function () {
  function Observable() {
    _classCallCheck(this, Observable);

    Object.defineProperty(this, '_observers', { value: new Map() });
  }

  _createClass(Observable, [{
    key: 'addObserver',
    value: function addObserver(o) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : COUNTER++;


      (0, _fn.assert)((0, _fn.isFunction)(o), 'Observer is not a function');

      this._observers.set(key, o);

      return key;
    }
  }, {
    key: 'observeOnce',
    value: function observeOnce(o) {
      var _this = this;

      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : COUNTER++;


      return this.addObserver(key, function (event) {
        return _this.removeObserver(key) && o(event);
      });
    }
  }, {
    key: 'removeObserver',
    value: function removeObserver(key) {

      this._observers.delete(key);
    }
  }, {
    key: 'notify',
    value: function notify() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      this._observers.forEach(function (o) {
        return o(event);
      });
    }
  }]);

  return Observable;
}();

exports.default = Observable;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _fn = __webpack_require__(0);

var _Template = __webpack_require__(14);

var _Template2 = _interopRequireDefault(_Template);

var _Property = __webpack_require__(3);

var _Property2 = _interopRequireDefault(_Property);

var _Component2 = __webpack_require__(8);

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The base UI component.
 */
var UiComponent = function (_Component) {
  _inherits(UiComponent, _Component);

  function UiComponent() {
    _classCallCheck(this, UiComponent);

    return _possibleConstructorReturn(this, (UiComponent.__proto__ || Object.getPrototypeOf(UiComponent)).apply(this, arguments));
  }

  _createClass(UiComponent, [{
    key: 'invalidate',


    // implements reaction on component invalidation
    value: function invalidate() {

      return this.render();
    }

    // renders component using given renderer function.
    // By default, renderer function comes from `this.$renderParams.renderer`

  }, {
    key: 'render',
    value: function render() {
      var renderer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$renderParams && this.$renderParams.renderer || _fn.fnId;


      if (!this.$isDone) {

        renderer(this.resolveTemplate(), this);
      }
    }

    // returns internal structure built on template and current state

  }, {
    key: 'resolveTemplate',
    value: function resolveTemplate() {

      return _Template2.default.resolve(this);
    }

    // Updates State with given delta

  }, {
    key: 'update',
    value: function update(delta) {
      this.updatingDepth = (this.updatingDepth || 0) + 1;
      var changes = _get(UiComponent.prototype.__proto__ || Object.getPrototypeOf(UiComponent.prototype), 'update', this).call(this, delta);

      if (this.updatingDepth === 1 && this.shouldInvalidateOnUpdate(changes)) {

        this.invalidate();
      }
      this.updatingDepth--;
      return changes;
    }

    // decided if component should Invalidate itself On Update

  }, {
    key: 'shouldInvalidateOnUpdate',
    value: function shouldInvalidateOnUpdate(changes) {

      return changes.length || _Template2.default.hasTransclusion(this);
    }

    // Useful routine implemented typical reaction on click event

  }, {
    key: 'updateOnClick',
    value: function updateOnClick(_ref) {
      var dataset = _ref.dataset;


      this.update(dataset);
    }
  }]);

  return UiComponent;
}(_Component3.default);

UiComponent.registerType = function () {
  for (var _len = arguments.length, ctors = Array(_len), _key = 0; _key < _len; _key++) {
    ctors[_key] = arguments[_key];
  }

  return ctors.forEach(function (ctor) {

    _Template2.default.install(ctor);

    _Property2.default.install(ctor);
  });
};

UiComponent.getRegisteredType = _Template2.default.getType;
exports.default = UiComponent;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.compileTemplate = compileTemplate;

var _fn = __webpack_require__(0);

var _xml = __webpack_require__(5);

var _obj = __webpack_require__(1);

var _str = __webpack_require__(18);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint no-eq-null: "off" */


Object.jsx = function (tag, attributes) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
    children[_key2 - 2] = arguments[_key2];
  }

  return new _xml.XmlNode(tag, attributes, children.length ? children.map(function (e) {
    return typeof e === 'string' ? new _xml.XmlNode('#text', { text: e }) : e;
  }) : null);
};

var SPECIAL_TAGS = ['else', 'then', 'block', 'children'];

var COMPONENTS_TYPES = new Map();

var RE_PLACEHOLDER = /\{\{([a-zA-Z0-9\._$]+)\}\}/g;
var RE_SINGLE_PLACEHOLDER = /^\{\{([a-zA-Z0-9\._$]+)\}\}$/;
var RE_CHECK_PLACEHOLDER = /(?:each=".+?\sof\s|if="|\{\{)([a-zA-Z0-9\._$\s]+)(\}\}|")/g;

function compileComponentType(elt) {
  var tag = elt.tag;

  if (typeof tag === 'string') {

    var colonPos = tag.indexOf(':');
    if (colonPos !== -1) {
      var key = tag.slice(colonPos + 1);
      elt.resolveComponentType = function ($) {
        var type = (0, _str.capitalize)($.get(key));
        return COMPONENTS_TYPES.get(type);
      };
    } else if (tag[0] === tag[0].toUpperCase()) {
      elt.resolveComponentType = function () {
        return COMPONENTS_TYPES.get(tag);
      };
    }
  } else {
    elt.resolveComponentType = function () {
      return tag;
    };
  }
}

function compileAttr(_p) {

  var p = _p;

  if (p[0] === ':') {

    p = p.slice(1);
    window.console.warn('Deprecated placeholder notation: ' + _p);
    return function ($) {
      return $.get(p);
    };
  }

  if (p.indexOf && p.indexOf('{{') !== -1) {

    if (p.match(RE_SINGLE_PLACEHOLDER)) {

      p = p.slice(2, -2);

      return function ($) {
        return $.get(p);
      };
    }

    return function ($) {
      return p.replace(RE_PLACEHOLDER, function (s, key) {
        var v = $.get(key);return v == null ? '' : v;
      });
    };
  }

  return function () {
    return p;
  };
}

function resolveChildren($, children, keyPrefix) {

  var r = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;


      var sub = resolveTemplate($, c, keyPrefix);

      if (sub) {

        if (Array.isArray(sub)) {
          r.push.apply(r, _toConsumableArray(sub));
        } else {
          r.push(sub);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return r;
}

function resolveTemplate($, elt, keyPrefix) {
  var tag = elt.tag,
      attributes = elt.attributes,
      children = elt.children,
      $key = elt.$key,
      eachItemId = elt.eachItemId,
      eachDataId = elt.eachDataId,
      ifConditionId = elt.ifConditionId,
      ifElse = elt.ifElse,
      resolve = elt.resolve,
      resolveComponentType = elt.resolveComponentType;


  if (resolve) {

    return resolve.call(elt, $, $key);
  }

  if (ifConditionId && !$.get(ifConditionId)) {

    return ifElse ? resolveTemplate($, ifElse) : null;
  }

  var component = resolveComponentType && resolveComponentType($);

  $key = '' + (keyPrefix || '') + (component ? component.name : '') + $key;

  if (eachItemId) {
    var _ref;

    var data = $.get(eachDataId);
    return !data ? null : (_ref = []).concat.apply(_ref, _toConsumableArray([].concat(_toConsumableArray(data)).map(function (d, index) {

      $.memoize(eachItemId, d);

      return resolveTemplate($, { tag: tag, attributes: attributes, children: children, resolveComponentType: resolveComponentType,
        $key: $key + '$' + ((0, _fn.someOrNull)(d.$id) || (0, _fn.someOrNull)(d.id) || index)
      });
    })));
  }

  if (attributes) {
    attributes = (0, _obj.objMap)(attributes, function (fn) {
      return fn($);
    });

    var props = attributes.props;
    if (props) {

      if (typeof props === 'string') {
        props = JSON.parse(props);
      }

      attributes = _extends({}, props, attributes);
    }
  }

  children = !children ? null : resolveChildren($, children, $key + '.');

  if (SPECIAL_TAGS.indexOf(tag) !== -1) {

    return children.map(function (e) {
      return Object.assign(e, { $key: $key + e.$key });
    });
  }

  return { tag: tag, component: component, attributes: attributes, children: children, $key: $key };
}

function compileTemplate(elt) {
  var tag = elt.tag,
      attributes = elt.attributes,
      children = elt.children;


  if (tag === 'transclude') {

    elt.resolve = function ($) {
      return $.$transclude;
    };
    return elt;
  }

  compileComponentType(elt);

  if (attributes) {

    elt.attributes = (0, _obj.objMap)(attributes, function (attr, k) {
      if (k === 'each') {
        var _attr$split = attr.split(' '),
            _attr$split2 = _slicedToArray(_attr$split, 3),
            scopeId = _attr$split2[0],
            dataId = _attr$split2[2];

        elt.eachItemId = scopeId;
        elt.eachDataId = dataId[0] === ':' ? dataId.slice(1) : dataId;
      } else if (k === 'if') {

        elt.ifConditionId = attr[0] === ':' ? attr.slice(1) : attr;
        if (children) {

          var ifElse = children.find(function (e) {
            return e.tag === 'else';
          });
          if (ifElse) {

            elt.ifElse = compileTemplate(ifElse);
            elt.children = children = children.filter(function (e) {
              return e !== ifElse;
            });
          }

          var ifThen = children.find(function (e) {
            return e.tag === 'then';
          });
          if (ifThen) {

            elt.children = children = ifThen.children;
          }
        }
      } else {

        return compileAttr(attr);
      }
    });
  }

  if (children) {
    children.forEach(compileTemplate);
  }

  return elt;
}

/**
 * UI template is constructed from xml markup with control flow and placeholders
 * and then allows to resolve some input data into specific data structure
 * which can be used as input for renderers.
 * This structure defined as follow:
 * type Stru :: { tag:stringOrType, attributes:object, children[Stru], $key:string }
 */

var Template = function () {
  function Template(root) {
    _classCallCheck(this, Template);

    this.root = root;
  }

  _createClass(Template, [{
    key: 'resolve',
    value: function resolve($) {

      return resolveTemplate($, this.root, $.constructor.name);
    }
  }]);

  return Template;
}();

Template.resolve = function ($) {
  return $.constructor.$TEMPLATE.resolve($);
};

Template.hasTransclusion = function ($) {
  return $.constructor.$HAS_TRANSCLUSION;
};

Template.install = function (ctor) {

  var text = ctor.TEMPLATE || 'No template for ' + (ctor.NAME || ctor.name);

  if (!ctor.hasOwnProperty('PROPS')) {
    ctor.PROPS = {};
  }

  var autoRegFn = function autoRegFn(s, _key) {

    var key = _key.split('.')[0];
    if (!ctor.PROPS[key] && !ctor.prototype.__lookupGetter__(key) && !ctor.prototype[key]) {
      ctor.PROPS[key] = {};
    }
  };

  ctor.TEMPLATE.replace(RE_CHECK_PLACEHOLDER, autoRegFn);

  var root = compileTemplate(typeof text === 'string' ? (0, _xml.xmlParse)(text.trim()) : text);

  (0, _fn.assert)(SPECIAL_TAGS.indexOf(root.tag) === -1, ctor.name + ': Root tag cannot be special tag');

  var attrs = root.attributes;
  if (attrs) {

    (0, _fn.assert)(!('each' in attrs), ctor.name + ': Root tag cannot have \'each\' directive');
    (0, _fn.assert)(!('if' in attrs), ctor.name + ': Root tag cannot have \'if\' directive');
  }

  ctor.$TEMPLATE = new Template(root);
  ctor.$HAS_TRANSCLUSION = text.includes('<transclude');

  var key = ctor.hasOwnProperty('NAME') ? ctor.NAME : ctor.name;
  if (key[0] !== '$') {

    COMPONENTS_TYPES.set((0, _str.capitalize)(key), ctor);
  }
};

Template.getType = function (type) {
  return COMPONENTS_TYPES.get((0, _str.capitalize)(type));
};

exports.default = Template;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderer = undefined;

var _DOMRendererUtil = __webpack_require__(16);

var _DOMRendererAttrs = __webpack_require__(4);

var finalizerFn = function finalizerFn(c) {

  c.element = null;
};

var initializerFn = function initializerFn(c) {

  c.forEachChild(initializerFn);

  if (!c.$isInited) {
    c.addFinalizer(finalizerFn);
    c.onInit();
    c.$isInited = true;
  }
};

var renderer = exports.renderer = (0, _DOMRendererUtil.wrapRenderer)(function (meta, c) {

  if (meta.component) {
    meta.$key = c.$key;
    c.element = renderSubComponent(meta, c, c.$renderParams);

    initializerFn(c);
  } else {

    if (!c.element) {

      c.element = (0, _DOMRendererUtil.resolveDOMElement)(meta, c.$renderParams, '' + meta.$key);
    } else {

      (0, _DOMRendererAttrs.applyDOMAttributes)(c.element, meta.attributes);
    }

    if (meta.children) {

      renderSubs(c, meta.children);

      initializerFn(c);
    }
  }
});

renderer.prepareRoot = function (root, config) {

  root.$renderParams = config;
};

function renderSubComponent(meta, parent, params) {
  var component = meta.component,
      children = meta.children,
      _meta$attributes = meta.attributes,
      attributes = _meta$attributes === undefined ? {} : _meta$attributes,
      $key = meta.$key;


  var existing = parent.getChild($key);
  var c = existing;
  if (!existing) {

    var Ctor = component;
    c = new Ctor(attributes);

    parent.addChild($key, c);

    c.$renderParams = params;
    c.$transclude = children;

    var m = c.resolveTemplate();

    m.$key = $key;
    if (m.component) {

      c.element = renderSubComponent(m, c, params);
    } else if (m.children) {
      var frag = c.element = document.createDocumentFragment();

      c.element = (0, _DOMRendererUtil.resolveDOMElement)(m, params, '' + m.$key);
      renderSubs(c, m.children);

      c.element.appendChild(frag);
    } else {
      c.element = (0, _DOMRendererUtil.resolveDOMElement)(m, params, '' + m.$key);
    }
  } else {

    (0, _DOMRendererUtil.ensureEltPosition)(c.element, params);
    c.update(meta.attributes);
  }

  c.$retained = true;

  return c.element;
}

function _renderChildren(element, children, target) {

  var lastElt = children.reduce(function reducer(prevElt, meta) {

    var p = { parentElt: element, renderer: renderer, prevElt: prevElt };

    if (meta.component) {

      return renderSubComponent(meta, target, p);
    }

    var e = (0, _DOMRendererUtil.resolveDOMElement)(meta, p, '' + meta.$key);

    if (meta.children) {

      _renderChildren(e, meta.children, target, p);
    }

    return e;
  }, null);

  (0, _DOMRendererUtil.clearAfter)(element, lastElt);

  return element;
}

function renderSubs(c, children) {

  c.forEachChild(function (cc) {
    return cc.$retained = false;
  });

  _renderChildren(c.element, children, c, c.$renderParams);

  c.forEachChild(function (cc) {
    if (!cc.$retained) {
      cc.onDone();
    }
  });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureEltPosition = ensureEltPosition;
exports.createPool = createPool;
exports.wrapRenderer = wrapRenderer;
exports.resolveDOMElement = resolveDOMElement;
exports.createElement = createElement;
exports.appendDOMElement = appendDOMElement;
exports.createDomElement = createDomElement;
exports.removeElt = removeElt;
exports.clearAfter = clearAfter;

var _DOMRendererAttrs = __webpack_require__(4);

var w3 = 'http://www.w3.org/';

var DOMNamespaces = {
  html: w3 + '1999/xhtml',
  mathml: w3 + '1998/Math/MathML',
  svg: w3 + '2000/svg'
};

function ensureEltPosition(element, _ref) {
  var parentElt = _ref.parentElt,
      prevElt = _ref.prevElt;


  var placeholder = prevElt ? prevElt.nextSibling : parentElt.firstChild;

  if (placeholder !== element) {

    appendDOMElement(element, parentElt, placeholder);
  }
}

function createPool(element) {

  var pool = element.$pool = {};
  var p = element.firstChild;

  while (p) {
    pool[p.$key] = p;
    p = p.nextSibling;
  }

  return pool;
}

function wrapRenderer(renderer) {

  return function (meta, component) {

    // avoid rendering after done
    if (component.$isDone) {
      return;
    }
    // avoid recurrsive rendering
    if (component.$isRendering) {
      // debounce recurrsive rendering
      component.log('recurrsive rendering');

      if (!component.$pendingRendering) {
        component.$pendingRendering = true;
        setTimeout(function () {
          component.$pendingRendering = false;
          component.invalidate();
        }, 10);
      }
      return;
    }

    component.$isRendering = true;

    var element = renderer(meta, component);

    component.$isRendering = false;

    return element;
  };
}

function resolveDOMElement(meta, _ref2, $key) {
  var parentElt = _ref2.parentElt,
      prevElt = _ref2.prevElt;


  var placeholder = (prevElt ? prevElt.nextSibling : parentElt.firstChild) || null;

  var c = parentElt.$pool && parentElt.$pool[$key];

  if (!c) {

    c = createElement(meta, $key, parentElt);
  } else {

    (0, _DOMRendererAttrs.applyDOMAttributes)(c, meta.attributes);
  }

  if (c !== placeholder) {

    appendDOMElement(c, parentElt, placeholder);
  }

  return c;
}

function createElement(meta, $key, parentElt) {

  var e = null;
  if (meta.tag === '#text') {

    e = document.createTextNode(meta.attributes.text);
    e.$attributes = {};
  } else {

    e = createDomElement(meta.tag, parentElt._namespaceURI);

    e.$attributes = {};

    (0, _DOMRendererAttrs.applyDOMAttributes)(e, meta.attributes);
  }
  // console.log('create DOM', $key);
  (parentElt.$pool || (parentElt.$pool = {}))[$key] = e;

  e.$key = $key;

  return e;
}

function appendDOMElement(element, parent, before) {
  if (before) {
    parent.insertBefore(element, before);
  } else {
    parent.appendChild(element);
  }
}

function createDomElement(tag, _namespace) {

  var e = null;

  var namespace = DOMNamespaces[tag] || _namespace;

  if (namespace) {

    e = document.createElementNS(namespace, tag);

    e._namespaceURI = namespace;
  } else {

    e = document.createElement(tag);
  }

  return e;
}

function removeElt(e) {
  var parentElt = e.parentElement;
  if (parentElt) {

    parentElt.removeChild(e);

    var lstnrs = e.$listeners;
    if (lstnrs) {
      Object.keys(lstnrs).forEach(function (k) {
        return e.removeEventListener(k, lstnrs[k]);
      });
      e.$listeners = null;
    }
    // console.log('remove DOM', e.$key);

    if (parentElt.$pool) {
      delete parentElt.$pool[e.$key];
    }

    e.$key = e.$attributes = null;
  }
}

function clearAfter(parent, _c) {

  var c = _c ? _c.nextSibling : parent.firstChild;

  while (c) {

    var t = c;

    c = c.nextSibling;

    removeElt(t);
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderer = renderer;

var _xml = __webpack_require__(5);

function renderer(_ref, parent) {
  var tag = _ref.tag,
      component = _ref.component,
      children = _ref.children,
      attributes = _ref.attributes;
  var acc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


  if (component) {

    var Ctor = component;

    var c = new Ctor(attributes);

    c.$transclude = children;

    renderer(c.resolveTemplate(), c, acc);
  } else {

    var childrenResult = !children ? null : children.map(function (c) {
      return renderer(c, parent);
    });

    acc.push((0, _xml.xmlStringify)({ tag: tag, attributes: attributes, children: childrenResult }));
  }

  return acc.join('');
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
exports.camelCase = camelCase;
/**
 * String Utils.
 */

/**
 * Transforms given value as capitalized string like 'abc'->'Abc'.
 *
 * @param x
 * @returns {string}
 */
function capitalize(x) {

  if (!x) {
    return '';
  }

  var s = '' + x;

  return s[0].toUpperCase() + s.slice(1);
}

/**
 * Transforms given value as string in camelCase like 'abc_def'->'abcDef'
 *
 * @param x
 * @param separator optional separator
 * @returns {string}
 */
function camelCase(x) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';


  if (!x) {
    return '';
  }

  var parts = ('' + x).split(separator);

  return parts[0] + parts.slice(1).map(capitalize).join('');
}

var mirror = exports.mirror = function mirror(x) {
  return (x || '').split('').reduce(function (r, c) {
    return c + r;
  }, '');
};

exports.default = {
  // returns capitalized `s`
  capitalize: capitalize,
  // returns camelized `s`
  camelize: function camelize(s) {
    var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
    return s && s.length && s.split(sep).map(function (t, i) {
      return i ? capitalize(t) : t;
    }).join('') || '';
  },
  // Returns string formatted by `s`-template filled with rest of arguments.
  format: function format(s) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return s && s.length && s.replace(/\{(\d+)\}/g, function (_, d) {
      return args[+d] || '';
    }) || '';
  },
  snakeCase: function snakeCase(x) {
    return (x || '').replace(/([a-z])([A-Z])/g, '$1_$2');
  },
  mirror: mirror
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var RE_SIGN = exports.RE_SIGN = /([^a-zа-я0-9іўё])/gi;

var tokenizer = exports.tokenizer = function tokenizer() {
  var re = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RE_SIGN;
  var fx = arguments[1];
  var s = arguments[2];
  var ctx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


  var counter = 0,
      lastIndex = 0,
      text = void 0,
      textE = [];

  for (var e = re.exec(s); e; e = re.exec(s)) {

    // preceding text
    text = e.index && s.slice(lastIndex, e.index);
    if (text) {
      textE[0] = text;
      fx(ctx, textE, counter++);
    }

    // matching
    fx(ctx, e, counter++);

    // up past index
    lastIndex = re.lastIndex;
  }

  // tail text
  text = s.slice(lastIndex);
  if (text) {
    textE[0] = text;
    fx(ctx, textE, counter++);
  }

  return ctx;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ })
/******/ ]);