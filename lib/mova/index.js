import { ReCj, ReKoranj, RePrefixKoranj } from './const.js';
import { mreplace } from './utils.js';
import { cyrlat } from './cyrlat.js';
import { NORMALIZE_LETTERS, NORMALIZE_WORDS } from './const.js';

export function parse(input, output = {}) {
  const roots = output.roots || (output.roots = {});
  const words = output.words || (output.words = {});

  const addItem = function (root, word, count) {
    const wordItem = words[word] || (words[word] = { count: 0, roots: [] });
    wordItem.count += count;
    wordItem.roots.push(root);

    const rootItem = roots[root] || (roots[root] = { count: 0, words: [] });
    rootItem.count += count;
    rootItem.words.push(word);
    return true;
  };

  (input || []).map(function (item, i) {
    var found = false;
    var str = item.origin;

    str.replace(ReCj, function (s, p) { str = str.slice(0, -p.length); });

    str.replace(ReKoranj, function (s, rx) { found = addItem(rx, item.origin, item.count); });
    str.replace(RePrefixKoranj, function (s, p, rx) { found = addItem(rx, item.origin, item.count); });

    if (!found) {
      addItem(str, item.origin, 0);
    }
  });

  return output;
}

export function translit(s) {
  return mreplace(NORMALIZE_WORDS, mreplace(NORMALIZE_LETTERS, cyrlat(s)));
}

export function analyze(text) {
  const input = {};

  const output = { origin: text };

  const addWord = function (w) {
    const ch = w.toLowerCase();
    var item = input[ch] || (input[ch] = { origin: ch, count: 0, samples: [] });
    item.count += 1;
    return w;
  };

  output.normalized = text
    .replace(/[a-z]+/gi, addWord)
    .replace(/[а-яiіў]+/gi, s => addWord(translit(s)));

  parse(Object.keys(input).map(key => input[key]), output);

  return output;
}
