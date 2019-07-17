(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["armatura"] = factory();
	else
		root["armatura"] = factory();
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/armatura/api.js":
/*!*****************************!*\
  !*** ./lib/armatura/api.js ***!
  \*****************************/
/*! exports provided: EventEmitter, Api, ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventEmitter\", function() { return EventEmitter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Api\", function() { return Api; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ApiService\", function() { return ApiService; });\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.symbol */ \"./node_modules/core-js/modules/es6.symbol.js\");\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./lib/armatura/utils.js\");\n/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./url */ \"./lib/armatura/url.js\");\n\n\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nclass EventEmitter {\n  constructor(api) {\n    const bundle = {};\n\n    this.notify = function (key) {\n      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        args[_key - 1] = arguments[_key];\n      }\n\n      const listeners = bundle[key];\n\n      if (listeners) {\n        bundle[key].forEach(e => e(...args));\n      }\n    };\n\n    this.subscribe = (key, fn) => {\n      const uuid = Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"nextId\"])();\n      const listeners = bundle[key] || (bundle[key] = new Map());\n      fn();\n      listeners.set(uuid, fn);\n      return () => listeners.delete(uuid);\n    };\n\n    this.emit = (key, data) => {\n      const url = Object(_url__WEBPACK_IMPORTED_MODULE_3__[\"urlParse\"])(key, {\n        data\n      });\n      const {\n        type,\n        target\n      } = url;\n\n      try {\n        const ref = type ? api[type] : api;\n        const method = ref && ref[Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"capitalize\"])(target, 'on')];\n        const result = method.call(ref, url);\n        const promise = result && result.then ? result : Promise.resolve(result);\n        return promise.then(r => {\n          this.notify(type);\n          return r;\n        });\n      } catch (ex) {\n        console.error('emit ' + type + ':' + target, ex);\n        return Promise.reject(ex);\n      }\n    };\n\n    this.connect = (key, cb, ctx) => {\n      const url = Object(_url__WEBPACK_IMPORTED_MODULE_3__[\"urlParse\"])(key);\n      const {\n        type,\n        target\n      } = url;\n      return this.subscribe(type, () => {\n        try {\n          const ref = type ? api[type] : api;\n          const method = ref && ref[Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"capitalize\"])(target, 'get')];\n          const val = method.call(ref, _objectSpread({}, url, {\n            data: ctx.data\n          }));\n\n          if (val && val.then) {\n            val.then(r => cb(null, r), cb);\n          } else {\n            cb(null, val);\n          }\n        } catch (ex) {\n          console.error('connect ' + type + ':' + target, ex);\n          cb(ex);\n        }\n      });\n    };\n  }\n\n}\nclass Api {\n  constructor() {\n    this.emitter = new EventEmitter(this);\n  }\n\n}\nclass ApiService {\n  constructor(_ref) {\n    let {\n      api,\n      ref,\n      props\n    } = _ref;\n    Object.assign(this, _objectSpread({}, props, {\n      api,\n      ref\n    }));\n\n    this.notify = function () {\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      return api.emitter.notify(ref, ...args);\n    };\n\n    this.emit = function () {\n      return api.emitter.emit(...arguments);\n    };\n\n    this.emitToMe = function (key) {\n      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {\n        args[_key3 - 1] = arguments[_key3];\n      }\n\n      return api.emitter.emit(ref + ':' + key, ...args);\n    };\n\n    this.subscribe = function () {\n      return api.emitter.subscribe(...arguments);\n    };\n\n    this.log = function () {\n      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {\n        args[_key4] = arguments[_key4];\n      }\n\n      return console.log(ref + ': ', ...args);\n    };\n\n    this.error = error => console.error(ref + ': ', error);\n  }\n\n}\n\n//# sourceURL=./lib/armatura/api.js");

/***/ }),

/***/ "./lib/armatura/compile.js":
/*!*********************************!*\
  !*** ./lib/armatura/compile.js ***!
  \*********************************/
/*! exports provided: compileEach, compileIf, compile, compileNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compileEach\", function() { return compileEach; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compileIf\", function() { return compileIf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compile\", function() { return compile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compileNode\", function() { return compileNode; });\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.symbol */ \"./node_modules/core-js/modules/es6.symbol.js\");\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ \"./node_modules/core-js/modules/es6.regexp.split.js\");\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ \"./lib/armatura/utils.js\");\n\n\n\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nconst assigner = (acc, val, k) => {\n  if (k.slice(0, 5) === 'data-') {\n    acc['data'] = _objectSpread({}, acc['data'], {\n      [k.slice(5)]: val in _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"VALUES\"] ? _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"VALUES\"][val] : val\n    });\n  } else {\n    acc[k] = val;\n  }\n};\n\nconst makeApplicator = function makeApplicator(get) {\n  let k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';\n  return (c, acc) => assigner(acc, get(c), k);\n};\n\nconst emitter = function emitter(v, k) {\n  let fctr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"expression\"])(v);\n  return c => c['$' + k] || (c['$' + k] = (data, opts) => c.emit(fctr(c), data, opts));\n};\n\nconst hasSlot = (c, key) => c.content.reduce((r, e) => r || e.tag === c.tag + ':' + key, false);\n\nfunction compileEach(_ref) {\n  let {\n    tag,\n    attrs,\n    uid,\n    nodes\n  } = _ref;\n  const [itemId,, expr] = attrs.get('ui:each').split(' ');\n  const $each = {\n    itemId\n  };\n  const r = {\n    tag: 'ui:fragment',\n    uid: 'each:' + expr + uid,\n    $each,\n    key: attrs.get('key')\n  };\n\n  if (expr.slice(0, 2) === '<-') {\n    const pipes = expr.slice(2).split('|').map(s => s.trim());\n    const key = pipes.shift();\n    const fn = !pipes.length ? c => c.connect(key, rr => ({\n      $data: rr\n    })) : c => c.connect(key, rr => ({\n      $data: pipes.reduce((acc, pk) => c.reduce(acc, pk), rr)\n    }));\n    (r.inits || (r.inits = [])).push(fn);\n  } else {\n    (r.updates || (r.updates = [])).push(makeApplicator(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"expression\"])('{:'.includes(expr[0]) ? expr : '{{' + expr + '}}'), '$data'));\n  }\n\n  let $nodes = nodes;\n\n  if (nodes && nodes.length) {\n    const emptyNode = $nodes.find(e => e.tag === 'ui:empty');\n\n    if (emptyNode) {\n      $each.emptyNode = emptyNode.nodes.map(compileNode);\n      $nodes = $nodes.filter(e => e !== emptyNode);\n    }\n\n    const loadingNode = $nodes.find(e => e.tag === 'ui:loading');\n\n    if (loadingNode) {\n      $each.loadingNode = loadingNode.nodes.map(compileNode);\n      $nodes = $nodes.filter(e => e !== loadingNode);\n    }\n  }\n\n  $each.itemNode = compileNode({\n    tag,\n    attrs: Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"filterMapKey\"])(attrs, 'ui:each'),\n    uid,\n    nodes: $nodes\n  });\n  return r;\n}\nfunction compileIf(_ref2) {\n  let {\n    tag,\n    attrs,\n    uid,\n    nodes\n  } = _ref2;\n  const aIf = attrs.get('ui:if');\n  const iff = {};\n  const r = {\n    tag: 'ui:fragment',\n    uid: 'if:' + aIf + uid,\n    key: attrs.get('key'),\n    $if: iff\n  };\n  const neg = aIf[0] === '!';\n  const expr = neg ? aIf.slice(1) : aIf;\n\n  if (expr.slice(0, 2) === '<-') {\n    (r.inits || (r.inits = [])).push(c => c.connect(expr.slice(2).trim(), neg ? rr => ({\n      $data: !rr\n    }) : rr => ({\n      $data: !!rr\n    })));\n  } else if (expr.slice(0, 5) === 'slot:') {\n    const gttr = c => hasSlot(c, expr.slice(5));\n\n    (r.updates || (r.updates = [])).push((c, acc) => {\n      acc['$data'] = neg ? !gttr(c) : gttr(c);\n    });\n  } else {\n    const gttr = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"expression\"])('{:'.includes(expr[0]) ? expr : '{{' + expr + '}}');\n    (r.updates || (r.updates = [])).push((c, acc) => {\n      acc['$data'] = neg ? !gttr(c) : gttr(c);\n    });\n  }\n\n  let $then = {\n    tag,\n    attrs: Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"filterMapKey\"])(attrs, 'ui:if'),\n    uid,\n    nodes\n  };\n\n  if (nodes && nodes.length) {\n    const ifElse = nodes.find(e => e.tag === 'ui:else');\n    const ifThen = nodes.find(e => e.tag === 'ui:then');\n\n    if (ifElse) {\n      iff.else = ifElse.nodes.map(compileNode);\n      $then.nodes = ifThen ? ifThen.nodes : nodes.filter(e => e !== ifElse);\n    } else if (ifThen) {\n      $then.nodes = ifThen.nodes;\n    }\n  }\n\n  iff.then = [$then].map(compileNode);\n  return r;\n}\nfunction compile(r) {\n  const {\n    attrs,\n    nodes\n  } = r;\n\n  if (attrs.has('id')) {\n    r.id = attrs.get('id');\n  }\n\n  if (attrs.has('ui:ref')) {\n    r.ref = attrs.get('ui:ref');\n  } // ui:props\n\n\n  if (attrs.has('ui:props')) {\n    const aProps = attrs.get('ui:props');\n\n    if (aProps.slice(0, 2) === '<-') {\n      (r.inits || (r.inits = [])).push(c => c.connect(aProps.slice(2).trim(), rr => rr));\n    } else {\n      const getter = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"expression\"])(aProps);\n      (r.updates || (r.updates = [])).push((c, acc) => Object.assign(acc, getter(c)));\n    }\n  } // attrs\n\n\n  attrs.forEach((v, k) => {\n    if (k.slice(0, 3) !== 'ui:') {\n      const v2 = v.slice(0, 2);\n\n      if (v2 === '<-') {\n        (r.inits || (r.inits = [])).push(c => c.connect(v.slice(2).trim(), rr => ({\n          [k]: rr\n        })));\n      } else if (v2 === '->') {\n        (r.updates || (r.updates = [])).push(makeApplicator(emitter(v.slice(2).trim(), k), k));\n      } else {\n        if (!v.includes('{{') && v[0] !== ':') {\n          assigner(r.initials || (r.initials = {}), v, k);\n        } else {\n          (r.updates || (r.updates = [])).push(makeApplicator(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"expression\"])(v), k));\n        }\n      }\n    }\n  });\n  r.nodes = nodes.map(compileNode);\n  return r;\n}\nfunction compileNode(node) {\n  if (node.attrs.has('ui:each')) {\n    return compileEach(node);\n  }\n\n  if (node.attrs.has('ui:if')) {\n    return compileIf(node);\n  }\n\n  return compile(node);\n}\n\n//# sourceURL=./lib/armatura/compile.js");

/***/ }),

/***/ "./lib/armatura/component.js":
/*!***********************************!*\
  !*** ./lib/armatura/component.js ***!
  \***********************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.symbol */ \"./node_modules/core-js/modules/es6.symbol.js\");\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ \"./node_modules/core-js/modules/es6.regexp.split.js\");\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render.js */ \"./lib/armatura/render.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ \"./lib/armatura/utils.js\");\n/* harmony import */ var _resolve__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resolve */ \"./lib/armatura/resolve.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dom.js */ \"./lib/armatura/dom.js\");\n\n\n\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nclass Component {\n  constructor(Ctor, options) {\n    Object.assign(this, options);\n\n    if (this.parent) {\n      this.api = this.parent.api;\n      this.impl = Ctor ? new Ctor({\n        ref: this.ref,\n        api: this.api,\n        props: this.props\n      }) : new _dom_js__WEBPACK_IMPORTED_MODULE_6__[\"Element\"](this, this.props);\n    } else {\n      this.api = this.impl = new Ctor();\n    }\n\n    if (this.ref) {\n      const hidden = this.api[this.ref];\n      this.api[this.ref] = this.impl;\n      this.defer(() => {\n        this.api[this.ref] = hidden;\n      });\n    }\n  }\n\n  renderFragment() {\n    const acc = new Map();\n\n    if (this.$each) {\n      const $each = this.$each;\n      const {\n        $data: data\n      } = this.impl;\n      const {\n        itemId,\n        itemNode,\n        emptyNode,\n        loadingNode\n      } = $each;\n      const {\n        tag,\n        updates,\n        initials = {},\n        nodes,\n        uid\n      } = itemNode;\n      this.content = new Map();\n\n      if (data && data.length) {\n        data.forEach((d, index) => {\n          const id = \"\".concat(uid, \"-$\").concat(d.id || index);\n          const $this = Object.create(this);\n          $this.impl = {\n            [itemId]: d,\n            [itemId + 'Index']: index\n          };\n          Object(_resolve__WEBPACK_IMPORTED_MODULE_5__[\"resolveTemplate\"])($this, {\n            tag,\n            initials,\n            updates,\n            nodes,\n            uid: id\n          }, acc);\n        });\n      } else if (!data) {\n        if (loadingNode) {\n          Object(_resolve__WEBPACK_IMPORTED_MODULE_5__[\"resolveTemplate\"])(this.owner, loadingNode, acc);\n        }\n      } else if (!data.length) {\n        if (emptyNode) {\n          Object(_resolve__WEBPACK_IMPORTED_MODULE_5__[\"resolveTemplate\"])(this.owner, emptyNode, acc);\n        }\n      }\n    } else if (this.$if) {\n      const $if = this.$if;\n      const {\n        $data\n      } = this.impl;\n      const node = $data ? $if.then : $if.else;\n      this.content = new Map();\n      Object(_resolve__WEBPACK_IMPORTED_MODULE_5__[\"resolveTemplate\"])(this, node, acc);\n    } else if (this.content) {\n      this.content.forEach((v, k) => acc.set(k, v));\n    }\n\n    Object(_render_js__WEBPACK_IMPORTED_MODULE_3__[\"render\"])(this, acc, this.ctx);\n  }\n\n  render() {\n    this.ctx.cursor = this.prevElt;\n\n    if (this.impl.render) {\n      this.impl.render(this.ctx);\n    } else if (this.tag === 'ui:fragment') {\n      this.renderFragment();\n    } else {\n      Object(_render_js__WEBPACK_IMPORTED_MODULE_3__[\"render\"])(this, Object(_resolve__WEBPACK_IMPORTED_MODULE_5__[\"resolveTemplate\"])(this, this.impl.constructor.$TEMPLATE()), this.ctx);\n    }\n  }\n\n  init() {\n    if (this.isDone) {\n      return;\n    }\n\n    this.isInited = true;\n\n    if (this.inits) {\n      this.inits.forEach(f => this.defer(f(this)));\n      delete this.inits;\n    }\n\n    if (this.impl.init) {\n      this.defer(this.impl.init(this));\n    }\n  }\n\n  done() {\n    if (this.isDone) {\n      return;\n    }\n\n    this.isDone = true;\n\n    if (this.impl.done) {\n      this.impl.done(this);\n    }\n\n    this.eachChild(c => {\n      c.parent = null;\n      c.done();\n    });\n\n    if (this.parent) {\n      this.parent.children.delete(this.uid);\n    }\n\n    if (this.defered) {\n      this.defered.forEach(f => f(this));\n      delete this.defered;\n    }\n\n    Object(_utils_js__WEBPACK_IMPORTED_MODULE_4__[\"cleanUp\"])(this);\n  }\n\n  defer(fn) {\n    if (fn && typeof fn === 'function') {\n      (this.defered || (this.defered = [])).push(fn);\n    }\n  }\n\n  eachChild(fn) {\n    let ch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.children;\n\n    if (ch) {\n      ch.forEach(fn);\n    }\n  }\n\n  up(Δ) {\n    if (this.isDone) {\n      return;\n    }\n\n    if (Δ && Δ.then) {\n      Δ.then(r => this.up(r));\n      return;\n    }\n\n    const c = this;\n    const impl = c.impl;\n\n    if (this.impl.set) {\n      this.impl.set(Δ);\n    } else if (Δ) {\n      Object.entries(Δ).forEach((_ref) => {\n        let [k, their] = _ref;\n        const mine = impl[k];\n\n        if (typeof their !== 'undefined' && their !== mine) {\n          const setter = impl['set' + k[0].toUpperCase() + k.slice(1)];\n\n          if (setter) {\n            setter.call(impl, their);\n          } else {\n            impl[k] = their;\n          }\n        }\n      });\n    }\n\n    (this.parent.rendering ? this : this.parent).render();\n  }\n\n  prop(propId) {\n    let $ = this.impl.get ? this.impl.get() : this.impl;\n    const [pk, ...path] = propId.split('.');\n    const gettr = $[Object(_utils_js__WEBPACK_IMPORTED_MODULE_4__[\"capitalize\"])(pk, 'get')];\n    let value = undefined;\n\n    if (gettr) {\n      value = gettr.call($, this);\n    } else if (pk in $) {\n      value = $[pk];\n    } else {\n      return this.owner && this.tag === 'ui:fragment' ? this.owner.prop(propId) : value;\n    }\n\n    if (path.length) {\n      value = path.reduce((r, p) => r ? r[p] : r, value);\n    }\n\n    return typeof value === 'function' ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_4__[\"boundFn\"])(this, value) : value;\n  }\n\n  connect(url, applicator) {\n    const cb = (error, r) => this.up(_objectSpread({\n      error\n    }, applicator ? applicator(r) : r));\n\n    return url ? this.api.emitter.connect(url, cb, this.impl) : cb(null, this.owner.impl);\n  }\n\n  emit(key, data) {\n    let $ = this;\n\n    for (; $.owner && $.tag === 'ui:fragment'; $ = $.owner) {}\n\n    if (key) {\n      this.api.emitter.emit(key, data).then(r => $.up(_objectSpread({\n        error: null\n      }, r))).catch(error => $.up({\n        error\n      }));\n    } else {\n      $.up(_objectSpread({\n        error: null\n      }, data));\n    }\n  }\n\n  string(key) {\n    return this.resource(key) || Object(_utils_js__WEBPACK_IMPORTED_MODULE_4__[\"humanize\"])(key);\n  }\n\n  resource(key) {\n    try {\n      return Object.R(key);\n    } catch (ex) {\n      console.error('resource', ex);\n      return null;\n    }\n  }\n\n  reduce(value, key) {\n    try {\n      const [id, ...args] = key.split(':');\n      const fn = this.resource('reducers.' + id);\n      return fn ? fn.apply(this.impl, [value, ...args]) : value;\n    } catch (ex) {\n      console.error('reduce', ex);\n      return value;\n    }\n  }\n\n}\n\n//# sourceURL=./lib/armatura/component.js");

/***/ }),

/***/ "./lib/armatura/dom.js":
/*!*****************************!*\
  !*** ./lib/armatura/dom.js ***!
  \*****************************/
/*! exports provided: Element */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Element\", function() { return Element; });\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ \"./node_modules/core-js/modules/es6.regexp.split.js\");\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render.js */ \"./lib/armatura/render.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ \"./lib/armatura/utils.js\");\n\n\n\n\nconst doc = window.document;\nclass Element {\n  constructor($) {\n    let attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    this.elt = $.tag === '#text' ? doc.createTextNode('') : doc.createElement($.tag);\n    this.$attributes = {};\n    this.$ = $;\n    this.applyAttributes(attrs); // console.log('new element' + $.tag)\n  }\n\n  done() {\n    const e = this.elt; // console.log('done element' + this.$.tag)\n\n    const lstnrs = this.$listeners;\n\n    if (lstnrs) {\n      Object.keys(lstnrs).forEach(k => e.removeEventListener(k, lstnrs[k]));\n      this.$listeners = null;\n    }\n\n    const p = e.parentElement;\n\n    if (p) {\n      p.removeChild(e);\n    }\n\n    this.elt = this.$attributes = null;\n  }\n\n  set(delta) {\n    this.delta = delta;\n    return this.$.nodes || delta && Object.keys(delta).length;\n  }\n\n  render(p) {\n    const e = this.elt;\n    const $ = this.$;\n\n    if ($.content) {\n      e.cursor = null;\n      Object(_render_js__WEBPACK_IMPORTED_MODULE_2__[\"render\"])($, $.content, e);\n      e.cursor = null;\n    }\n\n    if (this.delta) {\n      this.applyAttributes(this.delta);\n      this.delta = null;\n    }\n\n    const before = p.cursor ? p.cursor.nextSibling : p.firstChild;\n\n    if (!before) {\n      p.appendChild(e);\n    } else if (e !== before) {\n      p.insertBefore(e, before);\n    }\n\n    p.cursor = e;\n  }\n\n  applyAttributes(theirs) {\n    const e = this.elt;\n    const mines = this.$attributes;\n\n    for (let key in theirs) {\n      if (theirs.hasOwnProperty(key) && !(_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"DOM_VALUE_COMPARATORS\"][key] || _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"DOM_VALUE_COMPARATORS\"]._)(e, theirs[key], mines[key])) {\n        const value = theirs[key];\n        const setter = _utils_js__WEBPACK_IMPORTED_MODULE_3__[\"DOM_SETTERS\"][key]; // console.log('setAttribute' + this.$.tag, key, value)\n\n        if (setter) {\n          setter.call(this, e, value);\n        } else {\n          this.setAttribute(key, value);\n        }\n      }\n    }\n\n    this.$attributes = theirs;\n  }\n\n  setAttribute(key, value) {\n    if (value != null) {\n      if (typeof value === 'function') {\n        if (!this.listeners) {\n          this.listeners = new Map();\n        }\n\n        if (!this.listeners.has(key)) {\n          const [akey, ekey = akey] = key.split(':');\n          this.elt.addEventListener(ekey, value, false);\n          this.listeners.set(key, value);\n        }\n      } else {\n        this.elt.setAttribute(key, value);\n      }\n    } else {\n      if (this.listeners && this.listeners.has(key)) {\n        const [akey, ekey = akey] = key.split(':');\n        this.elt.removeEventListener(ekey, this.listeners.get(key));\n        this.listeners.delete(key);\n      } else {\n        this.elt.removeAttribute(key);\n      }\n    }\n  }\n\n}\n\n//# sourceURL=./lib/armatura/dom.js");

/***/ }),

/***/ "./lib/armatura/index.js":
/*!*******************************!*\
  !*** ./lib/armatura/index.js ***!
  \*******************************/
/*! exports provided: register, EventEmitter, Api, ApiService, urlParse, urlStringify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"register\", function() { return register; });\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component.js */ \"./lib/armatura/component.js\");\n/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register.js */ \"./lib/armatura/register.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render.js */ \"./lib/armatura/render.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ \"./lib/armatura/utils.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./api.js */ \"./lib/armatura/api.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"EventEmitter\", function() { return _api_js__WEBPACK_IMPORTED_MODULE_5__[\"EventEmitter\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Api\", function() { return _api_js__WEBPACK_IMPORTED_MODULE_5__[\"Api\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ApiService\", function() { return _api_js__WEBPACK_IMPORTED_MODULE_5__[\"ApiService\"]; });\n\n/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./url.js */ \"./lib/armatura/url.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"urlParse\", function() { return _url_js__WEBPACK_IMPORTED_MODULE_6__[\"urlParse\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"urlStringify\", function() { return _url_js__WEBPACK_IMPORTED_MODULE_6__[\"urlStringify\"]; });\n\n\n\n\n\n\n\n\n\nfunction register() {\n  for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {\n    types[_key] = arguments[_key];\n  }\n\n  Object(_register_js__WEBPACK_IMPORTED_MODULE_2__[\"registerTypes\"])(...types);\n  const meta = new Map([[0, {\n    tag: types[0].NAME\n  }]]);\n  return {\n    run(ctx) {\n      const root = new _component_js__WEBPACK_IMPORTED_MODULE_1__[\"Component\"](_api_js__WEBPACK_IMPORTED_MODULE_5__[\"Api\"], {});\n      Object(_utils_js__WEBPACK_IMPORTED_MODULE_4__[\"runInBrowser\"])(doc => Object(_render_js__WEBPACK_IMPORTED_MODULE_3__[\"render\"])(root, meta, ctx || doc.body));\n      return () => {\n        root.done();\n        Object(_register_js__WEBPACK_IMPORTED_MODULE_2__[\"resetTypes\"])();\n      };\n    }\n\n  };\n}\n\n//# sourceURL=./lib/armatura/index.js");

/***/ }),

/***/ "./lib/armatura/register.js":
/*!**********************************!*\
  !*** ./lib/armatura/register.js ***!
  \**********************************/
/*! exports provided: typeByTag, registerTypes, resetTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typeByTag\", function() { return typeByTag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"registerTypes\", function() { return registerTypes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resetTypes\", function() { return resetTypes; });\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _xml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xml */ \"./lib/armatura/xml.js\");\n/* harmony import */ var _compile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./compile.js */ \"./lib/armatura/compile.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ \"./lib/armatura/utils.js\");\n\n\n\n\nconst REGISTRY = new Map();\nconst CACHE = {};\n\nconst reg = ctr => {\n  const ctor = typeof ctr === 'function' ? ctr : Object.assign(function () {}, ctr);\n  const name = ctor.NAME = ctor.NAME || ctor.name || Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__[\"fnName\"])(ctor);\n  const text = ctor.TEMPLATE || ctor.prototype.TEMPLATE;\n\n  ctor.$TEMPLATE = () => CACHE[name] || (CACHE[name] = text ? Object(_compile_js__WEBPACK_IMPORTED_MODULE_2__[\"compileNode\"])(Object(_xml__WEBPACK_IMPORTED_MODULE_1__[\"parseXML\"])(text, name)) : []);\n\n  REGISTRY.set(name, ctor);\n};\n\nreg({\n  NAME: 'ui:fragment'\n});\nconst typeByTag = REGISTRY.get.bind(REGISTRY);\nconst registerTypes = function registerTypes() {\n  for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {\n    types[_key] = arguments[_key];\n  }\n\n  return types.forEach(reg);\n};\nconst resetTypes = () => Object.keys(CACHE).forEach(k => {\n  delete CACHE[k];\n});\n\n//# sourceURL=./lib/armatura/register.js");

/***/ }),

/***/ "./lib/armatura/render.js":
/*!********************************!*\
  !*** ./lib/armatura/render.js ***!
  \********************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.symbol */ \"./node_modules/core-js/modules/es6.symbol.js\");\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _register_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register.js */ \"./lib/armatura/register.js\");\n/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component.js */ \"./lib/armatura/component.js\");\n\n\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nconst deep = [];\nconst render = (c, $content, ctx) => {\n  c.eachChild(cc => !$content.has(cc.uid) ? cc.done() : 0);\n\n  if (!$content.size) {\n    return;\n  }\n\n  deep.unshift('  ');\n  const ch = c.children || (c.children = new Map());\n  c.rendering = true;\n  $content.forEach((_ref, uid) => {\n    let {\n      tag,\n      content,\n      owner,\n      props,\n      inits,\n      initials,\n      ref,\n      $if,\n      $each\n    } = _ref;\n    let cc = ch.get(uid);\n\n    if (!cc) {\n      props = _objectSpread({}, props, initials);\n      cc = new _component_js__WEBPACK_IMPORTED_MODULE_3__[\"Component\"](Object(_register_js__WEBPACK_IMPORTED_MODULE_2__[\"typeByTag\"])(tag), {\n        props,\n        tag,\n        ref,\n        $if,\n        $each,\n        uid,\n        ctx,\n        owner,\n        inits,\n        parent: c\n      });\n      ch.set(uid, cc);\n    }\n\n    cc.owner = owner;\n    cc.content = content;\n    cc.prevElt = ctx.cursor; // console.log(deep.join(''), 'render', tag, props);\n\n    cc.up(props);\n  });\n  c.rendering = false;\n  c.eachChild(cc => !cc.isInited ? cc.init() : 0);\n  deep.shift();\n};\n\n//# sourceURL=./lib/armatura/render.js");

/***/ }),

/***/ "./lib/armatura/resolve.js":
/*!*********************************!*\
  !*** ./lib/armatura/resolve.js ***!
  \*********************************/
/*! exports provided: resolveTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resolveTemplate\", function() { return resolveTemplate; });\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst resolveSlot = (owner, id, acc) => {\n  owner.content.forEach((v, k) => {\n    if (id) {\n      if (v.tag === owner.tag + ':' + id) {\n        v.content.forEach(vv => acc.set(vv.uid, vv));\n      }\n    } else if (v.tag.slice(0, owner.tag.length + 1) !== owner.tag + ':') {\n      acc.set(v.uid, v);\n    }\n  });\n  return acc;\n};\n\nconst resolveTemplateArray = function resolveTemplateArray(owner, tmpl) {\n  let acc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Map();\n  return tmpl && tmpl.length ? tmpl.reduce((m, t) => resolveTemplate(owner, t, m), acc) : null;\n};\n\nconst resolveProps = (props, owner) => props && props.length ? props.reduce((acc, fnProp) => {\n  fnProp(owner, acc);\n  return acc;\n}, {}) : null;\n\nfunction resolveRegular(acc, owner, _ref) {\n  let {\n    tag,\n    updates,\n    initials,\n    inits,\n    nodes,\n    uid,\n    id,\n    ref,\n    $if,\n    $each\n  } = _ref;\n\n  if (tag === 'ui:slot') {\n    return resolveSlot(owner, id, acc);\n  }\n\n  const props = resolveProps(updates, owner);\n  const content = resolveTemplateArray(owner, nodes);\n  const $tag = tag === 'ui:tag' ? props.tag : tag;\n  return acc.set($tag + uid, {\n    tag: $tag,\n    id,\n    uid,\n    ref,\n    owner,\n    initials,\n    inits,\n    $if,\n    $each,\n    props,\n    content\n  });\n}\n\nfunction resolveTemplate(owner, tmpl) {\n  let acc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Map();\n\n  if (!tmpl) {\n    return acc;\n  }\n\n  if (tmpl.reduce) {\n    return tmpl.length ? resolveTemplateArray(owner, tmpl, acc) : acc;\n  }\n\n  return resolveRegular(acc, owner, tmpl);\n}\n\n//# sourceURL=./lib/armatura/resolve.js");

/***/ }),

/***/ "./lib/armatura/url.js":
/*!*****************************!*\
  !*** ./lib/armatura/url.js ***!
  \*****************************/
/*! exports provided: urlParse, urlStringify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"urlParse\", function() { return urlParse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"urlStringify\", function() { return urlStringify; });\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.symbol */ \"./node_modules/core-js/modules/es6.symbol.js\");\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ \"./node_modules/core-js/modules/es6.regexp.split.js\");\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * Parses string into URL object.\n *\n * @param {string} s string in format: `type:target/path?params#data`\n * @param {object} r optional target object\n * @returns URL object like `{type, target, path, params, data }`\n */\nfunction urlParse(s) {\n  let r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  if (!s) {\n    return _objectSpread({\n      path: [],\n      params: {},\n      target: ''\n    }, r);\n  }\n\n  if (typeof s === 'object') {\n    return _objectSpread({\n      path: [],\n      params: {},\n      target: ''\n    }, r, s);\n  }\n\n  let p; // extract type:\n\n  p = s.indexOf(':');\n\n  if (p > -1) {\n    r.type = s.slice(0, p);\n    s = s.slice(p + 1);\n  } // extract data:\n\n\n  p = s.indexOf('#');\n\n  if (p > -1) {\n    r.data = decodeValue(s.slice(p + 1));\n    s = s.slice(0, p);\n  } // extract query params:\n\n\n  p = s.indexOf('?');\n  r.params = r.params || {};\n\n  if (p > -1) {\n    for (let param of s.slice(p + 1).split('&')) {\n      let [key, value] = param.split('=');\n\n      if (value) {\n        r.params[key] = decodeValue(value);\n      }\n    }\n\n    s = s.slice(0, p);\n  } // target and path:\n\n\n  let path = r.path = s.split('/').map(decodeURIComponent);\n\n  while (path.length && !r.target) {\n    r.target = path.shift();\n  }\n\n  return r;\n}\n/**\n*  Represents an URL object as a string\n*\n* @param {object} r URL object like `{type, target, path, params, data }`\n* @returns string in format `type:target/path?params#data`\n*/\n\nfunction urlStringify(r) {\n  let result = '';\n\n  if (!r) {\n    return result;\n  }\n\n  if (typeof r === 'string') {\n    return r;\n  }\n\n  if (r.target) {\n    if (r.type) {\n      result += \"\".concat(r.type, \"://\");\n    }\n\n    result += r.target;\n  }\n\n  if (r.path) {\n    result += \"/\".concat(Array.isArray(r.path) ? r.path.map(encodeURIComponent).join('/') : r.path);\n  }\n\n  const params = r.params;\n\n  if (params) {\n    const keys = Object.keys(params).filter(key => params[key] != null);\n\n    if (keys.length) {\n      result += \"?\".concat(keys.map(key => \"\".concat(key, \"=\").concat(encodeValue(params[key]))).join('&'));\n    }\n  }\n\n  if (r.data) {\n    result += \"#\".concat(encodeValue(r.data));\n  }\n\n  return result;\n}\nconst VALUE_MAP = {\n  true: true,\n  false: false,\n  undefined\n};\n\nfunction decodeValue(val) {\n  const value = decodeURIComponent(val);\n\n  if ('{['.indexOf(value[0]) > -1) {\n    return JSON.parse(value);\n  }\n\n  const num = +value;\n\n  if (!isNaN(num)) {\n    return num;\n  }\n\n  return VALUE_MAP[value] || value;\n}\n\nfunction encodeValue(value) {\n  return encodeURIComponent(typeof value === 'object' ? JSON.stringify(value) : \"\".concat(value));\n}\n\n//# sourceURL=./lib/armatura/url.js");

/***/ }),

/***/ "./lib/armatura/utils.js":
/*!*******************************!*\
  !*** ./lib/armatura/utils.js ***!
  \*******************************/
/*! exports provided: nope, fnId, nextId, capitalize, humanize, VALUES, fnName, runInBrowser, boundFn, cleanUp, filterMapKey, expression, stringInterpolation, placeholder, withPipes, DOM_SETTERS, DOM_VALUE_COMPARATORS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nope\", function() { return nope; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fnId\", function() { return fnId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nextId\", function() { return nextId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"capitalize\", function() { return capitalize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"humanize\", function() { return humanize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VALUES\", function() { return VALUES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fnName\", function() { return fnName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"runInBrowser\", function() { return runInBrowser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"boundFn\", function() { return boundFn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cleanUp\", function() { return cleanUp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"filterMapKey\", function() { return filterMapKey; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"expression\", function() { return expression; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stringInterpolation\", function() { return stringInterpolation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"placeholder\", function() { return placeholder; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"withPipes\", function() { return withPipes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOM_SETTERS\", function() { return DOM_SETTERS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOM_VALUE_COMPARATORS\", function() { return DOM_VALUE_COMPARATORS; });\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.symbol */ \"./node_modules/core-js/modules/es6.symbol.js\");\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.regexp.replace */ \"./node_modules/core-js/modules/es6.regexp.replace.js\");\n/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.regexp.match */ \"./node_modules/core-js/modules/es6.regexp.match.js\");\n/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.regexp.to-string */ \"./node_modules/core-js/modules/es6.regexp.to-string.js\");\n/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ \"./node_modules/core-js/modules/es6.regexp.split.js\");\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nlet COUNTER = 1;\nconst nope = () => {};\nconst fnId = x => x;\nconst nextId = function nextId() {\n  let p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n  return p + COUNTER++;\n};\nconst capitalize = function capitalize(x) {\n  let pre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n\n  if (!x) {\n    return pre;\n  }\n\n  const s = \"\".concat(x);\n  return pre + s[0].toUpperCase() + s.slice(1);\n};\nconst humanize = key => ('' + key).split('_').map(s => capitalize(s)).join(' ');\nconst RE_SINGLE_PLACEHOLDER = /^\\{\\{([a-zA-Z0-9.:_$|]+)\\}\\}$/;\nconst RE_PLACEHOLDER = /\\{\\{([a-zA-Z0-9.:_$|]+)\\}\\}/g;\nconst VALUES = {\n  true: true,\n  false: false,\n  null: null\n}; // functional\n\nconst fnName = ctor => (/^function\\s+([\\w$]+)\\s*\\(/.exec(ctor.toString()) || [])[1] || nextId('$C');\nconst runInBrowser = (w => fn => w.requestAnimationFrame(() => fn.call(w, w.document)))(window); // Prop\n\nconst boundFn = ($, fn) => {\n  const map = $.$boundFnMap || ($.$boundFnMap = new Map());\n  let bound = map.get(fn);\n\n  if (!bound) {\n    bound = fn.bind($.impl);\n    map.set(fn, bound);\n  }\n\n  return bound;\n};\nconst cleanUp = c => ['parent', 'children', 'owner', 'impl', 'app', 'ctx'].forEach(k => {\n  delete c[k];\n});\nconst filterMapKey = (src, key) => {\n  const r = new Map();\n  src.forEach((v, k) => {\n    if (k !== key) {\n      r.set(k, v);\n    }\n  });\n  return r;\n}; // Compilation\n\nfunction expression(v) {\n  if (v[0] === ':') {\n    return placeholder(v);\n  }\n\n  if (!v.includes('{{')) {\n    const r = v in VALUES ? VALUES[v] : v;\n    return () => r;\n  }\n\n  if (v.match(RE_SINGLE_PLACEHOLDER)) {\n    return placeholder(v.slice(2, -2).trim());\n  }\n\n  return stringInterpolation(v);\n}\nfunction stringInterpolation(v) {\n  let fnx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n  const pattern = v.replace(RE_PLACEHOLDER, (s, expr) => {\n    fnx.push(placeholder(expr));\n    return '{{' + (fnx.length - 1) + '}}';\n  });\n  return c => pattern.replace(/\\{\\{(\\d+)\\}\\}/g, (s, idx) => {\n    const r = fnx[idx](c);\n    return !r && r !== 0 ? '' : r;\n  });\n}\nfunction placeholder(expr) {\n  return withPipes(expr, key => key[0] === ':' ? (k => c => c.string(k))(key.slice(1).trim()) : c => c.prop(key));\n}\nfunction withPipes(expr, fn) {\n  const pipes = expr.split('|').map(s => s.trim());\n  const key = pipes.shift();\n  const initial = fn(key);\n  return !pipes.length ? initial : c => pipes.reduce((r, pk) => c.reduce(r, pk), initial(c));\n} // DOM\n\nconst DOM_SETTERS = {\n  '#text': (e, v) => e.textContent = v == null ? '' : v,\n  disabled: (e, v) => e.disabled = v ? true : null,\n  class: (e, v) => {\n    if (v.includes(':')) {\n      v = ('' + v).split(' ').map(s => {\n        const [cl, expr] = s.split(':');\n        if (expr === undefined) return cl;\n        const [fl, eq] = expr.split('==');\n        const disabled = eq ? fl !== eq : ['', '0', 'false', null].indexOf(fl) > -1;\n        return disabled ? '' : cl;\n      }).join(' ');\n    }\n\n    e.className = v;\n  },\n  selected: (e, v) => e.selected = v ? true : null,\n  value: (e, v) => e.value = v == null ? '' : v,\n  checked: (e, v) => e.checked = !!v,\n  data: function data(e, v) {\n    if (e.$dataset) {\n      Object.keys(e.$dataset).forEach(k => {\n        if (!v || !(k in v)) {\n          delete e.dataset[k];\n        }\n      });\n    }\n\n    e.$dataset = v || {};\n\n    if (v) {\n      Object.keys(v).forEach(k => {\n        e.dataset[k] = v[k];\n      });\n    }\n  },\n  click: function click(e, v) {\n    this.setAttribute('click:click', !v ? null : ev => {\n      this.$attributes.click(_objectSpread({\n        value: e.value\n      }, e.$dataset), ev);\n      return false;\n    });\n  },\n  scroll: function scroll(e, v) {\n    this.setAttribute('scroll:scroll', !v ? null : ev => {\n      this.$attributes.scroll(_objectSpread({\n        value: e.value\n      }, e.$dataset), ev);\n      return false;\n    });\n  },\n  keypress: function keypress(e, v) {\n    this.setAttribute('keypress:keyup', !v ? null : ev => {\n      if (ev.keyCode !== 13 && ev.keyCode !== 27) {\n        this.$attributes.keypress(_objectSpread({\n          value: e.value\n        }, e.$dataset), ev);\n        setTimeout(() => e.focus(), 0);\n      }\n\n      return false;\n    });\n  },\n  enter: function enter(e, v) {\n    this.setAttribute('enter:keyup', !v ? null : ev => {\n      if (ev.keyCode === 13) {\n        this.$attributes.enter(_objectSpread({\n          value: e.value\n        }, e.$dataset), ev);\n      }\n\n      if (ev.keyCode === 13 || ev.keyCode === 27) {\n        e.blur();\n      }\n\n      return false;\n    });\n  },\n  toggle: function toggle(e, v) {\n    this.setAttribute('toggle:change', !v ? null : ev => {\n      this.$attributes.toggle(_objectSpread({\n        value: e.checked\n      }, e.$dataset), ev);\n      return false;\n    });\n  }\n};\nconst DOM_VALUE_COMPARATORS = {\n  value: (e, their, _) => e.value === their,\n  _: (_2, their, mine) => their === mine\n};\n\n//# sourceURL=./lib/armatura/utils.js");

/***/ }),

/***/ "./lib/armatura/xml.js":
/*!*****************************!*\
  !*** ./lib/armatura/xml.js ***!
  \*****************************/
/*! exports provided: parseXML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseXML\", function() { return parseXML; });\n/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.match */ \"./node_modules/core-js/modules/es6.regexp.match.js\");\n/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.regexp.replace */ \"./node_modules/core-js/modules/es6.regexp.replace.js\");\n/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ \"./node_modules/core-js/modules/es6.regexp.split.js\");\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n// ==========\n// XML Parse for templates. XML -> NodeTree\n// ----------\nconst RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g;\nconst RE_XML_COMMENT = /<!--((?!-->)[\\s\\S])*-->/g;\nconst RE_ATTRS = /([a-z][a-zA-Z0-9-:]+)=\"([^\"]*)\"/g;\nconst RE_ESCAPE_XML_ENTITY = /[\"'&<>]/g;\nconst RE_XML_TAG = /(<)(\\/?)([a-zA-Z][a-zA-Z0-9-:]*)((?:\\s+[a-z][a-zA-Z0-9-:]+=\"[^\"]*\")*)\\s*(\\/?)>/g;\nconst SINGLE_TAGS = 'img input br'.split(' ').reduce((r, e) => {\n  r[e] = 1;\n  return r;\n}, {});\nconst SUBST_XML_ENTITY = {\n  amp: '&',\n  gt: '>',\n  lt: '<',\n  quot: \"\\\"\",\n  nbsp: ' '\n};\nconst ESCAPE_XML_ENTITY = {\n  34: '&quot;',\n  38: '&amp;',\n  39: '&#39;',\n  60: '&lt;',\n  62: '&gt;'\n};\nconst RE_EMPTY = /^\\s*$/;\n\nconst FN_ESCAPE_XML_ENTITY = m => ESCAPE_XML_ENTITY[m.charCodeAt(0)];\n\nconst FN_XML_ENTITY = function FN_XML_ENTITY(_) {\n  const s = _.substring(1, _.length - 1);\n\n  return s[0] === '#' ? String.fromCharCode(+s.slice(1)) : SUBST_XML_ENTITY[s] || ' ';\n};\n\nconst decodeXmlEntities = function decodeXmlEntities() {\n  let s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n  return s.replace(RE_XML_ENTITY, FN_XML_ENTITY);\n};\n\nconst escapeXml = s => !s ? '' : ('' + s).replace(RE_ESCAPE_XML_ENTITY, FN_ESCAPE_XML_ENTITY);\n\nlet UID = 1;\n\nconst parseAttrs = s => {\n  const r = new Map();\n\n  if (!s) {\n    return r;\n  }\n\n  while (1) {\n    let e = RE_ATTRS.exec(s);\n\n    if (!e) {\n      return r;\n    }\n\n    r.set(e[1], decodeXmlEntities(e[2]));\n  }\n};\n\nconst stringifyAttrs = attrs => {\n  if (!attrs || !attrs.size) {\n    return '';\n  }\n\n  const r = [];\n  attrs.forEach((v, k) => {\n    if (v && k !== '#text') {\n      r.push(' ' + k + '=\"' + escapeXml(v) + '\"');\n    }\n  });\n  return r.join('');\n};\n\nclass Node {\n  constructor(tag) {\n    let attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();\n    this.uid = UID++;\n    this.tag = tag || '';\n    this.attrs = attrs;\n    this.nodes = [];\n  }\n\n  getChild(index) {\n    return this.nodes[index];\n  }\n\n  setText(text) {\n    this.attrs.set('#text', text);\n  }\n\n  addChild(tag, attrs) {\n    const e = new Node(tag, attrs);\n    this.nodes.push(e);\n    return e;\n  }\n\n  toString() {\n    return stringify(this, '');\n  }\n\n}\n\nfunction stringify(_ref, tab) {\n  let {\n    tag,\n    attrs,\n    nodes\n  } = _ref;\n  const sattrs = stringifyAttrs(attrs);\n  const ssubs = nodes.map(c => stringify(c, \"  \".concat(tab))).join('\\n');\n  const text = attrs.get('#text');\n  const stext = text ? \"  \".concat(tab).concat(escapeXml(text)) : '';\n  return \"\".concat(tab, \"<\").concat(tag).concat(sattrs) + (!ssubs && !stext ? '/>' : \">\\n\".concat(ssubs).concat(stext, \"\\n\").concat(tab, \"</\").concat(tag, \">\"));\n}\n\nconst parseXML = (_s, key) => {\n  const s = ('' + _s).trim().replace(RE_XML_COMMENT, '');\n\n  const ctx = [new Node()];\n  let lastIndex = 0; // head text omitted\n\n  while (1 > 0) {\n    let e = RE_XML_TAG.exec(s);\n\n    if (!e) {\n      break;\n    } // preceding text\n\n\n    const text = e.index && s.slice(lastIndex, e.index);\n\n    if (text && !text.match(RE_EMPTY)) {\n      ctx[0].addChild('#text').setText(text);\n    } // closing tag\n\n\n    if (e[2]) {\n      if (ctx[0].tag !== e[3]) {\n        throw new Error((key || '') + ' XML Parse closing tag does not match at: ' + e.index + ' near ' + e.input.slice(Math.max(e.index - 150, 0), e.index) + '^^^^' + e.input.slice(e.index, Math.min(e.index + 150, e.input.length)));\n      }\n\n      ctx.shift();\n    } else {\n      const elt = ctx[0].addChild(e[3], parseAttrs(e[4])); // not single tag\n\n      if (!(e[5] || e[3] in SINGLE_TAGS)) {\n        ctx.unshift(elt);\n\n        if (ctx.length === 1) {\n          throw new Error('Parse error at: ' + e[0]);\n        }\n      }\n    } // up past index\n\n\n    lastIndex = RE_XML_TAG.lastIndex;\n  } // tail text omitted\n\n\n  return ctx[0].getChild(0);\n};\n\n//# sourceURL=./lib/armatura/xml.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  if (typeof it != 'function') throw TypeError(it + ' is not a function!');\n  return it;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_a-function.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 22.1.3.31 Array.prototype[@@unscopables]\nvar UNSCOPABLES = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('unscopables');\nvar ArrayProto = Array.prototype;\nif (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\")(ArrayProto, UNSCOPABLES, {});\nmodule.exports = function (key) {\n  ArrayProto[UNSCOPABLES][key] = true;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_add-to-unscopables.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_advance-string-index.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_advance-string-index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar at = __webpack_require__(/*! ./_string-at */ \"./node_modules/core-js/modules/_string-at.js\")(true);\n\n // `AdvanceStringIndex` abstract operation\n// https://tc39.github.io/ecma262/#sec-advancestringindex\nmodule.exports = function (S, index, unicode) {\n  return index + (unicode ? at(S, index).length : 1);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_advance-string-index.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\nmodule.exports = function (it) {\n  if (!isObject(it)) throw TypeError(it + ' is not an object!');\n  return it;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_an-object.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// false -> Array#indexOf\n// true  -> Array#includes\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/modules/_to-length.js\");\nvar toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ \"./node_modules/core-js/modules/_to-absolute-index.js\");\nmodule.exports = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIObject($this);\n    var length = toLength(O.length);\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value;\n    // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare\n    if (IS_INCLUDES && el != el) while (length > index) {\n      value = O[index++];\n      // eslint-disable-next-line no-self-compare\n      if (value != value) return true;\n    // Array#indexOf ignores holes, Array#includes - not\n    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {\n      if (O[index] === el) return IS_INCLUDES || index || 0;\n    } return !IS_INCLUDES && -1;\n  };\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_array-includes.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// getting tag from 19.1.3.6 Object.prototype.toString()\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/modules/_cof.js\");\nvar TAG = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('toStringTag');\n// ES3 wrong here\nvar ARG = cof(function () { return arguments; }()) == 'Arguments';\n\n// fallback for IE11 Script Access Denied error\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (e) { /* empty */ }\n};\n\nmodule.exports = function (it) {\n  var O, T, B;\n  return it === undefined ? 'Undefined' : it === null ? 'Null'\n    // @@toStringTag case\n    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T\n    // builtinTag case\n    : ARG ? cof(O)\n    // ES3 arguments fallback\n    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_classof.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var toString = {}.toString;\n\nmodule.exports = function (it) {\n  return toString.call(it).slice(8, -1);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_cof.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var core = module.exports = { version: '2.6.9' };\nif (typeof __e == 'number') __e = core; // eslint-disable-line no-undef\n\n\n//# sourceURL=./node_modules/core-js/modules/_core.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// optional / simple context binding\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/modules/_a-function.js\");\nmodule.exports = function (fn, that, length) {\n  aFunction(fn);\n  if (that === undefined) return fn;\n  switch (length) {\n    case 1: return function (a) {\n      return fn.call(that, a);\n    };\n    case 2: return function (a, b) {\n      return fn.call(that, a, b);\n    };\n    case 3: return function (a, b, c) {\n      return fn.call(that, a, b, c);\n    };\n  }\n  return function (/* ...args */) {\n    return fn.apply(that, arguments);\n  };\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_ctx.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 7.2.1 RequireObjectCoercible(argument)\nmodule.exports = function (it) {\n  if (it == undefined) throw TypeError(\"Can't call method on  \" + it);\n  return it;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_defined.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Thank's IE8 for his funny defineProperty\nmodule.exports = !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\")(function () {\n  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n//# sourceURL=./node_modules/core-js/modules/_descriptors.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\nvar document = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\").document;\n// typeof document.createElement is 'object' in old IE\nvar is = isObject(document) && isObject(document.createElement);\nmodule.exports = function (it) {\n  return is ? document.createElement(it) : {};\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_dom-create.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// IE 8- don't enum bug keys\nmodule.exports = (\n  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'\n).split(',');\n\n\n//# sourceURL=./node_modules/core-js/modules/_enum-bug-keys.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_enum-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// all enumerable object keys, includes symbols\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/modules/_object-keys.js\");\nvar gOPS = __webpack_require__(/*! ./_object-gops */ \"./node_modules/core-js/modules/_object-gops.js\");\nvar pIE = __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/modules/_object-pie.js\");\nmodule.exports = function (it) {\n  var result = getKeys(it);\n  var getSymbols = gOPS.f;\n  if (getSymbols) {\n    var symbols = getSymbols(it);\n    var isEnum = pIE.f;\n    var i = 0;\n    var key;\n    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);\n  } return result;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_enum-keys.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/modules/_core.js\");\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\");\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\");\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/modules/_ctx.js\");\nvar PROTOTYPE = 'prototype';\n\nvar $export = function (type, name, source) {\n  var IS_FORCED = type & $export.F;\n  var IS_GLOBAL = type & $export.G;\n  var IS_STATIC = type & $export.S;\n  var IS_PROTO = type & $export.P;\n  var IS_BIND = type & $export.B;\n  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];\n  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});\n  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});\n  var key, own, out, exp;\n  if (IS_GLOBAL) source = name;\n  for (key in source) {\n    // contains in native\n    own = !IS_FORCED && target && target[key] !== undefined;\n    // export native or passed\n    out = (own ? target : source)[key];\n    // bind timers to global for call from export context\n    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;\n    // extend global\n    if (target) redefine(target, key, out, type & $export.U);\n    // export\n    if (exports[key] != out) hide(exports, key, exp);\n    if (IS_PROTO && expProto[key] != out) expProto[key] = out;\n  }\n};\nglobal.core = core;\n// type bitmap\n$export.F = 1;   // forced\n$export.G = 2;   // global\n$export.S = 4;   // static\n$export.P = 8;   // proto\n$export.B = 16;  // bind\n$export.W = 32;  // wrap\n$export.U = 64;  // safe\n$export.R = 128; // real proto method for `library`\nmodule.exports = $export;\n\n\n//# sourceURL=./node_modules/core-js/modules/_export.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (e) {\n    return true;\n  }\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_fails.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_fix-re-wks.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n__webpack_require__(/*! ./es6.regexp.exec */ \"./node_modules/core-js/modules/es6.regexp.exec.js\");\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\");\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\");\nvar fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\");\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\");\nvar wks = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\");\nvar regexpExec = __webpack_require__(/*! ./_regexp-exec */ \"./node_modules/core-js/modules/_regexp-exec.js\");\n\nvar SPECIES = wks('species');\n\nvar REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {\n  // #replace needs built-in support for named groups.\n  // #match works fine because it just return the exec results, even if it has\n  // a \"grops\" property.\n  var re = /./;\n  re.exec = function () {\n    var result = [];\n    result.groups = { a: '7' };\n    return result;\n  };\n  return ''.replace(re, '$<a>') !== '7';\n});\n\nvar SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {\n  // Chrome 51 has a buggy \"split\" implementation when RegExp#exec !== nativeExec\n  var re = /(?:)/;\n  var originalExec = re.exec;\n  re.exec = function () { return originalExec.apply(this, arguments); };\n  var result = 'ab'.split(re);\n  return result.length === 2 && result[0] === 'a' && result[1] === 'b';\n})();\n\nmodule.exports = function (KEY, length, exec) {\n  var SYMBOL = wks(KEY);\n\n  var DELEGATES_TO_SYMBOL = !fails(function () {\n    // String methods call symbol-named RegEp methods\n    var O = {};\n    O[SYMBOL] = function () { return 7; };\n    return ''[KEY](O) != 7;\n  });\n\n  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {\n    // Symbol-named RegExp methods call .exec\n    var execCalled = false;\n    var re = /a/;\n    re.exec = function () { execCalled = true; return null; };\n    if (KEY === 'split') {\n      // RegExp[@@split] doesn't call the regex's exec method, but first creates\n      // a new one. We need to return the patched regex when creating the new one.\n      re.constructor = {};\n      re.constructor[SPECIES] = function () { return re; };\n    }\n    re[SYMBOL]('');\n    return !execCalled;\n  }) : undefined;\n\n  if (\n    !DELEGATES_TO_SYMBOL ||\n    !DELEGATES_TO_EXEC ||\n    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||\n    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)\n  ) {\n    var nativeRegExpMethod = /./[SYMBOL];\n    var fns = exec(\n      defined,\n      SYMBOL,\n      ''[KEY],\n      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {\n        if (regexp.exec === regexpExec) {\n          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {\n            // The native String method already delegates to @@method (this\n            // polyfilled function), leasing to infinite recursion.\n            // We avoid it by directly calling the native @@method method.\n            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };\n          }\n          return { done: true, value: nativeMethod.call(str, regexp, arg2) };\n        }\n        return { done: false };\n      }\n    );\n    var strfn = fns[0];\n    var rxfn = fns[1];\n\n    redefine(String.prototype, KEY, strfn);\n    hide(RegExp.prototype, SYMBOL, length == 2\n      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)\n      // 21.2.5.11 RegExp.prototype[@@split](string, limit)\n      ? function (string, arg) { return rxfn.call(string, this, arg); }\n      // 21.2.5.6 RegExp.prototype[@@match](string)\n      // 21.2.5.9 RegExp.prototype[@@search](string)\n      : function (string) { return rxfn.call(string, this); }\n    );\n  }\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_fix-re-wks.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_flags.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// 21.2.5.3 get RegExp.prototype.flags\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\nmodule.exports = function () {\n  var that = anObject(this);\n  var result = '';\n  if (that.global) result += 'g';\n  if (that.ignoreCase) result += 'i';\n  if (that.multiline) result += 'm';\n  if (that.unicode) result += 'u';\n  if (that.sticky) result += 'y';\n  return result;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_flags.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_function-to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/modules/_shared.js\")('native-function-to-string', Function.toString);\n\n\n//# sourceURL=./node_modules/core-js/modules/_function-to-string.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nvar global = module.exports = typeof window != 'undefined' && window.Math == Math\n  ? window : typeof self != 'undefined' && self.Math == Math ? self\n  // eslint-disable-next-line no-new-func\n  : Function('return this')();\nif (typeof __g == 'number') __g = global; // eslint-disable-line no-undef\n\n\n//# sourceURL=./node_modules/core-js/modules/_global.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var hasOwnProperty = {}.hasOwnProperty;\nmodule.exports = function (it, key) {\n  return hasOwnProperty.call(it, key);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_has.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\");\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/modules/_property-desc.js\");\nmodule.exports = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") ? function (object, key, value) {\n  return dP.f(object, key, createDesc(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_hide.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var document = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\").document;\nmodule.exports = document && document.documentElement;\n\n\n//# sourceURL=./node_modules/core-js/modules/_html.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = !__webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") && !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\")(function () {\n  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ \"./node_modules/core-js/modules/_dom-create.js\")('div'), 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n//# sourceURL=./node_modules/core-js/modules/_ie8-dom-define.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for non-array-like ES3 and non-enumerable old V8 strings\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/modules/_cof.js\");\n// eslint-disable-next-line no-prototype-builtins\nmodule.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {\n  return cof(it) == 'String' ? it.split('') : Object(it);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_iobject.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.2.2 IsArray(argument)\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/modules/_cof.js\");\nmodule.exports = Array.isArray || function isArray(arg) {\n  return cof(arg) == 'Array';\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_is-array.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  return typeof it === 'object' ? it !== null : typeof it === 'function';\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_is-object.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.2.8 IsRegExp(argument)\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/modules/_cof.js\");\nvar MATCH = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('match');\nmodule.exports = function (it) {\n  var isRegExp;\n  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_is-regexp.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar create = __webpack_require__(/*! ./_object-create */ \"./node_modules/core-js/modules/_object-create.js\");\nvar descriptor = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/modules/_property-desc.js\");\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/modules/_set-to-string-tag.js\");\nvar IteratorPrototype = {};\n\n// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()\n__webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\")(IteratorPrototype, __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('iterator'), function () { return this; });\n\nmodule.exports = function (Constructor, NAME, next) {\n  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });\n  setToStringTag(Constructor, NAME + ' Iterator');\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_iter-create.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar LIBRARY = __webpack_require__(/*! ./_library */ \"./node_modules/core-js/modules/_library.js\");\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\");\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\");\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/modules/_iterators.js\");\nvar $iterCreate = __webpack_require__(/*! ./_iter-create */ \"./node_modules/core-js/modules/_iter-create.js\");\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/modules/_set-to-string-tag.js\");\nvar getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ \"./node_modules/core-js/modules/_object-gpo.js\");\nvar ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('iterator');\nvar BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`\nvar FF_ITERATOR = '@@iterator';\nvar KEYS = 'keys';\nvar VALUES = 'values';\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {\n  $iterCreate(Constructor, NAME, next);\n  var getMethod = function (kind) {\n    if (!BUGGY && kind in proto) return proto[kind];\n    switch (kind) {\n      case KEYS: return function keys() { return new Constructor(this, kind); };\n      case VALUES: return function values() { return new Constructor(this, kind); };\n    } return function entries() { return new Constructor(this, kind); };\n  };\n  var TAG = NAME + ' Iterator';\n  var DEF_VALUES = DEFAULT == VALUES;\n  var VALUES_BUG = false;\n  var proto = Base.prototype;\n  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];\n  var $default = $native || getMethod(DEFAULT);\n  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;\n  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;\n  var methods, key, IteratorPrototype;\n  // Fix native\n  if ($anyNative) {\n    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));\n    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {\n      // Set @@toStringTag to native iterators\n      setToStringTag(IteratorPrototype, TAG, true);\n      // fix for some old engines\n      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);\n    }\n  }\n  // fix Array#{values, @@iterator}.name in V8 / FF\n  if (DEF_VALUES && $native && $native.name !== VALUES) {\n    VALUES_BUG = true;\n    $default = function values() { return $native.call(this); };\n  }\n  // Define iterator\n  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {\n    hide(proto, ITERATOR, $default);\n  }\n  // Plug for library\n  Iterators[NAME] = $default;\n  Iterators[TAG] = returnThis;\n  if (DEFAULT) {\n    methods = {\n      values: DEF_VALUES ? $default : getMethod(VALUES),\n      keys: IS_SET ? $default : getMethod(KEYS),\n      entries: $entries\n    };\n    if (FORCED) for (key in methods) {\n      if (!(key in proto)) redefine(proto, key, methods[key]);\n    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);\n  }\n  return methods;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_iter-define.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (done, value) {\n  return { value: value, done: !!done };\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_iter-step.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {};\n\n\n//# sourceURL=./node_modules/core-js/modules/_iterators.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = false;\n\n\n//# sourceURL=./node_modules/core-js/modules/_library.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var META = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/modules/_uid.js\")('meta');\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\nvar setDesc = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\").f;\nvar id = 0;\nvar isExtensible = Object.isExtensible || function () {\n  return true;\n};\nvar FREEZE = !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\")(function () {\n  return isExtensible(Object.preventExtensions({}));\n});\nvar setMeta = function (it) {\n  setDesc(it, META, { value: {\n    i: 'O' + ++id, // object ID\n    w: {}          // weak collections IDs\n  } });\n};\nvar fastKey = function (it, create) {\n  // return primitive with prefix\n  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;\n  if (!has(it, META)) {\n    // can't set metadata to uncaught frozen object\n    if (!isExtensible(it)) return 'F';\n    // not necessary to add metadata\n    if (!create) return 'E';\n    // add missing metadata\n    setMeta(it);\n  // return object ID\n  } return it[META].i;\n};\nvar getWeak = function (it, create) {\n  if (!has(it, META)) {\n    // can't set metadata to uncaught frozen object\n    if (!isExtensible(it)) return true;\n    // not necessary to add metadata\n    if (!create) return false;\n    // add missing metadata\n    setMeta(it);\n  // return hash weak collections IDs\n  } return it[META].w;\n};\n// add metadata on freeze-family methods calling\nvar onFreeze = function (it) {\n  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);\n  return it;\n};\nvar meta = module.exports = {\n  KEY: META,\n  NEED: false,\n  fastKey: fastKey,\n  getWeak: getWeak,\n  onFreeze: onFreeze\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_meta.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\nvar dPs = __webpack_require__(/*! ./_object-dps */ \"./node_modules/core-js/modules/_object-dps.js\");\nvar enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/modules/_enum-bug-keys.js\");\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/modules/_shared-key.js\")('IE_PROTO');\nvar Empty = function () { /* empty */ };\nvar PROTOTYPE = 'prototype';\n\n// Create object with fake `null` prototype: use iframe Object with cleared prototype\nvar createDict = function () {\n  // Thrash, waste and sodomy: IE GC bug\n  var iframe = __webpack_require__(/*! ./_dom-create */ \"./node_modules/core-js/modules/_dom-create.js\")('iframe');\n  var i = enumBugKeys.length;\n  var lt = '<';\n  var gt = '>';\n  var iframeDocument;\n  iframe.style.display = 'none';\n  __webpack_require__(/*! ./_html */ \"./node_modules/core-js/modules/_html.js\").appendChild(iframe);\n  iframe.src = 'javascript:'; // eslint-disable-line no-script-url\n  // createDict = iframe.contentWindow.Object;\n  // html.removeChild(iframe);\n  iframeDocument = iframe.contentWindow.document;\n  iframeDocument.open();\n  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);\n  iframeDocument.close();\n  createDict = iframeDocument.F;\n  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];\n  return createDict();\n};\n\nmodule.exports = Object.create || function create(O, Properties) {\n  var result;\n  if (O !== null) {\n    Empty[PROTOTYPE] = anObject(O);\n    result = new Empty();\n    Empty[PROTOTYPE] = null;\n    // add \"__proto__\" for Object.getPrototypeOf polyfill\n    result[IE_PROTO] = O;\n  } else result = createDict();\n  return Properties === undefined ? result : dPs(result, Properties);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-create.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ \"./node_modules/core-js/modules/_ie8-dom-define.js\");\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/modules/_to-primitive.js\");\nvar dP = Object.defineProperty;\n\nexports.f = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") ? Object.defineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPrimitive(P, true);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return dP(O, P, Attributes);\n  } catch (e) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-dp.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\");\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/modules/_object-keys.js\");\n\nmodule.exports = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") ? Object.defineProperties : function defineProperties(O, Properties) {\n  anObject(O);\n  var keys = getKeys(Properties);\n  var length = keys.length;\n  var i = 0;\n  var P;\n  while (length > i) dP.f(O, P = keys[i++], Properties[P]);\n  return O;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-dps.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pIE = __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/modules/_object-pie.js\");\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/modules/_property-desc.js\");\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/modules/_to-primitive.js\");\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ \"./node_modules/core-js/modules/_ie8-dom-define.js\");\nvar gOPD = Object.getOwnPropertyDescriptor;\n\nexports.f = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") ? gOPD : function getOwnPropertyDescriptor(O, P) {\n  O = toIObject(O);\n  P = toPrimitive(P, true);\n  if (IE8_DOM_DEFINE) try {\n    return gOPD(O, P);\n  } catch (e) { /* empty */ }\n  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-gopd.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\nvar gOPN = __webpack_require__(/*! ./_object-gopn */ \"./node_modules/core-js/modules/_object-gopn.js\").f;\nvar toString = {}.toString;\n\nvar windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames\n  ? Object.getOwnPropertyNames(window) : [];\n\nvar getWindowNames = function (it) {\n  try {\n    return gOPN(it);\n  } catch (e) {\n    return windowNames.slice();\n  }\n};\n\nmodule.exports.f = function getOwnPropertyNames(it) {\n  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-gopn-ext.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)\nvar $keys = __webpack_require__(/*! ./_object-keys-internal */ \"./node_modules/core-js/modules/_object-keys-internal.js\");\nvar hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/modules/_enum-bug-keys.js\").concat('length', 'prototype');\n\nexports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {\n  return $keys(O, hiddenKeys);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-gopn.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = Object.getOwnPropertySymbols;\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-gops.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/modules/_to-object.js\");\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/modules/_shared-key.js\")('IE_PROTO');\nvar ObjectProto = Object.prototype;\n\nmodule.exports = Object.getPrototypeOf || function (O) {\n  O = toObject(O);\n  if (has(O, IE_PROTO)) return O[IE_PROTO];\n  if (typeof O.constructor == 'function' && O instanceof O.constructor) {\n    return O.constructor.prototype;\n  } return O instanceof Object ? ObjectProto : null;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-gpo.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\nvar arrayIndexOf = __webpack_require__(/*! ./_array-includes */ \"./node_modules/core-js/modules/_array-includes.js\")(false);\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/modules/_shared-key.js\")('IE_PROTO');\n\nmodule.exports = function (object, names) {\n  var O = toIObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);\n  // Don't enum bug & hidden keys\n  while (names.length > i) if (has(O, key = names[i++])) {\n    ~arrayIndexOf(result, key) || result.push(key);\n  }\n  return result;\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-keys-internal.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.14 / 15.2.3.14 Object.keys(O)\nvar $keys = __webpack_require__(/*! ./_object-keys-internal */ \"./node_modules/core-js/modules/_object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/modules/_enum-bug-keys.js\");\n\nmodule.exports = Object.keys || function keys(O) {\n  return $keys(O, enumBugKeys);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-keys.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = {}.propertyIsEnumerable;\n\n\n//# sourceURL=./node_modules/core-js/modules/_object-pie.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_property-desc.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\");\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\nvar SRC = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/modules/_uid.js\")('src');\nvar $toString = __webpack_require__(/*! ./_function-to-string */ \"./node_modules/core-js/modules/_function-to-string.js\");\nvar TO_STRING = 'toString';\nvar TPL = ('' + $toString).split(TO_STRING);\n\n__webpack_require__(/*! ./_core */ \"./node_modules/core-js/modules/_core.js\").inspectSource = function (it) {\n  return $toString.call(it);\n};\n\n(module.exports = function (O, key, val, safe) {\n  var isFunction = typeof val == 'function';\n  if (isFunction) has(val, 'name') || hide(val, 'name', key);\n  if (O[key] === val) return;\n  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));\n  if (O === global) {\n    O[key] = val;\n  } else if (!safe) {\n    delete O[key];\n    hide(O, key, val);\n  } else if (O[key]) {\n    O[key] = val;\n  } else {\n    hide(O, key, val);\n  }\n// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative\n})(Function.prototype, TO_STRING, function toString() {\n  return typeof this == 'function' && this[SRC] || $toString.call(this);\n});\n\n\n//# sourceURL=./node_modules/core-js/modules/_redefine.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_regexp-exec-abstract.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_regexp-exec-abstract.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar classof = __webpack_require__(/*! ./_classof */ \"./node_modules/core-js/modules/_classof.js\");\nvar builtinExec = RegExp.prototype.exec;\n\n // `RegExpExec` abstract operation\n// https://tc39.github.io/ecma262/#sec-regexpexec\nmodule.exports = function (R, S) {\n  var exec = R.exec;\n  if (typeof exec === 'function') {\n    var result = exec.call(R, S);\n    if (typeof result !== 'object') {\n      throw new TypeError('RegExp exec method returned something other than an Object or null');\n    }\n    return result;\n  }\n  if (classof(R) !== 'RegExp') {\n    throw new TypeError('RegExp#exec called on incompatible receiver');\n  }\n  return builtinExec.call(R, S);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_regexp-exec-abstract.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_regexp-exec.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_regexp-exec.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar regexpFlags = __webpack_require__(/*! ./_flags */ \"./node_modules/core-js/modules/_flags.js\");\n\nvar nativeExec = RegExp.prototype.exec;\n// This always refers to the native implementation, because the\n// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,\n// which loads this file before patching the method.\nvar nativeReplace = String.prototype.replace;\n\nvar patchedExec = nativeExec;\n\nvar LAST_INDEX = 'lastIndex';\n\nvar UPDATES_LAST_INDEX_WRONG = (function () {\n  var re1 = /a/,\n      re2 = /b*/g;\n  nativeExec.call(re1, 'a');\n  nativeExec.call(re2, 'a');\n  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;\n})();\n\n// nonparticipating capturing group, copied from es5-shim's String#split patch.\nvar NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;\n\nvar PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;\n\nif (PATCH) {\n  patchedExec = function exec(str) {\n    var re = this;\n    var lastIndex, reCopy, match, i;\n\n    if (NPCG_INCLUDED) {\n      reCopy = new RegExp('^' + re.source + '$(?!\\\\s)', regexpFlags.call(re));\n    }\n    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];\n\n    match = nativeExec.call(re, str);\n\n    if (UPDATES_LAST_INDEX_WRONG && match) {\n      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;\n    }\n    if (NPCG_INCLUDED && match && match.length > 1) {\n      // Fix browsers whose `exec` methods don't consistently return `undefined`\n      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/\n      // eslint-disable-next-line no-loop-func\n      nativeReplace.call(match[0], reCopy, function () {\n        for (i = 1; i < arguments.length - 2; i++) {\n          if (arguments[i] === undefined) match[i] = undefined;\n        }\n      });\n    }\n\n    return match;\n  };\n}\n\nmodule.exports = patchedExec;\n\n\n//# sourceURL=./node_modules/core-js/modules/_regexp-exec.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var def = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\").f;\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\nvar TAG = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('toStringTag');\n\nmodule.exports = function (it, tag, stat) {\n  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_set-to-string-tag.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var shared = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/modules/_shared.js\")('keys');\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/modules/_uid.js\");\nmodule.exports = function (key) {\n  return shared[key] || (shared[key] = uid(key));\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_shared-key.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/modules/_core.js\");\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\nvar SHARED = '__core-js_shared__';\nvar store = global[SHARED] || (global[SHARED] = {});\n\n(module.exports = function (key, value) {\n  return store[key] || (store[key] = value !== undefined ? value : {});\n})('versions', []).push({\n  version: core.version,\n  mode: __webpack_require__(/*! ./_library */ \"./node_modules/core-js/modules/_library.js\") ? 'pure' : 'global',\n  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'\n});\n\n\n//# sourceURL=./node_modules/core-js/modules/_shared.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_species-constructor.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.3.20 SpeciesConstructor(O, defaultConstructor)\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/modules/_a-function.js\");\nvar SPECIES = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('species');\nmodule.exports = function (O, D) {\n  var C = anObject(O).constructor;\n  var S;\n  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_species-constructor.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_string-at.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/modules/_to-integer.js\");\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\");\n// true  -> String#at\n// false -> String#codePointAt\nmodule.exports = function (TO_STRING) {\n  return function (that, pos) {\n    var s = String(defined(that));\n    var i = toInteger(pos);\n    var l = s.length;\n    var a, b;\n    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;\n    a = s.charCodeAt(i);\n    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff\n      ? TO_STRING ? s.charAt(i) : a\n      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;\n  };\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_string-at.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/modules/_to-integer.js\");\nvar max = Math.max;\nvar min = Math.min;\nmodule.exports = function (index, length) {\n  index = toInteger(index);\n  return index < 0 ? max(index + length, 0) : min(index, length);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_to-absolute-index.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 7.1.4 ToInteger\nvar ceil = Math.ceil;\nvar floor = Math.floor;\nmodule.exports = function (it) {\n  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_to-integer.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// to indexed object, toObject with fallback for non-array-like ES3 strings\nvar IObject = __webpack_require__(/*! ./_iobject */ \"./node_modules/core-js/modules/_iobject.js\");\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\");\nmodule.exports = function (it) {\n  return IObject(defined(it));\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_to-iobject.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.15 ToLength\nvar toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/modules/_to-integer.js\");\nvar min = Math.min;\nmodule.exports = function (it) {\n  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_to-length.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.13 ToObject(argument)\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\");\nmodule.exports = function (it) {\n  return Object(defined(it));\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_to-object.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.1 ToPrimitive(input [, PreferredType])\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\n// instead of the ES6 spec version, we didn't implement @@toPrimitive case\n// and the second argument - flag - preferred type is a string\nmodule.exports = function (it, S) {\n  if (!isObject(it)) return it;\n  var fn, val;\n  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  throw TypeError(\"Can't convert object to primitive value\");\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_to-primitive.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var id = 0;\nvar px = Math.random();\nmodule.exports = function (key) {\n  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_uid.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_wks-define.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/modules/_core.js\");\nvar LIBRARY = __webpack_require__(/*! ./_library */ \"./node_modules/core-js/modules/_library.js\");\nvar wksExt = __webpack_require__(/*! ./_wks-ext */ \"./node_modules/core-js/modules/_wks-ext.js\");\nvar defineProperty = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\").f;\nmodule.exports = function (name) {\n  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});\n  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });\n};\n\n\n//# sourceURL=./node_modules/core-js/modules/_wks-define.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_wks-ext.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports.f = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\");\n\n\n//# sourceURL=./node_modules/core-js/modules/_wks-ext.js");

/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var store = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/modules/_shared.js\")('wks');\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/modules/_uid.js\");\nvar Symbol = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\").Symbol;\nvar USE_SYMBOL = typeof Symbol == 'function';\n\nvar $exports = module.exports = function (name) {\n  return store[name] || (store[name] =\n    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));\n};\n\n$exports.store = store;\n\n\n//# sourceURL=./node_modules/core-js/modules/_wks.js");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ \"./node_modules/core-js/modules/_add-to-unscopables.js\");\nvar step = __webpack_require__(/*! ./_iter-step */ \"./node_modules/core-js/modules/_iter-step.js\");\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/modules/_iterators.js\");\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\n\n// 22.1.3.4 Array.prototype.entries()\n// 22.1.3.13 Array.prototype.keys()\n// 22.1.3.29 Array.prototype.values()\n// 22.1.3.30 Array.prototype[@@iterator]()\nmodule.exports = __webpack_require__(/*! ./_iter-define */ \"./node_modules/core-js/modules/_iter-define.js\")(Array, 'Array', function (iterated, kind) {\n  this._t = toIObject(iterated); // target\n  this._i = 0;                   // next index\n  this._k = kind;                // kind\n// 22.1.5.2.1 %ArrayIteratorPrototype%.next()\n}, function () {\n  var O = this._t;\n  var kind = this._k;\n  var index = this._i++;\n  if (!O || index >= O.length) {\n    this._t = undefined;\n    return step(1);\n  }\n  if (kind == 'keys') return step(0, index);\n  if (kind == 'values') return step(0, O[index]);\n  return step(0, [index, O[index]]);\n}, 'values');\n\n// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)\nIterators.Arguments = Iterators.Array;\n\naddToUnscopables('keys');\naddToUnscopables('values');\naddToUnscopables('entries');\n\n\n//# sourceURL=./node_modules/core-js/modules/es6.array.iterator.js");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.exec.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.exec.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar regexpExec = __webpack_require__(/*! ./_regexp-exec */ \"./node_modules/core-js/modules/_regexp-exec.js\");\n__webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\")({\n  target: 'RegExp',\n  proto: true,\n  forced: regexpExec !== /./.exec\n}, {\n  exec: regexpExec\n});\n\n\n//# sourceURL=./node_modules/core-js/modules/es6.regexp.exec.js");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.flags.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 21.2.5.3 get RegExp.prototype.flags()\nif (__webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\").f(RegExp.prototype, 'flags', {\n  configurable: true,\n  get: __webpack_require__(/*! ./_flags */ \"./node_modules/core-js/modules/_flags.js\")\n});\n\n\n//# sourceURL=./node_modules/core-js/modules/es6.regexp.flags.js");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.match.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/modules/_to-length.js\");\nvar advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ \"./node_modules/core-js/modules/_advance-string-index.js\");\nvar regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ \"./node_modules/core-js/modules/_regexp-exec-abstract.js\");\n\n// @@match logic\n__webpack_require__(/*! ./_fix-re-wks */ \"./node_modules/core-js/modules/_fix-re-wks.js\")('match', 1, function (defined, MATCH, $match, maybeCallNative) {\n  return [\n    // `String.prototype.match` method\n    // https://tc39.github.io/ecma262/#sec-string.prototype.match\n    function match(regexp) {\n      var O = defined(this);\n      var fn = regexp == undefined ? undefined : regexp[MATCH];\n      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));\n    },\n    // `RegExp.prototype[@@match]` method\n    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match\n    function (regexp) {\n      var res = maybeCallNative($match, regexp, this);\n      if (res.done) return res.value;\n      var rx = anObject(regexp);\n      var S = String(this);\n      if (!rx.global) return regExpExec(rx, S);\n      var fullUnicode = rx.unicode;\n      rx.lastIndex = 0;\n      var A = [];\n      var n = 0;\n      var result;\n      while ((result = regExpExec(rx, S)) !== null) {\n        var matchStr = String(result[0]);\n        A[n] = matchStr;\n        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);\n        n++;\n      }\n      return n === 0 ? null : A;\n    }\n  ];\n});\n\n\n//# sourceURL=./node_modules/core-js/modules/es6.regexp.match.js");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.replace.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/modules/_to-object.js\");\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/modules/_to-length.js\");\nvar toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/modules/_to-integer.js\");\nvar advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ \"./node_modules/core-js/modules/_advance-string-index.js\");\nvar regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ \"./node_modules/core-js/modules/_regexp-exec-abstract.js\");\nvar max = Math.max;\nvar min = Math.min;\nvar floor = Math.floor;\nvar SUBSTITUTION_SYMBOLS = /\\$([$&`']|\\d\\d?|<[^>]*>)/g;\nvar SUBSTITUTION_SYMBOLS_NO_NAMED = /\\$([$&`']|\\d\\d?)/g;\n\nvar maybeToString = function (it) {\n  return it === undefined ? it : String(it);\n};\n\n// @@replace logic\n__webpack_require__(/*! ./_fix-re-wks */ \"./node_modules/core-js/modules/_fix-re-wks.js\")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {\n  return [\n    // `String.prototype.replace` method\n    // https://tc39.github.io/ecma262/#sec-string.prototype.replace\n    function replace(searchValue, replaceValue) {\n      var O = defined(this);\n      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];\n      return fn !== undefined\n        ? fn.call(searchValue, O, replaceValue)\n        : $replace.call(String(O), searchValue, replaceValue);\n    },\n    // `RegExp.prototype[@@replace]` method\n    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace\n    function (regexp, replaceValue) {\n      var res = maybeCallNative($replace, regexp, this, replaceValue);\n      if (res.done) return res.value;\n\n      var rx = anObject(regexp);\n      var S = String(this);\n      var functionalReplace = typeof replaceValue === 'function';\n      if (!functionalReplace) replaceValue = String(replaceValue);\n      var global = rx.global;\n      if (global) {\n        var fullUnicode = rx.unicode;\n        rx.lastIndex = 0;\n      }\n      var results = [];\n      while (true) {\n        var result = regExpExec(rx, S);\n        if (result === null) break;\n        results.push(result);\n        if (!global) break;\n        var matchStr = String(result[0]);\n        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);\n      }\n      var accumulatedResult = '';\n      var nextSourcePosition = 0;\n      for (var i = 0; i < results.length; i++) {\n        result = results[i];\n        var matched = String(result[0]);\n        var position = max(min(toInteger(result.index), S.length), 0);\n        var captures = [];\n        // NOTE: This is equivalent to\n        //   captures = result.slice(1).map(maybeToString)\n        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in\n        // the slice polyfill when slicing native arrays) \"doesn't work\" in safari 9 and\n        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.\n        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));\n        var namedCaptures = result.groups;\n        if (functionalReplace) {\n          var replacerArgs = [matched].concat(captures, position, S);\n          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);\n          var replacement = String(replaceValue.apply(undefined, replacerArgs));\n        } else {\n          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);\n        }\n        if (position >= nextSourcePosition) {\n          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;\n          nextSourcePosition = position + matched.length;\n        }\n      }\n      return accumulatedResult + S.slice(nextSourcePosition);\n    }\n  ];\n\n    // https://tc39.github.io/ecma262/#sec-getsubstitution\n  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {\n    var tailPos = position + matched.length;\n    var m = captures.length;\n    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;\n    if (namedCaptures !== undefined) {\n      namedCaptures = toObject(namedCaptures);\n      symbols = SUBSTITUTION_SYMBOLS;\n    }\n    return $replace.call(replacement, symbols, function (match, ch) {\n      var capture;\n      switch (ch.charAt(0)) {\n        case '$': return '$';\n        case '&': return matched;\n        case '`': return str.slice(0, position);\n        case \"'\": return str.slice(tailPos);\n        case '<':\n          capture = namedCaptures[ch.slice(1, -1)];\n          break;\n        default: // \\d\\d?\n          var n = +ch;\n          if (n === 0) return match;\n          if (n > m) {\n            var f = floor(n / 10);\n            if (f === 0) return match;\n            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);\n            return match;\n          }\n          capture = captures[n - 1];\n      }\n      return capture === undefined ? '' : capture;\n    });\n  }\n});\n\n\n//# sourceURL=./node_modules/core-js/modules/es6.regexp.replace.js");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.split.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isRegExp = __webpack_require__(/*! ./_is-regexp */ \"./node_modules/core-js/modules/_is-regexp.js\");\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\nvar speciesConstructor = __webpack_require__(/*! ./_species-constructor */ \"./node_modules/core-js/modules/_species-constructor.js\");\nvar advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ \"./node_modules/core-js/modules/_advance-string-index.js\");\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/modules/_to-length.js\");\nvar callRegExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ \"./node_modules/core-js/modules/_regexp-exec-abstract.js\");\nvar regexpExec = __webpack_require__(/*! ./_regexp-exec */ \"./node_modules/core-js/modules/_regexp-exec.js\");\nvar fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\");\nvar $min = Math.min;\nvar $push = [].push;\nvar $SPLIT = 'split';\nvar LENGTH = 'length';\nvar LAST_INDEX = 'lastIndex';\nvar MAX_UINT32 = 0xffffffff;\n\n// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError\nvar SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });\n\n// @@split logic\n__webpack_require__(/*! ./_fix-re-wks */ \"./node_modules/core-js/modules/_fix-re-wks.js\")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {\n  var internalSplit;\n  if (\n    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||\n    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||\n    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||\n    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||\n    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||\n    ''[$SPLIT](/.?/)[LENGTH]\n  ) {\n    // based on es5-shim implementation, need to rework it\n    internalSplit = function (separator, limit) {\n      var string = String(this);\n      if (separator === undefined && limit === 0) return [];\n      // If `separator` is not a regex, use native split\n      if (!isRegExp(separator)) return $split.call(string, separator, limit);\n      var output = [];\n      var flags = (separator.ignoreCase ? 'i' : '') +\n                  (separator.multiline ? 'm' : '') +\n                  (separator.unicode ? 'u' : '') +\n                  (separator.sticky ? 'y' : '');\n      var lastLastIndex = 0;\n      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;\n      // Make `global` and avoid `lastIndex` issues by working with a copy\n      var separatorCopy = new RegExp(separator.source, flags + 'g');\n      var match, lastIndex, lastLength;\n      while (match = regexpExec.call(separatorCopy, string)) {\n        lastIndex = separatorCopy[LAST_INDEX];\n        if (lastIndex > lastLastIndex) {\n          output.push(string.slice(lastLastIndex, match.index));\n          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));\n          lastLength = match[0][LENGTH];\n          lastLastIndex = lastIndex;\n          if (output[LENGTH] >= splitLimit) break;\n        }\n        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop\n      }\n      if (lastLastIndex === string[LENGTH]) {\n        if (lastLength || !separatorCopy.test('')) output.push('');\n      } else output.push(string.slice(lastLastIndex));\n      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;\n    };\n  // Chakra, V8\n  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {\n    internalSplit = function (separator, limit) {\n      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);\n    };\n  } else {\n    internalSplit = $split;\n  }\n\n  return [\n    // `String.prototype.split` method\n    // https://tc39.github.io/ecma262/#sec-string.prototype.split\n    function split(separator, limit) {\n      var O = defined(this);\n      var splitter = separator == undefined ? undefined : separator[SPLIT];\n      return splitter !== undefined\n        ? splitter.call(separator, O, limit)\n        : internalSplit.call(String(O), separator, limit);\n    },\n    // `RegExp.prototype[@@split]` method\n    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split\n    //\n    // NOTE: This cannot be properly polyfilled in engines that don't support\n    // the 'y' flag.\n    function (regexp, limit) {\n      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);\n      if (res.done) return res.value;\n\n      var rx = anObject(regexp);\n      var S = String(this);\n      var C = speciesConstructor(rx, RegExp);\n\n      var unicodeMatching = rx.unicode;\n      var flags = (rx.ignoreCase ? 'i' : '') +\n                  (rx.multiline ? 'm' : '') +\n                  (rx.unicode ? 'u' : '') +\n                  (SUPPORTS_Y ? 'y' : 'g');\n\n      // ^(? + rx + ) is needed, in combination with some S slicing, to\n      // simulate the 'y' flag.\n      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);\n      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;\n      if (lim === 0) return [];\n      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];\n      var p = 0;\n      var q = 0;\n      var A = [];\n      while (q < S.length) {\n        splitter.lastIndex = SUPPORTS_Y ? q : 0;\n        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));\n        var e;\n        if (\n          z === null ||\n          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p\n        ) {\n          q = advanceStringIndex(S, q, unicodeMatching);\n        } else {\n          A.push(S.slice(p, q));\n          if (A.length === lim) return A;\n          for (var i = 1; i <= z.length - 1; i++) {\n            A.push(z[i]);\n            if (A.length === lim) return A;\n          }\n          q = p = e;\n        }\n      }\n      A.push(S.slice(p));\n      return A;\n    }\n  ];\n});\n\n\n//# sourceURL=./node_modules/core-js/modules/es6.regexp.split.js");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n__webpack_require__(/*! ./es6.regexp.flags */ \"./node_modules/core-js/modules/es6.regexp.flags.js\");\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\nvar $flags = __webpack_require__(/*! ./_flags */ \"./node_modules/core-js/modules/_flags.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\");\nvar TO_STRING = 'toString';\nvar $toString = /./[TO_STRING];\n\nvar define = function (fn) {\n  __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\")(RegExp.prototype, TO_STRING, fn, true);\n};\n\n// 21.2.5.14 RegExp.prototype.toString()\nif (__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {\n  define(function toString() {\n    var R = anObject(this);\n    return '/'.concat(R.source, '/',\n      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);\n  });\n// FF44- RegExp#toString has a wrong name\n} else if ($toString.name != TO_STRING) {\n  define(function toString() {\n    return $toString.call(this);\n  });\n}\n\n\n//# sourceURL=./node_modules/core-js/modules/es6.regexp.to-string.js");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// ECMAScript 6 symbols shim\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\");\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\");\nvar META = __webpack_require__(/*! ./_meta */ \"./node_modules/core-js/modules/_meta.js\").KEY;\nvar $fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\");\nvar shared = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/modules/_shared.js\");\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/modules/_set-to-string-tag.js\");\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/modules/_uid.js\");\nvar wks = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\");\nvar wksExt = __webpack_require__(/*! ./_wks-ext */ \"./node_modules/core-js/modules/_wks-ext.js\");\nvar wksDefine = __webpack_require__(/*! ./_wks-define */ \"./node_modules/core-js/modules/_wks-define.js\");\nvar enumKeys = __webpack_require__(/*! ./_enum-keys */ \"./node_modules/core-js/modules/_enum-keys.js\");\nvar isArray = __webpack_require__(/*! ./_is-array */ \"./node_modules/core-js/modules/_is-array.js\");\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/modules/_to-object.js\");\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/modules/_to-primitive.js\");\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/modules/_property-desc.js\");\nvar _create = __webpack_require__(/*! ./_object-create */ \"./node_modules/core-js/modules/_object-create.js\");\nvar gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ \"./node_modules/core-js/modules/_object-gopn-ext.js\");\nvar $GOPD = __webpack_require__(/*! ./_object-gopd */ \"./node_modules/core-js/modules/_object-gopd.js\");\nvar $GOPS = __webpack_require__(/*! ./_object-gops */ \"./node_modules/core-js/modules/_object-gops.js\");\nvar $DP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\");\nvar $keys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/modules/_object-keys.js\");\nvar gOPD = $GOPD.f;\nvar dP = $DP.f;\nvar gOPN = gOPNExt.f;\nvar $Symbol = global.Symbol;\nvar $JSON = global.JSON;\nvar _stringify = $JSON && $JSON.stringify;\nvar PROTOTYPE = 'prototype';\nvar HIDDEN = wks('_hidden');\nvar TO_PRIMITIVE = wks('toPrimitive');\nvar isEnum = {}.propertyIsEnumerable;\nvar SymbolRegistry = shared('symbol-registry');\nvar AllSymbols = shared('symbols');\nvar OPSymbols = shared('op-symbols');\nvar ObjectProto = Object[PROTOTYPE];\nvar USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;\nvar QObject = global.QObject;\n// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173\nvar setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;\n\n// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687\nvar setSymbolDesc = DESCRIPTORS && $fails(function () {\n  return _create(dP({}, 'a', {\n    get: function () { return dP(this, 'a', { value: 7 }).a; }\n  })).a != 7;\n}) ? function (it, key, D) {\n  var protoDesc = gOPD(ObjectProto, key);\n  if (protoDesc) delete ObjectProto[key];\n  dP(it, key, D);\n  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);\n} : dP;\n\nvar wrap = function (tag) {\n  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);\n  sym._k = tag;\n  return sym;\n};\n\nvar isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {\n  return typeof it == 'symbol';\n} : function (it) {\n  return it instanceof $Symbol;\n};\n\nvar $defineProperty = function defineProperty(it, key, D) {\n  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);\n  anObject(it);\n  key = toPrimitive(key, true);\n  anObject(D);\n  if (has(AllSymbols, key)) {\n    if (!D.enumerable) {\n      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));\n      it[HIDDEN][key] = true;\n    } else {\n      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;\n      D = _create(D, { enumerable: createDesc(0, false) });\n    } return setSymbolDesc(it, key, D);\n  } return dP(it, key, D);\n};\nvar $defineProperties = function defineProperties(it, P) {\n  anObject(it);\n  var keys = enumKeys(P = toIObject(P));\n  var i = 0;\n  var l = keys.length;\n  var key;\n  while (l > i) $defineProperty(it, key = keys[i++], P[key]);\n  return it;\n};\nvar $create = function create(it, P) {\n  return P === undefined ? _create(it) : $defineProperties(_create(it), P);\n};\nvar $propertyIsEnumerable = function propertyIsEnumerable(key) {\n  var E = isEnum.call(this, key = toPrimitive(key, true));\n  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;\n  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;\n};\nvar $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {\n  it = toIObject(it);\n  key = toPrimitive(key, true);\n  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;\n  var D = gOPD(it, key);\n  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;\n  return D;\n};\nvar $getOwnPropertyNames = function getOwnPropertyNames(it) {\n  var names = gOPN(toIObject(it));\n  var result = [];\n  var i = 0;\n  var key;\n  while (names.length > i) {\n    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);\n  } return result;\n};\nvar $getOwnPropertySymbols = function getOwnPropertySymbols(it) {\n  var IS_OP = it === ObjectProto;\n  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));\n  var result = [];\n  var i = 0;\n  var key;\n  while (names.length > i) {\n    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);\n  } return result;\n};\n\n// 19.4.1.1 Symbol([description])\nif (!USE_NATIVE) {\n  $Symbol = function Symbol() {\n    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');\n    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);\n    var $set = function (value) {\n      if (this === ObjectProto) $set.call(OPSymbols, value);\n      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;\n      setSymbolDesc(this, tag, createDesc(1, value));\n    };\n    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });\n    return wrap(tag);\n  };\n  redefine($Symbol[PROTOTYPE], 'toString', function toString() {\n    return this._k;\n  });\n\n  $GOPD.f = $getOwnPropertyDescriptor;\n  $DP.f = $defineProperty;\n  __webpack_require__(/*! ./_object-gopn */ \"./node_modules/core-js/modules/_object-gopn.js\").f = gOPNExt.f = $getOwnPropertyNames;\n  __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/modules/_object-pie.js\").f = $propertyIsEnumerable;\n  $GOPS.f = $getOwnPropertySymbols;\n\n  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ \"./node_modules/core-js/modules/_library.js\")) {\n    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);\n  }\n\n  wksExt.f = function (name) {\n    return wrap(wks(name));\n  };\n}\n\n$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });\n\nfor (var es6Symbols = (\n  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14\n  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'\n).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);\n\nfor (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);\n\n$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {\n  // 19.4.2.1 Symbol.for(key)\n  'for': function (key) {\n    return has(SymbolRegistry, key += '')\n      ? SymbolRegistry[key]\n      : SymbolRegistry[key] = $Symbol(key);\n  },\n  // 19.4.2.5 Symbol.keyFor(sym)\n  keyFor: function keyFor(sym) {\n    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');\n    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;\n  },\n  useSetter: function () { setter = true; },\n  useSimple: function () { setter = false; }\n});\n\n$export($export.S + $export.F * !USE_NATIVE, 'Object', {\n  // 19.1.2.2 Object.create(O [, Properties])\n  create: $create,\n  // 19.1.2.4 Object.defineProperty(O, P, Attributes)\n  defineProperty: $defineProperty,\n  // 19.1.2.3 Object.defineProperties(O, Properties)\n  defineProperties: $defineProperties,\n  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)\n  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,\n  // 19.1.2.7 Object.getOwnPropertyNames(O)\n  getOwnPropertyNames: $getOwnPropertyNames,\n  // 19.1.2.8 Object.getOwnPropertySymbols(O)\n  getOwnPropertySymbols: $getOwnPropertySymbols\n});\n\n// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives\n// https://bugs.chromium.org/p/v8/issues/detail?id=3443\nvar FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });\n\n$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {\n  getOwnPropertySymbols: function getOwnPropertySymbols(it) {\n    return $GOPS.f(toObject(it));\n  }\n});\n\n// 24.3.2 JSON.stringify(value [, replacer [, space]])\n$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {\n  var S = $Symbol();\n  // MS Edge converts symbol values to JSON as {}\n  // WebKit converts symbol values to JSON as null\n  // V8 throws on boxed symbols\n  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';\n})), 'JSON', {\n  stringify: function stringify(it) {\n    var args = [it];\n    var i = 1;\n    var replacer, $replacer;\n    while (arguments.length > i) args.push(arguments[i++]);\n    $replacer = replacer = args[1];\n    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined\n    if (!isArray(replacer)) replacer = function (key, value) {\n      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);\n      if (!isSymbol(value)) return value;\n    };\n    args[1] = replacer;\n    return _stringify.apply($JSON, args);\n  }\n});\n\n// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)\n$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);\n// 19.4.3.5 Symbol.prototype[@@toStringTag]\nsetToStringTag($Symbol, 'Symbol');\n// 20.2.1.9 Math[@@toStringTag]\nsetToStringTag(Math, 'Math', true);\n// 24.3.3 JSON[@@toStringTag]\nsetToStringTag(global.JSON, 'JSON', true);\n\n\n//# sourceURL=./node_modules/core-js/modules/es6.symbol.js");

/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $iterators = __webpack_require__(/*! ./es6.array.iterator */ \"./node_modules/core-js/modules/es6.array.iterator.js\");\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/modules/_object-keys.js\");\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\");\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\");\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/modules/_iterators.js\");\nvar wks = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\");\nvar ITERATOR = wks('iterator');\nvar TO_STRING_TAG = wks('toStringTag');\nvar ArrayValues = Iterators.Array;\n\nvar DOMIterables = {\n  CSSRuleList: true, // TODO: Not spec compliant, should be false.\n  CSSStyleDeclaration: false,\n  CSSValueList: false,\n  ClientRectList: false,\n  DOMRectList: false,\n  DOMStringList: false,\n  DOMTokenList: true,\n  DataTransferItemList: false,\n  FileList: false,\n  HTMLAllCollection: false,\n  HTMLCollection: false,\n  HTMLFormElement: false,\n  HTMLSelectElement: false,\n  MediaList: true, // TODO: Not spec compliant, should be false.\n  MimeTypeArray: false,\n  NamedNodeMap: false,\n  NodeList: true,\n  PaintRequestList: false,\n  Plugin: false,\n  PluginArray: false,\n  SVGLengthList: false,\n  SVGNumberList: false,\n  SVGPathSegList: false,\n  SVGPointList: false,\n  SVGStringList: false,\n  SVGTransformList: false,\n  SourceBufferList: false,\n  StyleSheetList: true, // TODO: Not spec compliant, should be false.\n  TextTrackCueList: false,\n  TextTrackList: false,\n  TouchList: false\n};\n\nfor (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {\n  var NAME = collections[i];\n  var explicit = DOMIterables[NAME];\n  var Collection = global[NAME];\n  var proto = Collection && Collection.prototype;\n  var key;\n  if (proto) {\n    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);\n    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);\n    Iterators[NAME] = ArrayValues;\n    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);\n  }\n}\n\n\n//# sourceURL=./node_modules/core-js/modules/web.dom.iterable.js");

/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** multi ./lib/armatura/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/armatura/index.js */\"./lib/armatura/index.js\");\n\n\n//# sourceURL=multi_./lib/armatura/index.js");

/***/ })

/******/ });
});