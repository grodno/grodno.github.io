(function() {
  Object.entity.define({
    id: 'couch.DbAddNewButton extends Button',
    properties: ["value"],
    busyCaption: "in progress",
    methods: function(_super) {
      return {
        createAsyncEvent: function() {
          var doc, docId;
          doc = Object.clone(this.prop('value'));
          docId = '';
          if (this.needPromptId) {
            if (!(docId = window.prompt("Enter the Id for a new " + doc.kind))) {
              return null;
            }
          }
          doc.name = [docId, doc.name, this.prop('counter')].join(' ');
          return {
            uri: "db://put/" + docId,
            doc: doc
          };
        }
      };
    }
  });

}).call(this);
