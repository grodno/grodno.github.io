
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
