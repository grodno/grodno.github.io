(function() {
  var doReload;

  Object.entity.create({
    id: 'app:webclient.Application',
    title: Object.CONFIG.TITLE,
    plugins: [
      {
        id: "remote:HttpService"
      }, {
        id: "script:ScriptService"
      }, {
        id: "settings:Settings"
      }, {
        id: 'nav:webclient.HashNavigator'
      }, {
        id: "entity:EntityService"
      }, {
        id: "html:HtmlLoader",
        storage: Object.DEBUG ? null : window.localStorage
      }, {
        id: "db:couch.CouchDb",
        remote: Object.CONFIG.COUCHDB
      }, {
        id: "gsheet:Cache",
        storage: window.localStorage,
        uriPattern: 'script://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc={{host}}&sheet={{path}}&jsonp=callback&version={{version}}'
      }, {
        id: "blogger:Cache",
        storage: window.sessionStorage,
        uriPattern: "script://www.googleapis.com/blogger/v3/blogs/{{host}}/posts?key=" + Object.CONFIG.GOOGLE_API_KEY + "&jsonp=callback&_ssl=true&version={{version}}",
        cacheSerializer: function(data) {
          var s;
          if ((s = data != null ? data.items : void 0) && s.length) {
            return JSON.stringify(s);
          } else {
            return null;
          }
        }
      }, {
        id: 'enum:EnumService',
        requires: ['remote://*/js/enums.js']
      }, {
        id: 'l10n:L10nService',
        requires: ['remote://*/js/l10n.js']
      }, {
        id: 'lexio:lexiomated.TextEngine',
        plugins: ['lexiomated.plugin.Numerics', 'lexiomated.plugin.Hardcoded', 'lexiomated.plugin.Morpheus', 'lexiomated.plugin.WordScore', 'lexiomated.plugin.Grodno', 'lexiomated.plugin.SyntaxAnalysis']
      }
    ]
  });

  doReload = function() {
    var i, ls, o, _i, _len;
    ls = window.localStorage;
    for (i = _i = 0, _len = ls.length; _i < _len; i = ++_i) {
      o = ls[i];
      ls.removeItem(ls.key(i));
    }
    return ls;
  };

}).call(this);
