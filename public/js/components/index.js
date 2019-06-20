import { Tags } from './Tags.js';
// import * as elements from './elements.js';
// import * as fields from './fields.js';
// import * as Form from './Form.js';
// import * as Modal from './Modal.js';

const toList = o => Object.keys(o).map(k => typeof o[k] === 'function' ? o[k] : { NAME: k, TEMPLATE: o[k] });

export default [
  Tags
  // ...toList(elements),
  // ...toList(fields),
  // ...toList(Form)
  // ...toList(Modal)
];
