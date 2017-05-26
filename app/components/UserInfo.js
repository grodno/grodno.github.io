import { Component } from 'ui';
import moment from 'moment';
import Store from '../Store.js';

export default class UserInfo extends Component {

  static TEMPLATE =
    `<div class="ui raised segment">
      <a class="ui yellow image label">
          <i class="jp flag"></i>
          {{profile.name}}
          <div class="detail">Citizen</div>
      </a>
      <div class="ui divided selection list">
        <div class="item" each="contact of contacts">
          <div class="ui {{contact.color}} horizontal label">{{contact.type}}</div>
          <a href="{{contact.link}}" target="_blank">{{contact.text}}</a>
        </div>
      </div>
    </div>`;

  static PROPS = {
    uid: { default: 0 },
    profile: { default: {} }
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

  get contacts() {
    const phones = this.profile.phones;
    const email = this.profile.email;
    return []
      .concat(email ? { type:'email', color:'teal', link:`mailto:${email}`, text:email } : [])
      .concat(phones ? phones.split(',').map(e=> ({ type:'phone', color:'green', link:`tel:${e}`, text:e })) : []);
  }

  get itemDate() {
    const val = this.get('item.date') || '';
    return moment(val).fromNow();
  }

  onInit() {
    // Store.subscribe('changed', { handleEvent: ({ target })=>{
    //   this.profile = target.userInfo(this.uid);
    // } });
    // $('.ui.accordion').accordion();
  }
}
