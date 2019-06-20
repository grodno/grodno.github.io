// import UserInfo from './UserInfo.html';

export default ['App', 'Modal', 'UserInfo', 'Elements']
  .map(key => document.getElementById(key + 'Template'))
  .map(top => [...top.import.body.children].map(e => ({ NAME: e.getAttribute('id'), TEMPLATE: e.innerHTML })))
  .reduce((r, e) => r.concat(e), []);
