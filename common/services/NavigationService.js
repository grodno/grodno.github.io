import { urlParse, capitalize } from 'furnitura';
import { ApiService } from 'armatura';

export class NavigationService extends ApiService {

  constructor(options) {
    super({ ...options, state: { page: 'NewsPage' } });
  }

  init() {
    const hashchange = () => {
      const hash = window.location.hash.slice(1);
      if (hash[0] === '/') {
        this.emitToMe('hash', { value: hash.slice(1) });
        // window.location.hash = ""
      }
    }
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
  getRoute() { return this.state; }
  getModuleName() { return this.getItems().find(e => e.id === this.state.module).name; }
  getSitemap() { return Object.R('sitemap').map(e => ({ ...e, id: '/' + e.id })); }

  onHash({ data: { value } }) { this.update(urlParse(value)); }
}
