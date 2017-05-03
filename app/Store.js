import { EventBus } from 'ui';

function restoreHotReload($) {
  const hot = module && module.hot;
  if (hot) {

    hot.addStatusHandler(function (d) {});
    // hot.accept();
    hot.dispose( d => {
      d.data = $.data;
    });
    const data = hot.data;
    if (data) {
      return data.data || {};
    }
  }
  return {};
}

class Store extends EventBus {

  constructor() {

    super();

    this.data = restoreHotReload(this);

    window.firebase.database().ref('ads').on('value', ev => {
      const value = ev.val();
      const ads = Object.keys(value).map(k => value[k]).sort((a, b)=>(a.date < b.date ? 1 : -1));
      this.update({ ads });
    });

    // window.fetch(value)
    // .then(function (response) {
    //   return response.json();
    // })
    // .then( (json) => {
    //   this.data = Object.keys(json).map(k=>json[k]);
    // }).catch(function (ex) {
    //   this.log('parsing failed', ex);
    // });
  }

  get adsList() {

    return this.data.ads.filter(e=> e.boardId == this.data.boardId);
  }

  update(delta) {

    Object.assign(this.data, delta);

    this.emitEvent({ type: 'changed', target: this });
  }

  setBoard(boardId) {

    this.update({ boardId });
  }

}

const store = new Store();

export default store;
