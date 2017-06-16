import { Component } from 'ui';
import { translit } from 'mova';
import moment from 'moment';
import Store from '../Store.js';

export default class AdsList extends Component {

  static TEMPLATE =

    `<section>
      <Tags data="{{data}}" selectionChanged="{{onTagsChanged}}"/>

      <div class="ui styled accordion">

      <block each="item of data" class="item">
        <div class="title segment">
          <i class="dropdown icon"></i>
          <a class="header" title="{{item.preview}}">{{itemSubject}}</a>
          <span class="small gray date"> - {{itemDate}} </span>
          <br/>
          <span class="ui yellow tag mini label" if="item.location">{{item.location}}</span>
          <span class="ui red tag mini label" if="item.price">{{item.price}}</span>
          <span class="ui tag mini labels"><a each="tag of itemTags" class="ui teal label">{{tag}}</a></span>
        </div>
        <div class="content">
          <p class="transition hidden">
            <div each="line of itemPreviewLines">{{line}}</div>
            -- <a href="https://forum.grodno.net/index.php?topic={{item.topicId}}.0" target="_blank">forum:{{item.topicId}}</a>
          </p>
          <p class="transition hidden">
            <UserInfo uid="{{item.userId}}"/>
          </p>
        </div>
      </block>
      <block if="data.length">
        <else><small class="empty">...</small></else>
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

  get itemPreviewLines() {
    const val = '' + (this.get('item.body') || '');
    return translit(val
    .replace(/<br\s?\/?>/g, '~')
    .replace(/<.*?>/g, ' ')
    .trim()).split('~');
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
    return moment(val).fromNow();
  }

  reload() {
    const boardId = Store.boardId;
    const keys = this.tagIds ? [...this.tagIds.values()] : [];
    Store.db.ads.orderBy('date').reverse().toArray().then((data)=>{
        this.update({ data: data.filter(e=> {
          if (!boardId || e.boardId != boardId) {
            return false;
          }
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

    Store.subscribeAndEmit('changed', ()=> this.reload());

    window.$('.ui.accordion').accordion();
    // $('.header').popup();
  }

  onTagsChanged(value) {
    this.tagIds = value;

    this.reload();
  }
}
