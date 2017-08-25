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
/******/ 	return __webpack_require__(__webpack_require__.s = 158);
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

var store      = __webpack_require__(56)('wks')
  , uid        = __webpack_require__(40)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(10)
  , hide      = __webpack_require__(11)
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(8)
  , IE8_DOM_DEFINE = __webpack_require__(69)
  , toPrimitive    = __webpack_require__(58)
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(42);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = exports.curry = exports.or = exports.and = exports.sum = exports.someOrNull = exports.isSomething = exports.swap = exports.compose = exports.fnFalse = exports.fnTrue = exports.fnNull = exports.fnId = exports.log = exports.functionDisplayName = exports.isFunction = undefined;

var _toConsumableArray2 = __webpack_require__(43);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.fnVoid = fnVoid;
exports.fnThis = fnThis;
exports.fnThisProp = fnThisProp;
exports.fnThrow = fnThrow;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-console: 0 */

var undef = Object.undefined;

var _curry = function _curry(fn, args0, lengthLimit) {

  var fx = function fx(args) {
    return args.length >= lengthLimit ? fn.apply(undefined, (0, _toConsumableArray3.default)(args)) : _curry(fn, args, lengthLimit - args.length);
  };

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fx([].concat((0, _toConsumableArray3.default)(args0), args));
  };
};

var isFunction = exports.isFunction = function isFunction(f) {
  return !!(f && f.constructor && f.call && f.apply);
};

var functionDisplayName = exports.functionDisplayName = function functionDisplayName(f) {
  return f.hasOwnProperty('displayName') ? f.displayName : f.displayName = f.name || (/^function\s+([\w\$]+)\s*\(/.exec(f.toString()) || [])[1] || 'C';
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(44);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(5)
  , createDesc = __webpack_require__(25);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(48)
  , defined = __webpack_require__(34);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(77)
  , enumBugKeys = __webpack_require__(47);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(34);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(139)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(49)(String, 'String', function(iterated){
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f
  , has = __webpack_require__(16)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(144);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(11)
  , Iterators     = __webpack_require__(19)
  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.undefOrNull = exports.isObject = undefined;

var _getIterator2 = __webpack_require__(41);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.objId = objId;
exports.intoMethod = intoMethod;
exports.objForEach = objForEach;
exports.objMap = objMap;
exports.objToArray = objToArray;
exports.objFromArray = objFromArray;
exports.append = append;
exports.objGet = objGet;
exports.getter = getter;

var _fn = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isObject = exports.isObject = function isObject(o) {
  return o && (typeof o === 'undefined' ? 'undefined' : (0, _typeof3.default)(o)) === 'object';
}; /* eslint no-cond-assign: "off" */
/* eslint no-eq-null: "off" */

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
    (0, _keys2.default)(x).forEach(function (key, index) {
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

  (0, _keys2.default)(x).forEach(function (key) {
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

  (0, _keys2.default)(x).forEach(function (key) {
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
    for (var _iterator = (0, _getIterator3.default)(arr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
  (0, _keys2.default)(mix).forEach(function (n) {
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(14);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(99);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(97);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(102);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(101);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24)
  , TAG = __webpack_require__(1)('toStringTag')
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

var ctx         = __webpack_require__(10)
  , call        = __webpack_require__(72)
  , isArrayIter = __webpack_require__(70)
  , anObject    = __webpack_require__(8)
  , toLength    = __webpack_require__(39)
  , getIterFn   = __webpack_require__(61)
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
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(8)
  , dPs         = __webpack_require__(135)
  , enumBugKeys = __webpack_require__(47)
  , IE_PROTO    = __webpack_require__(55)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(46)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(68).appendChild(iframe);
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
/* 38 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(57)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(95);

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
/* 44 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(36)
  , $export        = __webpack_require__(4)
  , redefine       = __webpack_require__(78)
  , hide           = __webpack_require__(11)
  , has            = __webpack_require__(16)
  , Iterators      = __webpack_require__(19)
  , $iterCreate    = __webpack_require__(131)
  , setToStringTag = __webpack_require__(26)
  , getPrototypeOf = __webpack_require__(76)
  , ITERATOR       = __webpack_require__(1)('iterator')
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(40)('meta')
  , isObject = __webpack_require__(12)
  , has      = __webpack_require__(16)
  , setDesc  = __webpack_require__(5).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(15)(function(){
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(38)
  , createDesc     = __webpack_require__(25)
  , toIObject      = __webpack_require__(13)
  , toPrimitive    = __webpack_require__(58)
  , has            = __webpack_require__(16)
  , IE8_DOM_DEFINE = __webpack_require__(69)
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
/* 52 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(15);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(11);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(56)('keys')
  , uid    = __webpack_require__(40);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 57 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(12);
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(0)
  , LIBRARY        = __webpack_require__(36)
  , wksExt         = __webpack_require__(60)
  , defineProperty = __webpack_require__(5).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(33)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(19);
module.exports = __webpack_require__(0).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 62 */
/***/ (function(module, exports) {



/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _assign = __webpack_require__(14);

var _assign2 = _interopRequireDefault(_assign);

var _Memoize = __webpack_require__(86);

var _Memoize2 = _interopRequireDefault(_Memoize);

var _Observable = __webpack_require__(87);

var _Observable2 = _interopRequireDefault(_Observable);

var _fn = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return (0, _assign2.default)($, {
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
  (0, _classCallCheck3.default)(this, EventBus);


  apply(this);
};

EventBus.applyTo = apply;
exports.default = EventBus;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(14);

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty = __webpack_require__(42);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _map = __webpack_require__(17);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = function props($) {
  return $.constructor.$PROPS;
};

/**
 * A Property is an proxy on given key-value of a component state.
 */

var Property = function () {
  (0, _createClass3.default)(Property, null, [{
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

      ctor.$PROPS = new _map2.default();

      var keys = ctor.$PROP_KEYS = (0, _keys2.default)(_props);
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
          (0, _defineProperty2.default)(ctor.prototype, key, def);
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
    (0, _classCallCheck3.default)(this, Property);


    this.key = key;

    (0, _assign2.default)(this, options);
  }

  (0, _createClass3.default)(Property, [{
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = __webpack_require__(14);

var _assign2 = _interopRequireDefault(_assign);

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

exports.parseDataset = parseDataset;
exports.applyDOMAttributes = applyDOMAttributes;
exports.setDOMAttribute = setDOMAttribute;
exports.removeDOMAttribute = removeDOMAttribute;

var _obj = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flagAttrs = {
  disabled: 'yes',
  selected: 'true'
}; /* eslint no-eq-null: "off" */
/* eslint eqeqeq: "off" */


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
  return (0, _keys2.default)(dataset).reduce(function (r, key) {
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
      return value((0, _assign2.default)(ev, { dataset: parseDataset(ev.currentTarget.dataset) }));
    };
    lstnrs[k] = fn;
    addEventListener(e, k, fn);
  } else if (k === 'data') {

    (0, _assign2.default)(e.dataset, (0, _keys2.default)(value).reduce(function (r, key) {
      var v = value[key];
      if ((typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) !== 'object') {
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xmlParse = exports.xmlStringify = exports.XmlNode = exports.Attributes = exports.parsePrimitive = exports.decodeXmlEntities = exports.RE_ATTRS = exports.RE_TAG = exports.RE_XML_COMMENT = exports.RE_XML_ENTITY = undefined;

var _slicedToArray2 = __webpack_require__(67);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

exports.escapeXml = escapeXml;

var _text = __webpack_require__(94);

var _fn = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let COUNTER = 0;

/* eslint no-use-before-define: "off"*/
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
    return obj ? '' + (0, _keys2.default)(obj).filter(function (k) {
      return obj[k];
    }).map(function (k) {
      return ' ' + k + '="' + escapeXml(obj[k]) + '"';
    }).join('') : '';
  }
};

var XmlNode = exports.XmlNode = function () {
  function XmlNode(tag, attributes, children) {
    var _this = this;

    (0, _classCallCheck3.default)(this, XmlNode);

    this.$key = 0;
    this.tag = tag;
    this.attributes = Attributes.narrow(attributes);
    if (children && children.length) {
      children.forEach(function (e) {
        return _this.addChild(e);
      });
    }
  }

  (0, _createClass3.default)(XmlNode, [{
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
  var _ref2 = (0, _slicedToArray3.default)(_ref, 6),
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(96);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(41);

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(15)(function(){
  return Object.defineProperty(__webpack_require__(46)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(19)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(8);
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(1)('iterator')
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
/* 74 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(77)
  , hiddenKeys = __webpack_require__(47).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(16)
  , toObject    = __webpack_require__(21)
  , IE_PROTO    = __webpack_require__(55)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(16)
  , toIObject    = __webpack_require__(13)
  , arrayIndexOf = __webpack_require__(121)(false)
  , IE_PROTO     = __webpack_require__(55)('IE_PROTO');

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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , core        = __webpack_require__(0)
  , dP          = __webpack_require__(5)
  , DESCRIPTORS = __webpack_require__(6)
  , SPECIES     = __webpack_require__(1)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(10)
  , invoke             = __webpack_require__(130)
  , html               = __webpack_require__(68)
  , cel                = __webpack_require__(46)
  , global             = __webpack_require__(2)
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
  if(__webpack_require__(24)(process) == 'process'){
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.DomRenderer = exports.StringRenderer = exports.EventBus = undefined;

var _toConsumableArray2 = __webpack_require__(43);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(23);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(31);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(30);

var _inherits3 = _interopRequireDefault(_inherits2);

var _EventBus = __webpack_require__(63);

Object.defineProperty(exports, 'EventBus', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_EventBus).default;
  }
});

var _StringRenderer = __webpack_require__(92);

Object.defineProperty(exports, 'StringRenderer', {
  enumerable: true,
  get: function get() {
    return _StringRenderer.renderer;
  }
});

var _DOMRenderer = __webpack_require__(90);

Object.defineProperty(exports, 'DomRenderer', {
  enumerable: true,
  get: function get() {
    return _DOMRenderer.renderer;
  }
});
exports.bootstrap = bootstrap;

var _Component2 = __webpack_require__(88);

var _Component3 = _interopRequireDefault(_Component2);

var _obj = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)($R, _Component);

    function $R() {
      (0, _classCallCheck3.default)(this, $R);
      return (0, _possibleConstructorReturn3.default)(this, ($R.__proto__ || (0, _getPrototypeOf2.default)($R)).apply(this, arguments));
    }

    return $R;
  }(Component), _class.TEMPLATE = markup, _class.PROPS = (0, _obj.objMap)(state, function (val, key) {
    return {};
  }), _temp);

  Component.registerType.apply(Component, [$Root].concat((0, _toConsumableArray3.default)(componentTypes)));

  var root = new $Root(state);

  if (renderer.prepareRoot) {

    renderer.prepareRoot(root, config);
  }

  return function () {
    return root.render();
  };
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(100);

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = __webpack_require__(29);

var _extends3 = _interopRequireDefault(_extends2);

var _fn = __webpack_require__(9);

var _EventBus = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A application is a singletone instance that
 *  - consists from independent modules
 *  - has life-cycle 'init' and 'done'
 *  - enables unified event-driven interaction between modules
 */
/* eslint new-cap: 0 */
var application = {
  init: function init(modulesConfig) {

    (0, _fn.assert)(Array.isArray(modulesConfig), 'Modules config has to be an array');

    var modules = modulesConfig.map(function (cfg) {
      return new cfg.type((0, _extends3.default)({ application: application }, cfg));
    });

    application.done = function () {
      return _promise2.default.all(modules.filter(function (m) {
        return (0, _fn.isFunction)(m.done);
      }).map(function (m) {
        return m.done();
      })).then(function () {
        return application;
      });
    };

    return _promise2.default.all(modules.filter(function (m) {
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(29);

var _extends3 = _interopRequireDefault(_extends2);

var _map = __webpack_require__(17);

var _map2 = _interopRequireDefault(_map);

var _assign = __webpack_require__(14);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(23);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(31);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(30);

var _inherits3 = _interopRequireDefault(_inherits2);

var _obj = __webpack_require__(28);

var _Entity2 = __webpack_require__(84);

var _Entity3 = _interopRequireDefault(_Entity2);

var _Property = __webpack_require__(64);

var _Property2 = _interopRequireDefault(_Property);

var _Application = __webpack_require__(82);

var _Application2 = _interopRequireDefault(_Application);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Component is an Entity that
 * 1) manages its state via properties
 * 2) supports parent/child relationships
 * 3) event-driven
 * 4) life-cycle hooks to be invoked from container
 */
/* eslint no-console: 0 */
var Component = function (_Entity) {
  (0, _inherits3.default)(Component, _Entity);

  function Component(initialState, options) {
    (0, _classCallCheck3.default)(this, Component);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Component.__proto__ || (0, _getPrototypeOf2.default)(Component)).call(this, {}));

    (0, _assign2.default)(_this, options);

    _Property2.default.update(_this, initialState);
    return _this;
  }

  ////////////////////////
  // Events
  ///////////////////////

  (0, _createClass3.default)(Component, [{
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
        this.$children = new _map2.default();
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

            _this4.onError((0, _extends3.default)({}, ex, { message: 'Error in ' + key + ' hook: ' + ex.message }));
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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(14);

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = __webpack_require__(103);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = __webpack_require__(29);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(23);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(31);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(30);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Identity2 = __webpack_require__(85);

var _Identity3 = _interopRequireDefault(_Identity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An Entity is an Identity that bears a state, but has no specific behavior.
 */
var Entity = function (_Identity) {
  (0, _inherits3.default)(Entity, _Identity);

  function Entity(initialState) {
    (0, _classCallCheck3.default)(this, Entity);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Entity.__proto__ || (0, _getPrototypeOf2.default)(Entity)).call(this));

    Object.defineProperty(_this, 'state', { value: (0, _extends3.default)({}, initialState) });
    return _this;
  }

  (0, _createClass3.default)(Entity, [{
    key: 'keys',
    value: function keys() {

      return (0, _keys2.default)(this.state);
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

      return this.update((0, _defineProperty3.default)({}, key, value));
    }
  }, {
    key: 'update',
    value: function update(delta) {

      (0, _assign2.default)(this.state, delta);

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
        return (0, _extends3.default)({}, state, delta);
      });
    }
  }]);
  return Entity;
}(_Identity3.default);

exports.default = Entity;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _fn = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastId = 1;
/**
 * An Identity is something unique and can be distinguished from others.
 */

var Identity = function () {
  function Identity() {
    (0, _classCallCheck3.default)(this, Identity);


    Object.defineProperty(this, '_id', { value: Identity.nextId() });
  }

  (0, _createClass3.default)(Identity, [{
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(17);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Memoize = function () {
  (0, _createClass3.default)(Memoize, null, [{
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
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _map2.default();
    (0, _classCallCheck3.default)(this, Memoize);


    this.factory = factory;
    this.keyFn = keyFn;
    Object.defineProperty(this, 'all', { value: value });
  }

  (0, _createClass3.default)(Memoize, [{
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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(17);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _fn = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COUNTER = 0;

/**
 * Observable keeps all observers by itself 1-to-N.
 */

var Observable = function () {
  function Observable() {
    (0, _classCallCheck3.default)(this, Observable);


    Object.defineProperty(this, '_observers', { value: new _map2.default() });
  }

  (0, _createClass3.default)(Observable, [{
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(23);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(31);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(104);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(30);

var _inherits3 = _interopRequireDefault(_inherits2);

var _fn = __webpack_require__(9);

var _Template = __webpack_require__(89);

var _Template2 = _interopRequireDefault(_Template);

var _Property = __webpack_require__(64);

var _Property2 = _interopRequireDefault(_Property);

var _Component2 = __webpack_require__(83);

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The base UI component.
 */
var UiComponent = function (_Component) {
  (0, _inherits3.default)(UiComponent, _Component);

  function UiComponent() {
    (0, _classCallCheck3.default)(this, UiComponent);
    return (0, _possibleConstructorReturn3.default)(this, (UiComponent.__proto__ || (0, _getPrototypeOf2.default)(UiComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(UiComponent, [{
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
      var changes = (0, _get3.default)(UiComponent.prototype.__proto__ || (0, _getPrototypeOf2.default)(UiComponent.prototype), 'update', this).call(this, delta);

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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

var _slicedToArray2 = __webpack_require__(67);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = __webpack_require__(14);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(29);

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = __webpack_require__(43);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = __webpack_require__(41);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = __webpack_require__(17);

var _map2 = _interopRequireDefault(_map);

exports.compileTemplate = compileTemplate;

var _fn = __webpack_require__(9);

var _xml = __webpack_require__(66);

var _obj = __webpack_require__(28);

var _str = __webpack_require__(93);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-eq-null: "off" */
Object.jsx = function (tag, attributes) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
    children[_key2 - 2] = arguments[_key2];
  }

  return new _xml.XmlNode(tag, attributes, children.length ? children.map(function (e) {
    return typeof e === 'string' ? new _xml.XmlNode('#text', { text: e }) : e;
  }) : null);
};

var SPECIAL_TAGS = ['else', 'then', 'block', 'children'];
var ITERATOR_PROP = { isReadOnly: true, get: function get(T, k) {
    return T.$ && T.$[k];
  } };

var COMPONENTS_TYPES = new _map2.default();

var RE_PLACEHOLDER = /\{\{([a-zA-Z0-9\._$]+)\}\}/g;
var RE_SINGLE_PLACEHOLDER = /^\{\{([a-zA-Z0-9\._$]+)\}\}$/;
var RE_IF_PLACEHOLDER = /if="([a-zA-Z0-9\._$\s]+)"/g;
var RE_TAG_PLACEHOLDER = /<[a-z]+:([a-zA-Z0-9\._$\s]+)\s/g;
var RE_EACH_PLACEHOLDER = /each="([a-zA-Z0-9]+?)\sof\s([a-zA-Z0-9\._$\s]+)"/g;

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

function compileAttr(p) {

  if (p.indexOf && p.indexOf('{{') !== -1) {

    if (p.match(RE_SINGLE_PLACEHOLDER)) {

      var key = p.slice(2, -2);

      return function ($) {
        return $.get(key);
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
    for (var _iterator = (0, _getIterator3.default)(children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;


      var sub = resolveTemplate($, c, keyPrefix);

      if (sub) {

        if (Array.isArray(sub)) {
          r.push.apply(r, (0, _toConsumableArray3.default)(sub));
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

  $key = '' + (keyPrefix || '') + (component ? component.NAME : '') + $key;

  if (eachItemId) {
    var _ref;

    var data = $.get(eachDataId);
    return !data ? null : (_ref = []).concat.apply(_ref, (0, _toConsumableArray3.default)([].concat((0, _toConsumableArray3.default)(data)).map(function (d, index) {

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

      attributes = (0, _extends3.default)({}, props, attributes);
    }
  }

  children = !children ? null : resolveChildren($, children, $key + '.');

  if (SPECIAL_TAGS.indexOf(tag) !== -1) {

    return children.map(function (e) {
      return (0, _assign2.default)(e, { $key: $key + e.$key });
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
            _attr$split2 = (0, _slicedToArray3.default)(_attr$split, 3),
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
    (0, _classCallCheck3.default)(this, Template);


    this.root = root;
  }

  (0, _createClass3.default)(Template, [{
    key: 'resolve',
    value: function resolve($) {

      return resolveTemplate($, this.root, $.constructor.NAME);
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

  if (!ctor.hasOwnProperty('NAME')) {
    ctor.NAME = (0, _fn.functionDisplayName)(ctor);
  }

  var name = ctor.NAME;

  var text = ctor.TEMPLATE || 'No template for ' + name;

  if (!ctor.hasOwnProperty('PROPS')) {
    ctor.PROPS = {};
  }

  var ensureProp = function ensureProp(_, _key, prop) {
    var key = _key.split('.')[0];
    if (!ctor.PROPS[key] && !ctor.prototype.__lookupGetter__(key) && !ctor.prototype[key]) {
      ctor.PROPS[key] = prop || {};
    }
  };

  ctor.TEMPLATE.replace(RE_EACH_PLACEHOLDER, function (s, iteratorKey, key) {

    ensureProp('', iteratorKey, ITERATOR_PROP);
    ensureProp('', key);
  });

  ctor.TEMPLATE.replace(RE_IF_PLACEHOLDER, ensureProp);
  ctor.TEMPLATE.replace(RE_TAG_PLACEHOLDER, ensureProp);
  ctor.TEMPLATE.replace(RE_PLACEHOLDER, ensureProp);

  var root = compileTemplate(typeof text === 'string' ? (0, _xml.xmlParse)(text.trim()) : text);

  (0, _fn.assert)(SPECIAL_TAGS.indexOf(root.tag) === -1, name + ': Root tag cannot be special tag');

  var attrs = root.attributes;
  if (attrs) {

    (0, _fn.assert)(!('each' in attrs), name + ': Root tag cannot have \'each\' directive');
    (0, _fn.assert)(!('if' in attrs), name + ': Root tag cannot have \'if\' directive');
  }

  ctor.$TEMPLATE = new Template(root);
  ctor.$HAS_TRANSCLUSION = text.includes('<transclude');

  if (name[0] !== '$') {

    COMPONENTS_TYPES.set((0, _str.capitalize)(name), ctor);
  }
};

Template.getType = function (type) {
  return COMPONENTS_TYPES.get((0, _str.capitalize)(type));
};

exports.default = Template;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderer = undefined;

var _DOMRendererUtil = __webpack_require__(91);

var _DOMRendererAttrs = __webpack_require__(65);

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

    c.$transclude = children;

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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(18);

var _keys2 = _interopRequireDefault(_keys);

var _map = __webpack_require__(17);

var _map2 = _interopRequireDefault(_map);

exports.ensureEltPosition = ensureEltPosition;
exports.wrapRenderer = wrapRenderer;
exports.resolveDOMElement = resolveDOMElement;
exports.createElement = createElement;
exports.appendDOMElement = appendDOMElement;
exports.createDomElement = createDomElement;
exports.removeElt = removeElt;
exports.clearAfter = clearAfter;

var _DOMRendererAttrs = __webpack_require__(65);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var c = parentElt.$pool && parentElt.$pool.get($key);

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
  (parentElt.$pool || (parentElt.$pool = new _map2.default())).set($key, e);

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
      (0, _keys2.default)(lstnrs).forEach(function (k) {
        return e.removeEventListener(k, lstnrs[k]);
      });
      e.$listeners = null;
    }
    // console.log('remove DOM', e.$key);

    if (parentElt.$pool) {

      parentElt.$pool.delete(e.$key);
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderer = renderer;

var _xml = __webpack_require__(66);

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
/* 93 */
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
/* 94 */
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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(42);

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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(23);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(98);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22);
__webpack_require__(143);
module.exports = __webpack_require__(0).Array.from;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(22);
module.exports = __webpack_require__(141);

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(22);
module.exports = __webpack_require__(142);

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
__webpack_require__(22);
__webpack_require__(27);
__webpack_require__(145);
__webpack_require__(155);
module.exports = __webpack_require__(0).Map;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(146);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(147);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
module.exports = __webpack_require__(0).Object.getPrototypeOf;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(151);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(152);
module.exports = __webpack_require__(0).Object.setPrototypeOf;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
__webpack_require__(22);
__webpack_require__(27);
__webpack_require__(153);
module.exports = __webpack_require__(0).Promise;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(154);
__webpack_require__(62);
__webpack_require__(156);
__webpack_require__(157);
module.exports = __webpack_require__(0).Symbol;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22);
__webpack_require__(27);
module.exports = __webpack_require__(60).f('iterator');

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(35);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13)
  , toLength  = __webpack_require__(39)
  , toIndex   = __webpack_require__(140);
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
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(10)
  , IObject  = __webpack_require__(48)
  , toObject = __webpack_require__(21)
  , toLength = __webpack_require__(39)
  , asc      = __webpack_require__(124);
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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12)
  , isArray  = __webpack_require__(71)
  , SPECIES  = __webpack_require__(1)('species');

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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(123);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(5).f
  , create      = __webpack_require__(37)
  , redefineAll = __webpack_require__(54)
  , ctx         = __webpack_require__(10)
  , anInstance  = __webpack_require__(45)
  , defined     = __webpack_require__(34)
  , forOf       = __webpack_require__(35)
  , $iterDefine = __webpack_require__(49)
  , step        = __webpack_require__(74)
  , setSpecies  = __webpack_require__(79)
  , DESCRIPTORS = __webpack_require__(6)
  , fastKey     = __webpack_require__(50).fastKey
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
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(33)
  , from    = __webpack_require__(120);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(2)
  , $export        = __webpack_require__(4)
  , meta           = __webpack_require__(50)
  , fails          = __webpack_require__(15)
  , hide           = __webpack_require__(11)
  , redefineAll    = __webpack_require__(54)
  , forOf          = __webpack_require__(35)
  , anInstance     = __webpack_require__(45)
  , isObject       = __webpack_require__(12)
  , setToStringTag = __webpack_require__(26)
  , dP             = __webpack_require__(5).f
  , each           = __webpack_require__(122)(0)
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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5)
  , createDesc      = __webpack_require__(25);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(20)
  , gOPS    = __webpack_require__(52)
  , pIE     = __webpack_require__(38);
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
/* 130 */
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
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(37)
  , descriptor     = __webpack_require__(25)
  , setToStringTag = __webpack_require__(26)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(20)
  , toIObject = __webpack_require__(13);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(80).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(24)(process) == 'process';

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
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(20)
  , gOPS     = __webpack_require__(52)
  , pIE      = __webpack_require__(38)
  , toObject = __webpack_require__(21)
  , IObject  = __webpack_require__(48)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(15)(function(){
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
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(5)
  , anObject = __webpack_require__(8)
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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(13)
  , gOPN      = __webpack_require__(75).f
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
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(12)
  , anObject = __webpack_require__(8);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(10)(Function.call, __webpack_require__(51).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(8)
  , aFunction = __webpack_require__(44)
  , SPECIES   = __webpack_require__(1)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(57)
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
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(57)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8)
  , get      = __webpack_require__(61);
module.exports = __webpack_require__(0).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(33)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(19);
module.exports = __webpack_require__(0).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(10)
  , $export        = __webpack_require__(4)
  , toObject       = __webpack_require__(21)
  , call           = __webpack_require__(72)
  , isArrayIter    = __webpack_require__(70)
  , toLength       = __webpack_require__(39)
  , createProperty = __webpack_require__(128)
  , getIterFn      = __webpack_require__(61);

$export($export.S + $export.F * !__webpack_require__(73)(function(iter){ Array.from(iter); }), 'Array', {
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
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(119)
  , step             = __webpack_require__(74)
  , Iterators        = __webpack_require__(19)
  , toIObject        = __webpack_require__(13);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(49)(Array, 'Array', function(iterated, kind){
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
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(125);

// 23.1 Map Objects
module.exports = __webpack_require__(127)('Map', function(get){
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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(134)});

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(37)});

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(5).f});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(13)
  , $getOwnPropertyDescriptor = __webpack_require__(51).f;

__webpack_require__(53)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(21)
  , $getPrototypeOf = __webpack_require__(76);

__webpack_require__(53)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(21)
  , $keys    = __webpack_require__(20);

__webpack_require__(53)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(4);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(137).set});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(36)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(10)
  , classof            = __webpack_require__(33)
  , $export            = __webpack_require__(4)
  , isObject           = __webpack_require__(12)
  , aFunction          = __webpack_require__(44)
  , anInstance         = __webpack_require__(45)
  , forOf              = __webpack_require__(35)
  , speciesConstructor = __webpack_require__(138)
  , task               = __webpack_require__(80).set
  , microtask          = __webpack_require__(133)()
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
      , FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function(exec){ exec(empty, empty); };
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
  Internal.prototype = __webpack_require__(54)($Promise.prototype, {
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
__webpack_require__(26)($Promise, PROMISE);
__webpack_require__(79)(PROMISE);
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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(73)(function(iter){
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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(16)
  , DESCRIPTORS    = __webpack_require__(6)
  , $export        = __webpack_require__(4)
  , redefine       = __webpack_require__(78)
  , META           = __webpack_require__(50).KEY
  , $fails         = __webpack_require__(15)
  , shared         = __webpack_require__(56)
  , setToStringTag = __webpack_require__(26)
  , uid            = __webpack_require__(40)
  , wks            = __webpack_require__(1)
  , wksExt         = __webpack_require__(60)
  , wksDefine      = __webpack_require__(59)
  , keyOf          = __webpack_require__(132)
  , enumKeys       = __webpack_require__(129)
  , isArray        = __webpack_require__(71)
  , anObject       = __webpack_require__(8)
  , toIObject      = __webpack_require__(13)
  , toPrimitive    = __webpack_require__(58)
  , createDesc     = __webpack_require__(25)
  , _create        = __webpack_require__(37)
  , gOPNExt        = __webpack_require__(136)
  , $GOPD          = __webpack_require__(51)
  , $DP            = __webpack_require__(5)
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
  __webpack_require__(75).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(38).f  = $propertyIsEnumerable;
  __webpack_require__(52).f = $getOwnPropertySymbols;

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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
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
var $export  = __webpack_require__(4);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(126)('Map')});

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59)('asyncIterator');

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59)('observable');

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(81);


/***/ })
/******/ ]);