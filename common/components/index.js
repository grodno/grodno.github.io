import { Filter } from './Filter';
import { Form, FormField } from './Form';
import * as fields from './fields.js';
import components from './components.html';
import elements from './elements.html';
import layouts from './layouts.html';
import userinfo from './UserInfo.html';
import modal from './Modal.html';
import { loadTemplates } from 'armatura/support.js';

export default [
  Filter, Form, FormField,
  ...Object.values(fields),
  ...loadTemplates(components, elements, layouts, userinfo, modal)
];
