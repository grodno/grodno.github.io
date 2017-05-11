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

    window.firebase.database().ref().on('value', snapshot => {
      this.update(snapshot.val());
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
    const boardId = this.data.boardId;
    const hash = this.data.ads || {};
    const list = Object.keys(hash)
      .map(k => hash[k])
      .filter(e=> boardId && e.boardId == boardId)
      .sort((a, b)=>(a.date < b.date ? 1 : -1));

    return list;
  }

  get newsList() {
    const hash = this.data.news || {};
    const list = Object.keys(hash)
      .map(k => hash[k])
      .sort((a, b)=>(a.date < b.date ? 1 : -1));

    return list;
  }

  get currentBoard() {
    const boardId = this.data.boardId;
    return (this.data.boards || {})[boardId] || { id: '', name:'...' };
  }

  get boardsList() {

    const hash = this.data.boards || {};
    const ads = this.data.ads || {};
    const counts = {};
    Object.keys(ads).forEach(e => (counts[ads[e].boardId] = ((counts[ads[e].boardId] || 0) + 1)));
    const list = Object.keys(hash).map(k => ({ count: counts[hash[k].id], ...hash[k] }));

    return list
    .filter(e=> e.count)
    .sort((a, b)=>(a.id < b.id ? 1 : -1));
  }

  userInfo(uid) {
    const users = this.data.users || {};
    return users[uid] || { name: uid };
  }

  update(delta) {

    Object.assign(this.data, delta);

    Object.assign(this.data, {
      boardsList: this.boardsList,
      currentBoard: this.currentBoard,
      adsList: this.adsList,
      newsList: this.newsList
    });

    this.emitEvent({ type: 'changed', target: this, data: this.data });
  }

  subscribeAndEmit(key, handler0) {

    const handler = (typeof handler0 === 'function' ) ? { handleEvent: handler0 } : handler0;

    this.subscribe(this.data, handler);

    handler.handleEvent({ type: key, data: this.data });
  }

  setBoard(boardId) {

    this.update({ boardId });
  }

}

const store = new Store();

export default store;
