(function() {
  Object.entity.define({
    id: 'couch.DbList extends D3List',
    methods: function(_super) {
      return {
        dataAsyncAdapter: function(err, value) {
          return Object.event({
            value: (value != null ? value.items : void 0) || value || null,
            error: err
          });
        },
        dataChanged: function(ev, data) {
          return _super.dataChanged.call(this, ev, data);
        }
      };
    }
  });

}).call(this);
