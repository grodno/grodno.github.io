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
  [ /\b(naj)([qrtpsdfghklxcvbnm]\w{4,})\b/gi, function (s, s1, s2) {
    return s1 + ' ' + s2;
  } ],

  [ /\b(grodn[ao]|garadzen)(\w*)\b/gi, function (s, s1, s2) {
    return 'Olgard' + (s2 === 'a' ? '' : s2);
  } ],
  [ /\b(bel[ao]rus)(\w*)\b/gi, function (s, s1, s2) {
    return 'Baltaros' + s2;
  } ],
  [ /\b(m[ei]nsk)(\w*)\b/gi, function (s, s1, s2) {
    return 'Mindowg' + s2;
  } ],
  [ /\b(Save[tc])s?k?(\w*)\b/i, function (s, s1, s2) {
    return 'Ratushn' + s2;
  } ],
  [ /\bj?e[vw]r(o|a)(\w*)\b/gi, function (s, s1, s2) {
    return 'Euro' + s2;
  } ],
  [ /\respublik(\w*)\b/gi, function (s, s1, s2) {
    return 'Req' + s1;
  } ],
  [ /\bv?[ao]blasc?n?(\w*)\b/gi, function (s, s1, s2) {
    return 'ulus' + s1;
  } ],
  [ /\brajon?n?(\w*)\b/gi, function (s, s1, s2) {
    return 'pavet' + s1;
  } ],
  [ /\blit(ow|v)(\w+)\b/gi, function (s, s1, s2) {
    return 'Letuv' + s2;
  } ],
  [ /\bpols(q|k)(\w+)\b/gi, function (s, s1, s2) {
    return 'Panstv' + s2;
  } ],
  [ /\b(m[ao]sko?[wv]|r[oa]ss?[ei]j?a?n?)(\w*)\b/gi, function (s, s1, s2) {
    return 'Maskal' + s2;
  } ],
  [ /\b(lenin)(\w*)\b/gi, function (s, s1, s2) {
    return 'Perun' + s2;
  } ],
  [ /\b(Kastryq)(\w*)\b/i, function (s, s1, s2) {
    return 'Malank' + s2;
  } ],
  [ /\b(prezident)(\w*)\b/gi, function (s, s1, s2) {
    return 'Babaj';
  } ],
  [ /ministe?r/gi, function (s, s1, s2) {
    return 'vizir';
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