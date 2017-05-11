import { Component } from 'ui';
import { translit } from 'mova';
import moment from 'moment';
import Store from '../Store.js';

export default class NewsList extends Component {

  static TEMPLATE =

    `<section>
      <div class="ui blue mini labels">
        <a class="ui label" each="tag of tags"> {{tag.id}} <div class="detail">{{tag.count}}</div> <i class="icon close"></i> </a>
      </div>
      <div class="ui divided items">
      <block each="item of data" class="item">
        <div class="item">
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
            <a class="header"  href="//s13.ru/archives/{{item.id}}" target="_blank">{{itemSubject}}</a>

            <div class="description">
              <p>
              {{itemPreview}}
              </p>
            </div>

          </div>
        </div>
      </block>
      <block if="data.length">
        <else><small class="empty">No news</small></else>
      </block>
    </div>
    </section>`;

  static PROPS = {
    data: { default: [] }
  }

  get itemSubject() {

    const item = this.get('item');
    return translit(item.subject.slice(0, 50) +
     decodeURIComponent(item.subject.length > 50 ? '...' : ''));
  }

  get itemPreview() {
    const val = this.get('item.preview') || '';
    return translit(val);
  }

  get tags() {
    const tags = this.data.reduce((r, e) => {
      e.tags.split(',').forEach(t=>{
        r[t] = (r[t] || 0) + 1;
      });
      return r;
    }, {});
    return Object.keys(tags).sort().map(id=>({ id, count:tags[id] }));
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

  onInit() {
    Store.subscribe('changed', { handleEvent: ({ data })=>{
      this.update({ data: data.newsList });
    } });
  }
}
