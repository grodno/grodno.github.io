import { Component } from 'ui';
import { translit } from 'mova';
import moment from 'moment';
import Store from '../Store.js';

export default class NewsList extends Component {

  static TEMPLATE =

    `<section>
      <Tags data="{{data}}" selectionChanged="{{onTagsChanged}}"/>
      <div class="ui divided items">

        <div class="item"  each="item of data">
          <div class="image">
          <img src="{{item.image}}"/>
          <div class="meta">
            <span class="cinema">{{itemDate}}</span>
          </div>
          <div class="extra">
            <div each="tag of itemTags" class="ui label"><i class="globe icon"></i> {{tag}}</div>
          </div>
          </div>
          <div class="content">
            <a class="header"  href="{{item.link}}" target="_blank">{{itemSubject}}</a>
            <div class="description">
              <p>
              {{itemPreview}}
              </p>
            </div>

          </div>
        </div>

      <block if="data.length">
        <else><small class="empty">...</small></else>
      </block>
    </div>
    </section>`;

  get itemSubject() {

    const item = this.get('item');
    return translit(item.subject.slice(0, 50) +
     decodeURIComponent(item.subject.length > 50 ? '...' : ''));
  }

  get itemPreview() {
    const val = this.get('item.preview') || '';
    return translit(val);
  }

  get itemTags() {
    const val = this.get('item.tags') || '';
    return val.split(',');
  }

  get itemDate() {
    const val = this.get('item.date') || '';
    return moment(val).fromNow().replace('ago', 'tamu')
    .replace('hours', 'qasow')
    .replace('hour', 'qas')
    .replace('days', 'dzon')
    .replace('day', 'dzen')
    ;
  }

  reload() {
    const keys = this.tagIds ? [...this.tagIds.values()] : [];
    Store.db.news.orderBy('date').reverse().toArray().then((data)=>{
        this.update({ data: data.filter(e=>{
          const tags = e.tags.split(',');
          for (let tag of keys) {
            if (!tags.includes(tag)) {
              return false;
            }
          }
          return true;
        })
      });
    });
  }

  onInit() {
    Store.subscribeAndEmit('changed', { handleEvent: ()=>{
      this.reload();
    } });

  }

  onTagsChanged(value) {
    this.tagIds = value;
    this.log(value);
    this.reload();
  }
}
