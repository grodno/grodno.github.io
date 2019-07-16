
export const CYRLAT = {
  а: 'a', е: 'e', э: 'e', о: 'o', ы: 'y', i: 'i', і: 'i', и: 'i', й: 'j', ь: 'j',
  ю: 'u', я: 'ia', ё: 'eo',
  ъ: `'`, ж: 'gh', ш: 'sh', щ: 'sq', б: 'b', в: 'v', г: 'g', д: 'd', з: 'z',
  к: 'k', л: 'l', м: 'm', н: 'n', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ў: 'w', ф: 'f', х: 'x', ц: 'c', ч: 'q',
  А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'Jo', Ж: 'Zh', З: 'Z',
  И: 'I', Й: 'J', К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O', П: 'P', Р: 'R', С: 'S',
  Т: 'T', У: 'U', Ў: 'W', Ф: 'F', Х: 'X', Ц: 'C', Ч: 'Q', Ш: 'Sh', Щ: 'Sq',
  Э: 'E', Ы: 'Y', Ь: 'j', Ю: 'Ju', Я: 'Ja'
};

export const NORMALIZE = [

  [/sjm/g, s => 'sm'],
  [/sjn/g, s => 'sn'],
  [/cjc/g, s => 'cc'],
  [/ljl/g, s => 'll'],
  [/ljn/g, s => 'ln'],
  [/njn/g, s => 'nn'],

  [/aia/g, s => 'aja'],
  [/yia/g, s => 'ye'],
  [/iia/g, s => 'ie'],
  [/uia/g, s => 'ue'],
  [/via/g, s => 've'],
  [/mia/g, s => 'me'],
  [/aeo/g, s => 'ae'],
  [/yeo/g, s => 'yo'],
  [/ieo/g, s => 'io'],
  [/ueo/g, s => 'ue'],
  [/oeo/g, s => 'oe'],
  [/eow/g, s => 'ew'],

  [/ucj$/, s => 'ut'],
  [/cc/g, s => 'tc'],
  [/shq/g, s => 'sq'],
  [/dgh/g, s => 'dh'],
  [/dzh/g, s => 'd'],

  [/^ia/i, s => 'ja'],
  [/^gh/i, 'zh'],

  [/[ayi]cj$/, s => s[0] + 'c'],

  [/eo$/, s => 'e'],
  [/^eo/, s => 'jo'],

  // zvarotnae 'sa'
  [/sjc[iі]$/, s => 'sc'],
  [/tca$/, s => 't sa'],
  [/([ayo]j)ce$/, (s, s1) => s1 + ' te'],
  [/(shy|ci|m|j|o|[auyoielq][wjiya])sia$/, function (s, s1) { return s1 + ' sa'; }],

  // words
  [/^josc$/i, function (s, s1) { return 'e'; }],
  [/^kab$/i, function (s, s1) { return 'qtob'; }],
  [/^jasqe$/i, function (s, s1) { return 'esqe'; }],
  [/^cjaper$/gi, 'doper'],
  [/^toljki$/gi, 'ano'],
  [/^amalj$/gi, 'badaj'],

  [/^seonnia(\w*)\b/gi, function (s, s1, s2) { return 'dobu' + s2; }],

  [/sjar/gi, 'ser'],
  [/bjasp/gi, 'besp'],

  // substitutes
  [/\b(grod)n?(\w*)\b/gi, function (s, s1, s2) { return 'Algard' + (s2 === 'a' ? '' : s2); }],
  [/\b(garadzen)(\w*)\b/gi, function (s, s1, s2) { return 'Algard' + (s2 === 'a' ? '' : s2); }],
  [/\b(belarus)(\w*)\b/gi, function (s, s1, s2) { return 'Baltustan' + s2; }],
  [/\b(save[tc])(s?k?)(\w*)\b/gi, function (s, s1, s2, s3) { return 'svojak' + s2 + s3; }],
  [/\bj?ewr(o|a)(\w*)\b/gi, function (s, s1, s2) { return 'Elfy' + s2; }],
  [/\respublik(\w*)\b/gi, function (s, s1, s2) { return 'Paxanat' + s1; }],
  [/\bv?oblasc?(n?)(\w*)\b/gi, function (s, s1, s2) { return 'ulus' + s1 + s2; }],
  [/\brajon?n?(\w*)\b/gi, function (s, s1, s2) { return 'volost' + s1; }],
  [/\blit(ow|v)(\w+)\b/gi, function (s, s1, s2) { return 'Letuvis' + s2; }],
  [/\bpols(q|k)(\w+)\b/gi, function (s, s1, s2) { return 'Panstv' + s2; }],
  [/\b(lenin)(\w*)\b/gi, function (s, s1, s2) { return 'Elaban' + s2; }],
  [/\b(kastryqn)(\w*)\b/gi, function (s, s1, s2) { return 'Akbarn' + s2; }],
  [/\b(prezident)(\w*)\b/gi, function (s, s1, s2) { return 'paxan' + s2; }],
  [/\b(lukashenk)(\w*)\b/gi, function (s, s1, s2) { return 'I'; }],
  [/\b((?:abl|gar|raj)vykankam)(\w*)\b/gi, function (s, s1, s2) { return 'kurultaj' + s2; }],
  [/\b(naj)([qrtpsdfghklxcvbnm]\w+)\b/gi, function (s, s1, s2) { return s1 + ' ' + s2; }],
  [/\bw/gi, function (s) { return s === 'w' ? 'u' : 'U'; }]
];

const sPrystawki = `abjas|nepry|paras|pryna|sprad|nepa|pada|pavy|pera|aba|abo|naj|nea|nes|new|pad|paw|pow|pra|pro|pry|ras|spa|wva|ab|ad|da|na|ne|ni|pa|po|sa|su|vo|vy|ws|za|a|s|u|w|z`;

const ngram1 = `b|bl|br|c|cm|cs|cv|d|dr|dv|dz|dzh|dzm|dzv|f|fl|g|gl|gm|gn|gr|gv|ja|k|kl|kn|kp|kr|krz|ks|kv|l|lg|m|mg|mgl|mgn|ml|mn|mr|n|p|pl|pq|pr|ps|psh|pt|pxn|q|qm|qv|r|rv|rz|rzh|s|sc|sh|shk|shl|shm|shn|shp|shq|shr|sht|shv|sk|skl|skr|skv|sl|sm|smr|sn|sp|spr|sq|sr|st|str|sv|t|tk|tkn|tl|tr|tv|tx|v|v|w|x|xl|xm|xr|xt|xv|z|zd|zdr|zdz|zh|zhd|zhm|zhn|zhv|zl|zm|zn|zr|zv`;

const ngram2 = `b|br|c|cm|cs|d|dk|dl|dr|dsk|dt|dv|dx|dz|dzc|dzh|dzk|dzm|dzv|f|ft|g|gc|gd|gl|gn|gr|gs|k|kc|kk|kl|kn|kr|ks|kt|kv|l|lb|ld|ldz|lg|lk|ll|lm|lp|lt|lz|m|mb|mk|ml|mn|mp|mr|ms|msc|mz|n|nc|ncs|nd|ndr|ndz|nk|nkt|nn|nq|ns|nsh|nsk|nt|ntr|nzh|p|pc|pl|pn|psh|psk|pst|pt|q|qm|qn|qq|r|rb|rc|rcs|rd|rdz|rg|rgn|rk|rkv|rl|rm|rn|rp|rpl|rq|rs|rsh|rsk|rsq|rst|rt|rtk|rtv|rv|rx|rzd|rzh|s|sc|scm|scs|sh|shc|shk|shl|shm|shn|sht|sk|skr|sl|sm|sn|sp|sq|st|str|t|tc|tk|tkn|tl|tn|tq|tr|v|w|x|xc|xk|xl|xm|xn|xq|xr|xt|z|zb|zd|zdq|zdr|zdz|zg|zgr|zh|zhd|zhn|zhq|zhz|zk|zl|zn|zsh`;

const sKorani = `((${ngram1})(a|ai|aj|e|ej|i|ja|ju|o|oj|u|uj|y)(${ngram2})?)(og|ozh|[iayou]q|[ao][td])?j?[kcqln]?`;

const sKanqatki = `(avawsh|ikowsk|adann|adliv|adumn|alenn|alist|aljon|aluqn|anstv|aqenn|aqkov|aqysq|arank|arodc|arodk|arodn|asnul|atann|atliv|atvor|avann|avenn|averx|avink|avjak|avodn|awlen|awlin|azdaq|azliv|ennic|ennik|enstv|instv|iwnik|jajuq|jecjk|meshn|nuwsh|onaqk|ovejk|udziv|uvann|uxnul|yvann|yxnul|abok|acjk|ajuq|alit|aljn|alos|anic|anin|anit|anjk|anov|anul|apud|aqyn|arad|arob|arsk|atux|avan|avat|avic|avit|awsh|azhn|ejsh|eljk|enjk|ensk|eshk|ewsh|ewsk|ezhn|icjk|iljn|ishk|iwsh|jank|jort|jutk|ocjk|okag|olen|oljn|onan|ontk|ovan|oviq|owsk|oxan|ozhn|shag|shan|ujuq|uman|ushk|ushn|uwsh|vjak|vjan|yqyn|yrav|ytus|ywsh|acc|adk|adn|adz|agn|ajc|ajk|ajn|ank|ann|aqk|aqv|ark|asc|ask|asl|asn|ast|atk|atn|awk|awl|axl|azh|bat|bov|edz|egl|ejk|elc|enc|enn|eqk|erk|esn|esq|ess|etn|ewc|ewk|ezg|gac|gan|idl|inc|ink|iqn|isl|isq|ist|itn|jas|jav|jon|mex|obk|obn|odn|odz|ojn|oll|omi|onc|onk|onn|oqk|oqv|ork|orn|otk|otn|owc|owk|own|owv|stk|stv|uar|ukn|ush|usk|utk|uxn|van|ydn|ync|ynk|ysh|ysq|yst|ytk|ab|ad|ag|ak|al|am|an|aq|ar|as|at|av|az|ec|ed|el|en|eq|er|et|ev|ew|ex|ic|id|ik|in|it|iv|ix|iz|ob|oc|od|og|ok|ol|on|op|oq|os|ot|ov|ow|sh|sk|st|ug|uk|ul|um|un|uq|us|ut|ux|yg|yk|yn|yq|yr|yt|yv|yx|b|v)?j?(a|e|i|o|u|y|ae|aj|am|aw|ax|ei|ej|em|ii|im|ix|ma|mi|oe|oi|oj|om|ue|uj|ym|yx|uw|aem|aja|aju|ami|amu|ee|eju|ija|imi|oju|oma|omi|omu|uju|yju|yja|ymi|ymu|yma|ajami|[auye]em|[iaeuy]li|[iaeuy]la|[iaeuy]lo|[aie]sh|[auye]esh|[ao]ga|gi|ogi)?`;

export const ReKoranj = new RegExp('^' + sKorani + sKanqatki + '$', '');

export const RePrefixKoranj = new RegExp('^' + '(' + sPrystawki + ')' + sKorani + sKanqatki + '$', '');

export const ReCj = new RegExp('(cj|ci|sja|sj|cje)$');

// kanqatki: var ReKoranj = new RegExp('^[a-z]{4,10}([aeuioj][aeuiojm]{1,4})$','g')
// sufiksy1: var ReKoranj = new RegExp('^('+prefixes.first.join('|')+')'+'?(('+ngram.first.join('|')+')'+'('+ngram.vowel.join('|')+')'+'('+ngram.second.join('|')+'))([^zhtrp][a-z]*)?([aeuiojm]{1,3})$','g')
