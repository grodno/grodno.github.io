import '../../vendor/firebase/firebase-app.js';
import '../../vendor/firebase/firebase-firestore.js';
import '../../vendor/firebase/firebase-auth.js';

const unpackDocs = s => s.docs.reduce((r, e) => {
  const d = e.data();
  d.id = e.id;
  r.push(d);
  return r;
}, []);

export class Firebase {
  constructor({ api, ref, props: { config } }) {
    Object.assign(this, { api, ref });
    const firebase = window.firebase;
    firebase.initializeApp(config);
    this.db = firebase.firestore();
    // this.db.settings({ timestampsInSnapshots: true });
    this.db.enablePersistence({ synchronizeTabs: true }).catch(function (err) {
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
  get fb() {
    return this;
  }
  init() {
    this.fb.listenUser((user) => {
      if (user) {
        // User is signed in.
        // var isAnonymous = user.isAnonymous
        // var uid = user.uid
        // var userRef = app.dataInfo.child(app.users);
        // var useridRef = userRef.child(app.userid);
        // useridRef.set({
        //   locations: "",
        //   theme: "",
        //   colorScheme: "",
        //   food: ""
        // });
      } else {
        this.fb.signInAnonymously();
        // User is signed out.
        // ...
      }
      // ...
      this.api.notify(this.ref);
    });
  }
  getInfo() {
    const user = this.fb.getCurrentUser();
    if (user !== null) {
      user.providerData.forEach(function (profile) {
        // console.log('Sign-in provider: ' + profile.providerId)
        // console.log('  Provider-specific UID: ' + profile.uid)
        // console.log('  Name: ' + profile.displayName)
        // console.log('  Email: ' + profile.email)
        // console.log('  Photo URL: ' + profile.photoURL)
      });
    }
    return user || {};
  }
  onLogin() {
    this.fb.linkProvider();
  }
  onLogout() {
    this.fb.logout();
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
  linkProvider(cb) {
    const provider = new this.providers.Google();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.auth.signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken
      // The signed-in user info.
      var googleUser = result.user;
      var credential = this.auth.GoogleAuthProvider.credential(
        googleUser.getAuthResponse().id_token);
      this.getCurrentUser().linkAndRetrieveDataWithCredential(credential).then(function (usercred) {
        var user = usercred.user;
        console.log('Anonymous account successfully upgraded', user);
        cb();
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
  logout(cb) {
    cb();
  }
  getCollection(coll) {
    return this.db.collection(coll).get().then(unpackDocs);
  }
  readCollectionSince(coll, ts = 0) {
    return ((c) => ts ? c.where('modified_at', '>', ts) : c)(this.db.collection(coll))
      .get().then(unpackDocs);
  }
  // db
  listenCollection(coll, ts = 0, cb) {
    return ((c) => ts ? c.where('modified_at', '>', ts) : c)(this.db.collection(coll))
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
    return this.db.collection(coll).doc().id;
  }
  update(delta) {
    const now = Date.now().valueOf();
    // Get a new write batch
    var batch = this.db.batch();
    Object.keys(delta).forEach(coll => {
      const c = this.db.collection(coll);
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
