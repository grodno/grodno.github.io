import { Component } from 'ui';
// import Store from './Store.js';
import TEMPLATE from './Application.html';
import { capitalize } from './str.js';
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

    return capitalize(location.hash.split('#')[1] || 'main').split('-')[0];
  }

  onInit() {
    window.onhashchange = () => this.invalidate();

    // Store.addObserver((event)=>this.invalidate(), this._id);
  }

  onDone() {

    // Store.removeObserver(this._id);
  }

}
