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
      <div class="text">{{caption}}</div>
      <i class="dropdown icon"></i>
      <div class="menu">
        <div class="header">Ukazhycje</div>
        <div each="item of data" class="item" data-value="{{item.id}}" data-text="{{item.name}} ({{item.count}})">{{item.name}} ({{item.count}})</div>
      </div>
    </div>
  </div>
</h4>`;

  static PROPS = {
    data: { default: [{}] },
    caption: { default: 'loading...' }
  }

  get itemPreview() {
    const val = this.get('item.preview') || '';
    return val.replace(/<.*?>/g, ' ');
  }

  onInit() {

    Store.subscribe('changed', ({ data })=>{
      this.update({ data: data.boardsList, caption: data.currentBoard.name });
    });

    $(this.element).find('.ui.dropdown').dropdown({
      on:'hover',
      onChange(value, text, $selectedItem) {
        Store.setBoard(value);
      }
    });
    Store.setBoard(0);
  }
}
