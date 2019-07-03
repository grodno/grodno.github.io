
const FIELD_TYPES = {
  enum: 'EnumField',
  ref: 'RefField',
  text: 'TextareaField',
  dict: 'DictField',
  bool: 'SwitchField'
};
function onChange({ value }) {
  this.value = value;
  this.delegate.updateData({ [this.id]: this.value });
}
export class Form {
  TEMPLATE() {
    return /* html */ `
    <div class="docs-demo columns">
      <div class="column col-9 col-sm-12">
        <div class="form-horizontal">
          <ui:fieldType ui:each="field of fields" ui:props="{{fieldProps}}" ui:if="fieldShown"/>
        </div>
      </div>
    </div>`;
  }
  getData() {
    return this.data || (this.data = {});
  }
  getFieldType() {
    return FIELD_TYPES[this.field.type] || 'TextField';
  }
  getFieldShown() {
    return this.field.shown ? this.field.shown.replace(/\{\{(\w+)\}\}/g, (_, p) => (this.getData()[p] || '')) : true;
  }
  getFieldProps() {
    const field = this.field;
    const data = this.getData();
    const value = data[field.id];
    return {
      ...field,
      typeSpec: field.typeSpec ? field.typeSpec.replace(/\{\{(\w+)\}\}/g, (_, p) => this.getData()[p]) : null,
      caption: field.id,
      value: value === undefined ? null : value,
      delegate: this,
      onChange
    };
  }
  updateData(delta) {
    const data = Object.assign(this.getData(), delta);
    this.assign({ data });
    this.changed && this.changed({ [this.into || 'data']: this.data });
  }
}
