(function() {
  var doReload,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Object.DEBUG = !(__indexOf.call(window.location.hostname, 'local') >= 0);

  Object.entity.create({
    id: 'app:webclient.Application',
    title: CONFIG.TITLE,
    plugins: [
      "remote:HttpService", "script:ScriptService", "settings:Settings", {
        id: "entity:EntityLoader"
      }, {
        id: "html:HtmlLoader",
        storage: Object.DEBUG ? null : window.localStorage
      }, {
        id: "db:IndexedDatabase",
        syncUriExpression: "'script://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc=0AqQx4KOOt8TGdEZWZHpBdXAtNlVSMUFMOXppQ3ZuMkE&jsonp=callback&ts='+<@lastSynchedTimestampOnce>",
        version: 5,
        scheme: ['meta', 'links', 'enums', 'error']
      }, {
        id: "gsheet:Cache",
        storage: window.localStorage,
        uriPattern: 'script://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc={{host}}&sheet={{path}}&jsonp=callback&version={{version}}'
      }, {
        id: "blogger:Cache",
        storage: window.sessionStorage,
        uriPattern: "script://www.googleapis.com/blogger/v3/blogs/{{host}}/posts?key=" + CONFIG.GOOGLE_API_KEY + "&jsonp=callback&ssl=true&version={{version}}",
        cacheSerializer: function(data) {
          var s;
          if ((s = data != null ? data.items : void 0) && s.length) {
            return JSON.stringify(s);
          } else {
            return null;
          }
        }
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
