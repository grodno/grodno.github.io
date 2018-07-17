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
/******/ 	return __webpack_require__(__webpack_require__.s = 159);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(61);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(52)('wks')
  , uid        = __webpack_require__(39)
  , Symbol     = __webpack_require__(4).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(12)
  , hide      = __webpack_require__(10)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(9)
  , IE8_DOM_DEFINE = __webpack_require__(67)
  , toPrimitive    = __webpack_require__(54)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(8)
  , createDesc = __webpack_require__(27);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(41);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(45)
  , defined = __webpack_require__(34);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(141)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(46)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(104);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(32);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(75)
  , enumBugKeys = __webpack_require__(44);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(146);
var global        = __webpack_require__(4)
  , hide          = __webpack_require__(10)
  , Iterators     = __webpack_require__(19)
  , TO_STRING_TAG = __webpack_require__(3)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(61);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(11);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(103);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f
  , has = __webpack_require__(14)
  , TAG = __webpack_require__(3)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(34);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(60);

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = __webpack_require__(18);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(32);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = __webpack_require__(62);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.urlParse = urlParse;
exports.urlStringify = urlStringify;
exports.decodeValue = decodeValue;
exports.encodeValue = encodeValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// type:target/path?params#options
function urlParse(s) {
  var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!s) {
    return r;
  }
  if ((typeof s === 'undefined' ? 'undefined' : (0, _typeof3.default)(s)) === 'object') {
    return s;
  }
  var p = void 0;
  // extract type:
  p = s.indexOf(':');
  if (p > -1) {
    r.type = s.slice(0, p);
    s = s.slice(p + 1);
  }
  // extract data:
  p = s.indexOf('#');
  if (p > -1) {
    r.options = decodeValue(s.slice(p + 1));
    s = s.slice(0, p);
  }
  // extract query params:
  p = s.indexOf('?');
  if (p > -1) {
    r.params = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(s.slice(p + 1).split('&')), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var param = _step.value;

        var _param$split = param.split('='),
            _param$split2 = (0, _slicedToArray3.default)(_param$split, 2),
            key = _param$split2[0],
            value = _param$split2[1];

        if (value) {
          r.params[key] = decodeValue(value);
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

    s = s.slice(0, p);
  }
  // target and path:
  var path = r.path = s.split('/').map(decodeURIComponent);
  while (path.length && !r.target) {
    r.target = path.shift();
  }
  return r;
}

// represent as string
function urlStringify(r) {
  var result = '';
  if (r.target) {
    if (r.type) {
      result += r.type + ':';
    }
    result += r.target;
  }
  if (r.path) {
    result += '/' + r.path.map(encodeURIComponent).join('/');
  }
  var params = r.params;
  if (params) {
    var keys = (0, _keys2.default)(params).filter(function (key) {
      return params[key] != null;
    });
    if (keys.length) {
      result += '?' + keys.map(function (key) {
        return key + '=' + encodeValue(params[key]);
      }).join('&');
    }
  }
  if (r.options) {
    result += '#' + encodeValue(r.options);
  }
  return result;
}

var VALUE_MAP = {
  true: true,
  false: false,
  undefined: Object.undefined
};

function decodeValue(val) {
  var value = decodeURIComponent(val);
  if ('{['.indexOf(value[0]) > -1) {
    return JSON.parse(value);
  }
  var num = +value;
  if (!isNaN(num)) {
    return num;
  }
  return VALUE_MAP[value] || value;
}
function encodeValue(value) {
  return encodeURIComponent((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' ? (0, _stringify2.default)(value) : '' + value);
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipes = exports.filterFn = exports.filterByTags = exports.proper = exports.capitalize = exports.humanize = exports.dig = exports.nope = exports.snakeCase = exports.format = exports.camelize = exports.mirror = undefined;

var _slicedToArray2 = __webpack_require__(18);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(32);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

exports.hashToArray = hashToArray;
exports.restoreHotReload = restoreHotReload;
exports.transformNews = transformNews;

var _url = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mirror = exports.mirror = function mirror(x) {
  return (x || '').split('').reduce(function (r, c) {
    return c + r;
  }, '');
}; // import { translit } from './mova.js'
var camelize = exports.camelize = function camelize(s) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  return s && s.length && s.split(sep).map(function (t, i) {
    return i ? capitalize(t) : t;
  }).join('') || '';
};
var format = exports.format = function format(s) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return s && s.length && s.replace(/\{(\d+)\}/g, function (_, d) {
    return args[+d] || '';
  }) || '';
};
var snakeCase = exports.snakeCase = function snakeCase(x) {
  return (x || '').replace(/([a-z])([A-Z])/g, '$1_$2');
};
var nope = exports.nope = function nope(x) {
  return x;
};
var dig = exports.dig = function dig(obj, key) {
  return key.split('.').reduce(function (r, k) {
    return !r ? null : r[k];
  }, obj);
};
var humanize = exports.humanize = function humanize(key) {
  return ('' + key).split('_').map(capitalize).join(' ');
};
var capitalize = exports.capitalize = function capitalize(s) {
  return s ? s.slice(0, 1).toUpperCase() + s.slice(1) : '';
};
var proper = exports.proper = function proper(s) {
  return capitalize(camelize(s));
};

function hashToArray(hash) {
  return (0, _keys2.default)(hash).map(function (k) {
    return hash[k];
  });
}

function restoreHotReload($) {
  var hot = module && module.hot;
  if (hot) {
    hot.addStatusHandler(function (d) {});
    // hot.accept();
    hot.dispose(function (d) {
      d.data = $.data;
    });
    var data = hot.data;
    if (data) {
      return data.data || {};
    }
  }
  return {};
}

var filterByTags = exports.filterByTags = function filterByTags(data) {
  var rtags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return data.filter(function (e) {
    var tags = e.tags || [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(rtags), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var tag = _step.value;

        if (!tags.includes(tag)) {
          return false;
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

    return true;
  });
};
var filterFn = exports.filterFn = function filterFn(filter) {
  return function (item) {
    return item.status !== 'deleted' && (0, _keys2.default)(filter || {}).reduce(function (r, k) {
      var _k$split = k.split('__'),
          _k$split2 = (0, _slicedToArray3.default)(_k$split, 2),
          field = _k$split2[0],
          _k$split2$ = _k$split2[1],
          op = _k$split2$ === undefined ? 'eq' : _k$split2$;

      var value = filter[k];
      return r && (!value || (op === 'eq' ? item[field] === value : item[field].includes(value)));
    }, true);
  };
};

function transformNews(data) {
  var filter = this.filter;
  var sortBy = this.sortBy;
  var tags = this.tags;
  var items = data ? data.filter(filterFn(filter)) : data;
  if (items && tags) {
    items = items.filter(function (e) {
      return tags.reduce(function (r, tag) {
        return r && e.tags && e.tags.includes(tag);
      }, true);
    });
  }
  if (items && sortBy) {
    items = items.sort(function (e1, e2) {
      return e1[sortBy] < e2[sortBy] ? 1 : -1;
    });
  }
  return items;
}

var pipes = exports.pipes = {
  upper: function upper(s) {
    return ('' + s).toUpperCase();
  },
  capitalize: capitalize,
  serializeParams: function serializeParams(x) {
    return !x ? '' : (0, _keys2.default)(x).map(function (k) {
      return k + '=' + x[k];
    }).join('&');
  },
  initials: function initials(x) {
    return !x ? '' : x.split(' ').slice(0, 2).map(function (s) {
      return s.slice(0, 1).toUpperCase();
    }).join('');
  },
  translit: function translit(x) {
    return x;
  },
  urlHost: function urlHost(x) {
    return (0, _url.urlParse)(x).target;
  },
  subject: function subject(_s) {
    var s = _s || '';
    return s.slice(0, 50) + (s.length > 50 ? '...' : '');
  },
  ago: function ago(s) {
    var val = s || '';
    return val.fromNow().replace('ago', 'tamu').replace('hours', 'qasow').replace('hour', 'qas').replace('days', 'dzon').replace('day', 'dzen');
  },
  preview: function preview(s) {
    var val = '' + (s || '');
    return val.replace(/<br\s?\/?>/g, '~').replace(/<.*?>/g, ' ').trim().split('~');
  },

  transformNews: transformNews
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)(module)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(26)
  , TAG = __webpack_require__(3)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(12)
  , call        = __webpack_require__(70)
  , isArrayIter = __webpack_require__(68)
  , anObject    = __webpack_require__(9)
  , toLength    = __webpack_require__(38)
  , getIterFn   = __webpack_require__(57)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(53)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {



/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15)
  , document = __webpack_require__(4).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(26);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(36)
  , $export        = __webpack_require__(7)
  , redefine       = __webpack_require__(76)
  , hide           = __webpack_require__(10)
  , has            = __webpack_require__(14)
  , Iterators      = __webpack_require__(19)
  , $iterCreate    = __webpack_require__(132)
  , setToStringTag = __webpack_require__(28)
  , getPrototypeOf = __webpack_require__(138)
  , ITERATOR       = __webpack_require__(3)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(39)('meta')
  , isObject = __webpack_require__(15)
  , has      = __webpack_require__(14)
  , setDesc  = __webpack_require__(8).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(13)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(9)
  , dPs         = __webpack_require__(73)
  , enumBugKeys = __webpack_require__(44)
  , IE_PROTO    = __webpack_require__(51)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(43)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(66).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(10);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(52)('keys')
  , uid    = __webpack_require__(39);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(15);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(4)
  , core           = __webpack_require__(0)
  , LIBRARY        = __webpack_require__(36)
  , wksExt         = __webpack_require__(56)
  , defineProperty = __webpack_require__(8).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(33)
  , ITERATOR  = __webpack_require__(3)('iterator')
  , Iterators = __webpack_require__(19);
module.exports = __webpack_require__(0).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var version = exports.version = '3.0.0';
/**
 * IndexedDb schema.
 * Auto-generated file. Do not edit.
 * @vendor https://epam.com
 */
var schema = exports.schema = {
  news: 'id, created_at',
  users: 'id, created_at',
  comments: 'id, target, created_at'
};
var firebaseConfig = exports.firebaseConfig = {
  apiKey: 'AIzaSyBZ4bR8ArGmHxo-ExfKrlhkMMAj86lSIpw',
  authDomain: 'grodno-24aa8.firebaseapp.com',
  databaseURL: 'https://grodno-24aa8.firebaseio.com',
  projectId: 'grodno-24aa8',
  storageBucket: 'grodno-24aa8.appspot.com',
  messagingSenderId: '1045179719966'
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(109);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(108);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(8).f
  , create      = __webpack_require__(48)
  , redefineAll = __webpack_require__(50)
  , ctx         = __webpack_require__(12)
  , anInstance  = __webpack_require__(42)
  , defined     = __webpack_require__(34)
  , forOf       = __webpack_require__(35)
  , $iterDefine = __webpack_require__(46)
  , step        = __webpack_require__(72)
  , setSpecies  = __webpack_require__(77)
  , DESCRIPTORS = __webpack_require__(6)
  , fastKey     = __webpack_require__(47).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(33)
  , from    = __webpack_require__(124);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(4)
  , $export        = __webpack_require__(7)
  , meta           = __webpack_require__(47)
  , fails          = __webpack_require__(13)
  , hide           = __webpack_require__(10)
  , redefineAll    = __webpack_require__(50)
  , forOf          = __webpack_require__(35)
  , anInstance     = __webpack_require__(42)
  , isObject       = __webpack_require__(15)
  , setToStringTag = __webpack_require__(28)
  , dP             = __webpack_require__(8).f
  , each           = __webpack_require__(126)(0)
  , DESCRIPTORS    = __webpack_require__(6);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function(target, iterable){
      anInstance(target, C, NAME, '_c');
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        anInstance(this, C, KEY);
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)dP(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4).document && document.documentElement;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(13)(function(){
  return Object.defineProperty(__webpack_require__(43)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(19)
  , ITERATOR   = __webpack_require__(3)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(26);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(3)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(8)
  , anObject = __webpack_require__(9)
  , getKeys  = __webpack_require__(20);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(75)
  , hiddenKeys = __webpack_require__(44).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(14)
  , toIObject    = __webpack_require__(16)
  , arrayIndexOf = __webpack_require__(125)(false)
  , IE_PROTO     = __webpack_require__(51)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(4)
  , core        = __webpack_require__(0)
  , dP          = __webpack_require__(8)
  , DESCRIPTORS = __webpack_require__(6)
  , SPECIES     = __webpack_require__(3)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(12)
  , invoke             = __webpack_require__(131)
  , html               = __webpack_require__(66)
  , cel                = __webpack_require__(43)
  , global             = __webpack_require__(4)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(26)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _toConsumableArray2 = __webpack_require__(25);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _app = __webpack_require__(80);

var _index = __webpack_require__(101);

var _index2 = __webpack_require__(87);

var _index3 = _interopRequireDefault(_index2);

var _index4 = __webpack_require__(90);

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index.launch.apply(undefined, [_app.Application, _app.ModuleContainer].concat((0, _toConsumableArray3.default)(_index3.default), (0, _toConsumableArray3.default)(_index5.default)));

var hot =  false ? null : module.hot;
if (hot) {
  // hot.addStatusHandler(function (d) {})
  // launch(Application, ModuleContainer, ...components, ...pages)
  hot.accept();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)(module)))

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Application = exports.ModuleContainer = undefined;

var _assign = __webpack_require__(11);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(31);

var _res = __webpack_require__(93);

var _res2 = _interopRequireDefault(_res);

var _dispatcher = __webpack_require__(89);

var _config = __webpack_require__(59);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModuleContainer = exports.ModuleContainer = function () {
  function ModuleContainer() {
    (0, _classCallCheck3.default)(this, ModuleContainer);
  }

  (0, _createClass3.default)(ModuleContainer, [{
    key: 'TEMPLATE',
    value: function TEMPLATE() {
      return (/* template */' \n<ui:fragment>\n    <Header/>\n    <ui:moduleType ui:props="{{context}}"/>\n</ui:fragment>'
      );
    }
  }, {
    key: 'moduleType',
    get: function get() {
      return (0, _utils.proper)(this.context && this.context.module || 'home') + 'Module';
    }
  }]);
  return ModuleContainer;
}();
/**
 * The Application class.
 */


var Application = exports.Application = function () {
  (0, _createClass3.default)(Application, [{
    key: 'TEMPLATE',
    value: function TEMPLATE() {
      return (/* html */'<NewsModule ui:props="<- nav://context"/>'
      );
    }
  }, {
    key: 'TEMPLATE3',
    value: function TEMPLATE3() {
      return (/* html */'\n      <Sidebar>\n        <Aside ui:key="aside"/>\n        <ModuleContainer ui:key="content" context="<- nav://context"/>\n      </Sidebar>'
      );
    }
  }]);

  function Application() {
    (0, _classCallCheck3.default)(this, Application);

    (0, _assign2.default)(this, {
      pipes: _utils.pipes,
      version: _config.version

    });
    this.delegate = new _dispatcher.Dispatcher(this);
  }
  // hook on init


  (0, _createClass3.default)(Application, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var hashchange = function hashchange() {
        return _this.emit('nav:hashchange', { value: window.location.hash.slice(1) });
      };
      window.addEventListener('hashchange', hashchange);
      hashchange();
    }
    // emit actions from "-> url"

  }, {
    key: 'emit',
    value: function emit(url, payload) {
      this.delegate.dispatch(url, payload);
    }
    // data access from "<- url"

  }, {
    key: 'fetch',
    value: function fetch(url, cb) {
      return this.delegate.subscribe(url, cb);
    }
    // resolves resources from ":key"

  }, {
    key: 'resource',
    value: function resource(key, def) {
      return _res2.default[key] || def || (_res2.default[key] = (0, _utils.humanize)(key));
    }
  }]);
  return Application;
}();

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = undefined;

var _assign = __webpack_require__(11);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(24);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _defineProperty2 = __webpack_require__(23);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELD_TYPES = {
  'enum': 'EnumField',
  'ref': 'RefField',
  'text': 'TextareaField',
  'dict': 'DictField',
  'bool': 'SwitchField'
};
function onChange(_ref) {
  var value = _ref.value;

  this.value = value;
  this.delegate.updateData((0, _defineProperty3.default)({}, this.id, this.value));
}

var Form = exports.Form = function () {
  function Form() {
    (0, _classCallCheck3.default)(this, Form);
  }

  (0, _createClass3.default)(Form, [{
    key: 'TEMPLATE',
    value: function TEMPLATE() {
      return (/* html */'\n    <div class="docs-demo columns">\n      <div class="column col-9 col-sm-12">\n        <div class="form-horizontal">\n          <ui:fieldType ui:each="field of fields" ui:props="{{fieldProps}}" ui:if="fieldShown"/>\n        </div>\n      </div>\n    </div>'
      );
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this.data || (this.data = {});
    }
  }, {
    key: 'getFieldType',
    value: function getFieldType() {
      return FIELD_TYPES[this.field.type] || 'TextField';
    }
  }, {
    key: 'getFieldShown',
    value: function getFieldShown() {
      var _this = this;

      return this.field.shown ? this.field.shown.replace(/\{\{(\w+)\}\}/g, function (_, p) {
        return _this.getData()[p] || '';
      }) : true;
    }
  }, {
    key: 'getFieldProps',
    value: function getFieldProps() {
      var _this2 = this;

      var field = this.field;
      var data = this.getData();
      var value = data[field.id];
      return (0, _extends3.default)({}, field, {
        typeSpec: field.typeSpec ? field.typeSpec.replace(/\{\{(\w+)\}\}/g, function (_, p) {
          return _this2.getData()[p];
        }) : null,
        caption: field.id,
        value: value === undefined ? null : value,
        delegate: this,
        onChange: onChange
      });
    }
  }, {
    key: 'updateData',
    value: function updateData(delta) {
      var data = (0, _assign2.default)(this.getData(), delta);
      this.assign({ data: data });
      this.changed && this.changed((0, _defineProperty3.default)({}, this.into || 'data', this.data));
    }
  }]);
  return Form;
}();

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Modal = /* html */exports.Modal = "\n<div class=\"modal modal active:{{open}}\">\n  <a class=\"modal-overlay\" aria-label=\"Close\" click=\"{{close}}\"></a>\n  <div class=\"modal-container\">\n    <div class=\"modal-header\">\n      <a class=\"btn btn-clear float-right\" aria-label=\":close\" click=\"{{close}}\"></a>\n      <div class=\"modal-title h5\" ui:if=\"title\">{{title}}</div>\n      <transclude key=\"header\"/>\n    </div>\n    <div class=\"modal-body\" style=\"max-height: 70vh;\">\n      <div class=\"content\">\n        <transclude/>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n        <transclude key=\"footer\"/>\n    </div>\n  </div>\n</div>";

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tags = undefined;

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

var _set = __webpack_require__(107);

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = __webpack_require__(25);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tags = exports.Tags = function () {
  function Tags() {
    (0, _classCallCheck3.default)(this, Tags);
  }

  (0, _createClass3.default)(Tags, [{
    key: 'TEMPLATE',
    value: function TEMPLATE() {
      return (/* html */'\n  <div class="ui mini labels">\n    <ui:fragment ui:each="tag of tags">\n      <ui:fragment ui:if="itemSelected">\n      <ui:then>\n      <span class="chip bg-success"  data-id="{{tag.id}}" click="{{onItemClick}}">\n      <span>{{tag.id}} <small>{{tag.count}}</small></span>\n      </span>\n      </ui:then>\n      <ui:else>\n      <span class="chip"  data-id="{{tag.id}}" click="{{onItemClick}}">\n        <span>{{tag.id}} <small>{{tag.count}}</small></span>\n      </span>\n      </ui:else>\n      </ui:fragment>\n    </ui:fragment>\n  </div>'
      );
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this.data || (this.data = []);
    }
  }, {
    key: 'setData',
    value: function setData(v) {
      if (v && v.length) {
        this.data = v;
      }
    }
  }, {
    key: 'onItemClick',
    value: function onItemClick(_ref) {
      var id = _ref.id;

      if (this.selection.has(id)) {
        this.selection.delete(id);
      } else {
        this.selection.add(id);
      }

      this.assign({});

      if (this.selectionChanged) {
        this.selectionChanged({ tags: [].concat((0, _toConsumableArray3.default)(this.selection)) });
      }
    }
  }, {
    key: 'selection',
    get: function get() {
      return this._selection || (this._selection = new _set2.default());
    }
  }, {
    key: 'tags',
    get: function get() {
      var _this = this;

      var sel = [].concat((0, _toConsumableArray3.default)(this.selection));
      var items = !this.selection.size ? this.getData() : this.getData().filter(function (e) {
        var etags = ('' + e.tags).split(',');
        return sel.reduce(function (r, s) {
          return r && etags.includes(s);
        }, true);
      });
      var tags = items.reduce(function (r, e) {
        var etags = ('' + e.tags).split(',');
        var match = !_this.selection.size || etags.find(function (t) {
          return _this.selection.has(t);
        });
        if (match) {
          etags.forEach(function (t) {
            if (t) {
              r[t] = (r[t] || 0) + 1;
            }
          });
        }
        return r;
      }, {});

      return (0, _keys2.default)(tags).sort().map(function (id) {
        return { id: id, count: tags[id] };
      });
    }
  }, {
    key: 'itemSelected',
    get: function get() {
      var id = this.tag.id;
      return this.selection.has(id);
    }
  }]);
  return Tags;
}();

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserInfo = exports.UserBar = undefined;

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserBar = /* html */exports.UserBar = "\n  <div  class=\"float-right\">\n  <ui:fragment ui:if=\"isAnonymous\">\n    <ui:then>\n      <a click=\"-> user:login\" class=\"anchor\" aria-hidden=\"true\">login</a>\n    </ui:then>\n    <ui:else>    \n      <div class=\"tile tile-centered\">\n        <div class=\"tile-icon\"  ui:if=\"photoURL\">\n          <div class=\"example-tile-icon\">\n          <figure class=\"avatar avatar\">\n            <img src=\"{{photoURL}}\" alt=\"Avatar\"/>\n          </figure>\n          </div>\n        </div>\n        <div class=\"tile-content\">\n          <div class=\"tile-title\" ui:if=\"displayName\">{{displayName}}</div>\n          <a class=\"tile-subtitle text-gray\" href=\"mailto:{{email}}\">{{email}}</a>\n        </div>\n        <!-- <div class=\"tile-action\">\n          <button class=\"btn btn-link\">\n            <i class=\"icon icon-more-vert\"></i>\n          </button>\n        </div> -->\n      </div>\n    </ui:else>\n  </ui:fragment>\n  </div>\n  ";

var UserInfo = exports.UserInfo = function () {
  function UserInfo() {
    (0, _classCallCheck3.default)(this, UserInfo);
  }

  (0, _createClass3.default)(UserInfo, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"<div class=\"ui raised segment\">\n    <a class=\"ui yellow image label\">\n        <i class=\"jp flag\"></i>\n        {{profile.name}}\n        <div class=\"detail\">Citizen</div>\n    </a>\n    <div class=\"ui divided selection list\">\n      <div class=\"item\" each=\"contact of contacts\">\n        <div class=\"ui {{contact.color}} horizontal label\">{{contact.type}}</div>\n        <a href=\"{{contact.link}}\" target=\"_blank\">{{contact.text}}</a>\n      </div>\n    </div>\n  </div>"
      );
    }
  }]);
  return UserInfo;
}();

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigRedButton = exports.Select = undefined;

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = exports.Select = function () {
  function Select() {
    (0, _classCallCheck3.default)(this, Select);
  }

  (0, _createClass3.default)(Select, [{
    key: 'TEMPLATE',
    value: function TEMPLATE() {
      return (/* html */'\n      <select class="form-select" change="{{change}}">\n        <option selected="{{selected}}" value="" ui:if="!required">...</option>\n        <option ui:each="option of options" selected="{{selected}}" value="{{option.id}}">{{optionName}}</option>\n      </select>'
      );
    }
  }, {
    key: 'getSelected',
    value: function getSelected() {
      return this.option ? this.value === this.option.id : !this.value;
    }
  }, {
    key: 'getOptionName',
    value: function getOptionName() {
      var option = this.option;
      return option.name || option.id;
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      if (this.options) {
        return this.options;
      }
      this.options = [{ name: 'loading...' }];
      return this.options;
    }
  }]);
  return Select;
}();

var BigRedButton = /* html */exports.BigRedButton = '    \n  <button class="btn tooltip tooltip-left fixed bg-error circle" \n  style="right:1rem; bottom:1rem; width: 2rem;" \n  data-tooltip="{{tooltip}}" click="{{action}}">\n  <i class="icon icon-plus"></i>\n  </button>';

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefField = exports.DictField = exports.EnumField = exports.RadioField = exports.TextareaField = exports.SwitchField = exports.TextField = undefined;

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextField = exports.TextField = function () {
  function TextField() {
    (0, _classCallCheck3.default)(this, TextField);
  }

  (0, _createClass3.default)(TextField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\" for=\"input-example-4\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n          <input class=\"form-input\" id=\"input-example-4\" type=\"text\" \n          placeholder=\"{{caption}}\" value=\"{{value}}\" change=\"{{onChange}}\">\n        </div>\n      </div>"
      );
    }
  }]);
  return TextField;
}();

var SwitchField = exports.SwitchField = function () {
  function SwitchField() {
    (0, _classCallCheck3.default)(this, SwitchField);
  }

  (0, _createClass3.default)(SwitchField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-9 col-sm-12 col-ml-auto\">\n          <label class=\"form-switch\">\n            <input type=\"checkbox\"\n            toggle=\"{{onChange}}\"\n            checked=\"{{value}}\"><i class=\"form-icon\"></i> {{caption}}\n          </label>\n        </div>\n      </div>"
      );
    }
  }]);
  return SwitchField;
}();

var TextareaField = exports.TextareaField = function () {
  function TextareaField() {
    (0, _classCallCheck3.default)(this, TextareaField);
  }

  (0, _createClass3.default)(TextareaField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\" for=\"input-example-6\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n          <textarea class=\"form-input\" style=\"min-height: 15vh;\" id=\"input-example-6\" placeholder=\"{{caption}}\" rows=\"3\" change=\"{{onChange}}\"  value=\"{{value}}\"></textarea>\n        </div>\n      </div>"
      );
    }
  }]);
  return TextareaField;
}();

var RadioField = exports.RadioField = function () {
  function RadioField() {
    (0, _classCallCheck3.default)(this, RadioField);
  }

  (0, _createClass3.default)(RadioField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n          <label class=\"form-radio\">\n            <input type=\"radio\" name=\"gender\"><i class=\"form-icon\"></i> Male\n          </label>\n          <label class=\"form-radio\">\n            <input type=\"radio\" name=\"gender\" checked=\"\"><i class=\"form-icon\"></i> Female\n          </label>\n        </div>\n      </div>"
      );
    }
  }]);
  return RadioField;
}();

var EnumField = exports.EnumField = function () {
  function EnumField() {
    (0, _classCallCheck3.default)(this, EnumField);
  }

  (0, _createClass3.default)(EnumField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n          <Select change=\"{{onChange}}\" options=\"<- res:{{typeSpec}}\"/>\n        </div>\n      </div>"
      );
    }
  }]);
  return EnumField;
}();

var DictField = exports.DictField = function () {
  function DictField() {
    (0, _classCallCheck3.default)(this, DictField);
  }

  (0, _createClass3.default)(DictField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n        <Select change=\"{{onChange}}\" options=\"<- db:dict/{{typeSpec}}\"/>\n        </div>\n      </div>"
      );
    }
  }]);
  return DictField;
}();

var RefField = exports.RefField = function () {
  function RefField() {
    (0, _classCallCheck3.default)(this, RefField);
  }

  (0, _createClass3.default)(RefField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n          <Select change=\"{{onChange}}\" options=\"<- {{typeSpec}}\"/>\n        </div>\n      </div>"
      );
    }
  }]);
  return RefField;
}();

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(25);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

var _UserInfo = __webpack_require__(84);

var _Tags = __webpack_require__(83);

var _elements = __webpack_require__(85);

var elements = _interopRequireWildcard(_elements);

var _fields = __webpack_require__(86);

var fields = _interopRequireWildcard(_fields);

var _Form = __webpack_require__(81);

var Form = _interopRequireWildcard(_Form);

var _Modal = __webpack_require__(82);

var Modal = _interopRequireWildcard(_Modal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toList = function toList(o) {
  return (0, _keys2.default)(o).map(function (k) {
    return typeof o[k] === 'function' ? o[k] : { NAME: k, TEMPLATE: o[k] };
  });
};

exports.default = [_UserInfo.UserInfo, _Tags.Tags].concat((0, _toConsumableArray3.default)(toList(elements)), (0, _toConsumableArray3.default)(toList(fields)), (0, _toConsumableArray3.default)(toList(Form)), (0, _toConsumableArray3.default)(toList(Modal)));

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Firestore = undefined;

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = __webpack_require__(23);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unpackDocs = function unpackDocs(s) {
  return s.docs.reduce(function (r, e) {
    var d = e.data();
    d.id = e.id;
    r.push(d);
    return r;
  }, []);
};

var Firestore = exports.Firestore = function () {
  function Firestore(config) {
    (0, _classCallCheck3.default)(this, Firestore);

    var firebase = window.firebase;
    if (!window.firebaseInited) {
      firebase.initializeApp(config);
      window.firebaseInited = true;
    }

    this.db = window.firebase.firestore();
    this.db.settings({ timestampsInSnapshots: true });
    this.auth = firebase.auth();
    this.auth.languageCode = 'by';
    this.providers = {
      Google: firebase.auth.GoogleAuthProvider
    };
  }
  // auth


  (0, _createClass3.default)(Firestore, [{
    key: 'signInAnonymously',
    value: function signInAnonymously() {
      this.auth.signInAnonymously().catch(function (error) {
        var errorMessage = error.message;
        console.log('signInAnonymously err=' + errorMessage);
      });
    }
  }, {
    key: 'listenUser',
    value: function listenUser(cb) {
      this.auth.onAuthStateChanged(cb);
    }
  }, {
    key: 'getCurrentUser',
    value: function getCurrentUser() {
      return this.auth.currentUser;
    }
  }, {
    key: 'linkProvider',
    value: function linkProvider(cb) {
      var provider = new this.providers.Google();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      this.auth.signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken
        // The signed-in user info.
        var googleUser = result.user;
        var credential = this.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
        this.getCurrentUser().linkAndRetrieveDataWithCredential(credential).then(function (usercred) {
          var user = usercred.user;
          console.log('Anonymous account successfully upgraded', user);
          cb();
        }, function (error) {
          console.log('Error upgrading anonymous account', error);
        });
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code
        var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential
        console.log('signInAnonymously err=' + errorMessage);
        // ...
      });
    }
  }, {
    key: 'logout',
    value: function logout(cb) {
      cb();
    }
    // db

  }, {
    key: 'readCollectionSince',
    value: function readCollectionSince(coll) {
      var ts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return function (c) {
        return ts ? c.where('modified_at', '>', ts) : c;
      }(this.db.collection(coll)).get().then(unpackDocs);
    }
  }, {
    key: 'listenCollection',
    value: function listenCollection(coll) {
      var ts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var cb = arguments[2];

      return function (c) {
        return ts ? c.where('modified_at', '>', ts) : c;
      }(this.db.collection(coll)).onSnapshot(function (querySnapshot) {
        var r = [];
        querySnapshot.forEach(function (e) {
          var d = e.data();
          d.id = e.id;
          r.push(d);
        });
        cb(null, (0, _defineProperty3.default)({}, coll, r));
      });
    }
  }, {
    key: 'nextId',
    value: function nextId(coll) {
      return this.db.collection(coll).doc().id;
    }
  }, {
    key: 'update',
    value: function update(delta) {
      var _this = this;

      var now = Date.now().valueOf();
      // Get a new write batch
      var batch = this.db.batch();
      (0, _keys2.default)(delta).forEach(function (coll) {
        var c = _this.db.collection(coll);
        delta[coll].forEach(function (d) {
          d.modified_at = now;
          var ref = c.doc('' + d.id);
          batch.set(ref, d, { merge: true });
        });
      });
      return batch.commit();
    }
  }]);
  return Firestore;
}();

var hot =  false ? null : module.hot;
if (hot) {
  // hot.addStatusHandler(function (d) {})
  hot.accept();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)(module)))

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dispatcher = undefined;

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

var _map = __webpack_require__(22);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(31);

var _url = __webpack_require__(30);

var _nav = __webpack_require__(96);

var _local = __webpack_require__(95);

var _user = __webpack_require__(97);

var _idb = __webpack_require__(94);

var _firebase = __webpack_require__(88);

var _config = __webpack_require__(59);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cnt = 0;
var notFoundMethod = function notFoundMethod(x) {
  console.error('Not found' + x);
  // debugger;
  return null;
};
// top-level app dispatcher

var Dispatcher = exports.Dispatcher = function () {
  function Dispatcher(app) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Dispatcher);

    var local = new _local.LocalStore(app.version);
    this.log = function () {
      for (var _len = arguments.length, value = Array(_len), _key = 0; _key < _len; _key++) {
        value[_key] = arguments[_key];
      }

      return app.emit('console:log', value);
    };
    this.error = function () {
      for (var _len2 = arguments.length, value = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        value[_key2] = arguments[_key2];
      }

      return app.emit('console:error', value);
    };
    this.emit = function (u, x) {
      return app.emit(u, x);
    };
    this.get = function (key) {
      return local.get(key);
    };
    this.assign = function (key, cb) {
      return local.assign(key, cb);
    };
    this.subscribers = new _map2.default();
    this.notify = function (flt) {
      return _this.subscribers.forEach(function (e) {
        return !flt || flt(e.url) ? e.fn() : null;
      });
    };
    this.fire = new _firebase.Firestore(_config.firebaseConfig);
    this.stores = {
      console: {
        onLog: function onLog(x) {
          return window.console.log(x.data);
        },
        onError: function onError(x) {
          return window.console.error(x.data);
        }
      },
      res: { get: function get(url) {
          return app.resource(url.target);
        } },
      local: local,
      user: new _user.UserStore(this, this.fire),
      db: new _idb.IDB(this, app.version, _config.schema, this.fire),
      nav: new _nav.NavStore(this)
    };
    (0, _keys2.default)(this.stores).forEach(function (key) {
      return _this.stores[key].init && _this.stores[key].init();
    });
  }

  (0, _createClass3.default)(Dispatcher, [{
    key: 'dispatch',
    value: function dispatch(key, data) {
      var _this2 = this;

      var url = (0, _url.urlParse)(key, { data: data });
      var store = this.stores[url.type] || this;
      var method = store['on' + (0, _utils.capitalize)(url.target)] || notFoundMethod;
      var r = method.call(store, url, this.notify);
      if (r && r.then) {
        r.then(this.notify, function (err) {
          return _this2.error(err);
        });
      }
    }
  }, {
    key: 'subscribe',
    value: function subscribe(key, cb) {
      var _this3 = this;

      var url = (0, _url.urlParse)(key);
      if (url.options === 'once') {
        this.load(url, cb);
        return;
      }
      var uuid = cnt++;
      var fn = function fn() {
        return _this3.load(url, cb);
      };
      this.subscribers.set(uuid, { url: url, fn: fn });
      // this.stores.db.retainCollection(url)
      fn();
      return function () {
        // this.stores.db.releaseCollection(url)
        _this3.subscribers.delete(uuid);
      };
    }
  }, {
    key: 'load',
    value: function load(url, cb) {
      var store = this.stores[url.type || 'res'] || this;
      var method = store['get' + (0, _utils.capitalize)(url.target)] || store['get'] || notFoundMethod;
      var val = method.call(store, url);
      if (val && val.then) {
        val.then(function (r) {
          return cb(null, r);
        }, cb);
      } else {
        cb(null, val);
      }
    }
  }]);
  return Dispatcher;
}();

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(25);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

var _news = __webpack_require__(92);

var news = _interopRequireWildcard(_news);

var _main = __webpack_require__(91);

var main = _interopRequireWildcard(_main);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toList = function toList(o) {
  return (0, _keys2.default)(o).map(function (k) {
    return typeof o[k] === 'function' ? o[k] : { NAME: k, TEMPLATE: o[k] };
  });
};

exports.default = [].concat((0, _toConsumableArray3.default)(toList(news)), (0, _toConsumableArray3.default)(toList(main)));

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MainModule = /* template */exports.MainModule = "    \n<div class=\"container grid-lg\">\n    <div class=\"columns\">\n        <div class=\"column col-12\"><h2>Olgerd na dobu dnia</h2></div>\n        <div class=\"column col-6\">\n            <CardNews data=\"<- latestNews\"/>\n        </div>\n        <div class=\"column col-6\">\n            <CardRatio data=\"<- latestRatio\"/>\n        </div>\n\n        <div class=\"column col-6\">\n            <CardLinks caption=\":media\" data=\":media_links\"/>\n        </div>\n\n        <div class=\"column col-6\">\n            <CardLinks caption=\":parners\" data=\":media_links\"/>\n        </div>\n    </div>\n</div>";

var CardNews = /* template */exports.CardNews = "\n<div class=\"card\">\n    <div class=\"card-image\">\n        <img src=\"{{image}}\" class=\"img-responsive\"/>\n    </div>\n    <div class=\"card-header\">\n        <h5 class=\"card-title\">Naviny dnia</h5>\n        <div class=\"card-subtitle text-gray\">Software and hardware</div>\n    </div>\n    <div class=\"card-body\">\n        <li ui:each=\"e of data\"><a href=\"{{e.link}}\" class=\"item\">{{e.subject|subject|translit}}</a></li>\n    </div>\n    <div class=\"card-footer\">\n        <a class=\"btn btn-primary btn-sm\" href=\"#module/news\">Bolsh</a>\n    </div>\n</div>\n";

var Toast = /* html */exports.Toast = "\n  <div class=\"toast toast-primary\" style=\"position:fixed; right:5rem; bottom:1rem; width: 20rem;\">\n    <button class=\"btn btn-clear float-right\" click=\"->\" data-touch=\"{{text}}\"></button>\n    <p>{{top.ts}}</p>\n  </div>\n  ";
var Header = /* html */exports.Header = "\n  <header class=\"navbar bg-secondary\">\n    <section class=\"navbar-section mx-2\">\n      <Breadcrumbs ui:props=\"<- nav://item\"/>\n    </section>\n    <section class=\"navbar-center\">\n        <img src=\"/assets/grodno2.svg\" alt=\"Spectre.css\" height=\"40\" width=\"40\"/>\n    </section>\n    <section class=\"navbar-section mx-2\">\n    <UserBar ui:props=\"<- user:info\"/>\n\n    </section>\n  </header>";

var Sidebar = /* html */exports.Sidebar = "\n  <div class=\"off-canvas off-canvas-sidebar-show\">\n    <a class=\"off-canvas-toggle btn btn-primary btn-action show-lg\" href=\"#sidebar\">\n      <i class=\"icon icon-menu\"/>\n    </a>\n    <div id=\"sidebar\" class=\"off-canvas-sidebar\">\n      <ui:transclude key=\"aside\"/>\n    </div>\n    <a class=\"off-canvas-overlay\" href=\"#\"></a>\n    <div class=\"off-canvas-content\">\n      <ui:transclude key=\"content\"/>\n    </div>\n  </div>\n  ";
var Tabs = /* html */exports.Tabs = "\n  <ul class=\"tab tab-block\">\n    <li class=\"tab-item\" ui:each=\"item of data\">\n      <a href=\"#tab?tab={{item.value}}\">{{item.name}}</a>\n    </li>\n  </ul>\n  ";

var Aside = /* html */exports.Aside = "\n  <div class=\"panel\" style=\"height: 100%;\">\n  <div class=\"panel-header\">\n    <div class=\"panel-title\">\n    <h1>:olgard</h1>\n    </div>\n  </div>\n  <div class=\"panel-nav\">\n    <!-- navigation components: tabs, breadcrumbs or pagination -->\n  </div>\n  <div class=\"panel-body\">\n    <NavTree data=\"<- nav://items\"/>\n  </div>\n  <div class=\"panel-footer\">\n    Settings\n  </div>\n  </div>\n  ";
var NavTree = /* html */exports.NavTree = "\n  <ul class=\"nav\">\n    <li class=\"nav-item {{item.cl}}\" ui:each=\"item of data\">\n      <a href=\"#{{item.id}}\"><span>{{item.name}}</span><span ui:if=\"item.weight\" class=\"label label-error\">{{item.weight}}</span></a>\n      <NavTree ui:if=\"item.subs\" data=\"{{item.subs}}\"/>\n    </li>\n  </ul>\n  ";
var Home = /* html */exports.Home = "\n  <p>Home</p>\n  ";

var Navs = /* html */exports.Navs = "\n  <div class=\"panel\" style=\"height: 100%;\">\n  <div class=\"panel-header\">\n    <div class=\"panel-title\">\n      <UserBar ui:props=\"me\"/>\n    </div>\n  </div>\n  <div class=\"panel-nav\">\n    <!-- navigation components: tabs, breadcrumbs or pagination -->\n  </div>\n  <div class=\"panel-body\">\n    <NavTree data=\":nav\"/>\n  </div>\n  <div class=\"panel-footer\">\n    Settings\n  </div>\n  </div>\n  ";

var Breadcrumbs = /* html */exports.Breadcrumbs = "\n  <ul class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\">\n    <div class=\"dropdown\">\n        <a class=\"btn btn-link dropdown-toggle\" tabindex=\"0\">Naviny<i class=\"icon icon-caret\"></i></a>\n        <ul class=\"menu\">\n          <li class=\"menu-item\">\n            <a href=\"#dropdowns\">\n              Naviny\n            </a>\n          </li>\n          <li class=\"menu-item\">\n            <a href=\"#dropdowns\">\n              Calendar\n            </a>\n          </li>\n          <li class=\"menu-item\">\n            <a href=\"#dropdowns\">\n              Ljudzi\n            </a>\n          </li>\n        </ul>\n      </div>\n  </li>\n</ul>\n";

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var NewsModule = /* template */exports.NewsModule = "\n<div class=\"container\">\n    <h3 class=\"s-title\">Kroniki Olgarda</h3>\n    <NewsList data=\"<- db:index/news\" sortBy=\"created_at\"/>\n    <BigRedButton tooltip=\"Add a new record\" action=\"-> nav:addNew\"/>\n    <NewsUpdateModal ui:if=\"id\" id=\"{{id}}\" open=\"{{open}}\" data=\"<- db:one/news/{{id}}\"/>\n    <NewsCreateModal ui:if=\"newEntry\" open=\"{{open}}\" data=\"{{newEntry}}\"/> \n</div>";

var NewsCreateModal = /* template */exports.NewsCreateModal = "\n<Modal ui:if=\"\" open=\"{{open}}\" title=\"Add a new record\" close=\"-> nav:close\">\n  <Form fields=\":news_form\" data=\"{{data}}\" changed=\"{{assign}}\"/>\n  <ui:fragment ui:key=\"footer\">\n    <button class=\"btn btn-primary\" data=\"{{data}}\" click=\"-> db:create/news\">:create_new</button>\n  </ui:fragment>\n</Modal>";

var NewsUpdateModal = /* template */exports.NewsUpdateModal = "\n<Modal ui:if=\"id\" open=\"{{open}}\" title=\"Edit record ({{id}})\" close=\"-> nav:close\">\n  <Form fields=\":news_form\" data=\"{{data}}\" changed=\"{{assign}}\"/>\n  <ui:fragment ui:key=\"footer\">\n    <button class=\"btn btn-primary\" data=\"{{data}}\" click=\"-> db:update/news\">:update</button>\n    <button class=\"btn btn-danger\" click=\"-> db:delete/news/{{id}}\">:delete</button>\n  </ui:fragment>\n</Modal>";

var NewsListItemFeatured = /* template */exports.NewsListItemFeatured = "\n    <div class=\"card column col-12 col-sm-12\">\n        <div class=\"card-image\">\n            <img src=\"{{image}}\" class=\"img-responsive\"/>\n        </div>\n        <div class=\"card-header\">\n            <div class=\"card-title h5\">{{subject|subject|translit}}</div>\n            <div class=\"card-subtitle text-gray\">Software and hardware</div>\n        </div>\n        <div class=\"card-body\">\n            {{preview|translit}}\n        </div>\n        <div class=\"card-footer\">\n            <button class=\"btn btn-primary btn-sm\">Do</button>\n        </div>\n    </div>";

// NewsListItem
var NewsListItem = /* template */exports.NewsListItem = "\n<div class=\"column col-9 col-sm-12\">\n  <div class=\"tile\">\n    <div class=\"tile-icon\">\n        <figure class=\"avatar avatar- bg-primary\" data-initial=\"{{subject|initials}}\"><img src=\"{{image}}\" class=\"img-responsive\"  data-value=\"{{id}}\" click=\"-> nav:openItem\"/></figure>\n      </div>\n    <div class=\"tile-content\">\n        <p class=\"tile-title\">\n        <h5><a class=\"header\" data-value=\"{{id}}\" click=\"-> nav:openItem\">{{subject|subject|translit}}</a></h5>\n        <small>{{created_at}}</small>\n        <small class=\"mx-2\"><a href=\"{{link}}\" target=\"_blank\">{{link|urlHost}}</a></small>\n        <small class=\"mx-2\">{{tags}}</small>\n        </p>\n        <p class=\"tile-subtitle\">\n            <span><img src=\"/assets/grodno2.svg\" height=\"10\" width=\"10\"/> {{preview|translit}}</span>\n            <!--span ui:each=\"tag of tags\" class=\"chip\">{{tag}}</span-->\n        </p>\n    </div>\n  </div>\n</div>";

var NewsList = /* html */exports.NewsList = "\n<div>\n  <div><Tags data=\"{{data}}\" selectionChanged=\"{{assign}}\"/></div>\n  <div class=\"columns\">\n      <NewsListItem ui:props=\"{{item}}\" ui:each=\"item of data|transformNews\"/>\n      <div class=\"column col-9 col-sm-12 loading\" ui:if=\"!data\">\n        <ui:else><h6 class=\"column col-9 col-sm-12\" ui:if=\"!data.length\">Empty list</h6></ui:else>\n      </div>\n  </div>\n</div>\n";

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  media_links: [{ name: 'S13.ru', id: '//s13.ru' }, { name: 'Forum', id: '//forum.grodno.net/' }],
  news_form: [{ 'id': 'subject', 'type': 'name', 'typeSpec': 'city' }, { 'id': 'preview', 'type': 'text', 'typeSpec': 'unit' }, { 'id': 'body', 'type': 'text', 'typeSpec': 'country' }, { 'id': 'tags', 'type': 'enum', 'typeSpec': 'tags' }],
  tags: [{ name: 'Padzei', id: 'events' }, { name: 'Gistorya', id: 'history' }, { name: 'Zabavki', id: 'amazing' }]
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDB = undefined;

var _defineProperty2 = __webpack_require__(23);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _slicedToArray2 = __webpack_require__(18);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = __webpack_require__(106);

var _promise2 = _interopRequireDefault(_promise);

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

var _assign = __webpack_require__(11);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(24);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(31);

var _url = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IDB = exports.IDB = function () {
  function IDB(top, version, schema, remote) {
    (0, _classCallCheck3.default)(this, IDB);

    var db = new window.Dexie(version);
    db.version(1).stores((0, _extends3.default)({}, schema, { _meta: 'id' }));
    // Open the database
    db.open().catch(function (error) {
      this.error('DB.open: ' + error);
    });
    (0, _assign2.default)(this, {
      log: top.log,
      top: top,
      version: version,
      db: db,
      cache: {},
      realtimes: {},
      dbkeys: (0, _keys2.default)(schema),
      remote: remote
    });
  }

  (0, _createClass3.default)(IDB, [{
    key: 'init',
    value: function init() {
      var _this = this;

      if (this.top.get('$version') !== this.version) {
        this.top.assign({ $version: this.version });
      } else {
        this.sync().then(function () {
          _this.log('DB sync OK');_this.top.notify(function (u) {
            return u.type === 'db';
          });
        }).catch(function (err) {
          return _this.log('DB sync error: ' + err);
        });
      }
    }
  }, {
    key: 'sync',
    value: function sync() {
      var _this2 = this;

      return this.getCollection('_meta').toArray().then(function (m) {
        var meta = m.reduce(function (r, e) {
          r[e.id] = e;return r;
        }, {});
        var ops = _this2.dbkeys.map(function (coll) {
          return _this2.syncCollection(coll, (0, _utils.dig)(meta, coll + '_table.last_sync')).then(function (docs) {
            return [coll, docs];
          });
        });
        return _promise2.default.all(ops);
      }).then(function (r) {
        return _this2.localUpdate(r.reduce(function (d, e) {
          var docs = e[1];
          var lastTs = docs.reduce(function (last, e) {
            return e.modified_at > last ? e.modified_at : last;
          }, 0);
          d['_meta'].push({ id: e[0] + '_table', last_sync: lastTs });
          d[e[0]] = docs;
          return d;
        }, { _meta: [] }));
      });
    }
  }, {
    key: 'syncCollection',
    value: function syncCollection(coll) {
      var ts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return this.remote.readCollectionSince(coll, ts);
    }
  }, {
    key: 'getCollection',
    value: function getCollection(coll) {
      return this.db[coll];
    }
  }, {
    key: 'retainCollection',
    value: function retainCollection(url) {
      var _this3 = this;

      if (url.type === 'db') {
        var _url$path = (0, _slicedToArray3.default)(url.path, 1),
            coll = _url$path[0];

        if (this.realtimes[coll]) {
          this.realtimes[coll].counter++;
        } else {
          this.realtimes[coll] = { counter: 1 };
          var fn = function fn(ts) {
            var flt = function flt(u) {
              return u.type === 'db' && u.path[0] === coll;
            };
            var cb = function cb(_, delta) {
              return _this3.localUpdate(delta).then(function () {
                return _this3.top.notify(flt);
              });
            };
            _this3.realtimes[coll].unsubscribe = _this3.remote.listenCollection(coll, ts, cb);
          };
          this.getCollection('_meta').get(coll + '_table').then(function (m) {
            return fn(m.last_sync);
          }, function () {
            return fn(0);
          });
        }
      }
    }
  }, {
    key: 'releaseCollection',
    value: function releaseCollection(url) {
      if (url.type === 'db') {
        var _url$path2 = (0, _slicedToArray3.default)(url.path, 1),
            coll = _url$path2[0];

        if (this.realtimes[coll]) {
          this.realtimes[coll].counter--;
          if (this.realtimes[coll].counter === 0) {
            this.realtimes[coll].unsubscribe();
          }
        }
      }
    }
  }, {
    key: 'getOne',
    value: function getOne(url) {
      var _url$path3 = (0, _slicedToArray3.default)(url.path, 2),
          kind = _url$path3[0],
          id = _url$path3[1];

      var coll = this.getCollection(kind);
      return coll.get(id).then(function (d) {
        return (0, _extends3.default)({}, d, { kind: kind });
      });
    }
  }, {
    key: 'getDict',
    value: function getDict(url) {
      var _url$path4 = (0, _slicedToArray3.default)(url.path, 1),
          type = _url$path4[0];

      return this.getCollection('dict').where('type').equals(type).toArray();
    }
  }, {
    key: 'getIndex',
    value: function getIndex(url) {
      url = (0, _url.urlParse)(url);

      var _url$path5 = (0, _slicedToArray3.default)(url.path, 3),
          kind = _url$path5[0],
          index = _url$path5[1],
          indexKey = _url$path5[2];

      if (!this.dbkeys.includes(kind)) {
        return null;
      }
      var coll = this.getCollection(kind);
      if (index && indexKey) {
        coll = coll.where(index).equals(indexKey);
      }
      var filter = url.params;
      if (filter) {
        coll = coll.filter((0, _utils.filterFn)(filter));
      }
      return coll.toArray();
    }
  }, {
    key: 'eachDelta',
    value: function eachDelta(delta) {
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.nope;

      var bulks = {};
      for (var coll in delta) {
        if (this.dbkeys.includes(coll)) {
          bulks[coll] = delta[coll].map(fn);
        }
      }
      return bulks;
    }
  }, {
    key: 'localUpdate',
    value: function localUpdate(delta) {
      var _this4 = this;

      var bulks = this.eachDelta(delta);
      if (delta._meta) {
        bulks._meta = delta._meta;
      }
      var ops = (0, _keys2.default)(bulks).map(function (key) {
        return _this4.db[key].bulkPut(bulks[key]);
      });
      return _promise2.default.all(ops);
    }
  }, {
    key: 'update',
    value: function update(delta) {
      var _this5 = this;

      return this.localUpdate(delta).then(function () {
        return _this5.remote.update(delta);
      });
    }
  }, {
    key: 'onCreate',
    value: function onCreate(_ref) {
      var _this6 = this;

      var _ref$path = (0, _slicedToArray3.default)(_ref.path, 1),
          kind = _ref$path[0],
          data = _ref.data;

      data.id = this.remote.nextId(kind);
      return this.update((0, _defineProperty3.default)({}, kind, [data])).then(function () {
        _this6.log('Created', data);
      });
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(_ref2) {
      var _this7 = this;

      var _ref2$path = (0, _slicedToArray3.default)(_ref2.path, 1),
          kind = _ref2$path[0],
          data = _ref2.data;

      return this.update((0, _defineProperty3.default)({}, kind, [data])).then(function () {
        _this7.log('Updated', data);
      });
    }
  }, {
    key: 'onDelete',
    value: function onDelete(_ref3) {
      var _this8 = this;

      var _ref3$path = (0, _slicedToArray3.default)(_ref3.path, 2),
          kind = _ref3$path[0],
          id = _ref3$path[1];

      return this.update((0, _defineProperty3.default)({}, kind, [{ id: id, status: 'deleted' }])).then(function () {
        _this8.top.emit('nav:close');
        _this8.log('Deleted', id);
      });
    }
  }]);
  return IDB;
}();

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStore = undefined;

var _stringify = __webpack_require__(60);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _utils = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStore = exports.LocalStore = function LocalStore(version) {
  (0, _classCallCheck3.default)(this, LocalStore);

  var cache = {};
  var prefix = version + ':';
  var storage = window.localStorage;

  this.get = function (key) {
    return cache[key] = JSON.parse(storage.getItem(prefix + key) || 'null');
  };

  this.assign = function (delta) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.nope;

    for (var key in delta) {
      var val = delta[key] || null;
      cache[key] = val;
      storage.setItem(prefix + key, (0, _stringify2.default)(val));
    }
    cb();
  };
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavStore = undefined;

var _slicedToArray2 = __webpack_require__(18);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = __webpack_require__(23);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = __webpack_require__(24);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _url = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavStore = exports.NavStore = function () {
  function NavStore(top) {
    (0, _classCallCheck3.default)(this, NavStore);

    this.get = function (x) {
      return top.get(x);
    };
    this.assign = function (x, cb) {
      return top.assign(x, cb);
    };
  }

  (0, _createClass3.default)(NavStore, [{
    key: 'onHashchange',
    value: function onHashchange(_ref, cb) {
      var value = _ref.data.value;

      var url = (0, _url.urlParse)(value);
      var module = url.target || this.get('module');
      var key = module + '_context';
      var ctx = this.get(key) || {};
      this.assign((0, _defineProperty3.default)({
        module: module
      }, key, (0, _extends3.default)({}, ctx, url.params, { module: module })), cb);
    }
  }, {
    key: 'getItems',
    value: function getItems() {
      return [{ name: 'Naviny', id: 'news' }, { name: 'Calendar', id: 'calendar' }, { name: 'Liudzi', id: 'people' }];
    }
  }, {
    key: 'getItem',
    value: function getItem() {
      var _this = this;

      var item = this.getItems().find(function (e) {
        return e.id === _this.module;
      }) || {};
      var modes = item.subs || [];
      var mode = this.mode || '';
      var current = modes.find(function (e) {
        return e.id === mode;
      }) || { id: '', name: '...' };
      return { path: [{ id: '' + item.id, name: item.name }], modes: modes, current: current };
    }

    // context

  }, {
    key: 'getContext',
    value: function getContext() {
      var module = this.get('module');
      var key = module + '_context';
      var ctx = this.get(key);
      var city = this.getCity();
      return (0, _extends3.default)({}, ctx, { city: city });
    }
  }, {
    key: 'updateCurrentContext',
    value: function updateCurrentContext(delta, cb) {
      var module = this.get('module');
      var key = module + '_context';
      var ctx = this.get(key);
      return this.assign((0, _defineProperty3.default)({}, key, (0, _extends3.default)({}, ctx, delta)), cb);
    }
  }, {
    key: 'getCity',
    value: function getCity() {
      return this.get('city') || {};
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(_ref2, cb) {
      var _ref2$path = (0, _slicedToArray3.default)(_ref2.path, 1),
          ns = _ref2$path[0],
          data = _ref2.data;

      this.assign(ns ? (0, _defineProperty3.default)({}, ns, data) : data, cb);
    }
  }, {
    key: 'onUpdateContext',
    value: function onUpdateContext(_ref4, cb) {
      var data = _ref4.data;

      this.updateCurrentContext(data, cb);
    }
  }, {
    key: 'onClose',
    value: function onClose(_, cb) {
      return this.updateCurrentContext({ open: false, newEntry: null, id: null }, cb);
    }
  }, {
    key: 'onAddNew',
    value: function onAddNew(_, cb) {
      return this.updateCurrentContext({ open: true, newEntry: {}, id: null }, cb);
    }
  }, {
    key: 'onOpenItem',
    value: function onOpenItem(_ref5, cb) {
      var value = _ref5.data.value;

      return this.updateCurrentContext({ open: true, id: value, newEntry: null }, cb);
    }
  }, {
    key: 'onSort',
    value: function onSort(_ref6, cb) {
      var value = _ref6.data.value;

      return this.updateCurrentContext({ sortBy: value }, cb);
    }
  }]);
  return NavStore;
}();

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserStore = undefined;

var _assign = __webpack_require__(11);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserStore = exports.UserStore = function () {
  function UserStore(top, auth) {
    (0, _classCallCheck3.default)(this, UserStore);

    (0, _assign2.default)(this, {
      log: top.log,
      top: top,
      auth: auth
    });
  }

  (0, _createClass3.default)(UserStore, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.auth.listenUser(function (user) {
        if (user) {
          // User is signed in.
          // var isAnonymous = user.isAnonymous
          // var uid = user.uid
          // var userRef = app.dataInfo.child(app.users);
          // var useridRef = userRef.child(app.userid);
          // useridRef.set({
          //   locations: "",
          //   theme: "",
          //   colorScheme: "",
          //   food: ""
          // });
        } else {
          _this.auth.signInAnonymously();
          // User is signed out.
          // ...
        }
        // ...
        _this.top.notify();
      });
    }
  }, {
    key: "getInfo",
    value: function getInfo() {
      var user = this.auth.getCurrentUser();
      if (user != null) {
        user.providerData.forEach(function (profile) {
          // console.log('Sign-in provider: ' + profile.providerId)
          // console.log('  Provider-specific UID: ' + profile.uid)
          // console.log('  Name: ' + profile.displayName)
          // console.log('  Email: ' + profile.email)
          // console.log('  Photo URL: ' + profile.photoURL)
        });
      }
      return user || {};
    }
  }, {
    key: "onLogin",
    value: function onLogin() {
      this.auth.linkProvider(this.top.notify);
    }
  }, {
    key: "onLogout",
    value: function onLogout() {
      this.auth.logout(this.top.notify);
    }
  }]);
  return UserStore;
}();

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(22);

var _map2 = _interopRequireDefault(_map);

var _defineProperty2 = __webpack_require__(23);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _slicedToArray2 = __webpack_require__(18);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

exports.compile = compile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==========
// Template Compilation. NodeTree -> GeneratorTree
// ----------

var RE_SINGLE_PLACEHOLDER = /^\{\{([a-zA-Z0-9._$|]+)\}\}$/;
var RE_PLACEHOLDER = /\{\{([a-zA-Z0-9._$|]+)\}\}/g;
var FETCH_FINALIZER = function FETCH_FINALIZER(c) {
  var memo = c.$fetchMemo;
  (0, _keys2.default)(memo).filter(function (k) {
    return memo[k].cancel;
  }).forEach(function (k) {
    return memo[k].cancel();
  });
};

var COUNTER = 1;

function compile(_ref) {
  var tag = _ref.tag,
      attrs = _ref.attrs,
      uid = _ref.uid,
      subs = _ref.subs;

  var r = {
    uid: uid,
    type: compileType(tag),
    props: compileAttrs(attrs),
    key: attrs.get('ui:key'), // partial transclude key
    ref: attrs.get('ui:ref') // reference key
  };
  var aIf = attrs.get('ui:if');
  if (aIf) {
    var neg = aIf[0] === '!' ? aIf.slice(1) : null;
    r.iff = neg ? function (c) {
      return !prop(c, neg);
    } : function (c) {
      return !!prop(c, aIf);
    };
    if (subs.length) {
      var ifElse = subs.find(function (e) {
        return e.tag === 'ui:else';
      });
      var ifThen = subs.find(function (e) {
        return e.tag === 'ui:then';
      });
      if (ifElse) {
        r.iff.else = compile(ifElse).subs;
        subs = ifThen ? ifThen.subs : subs.filter(function (e) {
          return e !== ifElse;
        });
      } else if (ifThen) {
        subs = ifThen.subs;
      }
    }
  }

  var aEach = attrs.get('ui:each');
  if (aEach) {
    var _aEach$split = aEach.split(' '),
        _aEach$split2 = (0, _slicedToArray3.default)(_aEach$split, 3),
        itemId = _aEach$split2[0],
        dataId = _aEach$split2[2];

    var dataGetter = function (fctr) {
      return function (c) {
        return fctr(c, {})['_'];
      };
    }(compilePlaceholder('_', dataId));
    r.each = { itemId: itemId, dataGetter: dataGetter };
  }

  r.subs = subs.map(compile);
  return r;
}

function compileType(tag) {
  var dtype = tag.slice(0, 3) === 'ui:' ? tag.slice(3) : null;
  return dtype ? dtype === 'fragment' || dtype === 'transclude' ? function (c) {
    return dtype;
  } : function (c) {
    return prop(c, dtype);
  } : function (c) {
    return tag;
  };
}

function compileAttrs(attrs) {
  var r = [];
  var aProps = null;
  attrs.forEach(function (v, k) {
    if (k.slice(0, 3) === 'ui:') {
      if (k === 'ui:props') {
        aProps = v;
      }
      return;
    }
    // localize by key
    if (v[0] === ':') {
      var key = v.slice(1);
      return r.push(function (c, p) {
        p[k] = c.app.resource(key);return p;
      });
    }
    if (v[0] === '<' && v[1] === '-') {
      var fctr = compileAttrValue(k, v.slice(2).trim());
      return r.push(function (c, p) {
        p['$' + k] = function () {
          var _this = this;

          var memo = this.$fetchMemo;
          if (!memo) {
            memo = this.$fetchMemo = {};
            this.defer(FETCH_FINALIZER);
          }
          var counter = COUNTER++;
          var cb = function cb(error, r) {
            // check alive and race condition
            if (!_this.isDone && counter === memo[k].counter) {
              _this.assign((0, _defineProperty3.default)({ error: error }, k, r));
            }
          };
          var ev = memo[k] || (memo[k] = { cb: cb, counter: counter });
          var url = fctr(c, {})[k];
          if (url !== ev.url) {
            // cancel previous subscription if any
            if (ev.cancel) {
              ev.cancel();
              delete ev.cancel;
            }
            ev.url = url;
            ev.cancel = this.app.fetch(ev.url, ev.cb);
          }
        };
        return p;
      });
    }
    if (v[0] === '-' && v[1] === '>') {
      var _fctr = compileAttrValue(k, v.slice(2).trim());
      return r.push(function (c, p) {
        var url = _fctr(c, {})[k];
        p[k] = function (data, opts) {
          return c.app.emit(url, data, opts);
        };
        return p;
      });
    }

    r.push(compileAttrValue(k, v));
  });
  if (aProps) {
    var fn = compileAttrs(new _map2.default().set('_', aProps))[0];
    r.push(function (c, p) {
      fn(c, p);
      return p;
    });
  }
  return r;
}

function compileAttrValue(k, v) {
  if (!v.includes('{{')) {
    var r = v === 'true' ? true : v === 'false' ? false : v;
    return function (c, p) {
      p[k] = r;return p;
    };
  }
  if (v.match(RE_SINGLE_PLACEHOLDER)) {
    return compilePlaceholder(k, v.slice(2, -2));
  }
  var fnx = [];
  v.replace(RE_PLACEHOLDER, function (s, key) {
    return fnx.push(compilePlaceholder('p' + fnx.length, key));
  });
  return function (c, p) {
    var idx = 0;
    var pp = {};
    p[k] = v.replace(RE_PLACEHOLDER, function (s, key) {
      var r = fnx[idx](c, pp)['p' + idx];
      idx++;
      return r == null ? '' : r;
    });
    return p;
  };
}

function compilePlaceholder(k, v) {
  var keys = v.split('|');
  var key = keys[0];

  if (keys.length === 1) {
    return function (c, p) {
      p[k] = v[0] === ':' ? function (c) {
        return c.app.resource(v.slice(1));
      } : prop(c, key);
      return p;
    };
  } else {
    var fnx = keys.slice(1).map(function (k) {
      return k.trim();
    });
    return function (c, p) {
      var initial = v[0] === ':' ? function (c) {
        return c.app.resource(v.slice(1));
      } : prop(c, key);
      p[k] = fnx.reduce(function (r, k) {
        return c.app.pipes[k] ? c.app.pipes[k].call(c.$, r, key) : r;
      }, initial);
      return p;
    };
  }
}

function prop(c, k) {
  var $ = c.$;
  if ($.get) {
    return $.get(k);
  }
  var posE = k.indexOf('.');
  if (posE === -1) {
    var getter = $['get' + k[0].toUpperCase() + k.slice(1)];
    if (getter) {
      return getter.call($, k);
    }
    var v = $[k];
    if (typeof v === 'function') {
      return (c.$bound || (c.$bound = {}))[k] || (c.$bound[k] = v.bind($));
    }
    return v;
  }
  var posB = 0;
  // dig
  while (posE !== -1) {
    $ = $[k.slice(posB, posE)];
    if (!$) {
      return;
    }
    posB = posE + 1;
    posE = k.indexOf('.', posB);
  }
  return $[k.slice(posB)];
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==========
// Component
// ----------
var Component = exports.Component = function () {
  function Component(Ctor) {
    (0, _classCallCheck3.default)(this, Component);

    this.$ = new Ctor();
    // mutual reference
    this.$.$ = this;
  }

  (0, _createClass3.default)(Component, [{
    key: "init",
    value: function init() {
      if (this.$.init) {
        this.defer(this.$.init(this));
      }
    }
  }, {
    key: "done",
    value: function done() {
      var _this = this;

      if (this.defered) {
        this.defered.forEach(function (f) {
          return f.call(_this, _this);
        });
        delete this.defered;
      }
      this.$ = this.$.$ = null;
    }
  }, {
    key: "defer",
    value: function defer(fn) {
      if (fn) {
        (this.defered || (this.defered = [])).push(fn);
      }
    }
  }, {
    key: "assign",
    value: function assign(delta) {
      this.$ && this.$.assign(delta);
    }
  }]);
  return Component;
}();

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Elmnt = undefined;

var _map = __webpack_require__(22);

var _map2 = _interopRequireDefault(_map);

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _extends2 = __webpack_require__(24);

var _extends3 = _interopRequireDefault(_extends2);

var _assign = __webpack_require__(11);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==========
// Virtual DOM Element
// ----------
var values = {
  'true': true,
  'false': false,
  'null': null
};
var doc = window.document;

var setters = {
  '#text': function text(e, k, v) {
    return e.textContent = v == null ? '' : v;
  },
  disabled: function disabled(e, k, v) {
    return e[k] = v ? true : null;
  },
  class: function _class(e, k, v) {
    v = ('' + v).replace(/([a-z0-9]+):([a-z0-9.]*)(==([a-z0-9.]*))?\b/g, function (_, cl, fl, hasEq, eq) {
      var disabled = hasEq ? fl !== eq : ['', '0', 'false', null].indexOf(fl) > -1;
      return disabled ? '' : cl;
    });
    e.setAttribute(k, v);
  },
  selected: function selected(e, k, v) {
    return e[k] = v ? true : null;
  },
  value: function value(e, k, v) {
    return e[k] = v == null ? '' : v;
  },
  checked: function checked(e, k, v) {
    return e[k] = !!v;
  },
  data: function data(e, k, v) {
    e.$dataset = (0, _assign2.default)({}, v);
  },
  'data*': function data(e, k, v) {
    (e.$dataset || (e.$dataset = {}))[k.slice(5)] = v in values ? values[v] : v;
  },
  'enter': function enter(e, key, v) {
    var _this = this;

    this.setListener('keyup', !v ? null : function (ev) {
      if (ev.keyCode === 13) {
        _this.$attributes[key]((0, _extends3.default)({ value: e.value }, e.$dataset), ev);
      }
      if (ev.keyCode === 13 || ev.keyCode === 27) {
        e.blur();
      }
      return false;
    });
  },
  'toggle': function toggle(e, key, v) {
    var _this2 = this;

    this.setListener('change', !v ? null : function (ev) {
      _this2.$attributes[key]((0, _extends3.default)({ value: e.checked }, e.$dataset), ev);
      return false;
    });
  }
};
var comparators = {
  value: function value(e, their, _) {
    return e.value === their;
  },
  data: function data(e, their, _) {
    return e.$dataset === their;
  },
  _: function _(_2, their, mine) {
    return their === mine;
  }
};

var Elmnt = exports.Elmnt = function () {
  function Elmnt(tag) {
    (0, _classCallCheck3.default)(this, Elmnt);

    this.$ = tag === '#text' ? doc.createTextNode('') : doc.createElement(tag);
    this.$attributes = {};
  }

  (0, _createClass3.default)(Elmnt, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'done',
    value: function done() {
      var e = this.$;
      var lstnrs = this.$listeners;
      if (lstnrs) {
        (0, _keys2.default)(lstnrs).forEach(function (k) {
          return e.removeEventListener(k, lstnrs[k]);
        });
        this.$listeners = null;
      }
      var p = e.parentElement;
      if (p) {
        p.removeChild(e);
      }
      this.$ = this.$attributes = null;
    }
  }, {
    key: 'assign',
    value: function assign(delta) {
      if (this.isDone) {
        return;
      }
      var e = this.$;
      var p = this.parentElt;
      if (this.transclude) {
        e.cursor = null;
        Elmnt.render(this, this.transclude, this.$);
        e.cursor = null;
      }
      this.applyAttributes(delta);
      var before = p.cursor ? p.cursor.nextSibling : p.firstChild;
      if (!before) {
        p.appendChild(e);
      } else if (e !== before) {
        p.insertBefore(e, before);
      }
      p.cursor = e;
    }
  }, {
    key: 'applyAttributes',
    value: function applyAttributes(theirs) {
      var _this3 = this;

      var e = this.$;
      var mines = this.$attributes;
      for (var key in mines) {
        if (mines.hasOwnProperty(key) && theirs[key] === undefined) {
          theirs[key] = null;
        }
      }

      var _loop = function _loop(_key) {
        if (theirs.hasOwnProperty(_key) && !(comparators[_key] || comparators._)(e, theirs[_key], mines[_key])) {
          var value = theirs[_key];
          var prefixP = _key.indexOf('-');
          var setter = setters[prefixP === -1 ? _key : _key.slice(0, prefixP) + '*'];
          if (setter) {
            setter.call(_this3, e, _key, value);
          } else {
            if (typeof value === 'function' || _this3.listeners && _this3.listeners.has(_key)) {
              var T = _this3;
              _this3.setListener(_key, !value ? null : function (ev) {
                T.$attributes[_key]((0, _extends3.default)({ value: e.value }, e.$dataset), ev);
                return false;
              });
            } else {
              _this3.setAttribute(_key, value);
            }
          }
        }
      };

      for (var _key in theirs) {
        _loop(_key);
      }
      if (e.$dataset) {
        (0, _keys2.default)(e.$dataset).forEach(function (k) {
          e.dataset[k] = e.$dataset[k];
        });
      }
      this.$attributes = theirs;
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(key, value) {
      if (value != null) {
        this.$.setAttribute(key, value);
      } else {
        this.$.removeAttribute(key);
      }
    }
  }, {
    key: 'setListener',
    value: function setListener(key, fn) {
      if (fn) {
        if (!this.listeners) {
          this.listeners = new _map2.default();
        }
        if (!this.listeners.has(key)) {
          this.$.addEventListener(key, fn, false);
          this.listeners.set(key, fn);
        }
      } else {
        if (this.listeners && this.listeners.has(key)) {
          this.$.removeEventListener(key, this.listeners.get(key));
          this.listeners.delete(key);
        }
      }
    }
  }]);
  return Elmnt;
}();

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _slicedToArray2 = __webpack_require__(18);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _toConsumableArray2 = __webpack_require__(25);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperties = __webpack_require__(105);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _assign = __webpack_require__(11);

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = __webpack_require__(62);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = __webpack_require__(32);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = __webpack_require__(24);

var _extends3 = _interopRequireDefault(_extends2);

var _map = __webpack_require__(22);

var _map2 = _interopRequireDefault(_map);

var _keys = __webpack_require__(5);

var _keys2 = _interopRequireDefault(_keys);

var _component = __webpack_require__(99);

Object.defineProperty(exports, 'Component', {
  enumerable: true,
  get: function get() {
    return _component.Component;
  }
});
exports.launch = launch;
exports.bootstrap = bootstrap;

var _xml = __webpack_require__(102);

var _compile = __webpack_require__(98);

var _dom = __webpack_require__(100);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COUNTER = 1;
var doc = window.document;

// ==========
// ensure app API
// ----------
var ensureApi = function ensureApi(app) {
  var objectApiStubs = {
    emit: function emit(url, payload) {
      return console.error('app.emit() is not defined.');
    },
    fetch: function fetch(url, cb) {
      return cb(new Error('app.fetch() is not defined.'));
    },
    pipes: {},
    resource: function resource(key) {
      return key;
    }
  };
  (0, _keys2.default)(objectApiStubs).forEach(function (k) {
    if (!app[k]) {
      app[k] = objectApiStubs[k];
    }
  });
  return app;
};

// ==========
// Type registry
// ----------
var REGISTRY = new _map2.default();

// super implementation for component inners
function superAssign(delta) {
  var c = this.$;
  if (!delta || !c) {
    return;
  }
  // prevent recursive invalidations
  c.$assignDepth = (c.$assignDepth || 0) + 1;
  if (delta._) {
    delta = (0, _extends3.default)({}, delta._, delta, { _: undefined });
  }
  // iterate payload
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(delta)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var k = _step.value;

      var their = delta[k];
      if (k[0] === '$') {
        their.call(c);
        continue;
      }
      var mine = this[k];
      if (their !== undefined && (their !== mine || (typeof their === 'undefined' ? 'undefined' : (0, _typeof3.default)(their)) === 'object' && their !== null)) {
        var setter = this['set' + k[0].toUpperCase() + k.slice(1)];
        if (setter) {
          setter.call(this, their);
        } else {
          this[k] = their;
        }
      }
    }
    // prevent recursive invalidations
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

  --c.$assignDepth;
  if (c.$assignDepth === 0) {
    c.parentElt.cursor = c.prevElt;
    _render(c, resolve(new _map2.default(), c, this.constructor.COMPILER()), c.parentElt);
  }
}

var register = function register(ctor) {
  // narrow non-function ctor
  ctor = typeof ctor === 'function' ? ctor : (0, _assign2.default)(function () {}, ctor);
  var proto = ctor.prototype;
  // narrow name
  var name = ctor.NAME = ctor.NAME || ctor.name || (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || '$C' + COUNTER++;
  // narrow template
  var text = ctor.TEMPLATE || ctor.prototype.TEMPLATE && proto.TEMPLATE() || (doc.getElementById(name) || { innerText: '<noop name="' + name + '"/>' }).innerText;
  // lazy template compilation
  var compiled = {};
  ctor.COMPILER = function () {
    return compiled.template || (compiled.template = (0, _compile.compile)((0, _xml.parseXML)(text, name)));
  };
  // patch with framework facilities:
  (0, _defineProperties2.default)(proto, proto.assign ? { 'super_assign': { value: superAssign, writable: false, enumerable: false } } : { 'assign': { value: superAssign, writable: false, enumerable: false } });
  // register
  REGISTRY.set(name, ctor);
};

// ==========
// Bootstrap
// ----------

// bootstap a components tree and render immediately on <body/>
function launch() {
  bootstrap.apply(undefined, arguments).render();
}
// bootstap a components tree
function bootstrap() {
  for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  if (types.length === 0) {
    types = [_component.Component];
  }
  types.forEach(register);
  // register transparent container: <ui:fragment>
  register({ NAME: 'fragment', TEMPLATE: '<ui:transclude/>' });
  // make reference to render()
  _dom.Elmnt.render = _render;
  _component.Component.Element = _dom.Elmnt;
  // collect and register `bare-template` definitions
  var staticTypes = [].concat([].concat((0, _toConsumableArray3.default)(doc.getElementsByTagName('script')))).filter(function (e) {
    return e.id && !REGISTRY.has(e.id) && e.type === 'text/x-template';
  });
  staticTypes.map(function (e) {
    return { NAME: e.id, TEMPLATE: e.innerText };
  }).forEach(register);
  // use `<body>` as mount element by default
  return new Bootstrap(types[0]);
}

var Bootstrap = function () {
  function Bootstrap(ctor) {
    (0, _classCallCheck3.default)(this, Bootstrap);

    this.meta = new _map2.default();
    this.meta.set(0, { tag: ctor.NAME, props: {}, subs: [] });
  }

  (0, _createClass3.default)(Bootstrap, [{
    key: 'render',
    value: function render(elt) {
      var _this = this;

      window.requestAnimationFrame(function () {
        return _render(_this, _this.meta, elt || doc.body);
      });
    }
  }]);
  return Bootstrap;
}();

// ==========
// Rendering. MetaTree -> ViewTree(Components,Elements)
// ----------


function _render($, meta, parentElt) {
  if ($.isDone) {
    return;
  }
  if ($.rendering) {
    return;
  }
  $.rendering = true;
  // done
  if ($.children) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)($.children.values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var c = _step2.value;

        if (!meta.has(c.uid)) {
          done(c);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
  if (meta.size) {
    var ch = $.children || ($.children = new _map2.default());
    // create
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = (0, _getIterator3.default)(meta.entries()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _ref = _step3.value;

        var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

        var uid = _ref2[0];
        var m = _ref2[1];

        if (!ch.has(uid)) {
          var componentCtor = REGISTRY.get(m.tag);
          var _c3 = componentCtor ? new _component.Component(componentCtor) : new _component.Component.Element(m.tag);
          _c3.uid = uid;
          _c3.owner = m.owner;
          _c3.parentElt = parentElt;
          _c3.parent = $;
          _c3.app = $.app || ensureApi(_c3.$);
          ch.set(uid, _c3);
          if (m.ref) {
            $.ref = m.ref;
            _c3.owner.$[m.ref] = _c3.$;
          }
        }
      }
      // assign
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = (0, _getIterator3.default)(meta.entries()), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _ref3 = _step4.value;

        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2);

        var _uid = _ref4[0];
        var _m = _ref4[1];

        var _c = ch.get(_uid);
        _c.transclude = _m.subs;
        _c.prevElt = parentElt.cursor;
        _c.assign(_m.props);
      }
      // init
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = (0, _getIterator3.default)(ch.values()), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _c2 = _step5.value;

        if (!_c2.isInited) {
          _c2.isInited = true;
          _c2.init();
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  }
  $.rendering = false;
}
// done
function done(c) {
  if (c.isDone) {
    return;
  }
  c.isDone = true;
  if (c.owner) {
    if (c.ref) {
      c.owner.$[c.ref] = null;
    }
    c.owner = null;
  }
  if (c.children) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = (0, _getIterator3.default)(c.children.values()), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var cc = _step6.value;

        done(cc);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    c.children = null;
  }
  c.done();
  if (c.parent) {
    c.parent.children.delete(c.uid);
    c.parent = null;
  }
  if (c.app) {
    c.app = null;
  }
  if (c.parentElt) {
    c.parentElt = null;
  }
}

// ==========
// Template Resolution. GeneratorTree + Data -> MetaTree
// ----------

function resolve(map, c, meta) {
  if (!meta) {
    return map;
  }
  if (Array.isArray(meta)) {
    return meta.reduce(function (m, e) {
      return resolve(m, c, e);
    }, map);
  }
  var type = meta.type,
      props = meta.props,
      subs = meta.subs,
      uid = meta.uid,
      iff = meta.iff,
      each = meta.each,
      key = meta.key,
      ref = meta.ref;


  if (each) {
    var data = each.dataGetter(c);
    return !data || !data.length ? map : (data.reduce ? data : ('' + data).split(',')).reduce(function (m, d, index) {
      c.$[each.itemId] = d;
      c.$[each.itemId + 'Index'] = index;
      var id = uid + '-$' + (d.id || index);
      return resolve(m, c, { type: type, props: props, subs: subs, uid: id, iff: iff });
    }, map);
  }
  if (iff && !iff(c)) {
    return resolve(map, c, iff.else);
  }
  var tag = type(c);
  if (tag === 'transclude') {
    var partial = props.reduce(function (a, f) {
      return f(c, a);
    }, {}).key;
    c.transclude.forEach(function (v, k) {
      if (partial ? v.key === partial : !v.key) {
        map.set(k, v);
      }
    });
    return map;
  }

  var r = {
    owner: c,
    tag: tag,
    props: {},
    key: key,
    ref: ref,
    subs: subs.length ? subs.reduce(function (m, s) {
      return resolve(m, c, s);
    }, new _map2.default()) : null
  };
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = (0, _getIterator3.default)(props), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var p = _step7.value;

      p(c, r.props);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return map.set(tag + uid, r);
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseXML = undefined;

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _map = __webpack_require__(22);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==========
// XML Parse for templates. XML -> NodeTree
// ----------
var RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g;
var RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g;
var RE_ATTRS = /([a-z][a-zA-Z0-9-:]+)="([^"]*)"/g;
var RE_ESCAPE_XML_ENTITY = /["'&<>]/g;
var RE_XML_TAG = /(<)(\/?)([a-zA-Z][a-zA-Z0-9-:]*)((?:\s+[a-z][a-zA-Z0-9-:]+="[^"]*")*)\s*(\/?)>/g;
var SINGLE_TAGS = 'img input br'.split(' ').reduce(function (r, e) {
    r[e] = 1;return r;
}, {});
var SUBST_XML_ENTITY = {
    amp: '&',
    gt: '>',
    lt: '<',
    quot: '"',
    nbsp: ' '
};
var ESCAPE_XML_ENTITY = {
    34: '&quot;',
    38: '&amp;',
    39: '&#39;',
    60: '&lt;',
    62: '&gt;'
};
var FN_ESCAPE_XML_ENTITY = function FN_ESCAPE_XML_ENTITY(m) {
    return ESCAPE_XML_ENTITY[m.charCodeAt(0)];
};
var FN_XML_ENTITY = function FN_XML_ENTITY(_) {
    var s = _.substring(1, _.length - 1);
    return s[0] === '#' ? String.fromCharCode(+s.slice(1)) : SUBST_XML_ENTITY[s] || ' ';
};
var decodeXmlEntities = function decodeXmlEntities() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return s.replace(RE_XML_ENTITY, FN_XML_ENTITY);
};
var escapeXml = function escapeXml(s) {
    return !s ? '' : ('' + s).replace(RE_ESCAPE_XML_ENTITY, FN_ESCAPE_XML_ENTITY);
};

var UID = 1;

var parseAttrs = function parseAttrs(s) {
    var r = new _map2.default();
    if (!s) {
        return r;
    }
    while (1) {
        var e = RE_ATTRS.exec(s);
        if (!e) {
            return r;
        }
        r.set(e[1], decodeXmlEntities(e[2]));
    }
};
var stringifyAttrs = function stringifyAttrs(attrs) {
    if (!attrs || !attrs.size) {
        return '';
    }
    var r = [];
    attrs.forEach(function (v, k) {
        if (v && k !== '#text') {
            r.push(' ' + k + '="' + escapeXml(v) + '"');
        }
    });
    return r.join('');
};

var Node = function () {
    function Node(tag, attrs) {
        (0, _classCallCheck3.default)(this, Node);

        this.uid = UID++;
        this.tag = tag || '';
        this.attrs = attrs || new _map2.default();
        this.subs = [];
    }

    (0, _createClass3.default)(Node, [{
        key: 'getChild',
        value: function getChild(index) {
            return this.subs[index];
        }
    }, {
        key: 'setText',
        value: function setText(text) {
            this.attrs.set('#text', text);
        }
    }, {
        key: 'addChild',
        value: function addChild(tag, attrs) {
            var e = new Node(tag, attrs);
            this.subs.push(e);
            return e;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return stringify(this, '');
        }
    }]);
    return Node;
}();

function stringify(_ref, tab) {
    var tag = _ref.tag,
        attrs = _ref.attrs,
        subs = _ref.subs;

    var sattrs = stringifyAttrs(attrs);
    var ssubs = subs.map(function (c) {
        return stringify(c, '  ' + tab);
    }).join('\n');
    var text = attrs.get('#text');
    var stext = text ? '  ' + tab + escapeXml(text) : '';
    return tab + '<' + tag + sattrs + (!ssubs && !stext ? '/>' : '>\n' + ssubs + stext + '\n' + tab + '</' + tag + '>');
}

var parseXML = exports.parseXML = function parseXML(_s, key) {
    var s = ('' + _s).trim().replace(RE_XML_COMMENT, '');
    var ctx = [new Node()];
    var lastIndex = 0;
    // head text omitted
    while (1) {
        var e = RE_XML_TAG.exec(s);
        if (!e) {
            break;
        }
        // preceding text
        var text = e.index && s.slice(lastIndex, e.index);
        if (text && text.trim()) {
            ctx[0].addChild('#text').setText(text);
        }
        // closing tag
        if (e[2]) {
            if (ctx[0].tag !== e[3]) {
                throw new Error((key || '') + ' XML Parse closing tag does not match at: ' + e.index + ' near ' + e.input.slice(Math.max(e.index - 15, 0), Math.min(e.index + 15, e.input.length)));
            }
            ctx.shift();
        } else {
            var elt = ctx[0].addChild(e[3], parseAttrs(e[4]));
            // not single tag
            if (!(e[5] || e[3] in SINGLE_TAGS)) {
                ctx.unshift(elt);
                if (ctx.length === 1) {
                    throw new Error('Parse error at: ' + e[0]);
                }
            }
        }
        // up past index
        lastIndex = RE_XML_TAG.lastIndex;
    }
    // tail text omitted
    return ctx[0].getChild(0);
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(119), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(122), __esModule: true };

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
__webpack_require__(145);
module.exports = __webpack_require__(0).Array.from;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(17);
module.exports = __webpack_require__(143);

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
__webpack_require__(17);
module.exports = __webpack_require__(144);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(0)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
__webpack_require__(17);
__webpack_require__(21);
__webpack_require__(147);
__webpack_require__(155);
module.exports = __webpack_require__(0).Map;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperties(T, D){
  return $Object.defineProperties(T, D);
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(151);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
__webpack_require__(17);
__webpack_require__(21);
__webpack_require__(152);
module.exports = __webpack_require__(0).Promise;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
__webpack_require__(17);
__webpack_require__(21);
__webpack_require__(153);
__webpack_require__(156);
module.exports = __webpack_require__(0).Set;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(154);
__webpack_require__(40);
__webpack_require__(157);
__webpack_require__(158);
module.exports = __webpack_require__(0).Symbol;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
__webpack_require__(21);
module.exports = __webpack_require__(56).f('iterator');

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(35);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16)
  , toLength  = __webpack_require__(38)
  , toIndex   = __webpack_require__(142);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(12)
  , IObject  = __webpack_require__(45)
  , toObject = __webpack_require__(29)
  , toLength = __webpack_require__(38)
  , asc      = __webpack_require__(128);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15)
  , isArray  = __webpack_require__(69)
  , SPECIES  = __webpack_require__(3)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(127);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8)
  , createDesc      = __webpack_require__(27);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(20)
  , gOPS    = __webpack_require__(49)
  , pIE     = __webpack_require__(37);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 131 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(48)
  , descriptor     = __webpack_require__(27)
  , setToStringTag = __webpack_require__(28)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(3)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(20)
  , toIObject = __webpack_require__(16);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , macrotask = __webpack_require__(78).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(26)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(20)
  , gOPS     = __webpack_require__(49)
  , pIE      = __webpack_require__(37)
  , toObject = __webpack_require__(29)
  , IObject  = __webpack_require__(45)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(13)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(37)
  , createDesc     = __webpack_require__(27)
  , toIObject      = __webpack_require__(16)
  , toPrimitive    = __webpack_require__(54)
  , has            = __webpack_require__(14)
  , IE8_DOM_DEFINE = __webpack_require__(67)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(16)
  , gOPN      = __webpack_require__(74).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(14)
  , toObject    = __webpack_require__(29)
  , IE_PROTO    = __webpack_require__(51)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(7)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(13);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(9)
  , aFunction = __webpack_require__(41)
  , SPECIES   = __webpack_require__(3)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(53)
  , defined   = __webpack_require__(34);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(53)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9)
  , get      = __webpack_require__(57);
module.exports = __webpack_require__(0).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(33)
  , ITERATOR  = __webpack_require__(3)('iterator')
  , Iterators = __webpack_require__(19);
module.exports = __webpack_require__(0).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(12)
  , $export        = __webpack_require__(7)
  , toObject       = __webpack_require__(29)
  , call           = __webpack_require__(70)
  , isArrayIter    = __webpack_require__(68)
  , toLength       = __webpack_require__(38)
  , createProperty = __webpack_require__(129)
  , getIterFn      = __webpack_require__(57);

$export($export.S + $export.F * !__webpack_require__(71)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(123)
  , step             = __webpack_require__(72)
  , Iterators        = __webpack_require__(19)
  , toIObject        = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(46)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(63);

// 23.1 Map Objects
module.exports = __webpack_require__(65)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(7);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(135)});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperties: __webpack_require__(73)});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(8).f});

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(29)
  , $keys    = __webpack_require__(20);

__webpack_require__(139)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(36)
  , global             = __webpack_require__(4)
  , ctx                = __webpack_require__(12)
  , classof            = __webpack_require__(33)
  , $export            = __webpack_require__(7)
  , isObject           = __webpack_require__(15)
  , aFunction          = __webpack_require__(41)
  , anInstance         = __webpack_require__(42)
  , forOf              = __webpack_require__(35)
  , speciesConstructor = __webpack_require__(140)
  , task               = __webpack_require__(78).set
  , microtask          = __webpack_require__(134)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(3)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(50)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(28)($Promise, PROMISE);
__webpack_require__(77)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(71)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(63);

// 23.2 Set Objects
module.exports = __webpack_require__(65)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(4)
  , has            = __webpack_require__(14)
  , DESCRIPTORS    = __webpack_require__(6)
  , $export        = __webpack_require__(7)
  , redefine       = __webpack_require__(76)
  , META           = __webpack_require__(47).KEY
  , $fails         = __webpack_require__(13)
  , shared         = __webpack_require__(52)
  , setToStringTag = __webpack_require__(28)
  , uid            = __webpack_require__(39)
  , wks            = __webpack_require__(3)
  , wksExt         = __webpack_require__(56)
  , wksDefine      = __webpack_require__(55)
  , keyOf          = __webpack_require__(133)
  , enumKeys       = __webpack_require__(130)
  , isArray        = __webpack_require__(69)
  , anObject       = __webpack_require__(9)
  , toIObject      = __webpack_require__(16)
  , toPrimitive    = __webpack_require__(54)
  , createDesc     = __webpack_require__(27)
  , _create        = __webpack_require__(48)
  , gOPNExt        = __webpack_require__(137)
  , $GOPD          = __webpack_require__(136)
  , $DP            = __webpack_require__(8)
  , $keys          = __webpack_require__(20)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(74).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(37).f  = $propertyIsEnumerable;
  __webpack_require__(49).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(36)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(7);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(64)('Map')});

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(7);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(64)('Set')});

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('asyncIterator');

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('observable');

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(79);


/***/ })
/******/ ]);