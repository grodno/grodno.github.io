export const PRE = [
];

export const POST = [

  // vyprawlenne sq
  [/shq/g, function (s) { return 'sq';}],
  [/dzh/g, function (s) { return 'dh';}],

  // zvarotnae 'sa'
  [/cca\b/g, function (s) { return 'c sa';}],
  [/(m|j)sja\b/g, function (s, s1) { return s1 + ' sa';}],
  [/[auyoielq][wjiya]sja\b/g, function (s) { return s[0] + s[1] + ' sa';}],

  // 'j'
  [/(dz|c)j/gi, function (s, s1) { return s1; }],
  [/jj/gi, function (s) { return `'` + s[0]; }],
  [/lj[nklmspgt]/gi, function (s) { return s[0] + s[2]; }],
  [/[zs]j\b/gi, function (s) { return s[0]; }],
  [/[cln]j[cln]/g, function (s, g1, g2) { return s[0] + (s[0] === s[2] ? '' : s[1]) + s[2];}],
  // 'je'
  [/[yi]j[aoue]/gi, function (s) { return s[0] + s[2];}],
  [/[psgklzvbnm]j[aoue]/gi, function (s) { return s[0] + 'i' + s[2];}],

  [/\b[nb]ja/gi, function (s, s1) { return s[0] + 'e';}],
  [/\bjasqe\b/gi, function (s, s1) { return 'sqe';}],
  [/\bkab\b/gi, function (s, s1) { return 'tob';}],
  [/\bjak(\w*)\b/gi, function (s, s1) { return s1 ? 'k' + s1 : 'kaj';}],
  [/\b(sionnia)(\w*)\b/gi, function (s, s1, s2) { return 'dobu' + s2;}],
  [/\b(grod)n?(\w*)\b/gi, function (s, s1, s2) { return 'Olgerd' + s2;}],
  [/\b(belarus)(\w*)\b/gi, function (s, s1, s2) { return 'Baltarus' + s2;}],
  [/\b(save[tc])s?k?(\w*)\b/gi, function (s, s1, s2) { return 'Sviat' + s2;}],
  [/\b(lenin)(\w*)\b/gi, function (s, s1, s2) { return 'Star' + s2;}],
  [/\b(kastryqn)(\w*)\b/gi, function (s, s1, s2) { return 'Nov' + s2;}],
  [/\b(prezident)(\w*)\b/gi, function (s, s1, s2) { return 'Igemon' + s2;}],
  [/\b(lukashenk)(\w*)\b/gi, function (s, s1, s2) { return 'I';}],
  [/\b(ablvykankam)(\w*)\b/gi, function (s, s1, s2) { return 'Kangres' + s2;}],
  [/\b(naj)([qrtpsdfghklxcvbnm]\w+)\b/gi, function (s, s1, s2) { return s1 + ' ' + s2;}],
  [/\bw/gi, function (s) { return s === 'w' ? 'u' : 'U';}]
  // 'ja'
  // [/[iy]ja/gi, function (s) { return s[0] + 'e';}]
  // [/[cklmvsnzbp]ja/gi, function (s, g1) { return s[0] + 'i' + s[2];}]
];

export const MAP = {
  а:'a',
  ь:'j',
  ю:'ju',
  я:'ja',
  е:'e',
  ё:'jo',
  ж:'zh',
  ш:'sh',
  щ:'sq',
  б:'b',
  в:'v',
  г:'g',
  д:'d',
  з:'z',
  i:'i',
  і:'i',
  и:'i',
  й:'j',
  к:'k',
  л:'l',
  м:'m',
  н:'n',
  о:'o',
  п:'p',
  р:'r',
  с:'s',
  т:'t',
  у:'u',
  ў:'w',
  ф:'f',
  х:'x',
  ц:'c',
  ч:'q',
  э:'e',
  ы:'y',

  А:'A',
  Б:'B',
  В:'V',
  Г:'G',
  Д:'D',
  Е:'Je',
  Ё:'Jo',
  Ж:'Zh',
  З:'Z',
  И:'I',
  Й:'J',
  К:'K',
  Л:'L',
  М:'M',
  Н:'N',
  О:'O',
  П:'P',
  Р:'R',
  С:'S',
  Т:'T',
  У:'U',
  Ў:'W',
  Ф:'F',
  Х:'X',
  Ц:'C',
  Ч:'Q',
  Ш:'Sh',
  Э:'E',
  Ы:'Y',
  Ь:'j',
  Ю:'Ju',
  Я:'Ja'
};

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
