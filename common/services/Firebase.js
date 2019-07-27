import '../../vendor/firebase/firebase-app.js';
import '../../vendor/firebase/firebase-firestore.js';
import '../../vendor/firebase/firebase-auth.js';
import { ApiService } from 'armatura';

const unpackDocs = s => s.docs.reduce((r, e) => {
  const d = e.data();
  d.id = e.id;
  r.push(d);
  return r;
}, []);

export class Firebase extends ApiService {
  constructor(options) {
    super(options)
    const firebase = window.firebase;
    firebase.initializeApp(this.config);
    this.firestore = firebase.firestore();
    this.firestore.enablePersistence({ synchronizeTabs: true }).catch(function (err) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
    this.auth = firebase.auth();
    this.auth.languageCode = 'by';
    this.providers = {
      Google: firebase.auth.GoogleAuthProvider
    };
  }

  done() {
    const firebase = window.firebase;
    firebase.app().delete();
  }
  // auth
  signInAnonymously() {
    this.auth.signInAnonymously().catch(function (error) {
      var errorMessage = error.message;
      console.log('signInAnonymously err=' + errorMessage);
    });
  }
  listenUser(cb) {
    this.auth.onAuthStateChanged(cb);
  }
  getCurrentUser() {
    return this.auth.currentUser;
  }
  linkProvider() {
    const provider = new this.providers.Google();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return this.auth.signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken
      // The signed-in user info.
      var googleUser = result.user;
      var credential = this.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
      this.getCurrentUser().linkAndRetrieveDataWithCredential(credential).then(function (usercred) {
        var user = usercred.user;
        console.log('Anonymous account successfully upgraded', user);
      }, function (error) {
        console.log('Error upgrading anonymous account', error);
      });
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code
      var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential
      console.log('signInAnonymously err=' + errorMessage);
      // ...
    });
  }
  logout() {
    return this.signInAnonymously();
  }
  getCollection(coll, since) {
    return ((c) => since ? c.where('modified_at', '>', since) : c)(this.firestore.collection(coll))
      .get().then(unpackDocs);
  }
  // db
  listenCollection(coll, ts = 0, cb) {
    return ((c) => ts ? c.where('modified_at', '>', ts) : c)(this.firestore.collection(coll))
      .onSnapshot(function (querySnapshot) {
        var r = [];
        querySnapshot.forEach(function (e) {
          const d = e.data();
          d.id = e.id;
          r.push(d);
        });
        cb(null, { [coll]: r });
      });
  }
  nextId(coll) {
    return this.firestore.collection(coll).doc().id;
  }
  update(delta) {
    const now = Date.now().valueOf();
    // Get a new write batch
    var batch = this.firestore.batch();
    Object.keys(delta).forEach(coll => {
      const c = this.firestore.collection(coll);
      delta[coll].forEach(d => {
        d.modified_at = now;
        var ref = c.doc('' + d.id);
        batch.set(ref, d, { merge: true });
      });
    });
    return batch.commit();
  }
}
const hot = typeof module === 'undefined' ? null : module.hot;
if (hot) {
  // hot.addStatusHandler(function (d) {})
  hot.accept();
}
