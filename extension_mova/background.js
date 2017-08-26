(function(chrome) {

  'use strict';

  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      return { cancel: true };
    },
    {
      urls: [
        '*://mc.yandex.ru/metrika/*',
        '*://ad.tam.by/spy/*',
        '*://pagead2.googlesyndication.com/pagead/*',
        '*://www.google-analytics.com/analytics.js',
        '*://tt.onthe.io/*'
      ]//,
      // types: [ "script" ]
    },
    [ "blocking" ]
  );

  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // var redirects, pattern, from, to, redirecUrl;
      // redirects = JSON.parse(localStorage.getItem('redirects') || '[]');
      // for (var i=0; i<redirects.length; i++) {
      //   from = redirects[i][0];
      //   to = redirects[i][1];
      //   try {
      //     pattern = new RegExp(from, 'ig');
      //   } catch(err) {
      //     //bad pattern
      //     continue;
      //   }
      //   match = details.url.match(pattern);
      //   if (match) {
      //     redirectUrl = details.url.replace(pattern, to);
      //     if (redirectUrl != details.url) {
      //       return {redirectUrl: redirectUrl};
      //     }
      //   }
      // }
      // return {};
      return { redirectUrl: getTranslatedUrl(details.url) }
    },
    {
      urls: [
        "<all_urls>",
      ],
      types: ["main_frame"]
    },
    ["blocking"]
  );
})(chrome);