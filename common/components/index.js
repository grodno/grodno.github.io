import { Tags } from './Tags.js';
import components from './components.html';
import elements from './elements.html';
import layouts from './layouts.html';
import userinfo from './UserInfo.html';
import { loadTemplates } from 'adzin/support.js';

export default [
  Tags,
  ...loadTemplates(components, elements, layouts, userinfo)
];
