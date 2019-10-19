import spectre from './spectre.html';
import { Form, FormField } from './Form';
import fields from './fields.html';
import { loadTemplates } from './support.js';
import { Filter } from './Filter';
import { Mapbox } from './Mapbox';
import userinfo from './UserInfo.html';

export default [
  Mapbox, Filter, Form, FormField,
  ...loadTemplates(spectre, userinfo, fields)
];
