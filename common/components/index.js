import { Tags } from './Tags.js';
import components from './components.html';
import elements from './elements.html';
import { loadTemplates } from '../support.js';

export default [
  Tags,
  ...loadTemplates(components, elements)
];
