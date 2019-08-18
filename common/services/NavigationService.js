import { urlParse, urlStringify } from 'furnitura';

export class NavigationService {
  init() {
    this.prevHash = ''
    const hashchange = () => {

      const hash = window.location.hash.slice(1);
      if (hash[0] === '/' && hash !== this.prevHash) {
        this.emit('hash', { value: hash.slice(1) });
        this.prevHash = hash
      }
    }
    window.addEventListener('hashchange', hashchange);
    setTimeout(() => hashchange(), 0);
    return () => window.removeEventListener('hashchange', hashchange)
  }

  update(d) {
    const { target, path = ['*'], params } = urlParse(d);
    const state = {
      target: (!target || target === '*' ? this.target : target) || this.defaultTarget || 'main',
      path: path[0] === '*' ? this.path : path,
      params: params.reset ? params : { ...this.params, ...params }
    }
    window.location.hash = this.prevHash = '/' + urlStringify(state)
    return state
  }

  updateParams(params) {
    return this.update({
      params: {
        ...this.params,
        ...params
      }
    })
  }

  getRoute() {
    return {
      module: this.target || this.defaultTarget || 'main',
      params: this.params
    };
  }
  getModuleName() { return this.getSitemap().find(e => e.id === this.state.module).name; }
  getSitemap() { return Object.R('app.sitemap').map(e => ({ ...e, id: '/' + e.id, selected: e.id === (this.target || {}) })); }

  onHash({ data: { value } }) { return this.update(value); }
}

