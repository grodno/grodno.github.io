import { Component } from 'ui';
// import Store from './Store.js';
import TEMPLATE from './Application.html';
import './components';
import './pages';

export default class Application extends Component {

  static TEMPLATE = TEMPLATE;

  static PROPS = {
    name: {},
    version: {},
    current: {}
  };

  get content() {
    return 'Main';
  }
  onInit() {

    // Store.addObserver((event)=>this.invalidate(), this._id);
  }

  onDone() {

    // Store.removeObserver(this._id);
  }

}
