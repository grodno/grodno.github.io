module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parse = parse;
	exports.translit = translit;
	exports.analyze = analyze;

	var _const = __webpack_require__(2);

	var _utils = __webpack_require__(3);

	function parse(input) {
	  var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	  var roots = output.roots || (output.roots = {});
	  var words = output.words || (output.words = {});

	  var addItem = function addItem(root, word, count) {

	    var wordItem = words[word] || (words[word] = { count: 0, roots: [] });
	    wordItem.count += count;
	    wordItem.roots.push(root);

	    var rootItem = roots[root] || (roots[root] = { count: 0, words: [] });
	    rootItem.count += count;
	    rootItem.words.push(word);
	    return true;
	  };

	  (input || []).map(function (item, i) {

	    var found = false;
	    var str = item.origin;

	    str.replace(_const.ReCj, function (s, p) {
	      str = str.slice(0, -p.length);
	    });

	    str.replace(_const.ReKoranj, function (s, rx) {
	      found = addItem(rx, item.origin, item.count);
	    });
	    str.replace(_const.RePrefixKoranj, function (s, p, rx) {
	      found = addItem(rx, item.origin, item.count);
	    });

	    if (!found) {

	      addItem(str, item.origin, 0);
	    }
	  });

	  return output;
	}

	function translit(s) {

	  return (0, _utils.cyrlat)(s);
	}

	function analyze(text) {

	  var input = {};

	  var output = { origin: text };

	  var addWord = function addWord(w) {
	    var ch = w.toLowerCase();
	    var item = input[ch] || (input[ch] = { origin: ch, count: 0, samples: [] });
	    item.count += 1;
	    return w;
	  };

	  output.normalized = text.replace(/[a-z]+/gi, addWord).replace(/[а-яiіў]+/gi, function (s) {
	    return addWord((0, _utils.cyrlat)(s).split(' ')[0]);
	  });

	  parse(Object.keys(input).map(function (key) {
	    return input[key];
	  }), output);

	  return output;
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PRE = exports.PRE = [];

	var POST = exports.POST = [[/shq/g, function (s) {
	  return 'sq';
	}], [/cca\b/g, function (s) {
	  return 'c sa';
	}], [/[ayil][wji]sja\b/g, function (s) {
	  return s[0] + s[1] + ' sa';
	}], [/dzj/gi, function (s) {
	  return s[0] + s[1];
	}], [/[nlmszkpbvaouye]je/gi, function (s, g1, g2) {
	  return s[0] + 'e';
	}], [/\b[klmvsnzy]ja/gi, function (s, g1, g2) {
	  return s[0] + 'e';
	}], [/eje/g, function (s, g1, g2) {
	  return 'ee';
	}], [/njn/g, function (s, g1, g2) {
	  return 'nn';
	}], [/cjc/g, function (s, g1, g2) {
	  return 'cc';
	}], [/ljl/g, function (s, g1, g2) {
	  return 'll';
	}]];

	var MAP = exports.MAP = {
	  а: 'a',
	  ь: 'j',
	  ю: 'ju',
	  я: 'ja',
	  е: 'je',
	  ё: 'jo',
	  ж: 'zh',
	  ш: 'sh',
	  б: 'b',
	  в: 'v',
	  г: 'g',
	  д: 'd',
	  з: 'z',
	  i: 'i',
	  і: 'i',
	  и: 'i',
	  й: 'j',
	  к: 'k',
	  л: 'l',
	  м: 'm',
	  н: 'n',
	  о: 'o',
	  п: 'p',
	  р: 'r',
	  с: 's',
	  т: 't',
	  у: 'u',
	  ў: 'w',
	  ф: 'f',
	  х: 'x',
	  ц: 'c',
	  ч: 'q',
	  э: 'e',
	  ы: 'y',

	  А: 'A',
	  Б: 'B',
	  В: 'V',
	  Г: 'G',
	  Д: 'D',
	  Е: 'Je',
	  Ё: 'Jo',
	  Ж: 'Zh',
	  З: 'Z',
	  И: 'I',
	  Й: 'J',
	  К: 'K',
	  Л: 'L',
	  М: 'M',
	  Н: 'N',
	  О: 'O',
	  П: 'P',
	  Р: 'R',
	  С: 'S',
	  Т: 'T',
	  У: 'U',
	  Ў: 'W',
	  Ф: 'F',
	  Х: 'X',
	  Ц: 'C',
	  Ч: 'Q',
	  Ш: 'Sh',
	  Э: 'E',
	  Ы: 'Y',
	  Ь: 'j',
	  Ю: 'Ju',
	  Я: 'Ja'
	};

	var sPrystawki = 'abjas|nepry|paras|pryna|sprad|nepa|pada|pavy|pera|aba|abo|naj|nea|nes|new|pad|paw|pow|pra|pro|pry|ras|spa|wva|ab|ad|da|na|ne|ni|pa|po|sa|su|vo|vy|ws|za|a|s|u|w|z';

	var ngram1 = 'b|bl|br|c|cm|cs|cv|d|dr|dv|dz|dzh|dzm|dzv|f|fl|g|gl|gm|gn|gr|gv|ja|k|kl|kn|kp|kr|krz|ks|kv|l|lg|m|mg|mgl|mgn|ml|mn|mr|n|p|pl|pq|pr|ps|psh|pt|pxn|q|qm|qv|r|rv|rz|rzh|s|sc|sh|shk|shl|shm|shn|shp|shq|shr|sht|shv|sk|skl|skr|skv|sl|sm|smr|sn|sp|spr|sq|sr|st|str|sv|t|tk|tkn|tl|tr|tv|tx|v|v|w|x|xl|xm|xr|xt|xv|z|zd|zdr|zdz|zh|zhd|zhm|zhn|zhv|zl|zm|zn|zr|zv';

	var ngram2 = 'b|br|c|cm|cs|d|dk|dl|dr|dsk|dt|dv|dx|dz|dzc|dzh|dzk|dzm|dzv|f|ft|g|gc|gd|gl|gn|gr|gs|k|kc|kk|kl|kn|kr|ks|kt|kv|l|lb|ld|ldz|lg|lk|ll|lm|lp|lt|lz|m|mb|mk|ml|mn|mp|mr|ms|msc|mz|n|nc|ncs|nd|ndr|ndz|nk|nkt|nn|nq|ns|nsh|nsk|nt|ntr|nzh|p|pc|pl|pn|psh|psk|pst|pt|q|qm|qn|qq|r|rb|rc|rcs|rd|rdz|rg|rgn|rk|rkv|rl|rm|rn|rp|rpl|rq|rs|rsh|rsk|rsq|rst|rt|rtk|rtv|rv|rx|rzd|rzh|s|sc|scm|scs|sh|shc|shk|shl|shm|shn|sht|sk|skr|sl|sm|sn|sp|sq|st|str|t|tc|tk|tkn|tl|tn|tq|tr|v|w|x|xc|xk|xl|xm|xn|xq|xr|xt|z|zb|zd|zdq|zdr|zdz|zg|zgr|zh|zhd|zhn|zhq|zhz|zk|zl|zn|zsh';

	var sKorani = '((' + ngram1 + ')(a|ai|aj|e|ej|i|ja|ju|o|oj|u|uj|y)(' + ngram2 + ')?)(og|ozh|[iayou]q|[ao][td])?j?[kcqln]?';

	var sKanqatki = '(avawsh|ikowsk|adann|adliv|adumn|alenn|alist|aljon|aluqn|anstv|aqenn|aqkov|aqysq|arank|arodc|arodk|arodn|asnul|atann|atliv|atvor|avann|avenn|averx|avink|avjak|avodn|awlen|awlin|azdaq|azliv|ennic|ennik|enstv|instv|iwnik|jajuq|jecjk|meshn|nuwsh|onaqk|ovejk|udziv|uvann|uxnul|yvann|yxnul|abok|acjk|ajuq|alit|aljn|alos|anic|anin|anit|anjk|anov|anul|apud|aqyn|arad|arob|arsk|atux|avan|avat|avic|avit|awsh|azhn|ejsh|eljk|enjk|ensk|eshk|ewsh|ewsk|ezhn|icjk|iljn|ishk|iwsh|jank|jort|jutk|ocjk|okag|olen|oljn|onan|ontk|ovan|oviq|owsk|oxan|ozhn|shag|shan|ujuq|uman|ushk|ushn|uwsh|vjak|vjan|yqyn|yrav|ytus|ywsh|acc|adk|adn|adz|agn|ajc|ajk|ajn|ank|ann|aqk|aqv|ark|asc|ask|asl|asn|ast|atk|atn|awk|awl|axl|azh|bat|bov|edz|egl|ejk|elc|enc|enn|eqk|erk|esn|esq|ess|etn|ewc|ewk|ezg|gac|gan|idl|inc|ink|iqn|isl|isq|ist|itn|jas|jav|jon|mex|obk|obn|odn|odz|ojn|oll|omi|onc|onk|onn|oqk|oqv|ork|orn|otk|otn|owc|owk|own|owv|stk|stv|uar|ukn|ush|usk|utk|uxn|van|ydn|ync|ynk|ysh|ysq|yst|ytk|ab|ad|ag|ak|al|am|an|aq|ar|as|at|av|az|ec|ed|el|en|eq|er|et|ev|ew|ex|ic|id|ik|in|it|iv|ix|iz|ob|oc|od|og|ok|ol|on|op|oq|os|ot|ov|ow|sh|sk|st|ug|uk|ul|um|un|uq|us|ut|ux|yg|yk|yn|yq|yr|yt|yv|yx|b|v)?j?(a|e|i|o|u|y|ae|aj|am|aw|ax|ei|ej|em|ii|im|ix|ma|mi|oe|oi|oj|om|ue|uj|ym|yx|uw|aem|aja|aju|ami|amu|ee|eju|ija|imi|oju|oma|omi|omu|uju|yju|yja|ymi|ymu|yma|ajami|[auye]em|[iaeuy]li|[iaeuy]la|[iaeuy]lo|[aie]sh|[auye]esh|[ao]ga|gi|ogi)?';

	var ReKoranj = exports.ReKoranj = new RegExp('^' + sKorani + sKanqatki + '$', '');

	var RePrefixKoranj = exports.RePrefixKoranj = new RegExp('^' + '(' + sPrystawki + ')' + sKorani + sKanqatki + '$', '');

	var ReCj = exports.ReCj = new RegExp('(cj|ci|sja|sj|cje)$');

	// kanqatki: var ReKoranj = new RegExp('^[a-z]{4,10}([aeuioj][aeuiojm]{1,4})$','g')
	// sufiksy1: var ReKoranj = new RegExp('^('+prefixes.first.join('|')+')'+'?(('+ngram.first.join('|')+')'+'('+ngram.vowel.join('|')+')'+'('+ngram.second.join('|')+'))([^zhtrp][a-z]*)?([aeuiojm]{1,3})$','g')

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cyrlat = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _const = __webpack_require__(2);

	var _map = function _map(s) {
	  return s.split('').map(function (x) {
	    return _const.MAP[x] || x;
	  }).join('');
	};

	var mreplace = function mreplace(arr, x) {
	  return arr.reduce(function (s, _ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        re = _ref2[0],
	        sub = _ref2[1];

	    return s.replace(re, sub);
	  }, x);
	};

	var cyrlat = exports.cyrlat = function cyrlat(s) {
	  return mreplace(_const.POST, _map(mreplace(_const.PRE, s)));
	};

/***/ })
/******/ ]);