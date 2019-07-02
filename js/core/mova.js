const CYRLAT = {
  а: 'a',
  е: 'e',
  э: 'e',
  о: 'o',
  ы: 'y',
  i: 'i',
  і: 'i',
  и: 'i',
  й: 'j',
  ь: 'j',
  ю: 'ju',
  я: 'ja',
  ё: 'jo',
  ъ: `'`,
  ж: 'gh',
  ш: 'sh',
  щ: 'sq',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  з: 'z',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
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

  А: 'A',
  Б: 'B',
  В: 'V',
  Г: 'G',
  Д: 'D',
  Е: 'Je',
  Ё: 'Jo',
  Ж: 'Gh',
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
  Щ: 'Sq',
  Э: 'E',
  Ы: 'Y',
  Ь: 'j',
  Ю: 'Ju',
  Я: 'Ja'
};

export const NORMALIZE_LETTERS = [

  // vyprawlenne sq
  [/shq/gi, function (s) { return s[0] + s[2]; }],
  [/dzh/gi, function (s) { return s[0] + 'h'; }],

  // cj i zvarotnae 'sa'
  [/cca\b/g, function (s) { return 'c sa'; }],
  [/(shy|ci|m|j)sja\b/g, function (s, s1) { return s1 + ' sa'; }],
  [/[auyoielq][wjiya]sja\b/g, function (s) { return s[0] + s[1] + ' sa'; }],
  [/[uaoi]cj\b/g, function (s) { return s[0] + 'c'; }],

  // 'j'
  [/(dz)j/gi, function (s, s1) { return s1; }],
  [/jj/gi, function (s) { return `'` + s[0]; }],
  [/lj[nklmspgt]/gi, function (s) { return s[0] + s[2]; }],
  [/\b[nb]ja/gi, function (s, s1) { return s[0] + 'e'; }],
  [/[zcs]j\b/gi, function (s) { return s[0]; }],
  [/(j?)(aja|uju)\b/gi, function (s, g1, g2) { return 'e' + g2[0]; }],
  [/[cln]j[cln]/g, function (s, g1, g2) { return s[0] + (s[0] === s[2] ? '' : s[1]) + s[2]; }],
  [/[ayie]j[aoue]/gi, function (s) { return s[0] === s[2] ? s : s[0] + s[2]; }],
  [/[psgklfzcvbnm]j[aoue]/gi, function (s) { return s[0] + 'i' + s[2]; }]
];

export const NORMALIZE_WORDS = [
  [/\bjosc\b/gi, function (s, s1) { return 'e'; }],
  [/\bkab\b/gi, function (s, s1) { return 'tob'; }],
  [/\bjasqe\b/gi, function (s, s1) { return 'sqe'; }],
  [/\bjak(\w*)\b/gi, function (s, s1) { return s1 ? 'k' + s1 : 'kaj'; }],
  [/\b(c)iaper\b/gi, 'doper'],
  [/\bamalj\b/gi, 'badaj'],
  [/\bkalia\b/gi, 'blizko'],
  [/\b(sionnia)(\w*)\b/gi, function (s, s1, s2) { return 'dobu' + s2; }],

  [/\b(grod)n?(\w*)\b/gi, function (s, s1, s2) { return 'Olgard' + (s2 === 'a' ? '' : s2); }],
  [/\b(garadzen)(\w*)\b/gi, function (s, s1, s2) { return 'Olgard' + (s2 === 'a' ? '' : s2); }],
  [/\b(belarus)(\w*)\b/gi, function (s, s1, s2) { return 'Bulbostan' + s2; }],
  [/\b(save[tc])s?k?(\w*)\b/gi, function (s, s1, s2) { return 'Slavian' + s2; }],
  [/\bj?ewr(o|a)(\w*)\b/gi, function (s, s1, s2) { return 'Ojro' + s2; }],
  [/\brespublik(\w*)\b/gi, function (s, s1, s2) { return 'Req' + s1; }],
  [/\bv?oblasc?n?(\w*)\b/gi, function (s, s1, s2) { return 'ulus' + s1; }],
  [/\brajon?n?(\w*)\b/gi, function (s, s1, s2) { return 'pavet' + s1; }],
  [/\blit(ow|v)(\w+)\b/gi, function (s, s1, s2) { return 'Letuvis' + s2; }],
  [/\bpols(q|k)(\w+)\b/gi, function (s, s1, s2) { return 'Panstv' + s2; }],
  [/\b(lenin)(\w*)\b/gi, function (s, s1, s2) { return 'Perun' + s2; }],
  [/\b(kastryqn)(\w*)\b/gi, function (s, s1, s2) { return 'Kryshn' + s2; }],
  [/\b(prezident)(\w*)\b/gi, function (s, s1, s2) { return 'gauptleuter' + s2; }],
  [/\b(lukashenk)(\w*)\b/gi, function (s, s1, s2) { return 'Karabas'; }],
  [/\b((?:abl|gar|raj)vykankam)(\w*)\b/gi, function (s, s1, s2) { return 'Kurultaj' + s2; }],
  [/\b(naj)([qrtpsdfghklxcvbnm]\w+)\b/gi, function (s, s1, s2) { return s1 + ' ' + s2; }],
  [/\bw/gi, function (s) { return s === 'w' ? 'u' : 'U'; }]
  // 'ja'
  // [/[iy]ja/gi, function (s) { return s[0] + 'e';}]
  // [/[cklmvsnzbp]ja/gi, function (s, g1) { return s[0] + 'i' + s[2];}]
];

export const mreplace = (arr, x) => arr.reduce((s, [re, sub]) => s.replace(re, sub), x);

export const cyrlat = (s) => ('' + s).split('').map(x => (CYRLAT[x] || x)).join('');

export function translit(s) {
  return mreplace(NORMALIZE_WORDS, mreplace(NORMALIZE_LETTERS, cyrlat(s)));
}
