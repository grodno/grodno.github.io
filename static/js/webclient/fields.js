(function() {
  Object.entity.defineProperty({
    id: "SubmitSupport",
    mixin: function(_super) {
      var RE_TILDA;
      RE_TILDA = /~/g;
      return {
        validateFields: function() {
          var ev, ev0, f, firstInput, valid, _i, _len, _ref;
          ev = {
            stack: []
          };
          valid = true;
          if (this.fields) {
            _ref = this.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              f = _ref[_i];
              ev0 = Object.entity.get(f).checkIfValid();
              if (ev0.stack.length) {
                ev.stack.push.apply(ev.stack, ev0.stack);
              }
            }
            if (!(valid = !ev.stack.length)) {
              if (firstInput = ev.stack[0].entity.valueElt) {
                firstInput.domNode.focus();
              }
              this.error(ev);
            }
          }
          return valid;
        },
        fieldsValues: function() {
          var key, r, _i, _j, _len, _len1, _ref, _ref1;
          r = {};
          if (this.fields) {
            _ref = this.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              key = _ref[_i];
              Object.prop(r, key.replace(RE_TILDA, "."), Object.entity.get(key).getValue());
            }
          }
          if (this.inputs) {
            _ref1 = this.inputs;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              key = _ref1[_j];
              Object.prop(r, key.replace(RE_TILDA, "."), window.document.getElementById(key).value);
            }
          }
          return r;
        },
        getFields: function() {
          var key, r, _i, _len, _ref;
          r = {};
          if (this.fields) {
            _ref = this.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              key = _ref[_i];
              r[key] = Object.entity.get(key);
            }
          }
          return r;
        },
        create_onload_handler: function() {
          var T;
          T = this;
          return function(ev) {
            var doc, err, frame, value, win;
            if (!T.frameElt) {
              return;
            }
            frame = T.frameElt.domNode;
            doc = frame.contentDocument;
            win = frame.contentWindow || doc.window || frame;
            if (win.location.href === "about:blank") {
              return;
            }
            err = null;
            value = Object.parse(doc.body.innerText || doc.body.textContent || doc.body.innerHTML);
            if (!value) {
              value = {
                errors: [
                  {
                    reason: "server_error"
                  }
                ]
              };
            }
            if (value.errors && value.errors.length) {
              err = {
                stack: value.errors
              };
            }
            return T.onResult(err, value);
          };
        },
        onResult: function(err, value) {
          if (err) {
            return this.error(err);
          } else {
            return this.success(value);
          }
        },
        error: function(err) {
          return Object.dom.handleError(err, this);
        },
        success: function(x) {
          return x;
        }
      };
    }
  });

  Object.entity.define({
    id: "AsyncButton extends Button",
    properties: ["support:SubmitSupport"],
    busyCaption: "in_progress",
    methods: function(_super) {
      return {
        createAsyncDoc: function() {
          return this.fieldsValues();
        },
        async: function() {
          return this.validateFields() && this.createAsyncEvent();
        },
        createAsyncEvent: function() {
          return {
            uri: this.asyncUrl,
            doc: this.createAsyncDoc(),
            callback: this.createAsyncCallback()
          };
        },
        createAsyncCallback: function() {
          return this.onResult;
        }
      };
    }
  });

  Object.entity.define({
    id: "Form extends Box",
    properties: ["disabled:Disabled", "support:SubmitSupport", "value:Values"],
    domNodeType: "form",
    domNodeAttrs: {
      onsubmit: function() {
        return false;
      }
    },
    submit: function() {
      return this.domNode.submit();
    }
  });

  Object.entity.define({
    id: "SubmitForm extends Form",
    enctype: "application/x-www-form-urlencoded",
    method: "post",
    action: "#",
    methods: function(_super) {
      return {
        init: function() {
          var T, id;
          T = this;
          id = this.id;
          if (!this.domNode) {
            this.domNode = Object.dom.createComplexElement(String.format("<form enctype=\"{0}\" method=\"{1}\" target=\"{2}_target\" action=\"{3}\"></form>", this.enctype, this.method, this.id, this.action), this.domNodeAttrs);
          }
          Object.dom.listenEvents(this, "submit", function() {
            return T.validateFields();
          });
          _super.init.call(this);
          return this.createChild({
            id: id + "_target:View",
            onInited: function() {
              return T.frameElt = this;
            },
            domNode: Object.dom.createComplexElement("<iframe src=\"about:blank\" style=\"display:none;\" name=\"" + this.id + "_target\"></iframe>")
          }, function(err, e) {
            e && Object.dom.listenEvents(e, "load", this.create_onload_handler());
          });
        },
        childrenAdapter: function(ch) {
          return [].concat(ch);
        }
      };
    }
  });

  Object.entity.define({
    id: "SubmitButton extends View",
    methods: function(_super) {
      return {
        init: function() {
          this.domNode = Object.dom.createComplexElement("<input type=\"submit\"/>", {
            value: String.localize(this.caption)
          });
          return _super.init.call(this);
        }
      };
    }
  });

  Object.entity.define({
    id: "FileContent extends Field",
    methods: function(_super) {
      return {
        childrenAdapter: function(ch) {
          var T;
          return _super.childrenAdapter.call(T = this, [
            {
              id: this.id + "_input:View",
              onInited: function() {
                return T.valueElt = this;
              },
              domNode: Object.dom.createComplexElement(String.format("<input type=\"file\" class=\"{0}\" name=\"{1}\"/>", this.valueStyle, this.fileFieldName || this.id), {
                onchange: this.create_onchange_handler()
              })
            }
          ].concat(ch));
        },
        create_onchange_handler: function() {
          return (function(_this) {
            return function(ev) {
              var f, reader, _i, _len, _ref;
              _ref = ev.target.files;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                f = _ref[_i];
                reader = new FileReader();
                reader.onload = function(e) {
                  _this.prop('file', f);
                  return _this.prop('value', e.target.result);
                };
                reader.readAsBinaryString(f);
                return;
              }
            };
          })(this);
        }
      };
    }
  });

  Object.entity.define({
    id: "FileUploader extends Field",
    properties: ["attempt", "submitSupport:SubmitSupport"],
    methods: function(_super) {
      return {
        init: function() {
          if (!this.domNode) {
            this.domNode = Object.dom.createComplexElement(String.format("<form enctype=\"multipart/form-data\", method=\"post\" target=\"{0}_target\" action=\"{1}\"></form>", this.id, this.action), this.domNodeAttrs);
          }
          _super.init.call(this);
          Object.dom.listenEvents(this.frameElt, "load", this.create_onload_handler());
        },
        childrenAdapter: function(ch) {
          var T, id;
          T = this;
          id = this.id;
          return _super.childrenAdapter.call(this, [
            {
              id: id + "_input:View",
              onInited: function() {
                return T.valueElt = this;
              },
              domNode: Object.dom.createComplexElement(String.format("<input type=\"file\" class=\"{0}\" name=\"{1}\"/>", this.valueStyle, this.fileFieldName || id), {
                onchange: this.create_onchange_handler()
              })
            }, {
              id: id + "_link:View",
              onInited: function() {
                return T.linkElt = this;
              },
              domNodeType: "a",
              domNodeAttrs: {
                target: "_blank"
              }
            }, {
              onInited: function() {
                return T.frameElt = this;
              },
              id: id + "_target:View",
              domNode: Object.dom.createComplexElement("<iframe src=\"about:blank\" style=\"display:none;\" name=\"" + this.id + "_target\"></iframe>", {
                onload: this.create_onload_handler()
              })
            }
          ].concat(ch));
        },
        submit: function() {
          var _base;
          return typeof (_base = this.domNode).submit === "function" ? _base.submit() : void 0;
        },
        create_onchange_handler: function() {
          return function(ev) {
            return true;
          };
        },
        error: function(ev) {
          ev.alertEntity = this.linkElt;
          return _super.error.call(this, ev);
        },
        success: function(ev) {
          var a, url;
          url = "" + (ev && ev.uri || "");
          if (url) {
            a = this.linkElt.domNode;
            a.className = "";
            a.innerHTML = "link";
            this.setValue(a.href = "//" + url);
          }
          return this.prop("attempt", 1 + (this.prop("attempt" || 0)));
        }
      };
    }
  });


  /*
  UI field ancestor.
   */

  Object.entity.define({
    id: "Field extends Box",
    properties: ["caption:Caption", "value:Value", "disabled:Disabled", 'hint'],
    children: [],
    caption: "",
    style: "form-group",
    valueBoxStyle: "form-input-container",
    valueStyle: "form-control",
    captionStyle: "control-label",
    methods: function(_super) {
      return {
        init: function() {
          var _ref;
          this.caption = this.caption || ((_ref = this.id) != null ? _ref.split(".")[-1] : void 0);
          return _super.init.call(this);
        },
        childrenAdapter: function(ch) {
          var T;
          T = this;
          if (!(ch != null ? ch.length : void 0)) {
            ch = [
              {
                id: this.id + "_input:View",
                onInited: function() {
                  return T.valueElt = this;
                },
                style: this.valueStyle,
                tapped: function(ev) {
                  return T.doFocus(ev);
                }
              }
            ];
          }
          return [
            {
              id: this.id + "_label:Label",
              onInited: function() {
                return T.captionElt = this;
              },
              domNode: Object.dom.createComplexElement(String.format("<label class=\"{0}\" for=\"{1}_input\"/>", this.captionStyle, this.id))
            }, {
              id: "Box",
              style: this.valueBoxStyle,
              children: ch
            }
          ];
        },
        launchEditor: Function.NONE,
        doFocus: function(ev) {
          this.launchEditor(ev);
        },
        isEditable: function() {
          return !this.readOnly;
        },
        valueChanged: function(ev) {
          this.redrawValue();
        },
        redrawValue: function() {
          if (this.valueElt) {
            this.valueElt.domNode.innerHTML = this.getCValue();
          }
          this.domNodeClass("!error");
        },
        doneEditor: function(ev) {
          var value;
          value = ev.value;
          if (value === this.getValue()) {
            return;
          }
          ev.fromUI = true;
          ev.isEvent = true;
          this.setValue(ev);
        },
        addValidationRule: function(rule) {
          this.rules = (this.rules || []).concat(rule);
        },
        checkIfValid: function() {
          var e, err, rule, valid, _i, _j, _len, _len1, _ref, _ref1;
          err = {
            stack: []
          };
          if (this.isValueRequired() && this.isEmptyValue()) {
            err.stack.push({
              reason: "empty_required_field",
              message: String.localize("empty_required_field", String.localize(this.caption || this.id))
            });
          }
          if (rules) {
            _ref = this.rules;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              rule = _ref[_i];
              rule.call(this, err);
            }
          }
          valid = !err.stack.length;
          if (!valid) {
            _ref1 = err.stack;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              e = _ref1[_j];
              e.entity = this;
            }
          }
          this.toggleDomNodeClass("error", !valid);
          return err;
        },
        isValueRequired: function() {
          return this.valueRequired;
        },
        getCValue: function() {
          return this.getValue();
        },
        getCaptionHtml: function(v, ev) {
          return String.localize(v || this.id) + (this.valueRequired ? " <span class=\"required\">*</span>" : "");
        },
        disabledChanged: function(ev, v) {
          _super.disabledChanged.apply(this, arguments);
          return Object.prop(this, "valueElt.domNode.disabled", v);
        },
        hintChanged: function(ev, v) {
          var _ref;
          return (_ref = this.hintElt) != null ? _ref.prop('caption', v) : void 0;
        }
      };
    }
  });

  Object.entity.define({
    id: "Input extends Field",
    alive: true,
    maxLength: 128,
    inputTag: "input",
    inputType: "text",
    methods: function(_super) {
      return {
        childrenAdapter: function(ch) {
          ch = this.getInputChildrenMeta();
          return _super.childrenAdapter.call(this, ch);
        },
        getInputChildrenMeta: function(ch) {
          var T;
          T = this;
          return [
            {
              id: this.id + "_input:View",
              domNode: this.create_inputNode(),
              style: this.valueStyle,
              onInited: function() {
                return T.valueElt = this;
              }
            }
          ];
        },
        create_inputNode: function() {
          var _done;
          _done = this.create_onblur_handler();
          return Object.dom.createComplexElement(String.format("<{0} type=\"{1}\" name=\"{2}\" maxLength=\"{3}\"/>", this.inputTag, this.inputType, this.id, this.maxLength), Object.update({
            placeholder: String.localize(this.placeholder),
            onblur: _done,
            onfocusleave: _done,
            onkeydown: this.create_onkeydown_handler()
          }, this.inputNodeAttrs));
        },
        create_onblur_handler: function() {
          var T;
          T = this;
          return function(ev) {
            T.doneEditor({
              value: this.value
            });
            return true;
          };
        },
        create_onkeydown_handler: function() {
          var T;
          T = this;
          return function(ev) {
            ev = ev || window.event;
            if (ev.keyCode === 13) {
              T.doneEditor({
                value: this.value
              });
            }
            return true;
          };
        },
        redrawValue: function() {
          var _ref;
          if ((_ref = this.valueElt) != null) {
            _ref.domNode.value = this.getValue();
          }
          return this.domNodeClass("!ui-error");
        },
        tapped: function(ev) {
          var _ref;
          return (_ref = this.valueElt) != null ? _ref.domNode.focus() : void 0;
        },
        hintChanged: function(ev, v) {
          var _ref;
          return (_ref = this.valueElt) != null ? _ref.domNode.placeholder = v : void 0;
        }
      };
    }
  });

  Object.entity.define({
    id: "Textarea extends Input",
    inputTag: "textarea",
    maxLength: 8192
  });

  Object.entity.define({
    id: "PasswordInput extends Input",
    inputType: "password"
  });

  Object.entity.define({
    id: "DateInput extends Input",
    inputType: "date"
  });

  Object.entity.define({
    id: "Dropdown extends Input",
    properties: ["data"],
    dataIdKey: 'id',
    methods: function(_super) {
      var _newOption;
      _newOption = function(id, name, isv) {
        if (name == null) {
          name = id;
        }
        if (isv == null) {
          isv = false;
        }
        return new Option(name, id, isv, isv);
      };
      return {
        getInputChildrenMeta: function(ch) {
          var T;
          T = this;
          return [
            {
              id: this.id + "_input:View",
              onInited: function() {
                return T.valueElt = this;
              },
              domNodeType: "select",
              style: this.valueStyle,
              domNodeAttrs: {
                onchange: this.create_onchange_handler()
              }
            }
          ];
        },
        tapped: function(ev) {
          var _ref;
          return (_ref = this.valueElt) != null ? _ref.domNode.focus() : void 0;
        },
        create_onchange_handler: function() {
          var T;
          T = this;
          return function(ev) {
            T.doneEditor({
              value: this.selectedIndex ? T.data[this.selectedIndex - 1][T.dataIdKey] : ''
            });
            return true;
          };
        },
        dataChanged: function(ev, data) {
          var d, i, id, isv, options, _i, _len;
          _super.dataChanged.call(this, ev, data);
          options = this.valueElt.domNode.options;
          options.length = 0;
          if (data === null) {
            options[0] = _newOption('', 'Loading...');
          } else {
            options[0] = _newOption('', '', !this.value);
            for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
              d = data[i];
              if (!(id = d[this.dataIdKey])) {
                continue;
              }
              isv = id === this.value;
              this.valueElt.domNode.options[i + 1] = _newOption(id, d.name, isv);
              if (isv) {
                this.prop('datum', d);
              }
            }
          }
          return ev;
        },
        redrawValue: function() {
          var d, i, id, _i, _len, _ref;
          if (this.data) {
            _ref = this.data;
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              d = _ref[i];
              if (!((id = d[this.dataIdKey]) === this.value)) {
                continue;
              }
              this.prop('datum', d);
              this.valueElt.domNode.selectedIndex = i + 1;
              return;
            }
          }
          return this.valueElt.domNode.selectedIndex = 0;
        }
      };
    }
  });

  Object.entity.define({
    id: "Checkbox extends Field",
    captionStyle: "checkbox",
    childrenAdapter: function(ch) {
      var T, _done;
      T = this;
      _done = function(ev) {
        T.doneEditor({
          value: !!this.checked
        });
        return true;
      };
      return [
        {
          id: "Box",
          style: this.valueBoxStyle,
          children: [
            {
              id: "View",
              onInited: function() {
                return T.valueElt = this;
              },
              domNodeType: "input",
              style: this.valueStyle1,
              domNodeAttrs: {
                onchange: _done,
                type: "checkbox",
                value: true,
                disabled: this.disabled,
                checked: !!this.getValue()
              }
            }, {
              id: "View",
              onInited: function() {
                return T.captionElt = this;
              },
              domNodeType: "span",
              css: "display:inline;padding-left:8px"
            }
          ]
        }
      ];
    },
    redrawValue: function() {
      if (this.valueElt) {
        this.valueElt.domNode.checked = !!this.getValue();
      }
    }
  });

  Object.entity.define({
    id: "Fieldset extends Box",
    domNodeType: "fieldset",
    childrenAdapter: function(ch) {
      ch.unshift({
        id: this.id + "_label:Label",
        domNodeType: "legend",
        style: this.captionStyle,
        caption: this.caption
      });
      return ch;
    }
  });

}).call(this);
