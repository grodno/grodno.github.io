(function() {
  Object.entity.define({
    id: 'couch.DbForm extends View',
    properties: ["value:Values"],
    domNodeChanged: function(ev, domNode) {
      return Object.dom.listenEvents(this, "submit", (function(_this) {
        return function(e) {
          _this.submitDataToDb();
          return Object.dom.stopEvent(e);
        };
      })(this));
    },
    submitDataToDb: function() {
      return Object.event.fire({
        uri: "db://put",
        doc: this.prop('value')
      });
    }
  });

}).call(this);
