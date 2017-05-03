import { Component } from 'ui';
import moment from 'moment';
import Store from '../Store.js';

export default class AdsList extends Component {

  static TEMPLATE =
    `<div class="ui styled accordion">
      <block each="item of data" class="item">
        <div class="title">
          <i class="dropdown icon"></i>
          <a class="header">{{itemSubject}}</a><span class="small gray date"> - {{itemDate}} </span>
          <a each="tag of itemTags" class="ui teal mini tag label">{{tag}}</a>
          <div class="description">{{itemPreview}}</div>
        </div>
        <div class="content">
          <p class="transition hidden">
            {{item.body}}


          </p>
          <p class="transition hidden">
            <a class="ui yellow image label">
              <i class="jp flag"></i>
              {{item.userName}}
              <div class="detail">Citizen</div>
            </a>

          </p>
        </div>
      </block>
      <block if="data.length">
        <else><small class="empty">No ads</small></else>
      </block>
    </div>`;

  static PROPS = {
    data: { default: [] }
  }

  get itemSubject() {

    const item = this.get('item');
    return item.subject.slice(0, 50) +
     decodeURIComponent(item.subject.length > 50 ? '...' : '');
  }

  get itemPreview() {
    const val = this.get('item.preview') || '';
    return val.replace(/<.*?>/g, ' ').slice(0, 60) +
     (val.length > 60 ? '...' : '');
  }

  get itemTags() {
    const val = this.get('item.tags') || '';
    return val.split(',');
  }

  get itemDate() {
    const val = this.get('item.date') || '';
    return moment(val).fromNow();
  }

  onInit() {
    Store.subscribe('changed', { handleEvent: ({ target })=>{
      this.data = target.adsList;
    } });
    $('.ui.accordion').accordion();
  }
}
