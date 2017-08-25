chrome.webRequest.onBeforeRequest.addListener(
  function () {
    return { cancel: true };
  },
  {
    urls: [ "<all_urls>" ], // Change this to a more specific pattern
    types: [ "script" ]
  },
  [ "blocking" ]
);