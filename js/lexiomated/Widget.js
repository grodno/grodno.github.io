(function() {
  Object.entity.define({
    id: "lexiomated.Widget extends Html",
    properties: ["text", "data"],
    methods: function(_super) {
      var _toHtml;
      _toHtml = function(t) {
        var c, cl, sc, title, w;
        if (!t.kind) {
          return "";
        }
        w = t.word;
        cl = ["kind-" + t.kind];
        title = "";
        if (w) {
          c = w.best || w.top;
          sc = c.score;
          title = (c.root ? c.root + " \n," + w : w.top.x);
          cl.push((c.hardcoded ? "hardcoded" : (sc > 49 ? (sc > 99 ? "good" : "norm") : (sc > 10 ? "weak" : "bad"))));
        }
        if (t.kind === "s") {
          return " ";
        } else {
          return String.format("<span title=\"{0}\" class=\"{1}\">{2}</span>", title, cl.concat(t.tags).join(" "), t.input);
        }
      };
      return {
        init: function() {
          return _super.init.call(this);
        },
        dataChanged: function(ev) {
          return this.prop('textUri', 'lexio://#' + ev.value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, function(s, d) {
            return String.fromCharCode(d);
          }));
        },
        textChanged: function(ev, text) {
          var r;
          if (r = text != null ? text.toHtml() : void 0) {
            return this.prop('html', '' + r);
          }
        }
      };
    }
  });

}).call(this);