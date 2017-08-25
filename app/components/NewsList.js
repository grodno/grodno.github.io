import { Component } from 'ui';
import { translit } from 'mova';
import moment from 'moment';
import Store from '../Store.js';

export class NewsListItem extends Component {

  static TEMPLATE =`
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
        <a class="header"  href="{{item.link}}" target="_blank">{{itemSubject}}</a>
        <div class="description">
          <p id="preview">
          {{item.preview}}
          </p>
        </div>
    </div>
    </div>

  `;
    static PROPS={
      item:{
        default:{}
      }
    }

    get itemSubject() {

      const subject = this.item.subject;
      return translit(subject.slice(0, 50) +
       decodeURIComponent(subject.length > 50 ? '...' : ''));
    }

    onInit() {

      super.onInit();
      this.translate();
    }

    invalidate() {

      super.invalidate();
      this.translate();

    }

    translate() {

      this.element.querySelector('#preview').innerHTML = translit(this.item.preview);
    }

    get itemTags() {
      const val = this.item.tags || [];
      return val;
    }

    get itemDate() {
      const val = this.item.date || '';
      return moment(val).fromNow().replace('ago', 'tamu')
      .replace('hours', 'qasow')
      .replace('hour', 'qas')
      .replace('days', 'dzon')
      .replace('day', 'dzen')
      ;
    }

}

export class NewsList extends Component {

  static TEMPLATE =

    `<section>
      <Tags data="{{data}}" selectionChanged="{{onTagsChanged}}"/>
      <div class="ui divided items">
        <NewsListItem item="{{item}}" each="item of data"/>
        <block if="data.length">
          <else><small class="empty">...</small></else>
        </block>
      </div>
    </section>`;

  reload() {
    const keys = this.tagIds ? [...this.tagIds.values()] : [];
    const coll = (keys.length ?
      Store.db.news.where('tags').anyOf(keys) :
      Store.db.news.toCollection());
    coll.limit(50).reverse().sortBy('date')
      .then((data)=>{
        this.update({ data: data.filter(e=>{
          const tags = e.tags;
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
