import { sortBy } from 'furnitura';
import { translit } from 'pramova/mova';
import { AService } from './AService.js';

const analyzeDataByTags = (data, selection, initials = '') => {
  const sel = [...selection]
  const reshta = { id: 'zzz', name: '[reshta]', count: 0, selected: false }
  if (sel.length || !initials) {
    const actualData = data.filter(e => sel.reduce((r, s) => r && e.$tags.has(s), true));
    const tagsHash = actualData.reduce((r, e) => {
      e.$tags.forEach(id => {
        if (id === reshta.id) { return r; }
        const tag = r[id] || (r[id] = { id, name: id, count: 0, selected: selection.has(id) });
        tag.count++
      })
      return r;
    }, {});
    if (sel.length === 1 && selection.has(reshta.id)) {
      tagsHash[reshta.id] = Object.assign(reshta, { selected: true });
    }
    return { actualData, tagsHash }
  } else {
    const actualData = data;
    const tagsHash = initials.split(',')
      .map(id => ({ id, name: id, count: 0, selected: false }))
      .concat(reshta)
    actualData.reduce((r, e) => {
      let contained = false
      tagsHash.forEach(tag => {
        if (e.$tags.has(tag.id)) {
          tag.count++
          contained = true;
        }
      })
      if (!contained) {
        e.$tags.add(reshta.id)
        reshta.count++
      }
      return r;
    }, {});
    return { actualData, tagsHash }
  }
}
const getSuggestions = (data, kluq) => {
  const words = {}
  data.forEach(e => e.$searchData.replace(/\w{3,}/g, (w) => { words[w] = 1; return '' }));
  return sortBy(Object.keys(words).filter(e => e.includes(kluq)).map(s => ({ name: s, id: s })), 'name')
}
class Item {
  constructor(opts, opts2) {
    Object.assign(this, opts, opts2);
  }
  get ts() { return this.$ts || (this.$ts = this.modified_at || this.created_at) }
  get $tags() { return this.$$tags || (this.$$tags = new Set((this.tags || '').split(',').filter(Boolean))) }
  get title() { return this.$title || (this.$title = this.name || this.subject || this.topic || this.id) }
  get $searchData() { return this.$$searchData || (this.$$searchData = (this.title + ' ' + translit(this.title) + ' ' + this.preview + ' ' + translit(this.preview)).toLowerCase()) }
}

export class Collection extends AService {

  constructor(options) {
    super(options)
    this.selection = new Set();
    this.shownLimit = 50;
    this.sortBy = '-ts';
    this.kluqPoshuku = ''
  }

  setData(data) {
    this.data = data.map(e => new Item(e));
    this.notify();
  }

  getInfo() {
    if (!this.data) {
      return {}
    }
    const searchedData = !this.kluqPoshuku ? this.data : this.data.filter(e => e.$searchData.includes(this.kluqPoshuku))
    const suggestions = !this.inputKluqPoshuku ? null : getSuggestions(this.data, this.inputKluqPoshuku)
    const { actualData, tagsHash } = analyzeDataByTags(searchedData, this.selection, this.initials)
    const tags = Object.values(tagsHash)
      .sort((a, b) => a.selected === b.selected ? (a.id > b.id ? 1 : -1) : (!a.selected ? 1 : -1));
    // const filter = state.filter;
    // let items = data; // data ? data.filter(filterFn(filter)) : 
    const sortedData = sortBy(actualData, this.sortBy)
    return {
      tags,
      data: sortedData.slice(0, this.shownLimit),
      kluq: this.kluqPoshuku,
      kluqInput: this.inputKluqPoshuku,
      suggestions: this.kluqPoshuku === this.inputKluqPoshuku ? null : suggestions,
      counts: {
        total: this.data.length,
        actual: actualData.length,
        hasMore: this.shownLimit < actualData.length
      }
    }
  }

  onTag({ data: { id } }) {
    if (this.selection.has(id)) { this.selection.delete(id); } else { this.selection.add(id); }
  }

  onZnajdzPoKluqu({ data: { value } }) {
    this.inputKluqPoshuku = value || '';
    this.kluqPoshuku = value || '';
  }
  onInputKluq({ data: { value } }) {
    this.inputKluqPoshuku = value || '';

  }
  onSortBy({ data: { value } }) {
    this.sortBy = value || '-ts';
  }
  onShowMore({ data: { size = 50 } }) {
    this.shownLimit += size;
  }
  /**
   * New Entry
   */
  getNewEntry() {
    return this.newEntry || {};
  }

  onOpenAddNew({ data }) {
    this.newEntry = { ...data, ...this.newEntry, open: true };
  }

  onCancelAddNew() {
    this.newEntry = { ...this.newEntry, open: false };
  }

  async onSaveNew({ data }) {
    delete data.id;
    await this.upsert(data)
    this.newEntry = { ...this.newEntry, data, open: false };
  }

  async onUpdate({ path: [kind], data }) {
    await this.update({ [kind]: [data] });
  }
  async onDelete({ path: [kind, id] }) {
    await this.update({ [kind]: [{ id, status: 'deleted' }] });
  }
  upsert(data, cb) {
    this.log('upsert', data)
    return this.emit('db://upsert/' + this.table + '', data)
  }
}
