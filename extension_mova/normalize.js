
var NORMALIZE_LETTERS = [

  // vyprawlenne sq
  [ /shq/gi, function (s) {
    return s[ 0 ] + s[ 2 ];
  } ],
  [ /dzh/gi, function (s) {
    return s[ 0 ] + 'h';
  } ],

  // zvarotnae 'sa'
  [ /cca\b/g, function (s) {
    return 'c sa';
  } ],
  [ /(shy|ci|m|j|tj?)sja\b/g, function (s, s1) {
    return s1 + ' sa';
  } ],
  [ /[auyoielq][wjiya]sja\b/g, function (s) {
    return s[ 0 ] + s[ 1 ] + ' sa';
  } ],

  // 'j'
  [ /(dz)j/gi, function (s, s1) {
    return s1;
  } ],
  [ /jj/gi, function (s) {
    return `'` + s[ 0 ];
  } ],
  [ /lj[nklmspgt]/gi, function (s) {
    return s[ 0 ] + s[ 2 ];
  } ],
  [ /\b[nb]ja/gi, function (s, s1) {
    return s[ 0 ] + 'e';
  } ],
  [ /[uaoi]cj\b/g, function (s) {
    return s[ 0 ] + 'c';
  } ],
  [ /[zcst]j\b/gi, function (s) {
    return s[ 0 ];
  } ],
  [ /[cln]j[cln]/g, function (s, g1, g2) {
    return s[ 0 ] + (s[ 0 ] === s[ 2 ] ? '' : s[ 1 ]) + s[ 2 ];
  } ],
  [ /[yi]j[aoue]/gi, function (s) {
    return s[ 0 ] + s[ 2 ];
  } ],
  [ /[psgklfzcvbnm]j[aoue]/gi, function (s) {
    return s[ 0 ] + 'i' + s[ 2 ];
  } ]
];

var NORMALIZE_WORDS = [
  [ /\bjosc\b/gi, function (s, s1) {
    return 'e';
  } ],
  [ /\bkab\b/gi, function (s, s1) {
    return 'tob';
  } ],
  [ /\bjasqe\b/gi, function (s, s1) {
    return 'sqe';
  } ],
  [ /\bjak(\w*)\b/gi, function (s, s1) {
    return s1 ? 'k' + s1 : 'kaj';
  } ],
  [ /\b(c)iaper\b/gi, '$1eper' ],
  [ /\b(sionnia)(\w*)\b/gi, function (s, s1, s2) {
    return 'dobu' + s2;
  } ],
  [ /\b(naj)([qrtpsdfghklxcvbnm]\w+)\b/gi, function (s, s1, s2) {
    return s1 + ' ' + s2;
  } ],

  [ /\b(grodn[ao])(\w*)\b/gi, function (s, s1, s2) {
    return 'Olgard' + (s2 === 'a' ? '' : s2);
  } ],
  [ /\b(garadzen)(\w*)\b/gi, function (s, s1, s2) {
    return 'Olgard' + (s2 === 'a' ? '' : s2);
  } ],
  [ /\b(bel[ao]rus)(\w*)\b/gi, function (s, s1, s2) {
    return 'Baltaros' + s2;
  } ],
  [ /\b(m[ei]nsk)(\w*)\b/gi, function (s, s1, s2) {
    return 'Mindowg' + s2;
  } ],
  [ /\b(save[tc])s?k?(\w*)\b/gi, function (s, s1, s2) {
    return 'Slavian' + s2;
  } ],
  [ /\bj?e[vw]r(o|a)(\w*)\b/gi, function (s, s1, s2) {
    return 'Euro' + s2;
  } ],
  [ /\respublik(\w*)\b/gi, function (s, s1, s2) {
    return 'Req' + s1;
  } ],
  [ /\bv?oblasc?n?(\w*)\b/gi, function (s, s1, s2) {
    return 'ulus' + s1;
  } ],
  [ /\brajon?n?(\w*)\b/gi, function (s, s1, s2) {
    return 'pavet' + s1;
  } ],
  [ /\blit(ow|v)(\w+)\b/gi, function (s, s1, s2) {
    return 'Letuvis' + s2;
  } ],
  [ /\bpols(q|k)(\w+)\b/gi, function (s, s1, s2) {
    return 'Panstv' + s2;
  } ],
  [ /\b(mosko?v|rossi)(\w+)\b/gi, function (s, s1, s2) {
    return 'Moskal' + s2;
  } ],
  [ /\b(lenin)(\w*)\b/gi, function (s, s1, s2) {
    return 'Staryn' + s2;
  } ],
  [ /\b(kastryqn)(\w*)\b/gi, function (s, s1, s2) {
    return 'Vjun' + s2;
  } ],
  [ /\b(prezident)(\w*)\b/gi, function (s, s1, s2) {
    return 'P.Zh.';
  } ],
  [ /\b(ministr)(\w*)\b/gi, function (s, s1, s2) {
    return 'Vizir';
  } ],
  [ /\b(Luk[ao]shenk)(\w*)\b/gi, function (s, s1, s2) {
    return 'Karabas' + (s2 === 'a' || s2 === 'o' ? '' : s2);
  } ],
  [ /\b((?:abl|gar|raj)vykankam|parlament)(\w*)\b/gi, function (s, s1, s2) {
    return 'Kurultaj' + s2;
  } ],
  [ /\b(w|v)\b/gi, function (s) {
    return s === 'w' || s === 'v' ? 'u' : 'U';
  } ]
  // 'ja'
  // [/[iy]ja/gi, function (s) { return s[0] + 'e';}]
  // [/[cklmvsnzbp]ja/gi, function (s, g1) { return s[0] + 'i' + s[2];}]
];

function mreplace(arr, x0) {
  var x = x0;
  for (var i = 0; i < arr.length; i++) {
    x = x.replace(arr[i][ 0 ], arr[i][ 1 ]);
  }
  return x;
}

function normalize(s) {

  return mreplace(NORMALIZE_WORDS, mreplace(NORMALIZE_LETTERS, s));
}
