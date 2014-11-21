(function() {
  Object.entity.define({
    id: 'couch.DbAddNewChildButton extends couch.DbAddNewButton',
    properties: ['parentId'],
    methods: function(_super) {
      return {
        createAsyncEvent: function() {
          var doc, ev, pId;
          ev = _super.createAsyncEvent.call(this);
          if ((doc = ev.doc) && (pId = this.prop('parentId'))) {
            doc.parent = pId;
          }
          return ev;
        }
      };
    }
  });

}).call(this);
