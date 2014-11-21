(function() {
  var URI, _ref;

  URI = Object.Uri.parse(('' + ((_ref = this.window) != null ? _ref.location : void 0)) || "");

  Object.DEBUG = true || URI.params.debug;

  if (URI.params.dbpassword) {
    localStorage.setItem('dbpassword', URI.params.dbpassword);
  }

  Object.CONFIG = {
    ID: "grodno.co",
    TITLE: "Grodno",
    VERSION: "1.5.2",
    COPYRIGHT: "2013, Grodno.Co",
    COUCHDB: 'https://iriss.iriscouch.com/lexic',
    MONGODB: "mongodb://grodno:" + (localStorage.getItem('dbpassword')) + "@ds055397.mongolab.com:55397/grodno",
    SOURCES: "0AqQx4KOOt8TGdEZWZHpBdXAtNlVSMUFMOXppQ3ZuMkE",
    GAT: "UA-37246628-1",
    GOOGLE_SHEETS_URI: "https://script.google.com/macros/s/AKfycbx1AsNPawV5QDldh0obaSRkSzaYT1ZA3mbQK40_WFMPDvUjT5cl/exec?doc=",
    GOOGLE_API_KEY: "AIzaSyAGenobWLKI-F6MWzrHIXmviwJww43n2EM"
  };

}).call(this);
