(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(17)('wks');
var uid = __webpack_require__(13);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(7)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(16);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(61);
var getKeys = __webpack_require__(19);
var redefine = __webpack_require__(10);
var global = __webpack_require__(2);
var hide = __webpack_require__(4);
var Iterators = __webpack_require__(31);
var wks = __webpack_require__(0);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(38);
var toPrimitive = __webpack_require__(25);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(4);
var has = __webpack_require__(6);
var SRC = __webpack_require__(13)('src');
var $toString = __webpack_require__(48);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(15).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(53);
var defined = __webpack_require__(21);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(3);
var $export = __webpack_require__(24);
var redefine = __webpack_require__(10);
var META = __webpack_require__(50).KEY;
var $fails = __webpack_require__(7);
var shared = __webpack_require__(17);
var setToStringTag = __webpack_require__(26);
var uid = __webpack_require__(13);
var wks = __webpack_require__(0);
var wksExt = __webpack_require__(41);
var wksDefine = __webpack_require__(51);
var enumKeys = __webpack_require__(52);
var isArray = __webpack_require__(56);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(9);
var toObject = __webpack_require__(30);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(25);
var createDesc = __webpack_require__(16);
var _create = __webpack_require__(44);
var gOPNExt = __webpack_require__(59);
var $GOPD = __webpack_require__(60);
var $GOPS = __webpack_require__(43);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(19);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(45).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(29).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(18)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
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

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(4)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(67);
var anObject = __webpack_require__(1);
var speciesConstructor = __webpack_require__(68);
var advanceStringIndex = __webpack_require__(32);
var toLength = __webpack_require__(22);
var callRegExpExec = __webpack_require__(33);
var regexpExec = __webpack_require__(34);
var fails = __webpack_require__(7);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(36)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(15);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(18) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(42);
var enumBugKeys = __webpack_require__(28);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(23);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(15);
var hide = __webpack_require__(4);
var redefine = __webpack_require__(10);
var ctx = __webpack_require__(49);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(6);
var TAG = __webpack_require__(0)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(17)('keys');
var uid = __webpack_require__(13);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(21);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(69)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(70);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(35);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(71);
var redefine = __webpack_require__(10);
var hide = __webpack_require__(4);
var fails = __webpack_require__(7);
var defined = __webpack_require__(21);
var wks = __webpack_require__(0);
var regexpExec = __webpack_require__(34);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toObject = __webpack_require__(30);
var toLength = __webpack_require__(22);
var toInteger = __webpack_require__(23);
var advanceStringIndex = __webpack_require__(32);
var regExpExec = __webpack_require__(33);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(36)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(7)(function () {
  return Object.defineProperty(__webpack_require__(39)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(0);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(6);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(54)(false);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(57);
var enumBugKeys = __webpack_require__(28);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(39)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(58).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(42);
var hiddenKeys = __webpack_require__(28).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toLength = __webpack_require__(22);
var advanceStringIndex = __webpack_require__(32);
var regExpExec = __webpack_require__(33);

// @@match logic
__webpack_require__(36)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(74);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17)('native-function-to-string', Function.toString);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(40);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(13)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(6);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(7)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(15);
var LIBRARY = __webpack_require__(18);
var wksExt = __webpack_require__(41);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(19);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(29);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(22);
var toAbsoluteIndex = __webpack_require__(55);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(19);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(45).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(29);
var createDesc = __webpack_require__(16);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(25);
var has = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(38);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(62);
var step = __webpack_require__(63);
var Iterators = __webpack_require__(31);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(64)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(0)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(4)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(18);
var $export = __webpack_require__(24);
var redefine = __webpack_require__(10);
var hide = __webpack_require__(4);
var Iterators = __webpack_require__(31);
var $iterCreate = __webpack_require__(65);
var setToStringTag = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(66);
var ITERATOR = __webpack_require__(0)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(44);
var descriptor = __webpack_require__(16);
var setToStringTag = __webpack_require__(26);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(4)(IteratorPrototype, __webpack_require__(0)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(6);
var toObject = __webpack_require__(30);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(9);
var cof = __webpack_require__(20);
var MATCH = __webpack_require__(0)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(40);
var SPECIES = __webpack_require__(0)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var defined = __webpack_require__(21);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20);
var TAG = __webpack_require__(0)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(34);
__webpack_require__(24)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(73);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(35);
var DESCRIPTORS = __webpack_require__(3);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(10)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(7)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(3) && /./g.flags != 'g') __webpack_require__(8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(35)
});


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__(46);

// CONCATENATED MODULE: ./lib/armatura/xml.js




// ==========
// XML Parse for templates. XML -> NodeTree
// ----------
const RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g;
const RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g;
const RE_ATTRS = /([a-z][a-zA-Z0-9-:]+)(="[^"]*"|={[^}]*})?/g;
const RE_ESCAPE_XML_ENTITY = /["'&<>]/g;
const RE_XML_TAG = /(<)(\/?)([a-zA-Z][a-zA-Z0-9-:]*)((?:\s+[a-z][a-zA-Z0-9-:]+(?:="[^"]*"|={[^}]*})?)*)\s*(\/?)>/g;
const SINGLE_TAGS = 'img input br col'.split(' ').reduce((r, e) => {
  r[e] = 1;
  return r;
}, {});
const SUBST_XML_ENTITY = {
  amp: '&',
  gt: '>',
  lt: '<',
  quot: "\"",
  nbsp: ' '
};
const ESCAPE_XML_ENTITY = {
  34: '&quot;',
  38: '&amp;',
  39: '&#39;',
  60: '&lt;',
  62: '&gt;'
};
const RE_EMPTY = /^\s*$/;

const FN_ESCAPE_XML_ENTITY = m => ESCAPE_XML_ENTITY[m.charCodeAt(0)];

const FN_XML_ENTITY = function FN_XML_ENTITY(_) {
  const s = _.substring(1, _.length - 1);

  return s[0] === '#' ? String.fromCharCode(+s.slice(1)) : SUBST_XML_ENTITY[s] || ' ';
};

const decodeXmlEntities = function decodeXmlEntities() {
  let s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return s.replace(RE_XML_ENTITY, FN_XML_ENTITY);
};

const escapeXml = s => !s ? '' : ('' + s).replace(RE_ESCAPE_XML_ENTITY, FN_ESCAPE_XML_ENTITY);

const skipQoutes = s => s[0] === '"' && s[s.length - 1] === '"' ? s.slice(1, -1) : s;

let UID = 1;

const parseAttrs = s => {
  const r = new Map();

  if (!s) {
    return r;
  }

  while (1) {
    let e = RE_ATTRS.exec(s);

    if (!e) {
      return r;
    }

    if (!e[2]) {
      r.set(e[1], "true");
    } else {
      r.set(e[1], decodeXmlEntities(skipQoutes(e[2].slice(1))));
    }
  }
};

const stringifyAttrs = attrs => {
  if (!attrs || !attrs.size) {
    return '';
  }

  const r = [];
  attrs.forEach((v, k) => {
    if (v && k !== '#text') {
      r.push(' ' + k + '="' + escapeXml(v) + '"');
    }
  });
  return r.join('');
};

class Node {
  constructor(tag) {
    let attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();
    this.uid = UID++;
    this.tag = tag || '';
    this.attrs = attrs;
    this.nodes = [];
  }

  getChild(index) {
    return this.nodes[index];
  }

  setText(text) {
    this.attrs.set('#text', decodeXmlEntities(text));
  }

  addChild(tag, attrs) {
    const e = new Node(tag, attrs);
    this.nodes.push(e);
    return e;
  }

  toString() {
    return stringify(this);
  }

}

function stringify(_ref) {
  let {
    tag,
    attrs,
    nodes = []
  } = _ref;
  let tab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  const sattrs = stringifyAttrs(attrs);
  const ssubs = nodes.map(c => stringify(c, "  ".concat(tab))).join('\n');
  const text = attrs && attrs.get('#text');
  const stext = text ? "  ".concat(tab).concat(escapeXml(text)) : '';

  if (tag === '#text') {
    return stext.trim();
  }

  return "".concat(tab, "<").concat(tag).concat(sattrs) + (!ssubs && !stext ? '/>' : ">\n".concat(ssubs).concat(stext, "\n").concat(tab, "</").concat(tag, ">"));
}
const parseXML = (_s, key) => {
  const s = ('' + _s).trim().replace(RE_XML_COMMENT, '');

  const ctx = [new Node()];
  let lastIndex = 0; // head text omitted

  while (1 > 0) {
    let e = RE_XML_TAG.exec(s);

    if (!e) {
      break;
    } // preceding text


    const text = e.index && s.slice(lastIndex, e.index);

    if (text && !text.match(RE_EMPTY)) {
      ctx[0].addChild('#text').setText(text);
    } // closing tag


    if (e[2]) {
      if (ctx[0].tag !== e[3]) {
        throw new Error((key || '') + ' XML Parse closing tag does not match at: ' + e.index + ' near ' + e.input.slice(Math.max(e.index - 150, 0), e.index) + '^^^^' + e.input.slice(e.index, Math.min(e.index + 150, e.input.length)));
      }

      ctx.shift();
    } else {
      const elt = ctx[0].addChild(e[3], parseAttrs(e[4])); // not single tag

      if (!(e[5] || e[3] in SINGLE_TAGS)) {
        ctx.unshift(elt);

        if (ctx.length === 1) {
          throw new Error('Parse error at: ' + e[0]);
        }
      }
    } // up past index


    lastIndex = RE_XML_TAG.lastIndex;
  } // tail text omitted


  return ctx[0].getChild(0);
};
// CONCATENATED MODULE: ./lib/armatura/compile.js






function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const VALUES = {
  true: true,
  false: false,
  null: null
};
const RE_SINGLE_PLACEHOLDER = /^\{([^}]+)\}$/;
const RE_PLACEHOLDER = /\{([^}]+)\}/g; // Compilation

function expression(v) {
  if (v[0] === ':') {
    return placeholder(v);
  }

  if (!v.includes('{')) {
    const r = v in VALUES ? VALUES[v] : v;
    return () => r;
  }

  if (v.match(RE_SINGLE_PLACEHOLDER)) {
    return placeholder(v.slice(1, -1).trim());
  }

  return stringInterpolation(v);
}
function stringInterpolation(v) {
  let fnx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const pattern = v.replace(RE_PLACEHOLDER, (s, expr) => {
    fnx.push(placeholder(expr));
    return '{{' + (fnx.length - 1) + '}}';
  });
  return c => !fnx.length ? pattern : pattern.replace(/\{\{(\d+)\}\}/g, (s, idx) => {
    const r = fnx[idx](c);
    return !r && r !== 0 ? '' : r;
  });
}
function placeholder(expr) {
  const [key, ...pipes] = expr.split('|').map(s => s.trim());
  const initGettr = key[0] === ':' ? (fn => c => c.resource(fn(c)))(stringInterpolation(key.slice(1).trim())) : c => c.prop(key);
  const pipec = withPipes(pipes);
  return c => pipec(c, initGettr(c));
}
function withPipes(pipes) {
  return !pipes.length ? (c, v) => v : (c, initialValue) => pipes.reduce((r, pk) => c.pipe(r, pk), initialValue);
}

const assignKeyValue = (acc, val, k) => {
  if (k.slice(0, 5) === 'data-') {
    acc['data'] = _objectSpread({}, acc['data'], {
      [k.slice(5)]: val in VALUES ? VALUES[val] : val
    });
  } else {
    acc[k] = val;
  }
};

const makeApplicator = function makeApplicator(get) {
  let k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  return (c, acc) => assignKeyValue(acc, get(c), k);
};

const hasSlot = (c, id) => {
  let r = false;

  if (id && id != 'default') {
    c.content && c.content.forEach(e => {
      r = r || e.tag === c.tag + ':' + id;
    });
  } else {
    c.content && c.content.forEach(e => {
      r = r || e.tag.slice(0, c.tag.length + 1) !== c.tag + ':';
    });
  }

  return r;
};

const filterMapKey = (src, key) => {
  const r = new Map();
  src.forEach((v, k) => {
    if (k !== key) {
      r.set(k, v);
    }
  });
  return r;
};
function compileFor(_ref) {
  let {
    tag,
    attrs,
    uid,
    nodes
  } = _ref;
  const [itemId,, expr] = attrs.get('ui:for').split(' ');
  const $for = {
    itemId
  };
  const r = {
    tag: 'ui:fragment',
    uid: 'for:' + expr + uid,
    $for,
    key: attrs.get('key')
  };

  if (expr.slice(0, 2) === '<-') {
    const [key, ...pipes] = expr.slice(2).split('|').map(s => s.trim());
    const pipec = withPipes(pipes);
    (r.inits || (r.inits = [])).push(c => c.connect(key, rr => ({
      $data: pipec(c, rr)
    })));
  } else {
    (r.updates || (r.updates = [])).push(makeApplicator(expression('{:'.includes(expr[0]) ? expr : '{' + expr + '}'), '$data'));
  }

  let $nodes = nodes;

  if (nodes && nodes.length) {
    const emptyNode = $nodes.find(e => e.tag === 'ui:empty');

    if (emptyNode) {
      $for.emptyNode = emptyNode.nodes.map(compileNode);
      $nodes = $nodes.filter(e => e !== emptyNode);
    }

    const loadingNode = $nodes.find(e => e.tag === 'ui:loading');

    if (loadingNode) {
      $for.loadingNode = loadingNode.nodes.map(compileNode);
      $nodes = $nodes.filter(e => e !== loadingNode);
    }
  }

  $for.itemNode = compileNode({
    tag,
    attrs: filterMapKey(attrs, 'ui:for'),
    uid,
    nodes: $nodes
  });
  return r;
}
function compileIf(_ref2) {
  let {
    tag,
    attrs,
    uid,
    nodes
  } = _ref2;
  const aIf = attrs.get('ui:if');
  const iff = {};
  const r = {
    tag: 'ui:fragment',
    uid: 'if:' + aIf + uid,
    key: attrs.get('key'),
    $if: iff
  };
  const neg = aIf[0] === '!';
  const expr = neg ? aIf.slice(1) : aIf;

  if (expr.slice(0, 2) === '<-') {
    const [key, ...pipes] = expr.slice(2).split('|').map(s => s.trim());
    const pipec = withPipes(pipes);
    const applicator = neg ? c => rr => ({
      $data: !pipec(c, rr)
    }) : c => rr => ({
      $data: !!pipec(c, rr)
    });
    (r.inits || (r.inits = [])).push(c => c.connect(key, applicator(c)));
  } else if (expr.slice(0, 5) === 'slot(') {
    const gttr = c => hasSlot(c, expr.slice(5, -1));

    (r.updates || (r.updates = [])).push((c, acc) => {
      acc['$data'] = neg ? !gttr(c) : gttr(c);
    });
  } else {
    const gttr = expression(expr.includes('{') ? expr : '{' + expr + '}');
    (r.updates || (r.updates = [])).push((c, acc) => {
      acc['$data'] = neg ? !gttr(c) : gttr(c);
    });
  }

  let $then = {
    tag,
    attrs: filterMapKey(attrs, 'ui:if'),
    uid,
    nodes
  };

  if (nodes && nodes.length) {
    const ifElse = nodes.find(e => e.tag === 'ui:else');
    const ifThen = nodes.find(e => e.tag === 'ui:then');

    if (ifElse) {
      iff.else = ifElse.nodes.map(compileNode);
      $then.nodes = ifThen ? ifThen.nodes : nodes.filter(e => e !== ifElse);
    } else if (ifThen) {
      $then.nodes = ifThen.nodes;
    }
  }

  iff.then = [$then].map(compileNode);
  return r;
}
function compileTag(_ref3) {
  let {
    attrs,
    uid,
    nodes
  } = _ref3;
  const expr = attrs.get('tag');
  const r = {
    tag: 'ui:fragment',
    uid: 'tag:' + expr + uid,
    $tag: compile({
      attrs: filterMapKey(attrs, 'tag'),
      nodes
    })
  };

  if (expr.slice(0, 2) === '<-') {
    (r.inits || (r.inits = [])).push(c => c.connect(expr.slice(2).trim(), rr => ({
      $data: rr
    })));
  } else {
    const gttr = expression(expr);
    (r.updates || (r.updates = [])).push((c, acc) => {
      acc['$data'] = gttr(c);
    });
  }

  return r;
}
function compile(r) {
  const {
    attrs,
    nodes
  } = r;

  if (attrs.has('id')) {
    r.id = attrs.get('id');
  }

  if (attrs.has('ui:ref')) {
    r.ref = attrs.get('ui:ref');
  } // ui:props


  if (attrs.has('ui:props')) {
    const aProps = attrs.get('ui:props');

    if (aProps.slice(0, 2) === '<-') {
      const [key, ...pipes] = aProps.slice(2).split('|').map(s => s.trim());
      const pipec = withPipes(pipes);
      (r.inits || (r.inits = [])).push(c => c.connect(key, rr => pipec(c, rr)));
    } else {
      const getter = expression(aProps);
      (r.updates || (r.updates = [])).push((c, acc) => Object.assign(acc, getter(c)));
    }
  } // attrs


  attrs.forEach((v, k) => {
    if (k.slice(0, 3) !== 'ui:') {
      const v2 = v.slice(0, 2);

      if (v2 === '<-') {
        const [key, ...pipes] = v.slice(2).split('|').map(s => s.trim());
        const pipec = withPipes(pipes);
        (r.inits || (r.inits = [])).push(c => c.connect(key, rr => ({
          [k]: pipec(c, rr)
        })));
      } else if (v2 === '->') {
        const [key, ...pipes] = v.slice(2).split('|').map(s => s.trim());
        const expr = expression(key);
        const pipec = withPipes(pipes);
        const ekey = '$' + v + ':' + r.uid;

        const emitter = c => c[ekey] || (c[ekey] = (data, cb) => c.emit(expr(c), pipec(c, data), cb));

        (r.updates || (r.updates = [])).push((c, acc) => assignKeyValue(acc, emitter(c), k));
      } else {
        if (!v.includes('{') && v[0] !== ':' && k.slice(0, 5) !== 'data-') {
          assignKeyValue(r.initials || (r.initials = {}), v, k);
        } else {
          (r.updates || (r.updates = [])).push(makeApplicator(expression(v), k));
        }
      }
    }
  });
  r.nodes = nodes.map(compileNode);
  return r;
}
function compileNode(node) {
  if (node.attrs.has('ui:for')) {
    return compileFor(node);
  }

  if (node.attrs.has('ui:if')) {
    return compileIf(node);
  }

  if (node.tag === 'ui:tag') {
    return compileTag(node);
  }

  return compile(node);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__(72);

// CONCATENATED MODULE: ./lib/armatura/utils.js


let COUNTER = 1;
const nope = () => {};
const fnId = x => x;
const nextId = function nextId() {
  let p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return p + COUNTER++;
};
const methodName = function methodName(x) {
  let pre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!x) {
    return pre;
  }

  const s = "".concat(x);
  return pre + s[0].toUpperCase() + s.slice(1);
};
const camelize = function camelize(key) {
  let sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  let jn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
  return ('' + key).split(sep).map((s, i) => i ? s[0].toUpperCase() + s.slice(1) : s).join(jn);
};
const fnName = ctor => (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || nextId('$C');
const runInBrowser = fn => window.requestAnimationFrame(() => fn.call(window, document));
// CONCATENATED MODULE: ./lib/armatura/register.js




const REGISTRY = new Map();

const reg = ctr => {
  const ctor = typeof ctr === 'function' ? ctr : Object.assign(function () {}, ctr);
  const name = ctor.NAME || ctor.name || fnName(ctor);
  const text = ctor.TEMPLATE || ctor.template || ctor.prototype.TEMPLATE;

  ctor.$TEMPLATE = () => {
    try {
      const T = text ? compileNode(parseXML(typeof text === 'function' ? text() : text, name)) : [];

      ctor.$TEMPLATE = () => T;

      return T;
    } catch (ex) {
      console.log('compile ' + name, ex);
    }

    return [];
  };

  REGISTRY.set(name, ctor);
};

reg({
  NAME: 'ui:fragment'
});
const registerTypes = types => types.forEach(reg);
registerTypes.getByTag = REGISTRY.get.bind(REGISTRY);
// CONCATENATED MODULE: ./lib/armatura/render.js



function render_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { render_defineProperty(target, key, source[key]); }); } return target; }

function render_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const render_render = function render(c) {
  let $content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : c.resolveTemplate();

  if (!$content || !$content.size) {
    c.eachChild(cc => cc.done());
    return;
  }

  c.eachChild(cc => !$content.has(cc.uid) ? cc.done() : 0);
  const ch = c.children || (c.children = new Map());
  $content.forEach((_ref, uid) => {
    let {
      tag,
      content,
      owner,
      props,
      inits,
      initials,
      ref,
      $if,
      $for,
      $tag
    } = _ref;
    let cc = ch.get(uid);

    if (!cc) {
      props = props && props.data && initials && initials.data ? render_objectSpread({}, props, initials, {
        data: render_objectSpread({}, initials.data, props.data)
      }) : render_objectSpread({}, props, initials);
      cc = new component_Component(registerTypes.getByTag(tag), {
        props,
        tag,
        ref,
        $if,
        $for,
        $tag,
        uid,
        owner,
        inits,
        parent: c
      });
      ch.set(uid, cc);
    }

    cc.owner = owner;
    cc.content = content;
    cc.prevElt = c.elt.cursor;
    cc.up(props);
  });
  c.eachChild(cc => !cc.isInited ? cc.init() : 0);
};
// CONCATENATED MODULE: ./lib/armatura/resolve.js


const resolveSlot = (owner, id, acc) => {
  let $ = owner;

  for (; $.owner && $.tag === 'ui:fragment'; $ = $.owner) {}

  $.content && $.content.forEach(v => {
    if (id) {
      if (v.tag === $.tag + ':' + id) {
        v.content.forEach(vv => acc.set(vv.uid, vv));
      }
    } else if (v.tag.slice(0, $.tag.length + 1) !== $.tag + ':') {
      acc.set(v.uid, v);
    }
  });
  return acc;
};

const resolveTemplateArray = function resolveTemplateArray(owner, tmpl) {
  let acc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Map();
  return tmpl && tmpl.length ? tmpl.reduce((m, t) => resolveTemplate(owner, t, m), acc) : null;
};

const resolveProps = (props, c) => props && props.length ? props.reduce((acc, fn) => {
  fn(c, acc);
  return acc;
}, {}) : null;

function resolveRegular(acc, owner, _ref) {
  let {
    tag,
    updates,
    initials,
    inits,
    nodes,
    uid,
    id,
    ref,
    $if,
    $for,
    $tag
  } = _ref;

  if (tag === 'ui:slot') {
    return resolveSlot(owner, id, acc);
  }

  const props = resolveProps(updates, owner);
  const content = resolveTemplateArray(owner, nodes);
  return acc.set(uid, {
    tag,
    id,
    uid,
    ref,
    owner,
    initials,
    inits,
    $if,
    $for,
    $tag,
    props,
    content
  });
}

function resolveTemplate(owner, tmpl) {
  let acc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Map();

  if (!tmpl) {
    return acc;
  }

  if (tmpl.reduce) {
    return tmpl.length ? resolveTemplateArray(owner, tmpl, acc) : acc;
  }

  return resolveRegular(acc, owner, tmpl);
}
// CONCATENATED MODULE: ./lib/armatura/component.js





function component_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { component_defineProperty(target, key, source[key]); }); } return target; }

function component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class component_Component {
  constructor(Ctor, options) {
    Object.assign(this, options);
    const {
      ref,
      parent,
      props
    } = this;

    if (parent) {
      this.app = parent.app;
      this.ctx = this.elt = parent.elt;
      this.impl = new (Ctor || component_Component.Element)(props, this);
      this.impl.$ = this;
      this.impl.app = this.app;

      if (ref) {
        const hidden = this.app[ref];
        this.app[ref] = this.impl;
        this.defer(() => {
          this.app[ref] = hidden;
        });
      }
    } else {
      this.app = this.impl = new Ctor(props, this);
      this.app.$resources = component_objectSpread({}, props.resources, {
        app: this.app
      });
      this.impl.$ = this;
    }
  }
  /**
   * Rendering.
   */


  resolveFragmentTemplate() {
    const acc = new Map();

    if (this.$for) {
      // ui:for
      const $for = this.$for;
      const {
        $data: data
      } = this.impl;
      const {
        itemId,
        itemNode,
        emptyNode,
        loadingNode
      } = $for;
      const {
        tag,
        updates,
        initials = {},
        nodes,
        uid
      } = itemNode;

      if (data && data.length) {
        if (!data.forEach) {
          throw new Error('wrong ui:for data', data);
        }

        data.forEach((d, index) => {
          const id = "".concat(uid, "-$").concat(d.id || index);
          const $ownerImpl = Object.assign(Object.create(this.owner.impl), {
            [itemId]: d,
            [itemId + 'Index']: index
          });

          const up = Δ => this.owner.up(Δ);

          const $owner = Object.assign(Object.create(this.owner), {
            impl: $ownerImpl,
            $propFnMap: {},
            up
          });
          resolveTemplate($owner, {
            tag,
            initials,
            updates,
            nodes,
            uid: id
          }, acc);
        });
      } else if (!data) {
        if (loadingNode) {
          resolveTemplate(this.owner, loadingNode, acc);
        }
      } else if (!data.length) {
        if (emptyNode) {
          resolveTemplate(this.owner, emptyNode, acc);
        }
      }
    } else if (this.$if) {
      // ui:if
      const $if = this.$if;
      const {
        $data
      } = this.impl;
      const node = $data ? $if.then : $if.else;
      resolveTemplate(this, node, acc);
    } else if (this.$tag) {
      // ui:tag
      const tag = this.impl.$data;

      if (tag) {
        resolveTemplate(this, component_objectSpread({}, this.$tag, {
          tag,
          uid: tag + ':' + this.uid
        }), acc);
      }
    } else if (this.content) {
      // content
      this.content.forEach((v, k) => acc.set(k, v));
    }

    return acc;
  }

  render() {
    this.ctx.cursor = this.prevElt;

    if (this.impl.render) {
      this.impl.render(this, render_render);
    } else {
      render_render(this);
    }
  }

  resolveTemplate() {
    return this.tag === 'ui:fragment' ? this.resolveFragmentTemplate() : resolveTemplate(this, this.impl.constructor.$TEMPLATE());
  }
  /**
   * Life-cycle hooks.
   */


  init() {
    if (this.isDone || this.isInited) {
      return;
    }

    this.isInited = true; // console.log('init', this.tag, this.uid)

    if (this.inits) {
      this.inits.forEach(f => this.defer(f(this)));
      delete this.inits;
    }

    if (this.impl.init) {
      const d = this.impl.init(this);

      if (d) {
        this.up(d);
      }
    }
  }

  done() {
    if (this.isDone) {
      return;
    }

    this.isDone = true;

    if (this.impl.done) {
      this.impl.done(this);
    } // console.log('done', this.tag, this.uid)


    this.eachChild(c => {
      c.parent = null;
      c.done();
    });

    if (this.parent) {
      this.parent.children.delete(this.uid);
    }

    if (this.prevElt) {
      this.prevElt.nextElt = this.nextElt;
    }

    if (this.defered) {
      this.defered.forEach(f => f(this));
      delete this.defered;
    }

    this.cleanUp();
  }
  /**
   * State.
   */


  up(Δ) {
    if (this.isDone) {
      return;
    }

    let changed = this.set(Δ);
    this.render();

    if (this.ref && changed) {
      this.notify();
    }
  }

  upAsync(promise, key) {
    const $ = this;
    const racer = $.raceCondition('set:' + (key || 'up'));

    const up = r => racer(() => $.up(r));

    if (key && key !== '...') {
      const akey = key.replace('Promise', '');
      promise.then(val => up({
        [akey + 'Error']: null,
        [akey]: val
      }), error => up({
        [akey + 'Error']: error
      }));
    } else {
      promise.then(up, error => up({
        error
      }));
    }

    return promise;
  }

  set(Δ) {
    const $ = this;
    const impl = $.impl;
    let changed = false;

    if (impl.set) {
      changed = impl.set(Δ);
    } else if (Δ) {
      if (Δ.then) {
        $.upAsync(Δ);
      } else {
        Object.entries(Δ).forEach((_ref) => {
          let [k, their] = _ref;

          if (their && their.then) {
            $.upAsync(their, k);
          } else if (k && typeof their !== 'undefined' && their !== impl[k]) {
            const setter = impl['set' + k[0].toUpperCase() + k.slice(1)];

            if (setter) {
              setter.call(impl, their);
            } else {
              impl[k] = their;
            }

            changed = true;
          }
        });
      }
    }

    return changed;
  }

  prop(propId) {
    const value = this.propGetter(propId)();
    return typeof value === 'function' ? this.bindFn(value) : value;
  }

  propGetter(key) {
    const $ = this;
    const map = $.$propFnMap || ($.$propFnMap = {});
    let fn = map[key];

    if (fn) {
      return fn;
    }

    const impl = this.impl;
    const [pk, ...path] = key.split('.');
    const gettr = impl[methodName(pk, 'get')];
    const extractor1 = gettr ? () => gettr.call(impl, $) : function () {
      let $$ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : impl.get ? impl.get() : impl;
      return pk in $$ ? $$[pk] : $.owner && $.owner.prop && $.tag === 'ui:fragment' ? $.owner.prop(pk) : undefined;
    };
    fn = !path.length ? extractor1 : () => path.reduce((r, p) => r ? r[p] : r, extractor1());
    return map[key] = fn;
  }

  pipe(value, key) {
    const [id, ...args] = key.split(':');

    try {
      const fn = this.resource(id);
      return fn.apply(this.actualOwner.impl, [value, ...args]);
    } catch (ex) {
      console.error('ERROR: Object.pipes.' + id, ex);
      return value;
    }
  }

  resource(key) {
    const [id, ...deep] = key.split('.');
    const target = this.app.$resources[id];

    if (!deep.length) {
      return target;
    }

    return deep.reduce((r, k) => r ? r[k] : null, target);
  }
  /**
   *  Arrows.
   */


  notify() {
    if (this.listeners && !this.notifying) {
      this.notifying = true;
      this.listeners.forEach(e => e(this.impl));
      this.notifying = false;
    }
  }

  subscribe(fn) {
    const uuid = nextId();
    const listeners = this.listeners || (this.listeners = new Map());
    fn(this.impl);
    listeners.set(uuid, fn);
    return () => listeners.delete(uuid);
  }

  connect(key, applicator) {
    const [type = this.ref, target] = key.split('.');
    const ref = type === 'this' ? this.impl : this.app[type];

    if (!ref) {
      console.error('connect: No such ref ' + type, key);
    }

    return ref && ref.$.subscribe(() => {
      try {
        const value = ref.$.prop(target);
        this.up(applicator ? value && value.then ? value.then(applicator) : applicator(value) : value);
      } catch (ex) {
        console.error('connect ' + type + ':' + target, ex);
      }
    });
  }

  emit(key, data, _callback) {
    if (!key || !key.includes('.')) {
      return this.actualOwner.up(key ? {
        [key]: data
      } : data);
    }

    const [type, target] = key.split('.');
    const racer = this.raceCondition(type + ':on:' + target);
    const event = {
      type,
      target,
      data,
      callback: (error, r) => racer(() => _callback ? _callback(error, r) : this.up(component_objectSpread({
        error
      }, r)))
    };
    const ref = type === 'this' ? this.impl : this.app[type];

    try {
      if (!ref) {
        throw new ReferenceError('emit: No such ref ' + type);
      }

      const method = ref[methodName(target, 'on')];

      if (!method) {
        throw new ReferenceError('emit ' + type + ': No such method ' + methodName(target, 'on'));
      }

      const result = method.call(ref, event, ref);
      this.log(type + ':' + methodName(target, 'on'), result, event, ref);

      if (result) {
        ref.$.up(result);
      }
    } catch (ex) {
      this.error('emit ' + type + ':' + target, ex);
      event.callback(ex);
    }
  }
  /**
   * Routines.
   */


  raceCondition(key) {
    const COUNTERS = this.$weak || (this.$weak = new Map());
    const counter = 1 + (COUNTERS.get(key) || 0);
    COUNTERS.set(key, counter);
    return fn => {
      if (counter === COUNTERS.get(key)) {
        runInBrowser(fn);
      }

      ;
    };
  }

  defer(fn) {
    if (fn && typeof fn === 'function') {
      (this.defered || (this.defered = [])).push(fn);
    }
  }

  eachChild(fn) {
    let ch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.children;

    if (ch) {
      ch.forEach(fn);
    }
  }

  get actualOwner() {
    let $ = this;

    for (; $.owner && $.tag === 'ui:fragment'; $ = $.owner) {}

    return $;
  }

  cleanUp() {
    ['parent', 'children', 'owner', 'impl', 'app', 'ctx'].forEach(k => {
      delete this[k];
    });
  }

  error() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    console.error(this.tag + this.uid, ...args);
  }

  log() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    console.log(this.tag + this.uid, ...args);
  }

  bindFn(f) {
    const $ = this;
    const map = $.$boundFnMap || ($.$boundFnMap = new Map());
    let fn = map.get(f);

    if (!fn) {
      const bound = f.bind($.impl);

      fn = function fn() {
        const r = bound(...arguments);

        if (r) {
          $.up(r);
        }
      };

      map.set(f, fn);
    }

    return fn;
  }

}
// CONCATENATED MODULE: ./lib/armatura/dom.js




function dom_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { dom_defineProperty(target, key, source[key]); }); } return target; }

function dom_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // DOM

const DOM_SETTERS = {
  '#text': (e, v) => e.textContent = v == null ? '' : v,
  error: (e, v) => e.error = v == null ? '' : v,
  disabled: (e, v) => e.disabled = v ? true : null,
  class: (e, v) => {
    if (v.includes(':')) {
      v = ('' + v).split(' ').map(s => {
        const [cl, expr] = s.split(':');
        if (expr === undefined) return cl;
        const [fl, eq] = expr.split('==');
        const disabled = eq ? fl !== eq : ['', '0', 'false', null].indexOf(fl) > -1;
        return disabled ? '' : cl;
      }).join(' ');
    }

    e.className = v;
  },
  selected: (e, v) => e.selected = v ? true : null,
  value: (e, v) => e.value = v == null ? '' : v,
  checked: (e, v) => e.checked = !!v,
  init: function init(e, v) {
    this.init = () => v(e, this);
  },
  data: function data(e, v) {
    if (v && e.$dataset) {
      Object.keys(e.$dataset).forEach(k => {
        if (!v[k]) {
          e.dataset[camelize(k, '-', '')] = null;
        }

        ;
      });
    }

    e.$dataset = dom_objectSpread({}, v);

    if (v) {
      Object.keys(v).forEach(k => {
        e.dataset[camelize(k, '-', '')] = v[k];
      });
    }
  },
  click: function click(e, v) {
    this.setAttribute('click:click', !v ? null : ev => {
      this.$attributes.click(dom_objectSpread({}, e.$dataset), ev);
      return false;
    });
  },
  'bubble-click': function bubbleClick(e, v) {
    this.setAttribute('bubbled-click:click', !v ? null : ev => {
      this.$attributes['bubble-click'](dom_objectSpread({}, e.$dataset), ev);
      return true;
    });
  },
  blur: function blur(e, v) {
    this.setAttribute('blur:blur', !v ? null : ev => {
      this.$attributes.blur(dom_objectSpread({}, e.$dataset), ev);
      return false;
    });
  },
  dblclick: function dblclick(e, v) {
    this.setAttribute('dblclick:dblclick', !v ? null : ev => {
      this.$attributes.dblclick(dom_objectSpread({}, e.$dataset), ev);
      return false;
    });
  },
  scroll: function scroll(e, v) {
    this.setAttribute('scroll:scroll', !v ? null : ev => {
      this.$attributes.scroll(dom_objectSpread({}, e.$dataset), ev);
      return false;
    });
  },
  error: function error(e, v) {
    this.setAttribute('error:error', !v ? null : ev => {
      const fn = this.getAttribute('error');
      fn && fn(dom_objectSpread({}, e.$dataset), ev);
      return false;
    });
  },
  keypress: function keypress(e, v) {
    this.setAttribute('keypress:keyup', !v ? null : ev => {
      if (ev.keyCode !== 13 && ev.keyCode !== 27) {
        const fn = this.$attributes.keypress;
        fn && fn(dom_objectSpread({
          value: e.value
        }, e.$dataset), ev);
        setTimeout(() => e.focus(), 0);
      }

      return false;
    });
  },
  enter: function enter(e, v) {
    this.setAttribute('enter:keyup', !v ? null : ev => {
      if (ev.keyCode === 13) {
        this.$attributes.enter(dom_objectSpread({
          value: e.value
        }, e.$dataset), ev);
      }

      if (ev.keyCode === 13 || ev.keyCode === 27) {
        e.blur();
      }

      return false;
    });
  },
  change: function change(e, v) {
    this.setAttribute('change:change', !v ? null : ev => {
      this.$attributes.change(dom_objectSpread({
        value: e.value
      }, e.$dataset), ev);
      return false;
    });
  },
  toggle: function toggle(e, v) {
    this.setAttribute('toggle:change', !v ? null : ev => {
      this.$attributes.toggle(dom_objectSpread({
        value: e.checked
      }, e.$dataset), ev);
      return false;
    });
  }
};
const DOM_VALUE_COMPARATORS = {
  value: (e, their, _) => e.value === their,
  _: (_2, their, mine) => their === mine
};
class dom_DomElement {
  constructor() {
    let attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let $ = arguments.length > 1 ? arguments[1] : undefined;
    this.elt = $.elt = $.tag === '#text' ? document.createTextNode('') : document.createElement($.tag);
    this.$attributes = {};
    this.$ = this.elt.$ = $;
    this.applyAttributes(attrs);
  }

  done() {
    const e = this.elt;
    const lstnrs = this.$listeners;

    if (lstnrs) {
      Object.keys(lstnrs).forEach(k => e.removeEventListener(k, lstnrs[k]));
      this.$listeners = null;
    }

    const p = e.parentElement;

    if (p) {
      p.removeChild(e);
    }

    this.elt = this.$attributes = null;
  }

  set(delta) {
    this.delta = this.delta ? Object.assign(this.delta, delta) : delta;
    return this.$.nodes || delta && Object.keys(delta).length;
  }

  render($) {
    const e = this.elt;
    const p = $.ctx;

    if ($.content) {
      e.cursor = null;
      render_render($, $.content);
      e.cursor = null;
    }

    if (this.delta) {
      this.applyAttributes(this.delta);
      this.delta = null;
    }

    const before = p.cursor ? p.cursor.nextSibling : p.firstChild;

    if (!before) {
      if (p !== e.parentElement) {
        p.appendChild(e);
      }
    } else if (e !== before) {
      p.insertBefore(e, before);
    }

    p.cursor = e;
  }

  applyAttributes(theirs) {
    const e = this.elt;
    const mines = this.$attributes;

    for (let key in theirs) {
      if (theirs.hasOwnProperty(key) && !(DOM_VALUE_COMPARATORS[key] || DOM_VALUE_COMPARATORS._)(e, theirs[key], mines[key])) {
        const value = theirs[key];
        const setter = DOM_SETTERS[key]; // console.log('setAttribute' + this.$.tag, key, value)

        if (setter) {
          setter.call(this, e, value);
        } else {
          this.setAttribute(key, value);
        }
      }
    }

    this.$attributes = theirs;
  }

  getAttribute(key, def) {
    return this.$attributes && this.$attributes[key] || def;
  }

  setAttribute(key, value) {
    var _this = this;

    if (value != null) {
      if (typeof value === 'function') {
        const fnValue = function fnValue() {
          if (!_this.isDone) {
            value(...arguments);
          }
        };

        if (!this.listeners) {
          this.listeners = new Map();
        }

        if (!this.listeners.has(key)) {
          const [akey, ekey = akey] = key.split(':');
          this.elt.addEventListener(ekey, fnValue, false);
          this.listeners.set(key, fnValue);
        }
      } else {
        this.elt.setAttribute(key, value);
      }
    } else {
      if (this.listeners && this.listeners.has(key)) {
        const [akey, ekey = akey] = key.split(':');
        this.elt.removeEventListener(ekey, this.listeners.get(key));
        this.listeners.delete(key);
      } else {
        this.elt.removeAttribute(key);
      }
    }
  }

}
// CONCATENATED MODULE: ./lib/armatura/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });



function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






class armatura_WebClientAppStub {
  constructor(props, $) {
    Object.assign(this, props);
    $.elt = $.ctx = $.rootElement || document.body;
  }

  render($, render) {
    runInBrowser(() => render($));
  }

}

function register() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return {
    run() {
      let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          {
        rootElement,
        template,
        App = armatura_WebClientAppStub,
        Element = dom_DomElement
      } = _ref,
          props = _objectWithoutProperties(_ref, ["rootElement", "template", "App", "Element"]);

      const types = [App].concat(...args);
      component_Component.Element = Element;
      App.template = template || App.TEMPLATE || "<".concat(types[1].name || types[1].NAME, "/>");
      registerTypes(types);
      const app = new component_Component(App, {
        props,
        rootElement
      });
      app.render();
      app.init();
      return app.impl;
    }

  };
}

/***/ })
/******/ ]);
});