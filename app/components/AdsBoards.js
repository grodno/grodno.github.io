import { Component } from 'ui';
import Store from '../Store.js';

export default class AdsBoards extends Component {

  static TEMPLATE =
    `
<h4 class="ui header">
  <i class="trophy icon"></i>
  <div class="content">
    Ab'javy pa themje
    <div class="ui inline dropdown">
      <div class="text">...</div>
      <i class="dropdown icon"></i>
      <div class="menu">
        <div class="header">Ukazhycje</div>
        <div each="item of data" class="item" data-value="{{item.id}}" data-text="{{item.name}}">{{item.name}}</div>
      </div>
    </div>
  </div>
</h4>`;

  static PROPS = {
    data: { default: [] }
  }

  get itemPreview() {
    const val = this.get('item.preview') || '';
    return val.replace(/<.*?>/g, ' ');
  }

  onInit() {

    window.firebase.database().ref('boards').on('value', ev => {
      const value = ev.val();
      this.data = Object.keys(value).map(k => value[k]);
    });

    $('.ui.dropdown', this.element).dropdown({
      on:'hover',
      action(text, value) {
        Store.setBoard(value);
      }
    });

  }
}
