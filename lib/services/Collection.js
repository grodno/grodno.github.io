import { translit } from 'mova';
import { AService } from './AService';

const analyzeDataByTags = (data, selection, initials = '') => {
  const sel = Object.values(selection).filter(Boolean)
  const reshta = { id: 'zzz', name: '[reshta]', count: 0, selected: false }

  if (sel.length || !initials) {
    const actualData = data.filter(e => sel.reduce((r, s) => r && e.$tags.has(s), true));
    if (!actualData.length && initials) {
      return {
        actualData, tagsHash: initials.split(',')
          .map(id => ({ id, name: id, count: 0, selected: selection[id] }))
          .concat(reshta)
      }
    }
    const tagsHash = actualData.reduce((r, e) => {
      e.$tags.forEach(id => {
        if (id === reshta.id) { return r; }
        const tag = r[id] || (r[id] = { id, name: id, count: 0, selected: selection[id] });
        tag.count++
      })
      return r;
    }, {});
    if (sel.length === 1 && selection[reshta.id]) {
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
        if (tag.id && e.$tags.has(tag.id)) {
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
  return Array.sortBy(Object.keys(words).filter(e => e.includes(kluq)).map(s => ({ name: s, id: s })), 'name')
}
class Item {
  constructor(opts, opts2) {
    Object.assign(this, opts, opts2);
  }
  get ts() { return this.$ts || (this.$ts = this.modified_at || this.created_at || -1) }
  get $tags() { return this.$$tags || (this.$$tags = new Set(('' + (this.tags || '')).split(',').filter(Boolean))) }
  get title() { return this.$title || (this.$title = this.name || this.subject || this.topic || this.id) }
  get $searchData() { return this.$$searchData || (this.$$searchData = (this.title + ' ' + translit(this.title) + ' ' + this.preview + ' ' + translit(this.preview)).toLowerCase()) }
}
export class Collection extends AService {

  constructor(props, $) {
    super(props, $)
    this.selection = {};
    this.shownLimit = 50;
    this.sortBy = '-ts';
    this.kluqPoshuku = ''
  }

  setData(data) {
    this.data = !data ? [] : data.filter(e => e.status !== 'deleted').map(e => new Item(e));
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
    const sortedData = Array.sortBy(actualData, this.sortBy)
    return {
      tags,
      resetTags: Object.keys(this.selection).length ? () => this.emit("this.resetTags") : null,
      data: sortedData.slice(0, this.shownLimit),
      openEntry: ({ id }) => this.emit("this.openEntry", this.data.find(e => e.id === id)),
      counts: {
        total: this.data.length,
        actual: actualData.length,
        hasMore: this.shownLimit < actualData.length
      },
      search: {
        kluq: this.kluqPoshuku,
        value: this.inputKluqPoshuku,
        suggestions: this.kluqPoshuku === this.inputKluqPoshuku ? null : suggestions,
        input: (data) => this.emit("this.inputKluq", data),
        enter: (data) => this.emit("this.znajdzPoKluqu", data),
      }
    }
  }

  onResetTags() {
    return {
      selection: {}
    }
  }

  onTag({ id } , { selection }) {
    return {
      selection: {
        ...selection,
        [id]: selection[id] ? '' : id
      }
    }
  }

  onZnajdzPoKluqu( { value } ) {
    return {
      inputKluqPoshuku: value || '',
      kluqPoshuku: value || ''
    }
  }
  onInputKluq( { value } ) {
    return {
      inputKluqPoshuku: value || ''
    }
  }
  onSortBy( { value } ) {
    return {
      sortBy: value || '-ts'
    }
  }
  onShowMore( { size = 50 }, { shownLimit} ) {
    return {
      shownLimit: shownLimit + size
    }
  }
  /**
   * New Entry
   */

  onOpenAddNew(data) {
    return {
      newEntry: {
        ...data,
        ...this.newEntry,
        cancel: () => this.emit("this.cancelAddNew"),
        submit: (data) => this.emit("this.saveNew", data),
        open: true
      }
    }
  }

  onCancelAddNew() {
    return {
      newEntry: { ...this.newEntry, open: false }
    }
  }

  async onSaveNew(data) {
    delete data.id;
    await this.upsert(data)
    return {
      newEntry: { ...this.newEntry, data, open: false }
    }
  }
  /**
   * Entry
   */

  onOpenEntry(data) {
    return {
      entry: {
        id: data.id,
        data: Object.entries(data).reduce((r, [k, v]) => { if (k[0] !== '$') { r[k] = v } return r }, {}),
        ...this.entry,
        cancel: () => this.emit("this.cancelEntry"),
        submit: (data) => this.emit("this.saveEntry", data),
        delete: () => this.emit("this.deleteEntry", { id: data.id }),
        open: true
      }
    }
  }

  onCancelEntry() {
    return { entry: { open: false } }
  }

  async onSaveEntry(data) {
    await this.upsert(data)
    return { entry: { open: false } }
  }
  async onDeleteEntry(data) {
    await this.upsert({ ...data, status: 'deleted' });
    return { entry: { open: false } }
  }
}
