(function (chrome) {

  'use strict';

  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      return { cancel: true };
    },
    {
      urls: [
        '*://mc.yandex.ru/metrika/*',
        // '*://ad.tam.by/spy/*',
        '*://*.googlesyndication.com/pagead/*',
        '*://*.google.com/adsense/*'
        // '*://www.google-analytics.com/analytics.js',
        // '*://tt.onthe.io/*'
      ],
      types: [ "script" ]
    },
    [ "blocking" ]
  );

})(chrome);