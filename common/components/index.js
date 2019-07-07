import components from './components.html';
import elements from './elements.html';
import layouts from './layouts.html';
import userinfo from './UserInfo.html';
import { loadTemplates } from 'protum/support.js';

export default [
  ...loadTemplates(components, elements, layouts, userinfo)
];
