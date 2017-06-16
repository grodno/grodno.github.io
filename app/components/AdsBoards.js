import { Component } from 'ui';
import Store from '../Store.js';

export default class AdsBoards extends Component {

  static TEMPLATE = `
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
    caption: { default: '...' }
  }

  reload() {
    return Store.db.boards.toArray()
      .then(l=>l.filter(e => e.count))
      .then(data=>{
        this.update({
          data
        });
      });
  }

  onInit() {

    Store.subscribeAndEmit('changed', ()=>this.reload());

    window.$(this.element).find('.ui.dropdown').dropdown({
      on:'hover',
      onChange:(value, text, $selectedItem) => {
        this.update({ caption: text });
        Store.setBoard(value);
      }
    });
  }
}
