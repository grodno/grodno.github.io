function getTranslatedUrl(url) {
  return 'https://translate.google.com/translate?hl=en&sl=auto&tl=be&u=' + encodeURIComponent(url);
}

var API = {

  translate: function (input, _opts) {

    var opts = _opts || {};
    var tk = new Date().valueOf() % 1000000;

    return request(

      'https://translate.googleapis.com/translate_a/single?client=gtx' +
      '&sl=' + (opts.sourceLang || 'ru') + '&tl=' + (opts.targetLang || 'be') +
      '&dt=bd&dj=1&dt=t&source=icon' +
      '&tk=' + (tk + '.' + tk)
      ,
      {
        method: 'POST',
        payload: 'q=' + (input.map(function (e) {
          return e.replace(/\|/g, '-');
        }).join('|')),

        adapter: function (r) {
          if (!r) {
            return input;
          }
          return r.sentences.map(function (e) {
            return e.trans;
          }).join('').split('|');
        }
      });
  }
};
