import { Filter } from './Filter';
import components from './components.html';
import elements from './elements.html';
import layouts from './layouts.html';
import userinfo from './UserInfo.html';
import { loadTemplates } from 'armatura/support.js';

export default [
  Filter,
  ...loadTemplates(components, elements, layouts, userinfo)
];
