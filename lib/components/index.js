import { loadTemplates } from 'armatura';
import { Mapbox } from './Mapbox';
import commons from './commons.html';
import userinfo from './UserInfo.html';

export default [
  Mapbox,
  ...loadTemplates(userinfo, commons)
];
