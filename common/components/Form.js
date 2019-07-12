
const FIELD_TYPES = {
  enum: 'EnumField',
  ref: 'RefField',
  text: 'TextareaField',
  dict: 'DictField',
  bool: 'SwitchField'
};

export class FormField {
  get TEMPLATE() {
    return /* html */ `
    <ui:fragment ui:if="fieldShown">
      <ui:tag tag="{{fieldType}}" ui:props="{{fieldProps}}" onChange="{{fieldChange}}"/>
    </ui:fragment>`;
  }
  getFieldChange() {
    return ({ value }) => this.onChange({ [this.id]: value });
  }
  getFieldType() {
    return FIELD_TYPES[this.type] || 'TextField';
  }
  getFieldShown() {
    const field = this
    return true;
  }
  getFieldProps() {
    const field = this
    const data = this.data || {};
    const value = data[field.id];
    return {
      ...field,
      typeSpec: field.typeSpec ? field.typeSpec.replace(/\{\{(\w+)\}\}/g, (_, p) => this.getData()[p]) : null,
      caption: field.id,
      value: value === undefined ? null : value,
    };
  }
}
export class Form {
  get TEMPLATE() {
    return /* html */ `
    <div class="docs-demo columns">
      <div class="column col-9 col-sm-12">
        <div class="form-horizontal2">
          <FormField ui:each="field of fields" ui:props="{{field}}" data="{{data}}" onChange="{{up}}"/>
        </div>
      </div>
    </div>`;
  }
  getUp() {
    return (delta) => {
      this.data = { ...this.data, ...delta }
      this.change && this.change({ data: this.data });
    }
  }
}
