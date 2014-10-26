(function() {
  Object.entity.define({
    id: "webclient.AceEditor extends View",
    properties: ['value', 'mode', 'theme'],
    css: "position: relative;height: 250px;",
    methods: function(_super) {
      return {
        init: function() {
          _super.init.call(this);
          return this.editor.getSession().on('change', (function(_this) {
            return function(e) {
              if (_this.defered) {
                return;
              }
              _this.defered = true;
              return Function.delayed(1000, function() {
                _this.defered = false;
                _this.isOnChange = true;
                _this.prop('value', _this.editor.getValue());
                return _this.isOnChange = false;
              });
            };
          })(this));
        },
        domNodeChanged: function(ev, domNode) {
          this.editor = window.ace.edit(domNode);
          this.editor.setTheme("ace/theme/twilight");
          return this.editor.getSession().setMode("ace/mode/coffee");
        },
        valueChanged: function(ev, value) {
          if (!this.isOnChange) {
            return this.editor.setValue(value);
          }
        }
      };
    }
  });

}).call(this);
