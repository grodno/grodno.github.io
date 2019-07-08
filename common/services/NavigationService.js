import { urlParse, capitalize } from 'furnitura';

export class NavigationService {

  constructor({ api, ref }) {
    Object.assign(this, { api, ref, state: {} });
  }

  init() {
    const hashchange = () => this.api.emit(this.ref + ':hash', { value: window.location.hash.slice(1) });
    window.addEventListener('hashchange', hashchange);
    hashchange();
  }
  update(d) {
    const { target, path, params } = d;
    const module = (target === '*' ? this.state.module : target) || 'main';

    this.state = {
      module,
      page: capitalize(module) + capitalize(path[0] === '*' ? this.state.page : path[0] || '') + 'Page',
      section: path[1] === '*' ? this.state.section : path[1] || 'main',
      ...params
    };
  }
  getParam(k) { return this.state.params[k]; }
  getState() { return this.state; }
  getModuleName() { return this.getItems().find(e => e.id === this.state.module).name; }

  onHash({ data: { value } }) {
    this.update(urlParse(value));
  }

  getItems() {
    return Object.R('sitemap');
  }

  getSitemap() {
    return Object.R('sitemap');
  }

  getEmpty() {
    return [];
  }

  onUpdate({ path: [ns], data }) {
    this.update(ns ? { [ns]: data } : data);
  }
  onClose(_) {
    return this.update({ open: false, newEntry: null, id: null });
  }
  onAddNew(_) {
    return this.update({ open: true, newEntry: {}, id: null });
  }
  onOpenItem({ data: { value } }) {
    return this.update({ open: true, id: value, newEntry: null });
  }
  onSort({ data: { value } }) {
    return this.update({ sortBy: value });
  }
}
