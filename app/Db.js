function hashToArray(hash) {
  return Object.keys(hash)
    .map(k => hash[k]);
}
const db = new window.Dexie('Grodno');

db.version(1).stores({
  ads: 'id, date, *tags',
  boards: 'id',
  news: 'id, date, *tags',
  users: 'id, *phones'
});

// Open the database
db.open().catch(function (error) {
  window.console.error('DB.open: ' + error);
});

db.update = function (val) {
  Promise.all(
    ['ads', 'users', 'boards', 'news'].map(c => db[c].bulkPut(hashToArray(val[c])))
  ).then(function () {
    window.console.log('DB.update: ok' );
  })
  .catch(function (error) {
    window.console.error('DB.update: ' + error);
  });
};

export default db;

// window.fetch(value)
// .then(function (response) {
//   return response.json();
// })
// .then( (json) => {
//   this.data = Object.keys(json).map(k=>json[k]);
// }).catch(function (ex) {
//   this.log('parsing failed', ex);
// });
