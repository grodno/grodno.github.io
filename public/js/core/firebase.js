
const unpackDocs = s => s.docs.reduce((r, e) => {
  const d = e.data()
  d.id = e.id
  r.push(d)
  return r
}, [])

export class Firestore {
  constructor (config) {
    const firebase = window.firebase
    if (!window.firebaseInited) {
      firebase.initializeApp(config)
      window.firebaseInited = true
    }

    this.db = window.firebase.firestore()
    this.db.settings({ timestampsInSnapshots: true })
    this.auth = firebase.auth()
    this.auth.languageCode = 'by'
    this.providers = {
      Google: firebase.auth.GoogleAuthProvider
    }
  }
  // auth
  signInAnonymously () {
    this.auth.signInAnonymously().catch(function (error) {
      var errorMessage = error.message
      console.log('signInAnonymously err=' + errorMessage)
    })
  }
  listenUser (cb) {
    this.auth.onAuthStateChanged(cb)
  }
  getCurrentUser () {
    return this.auth.currentUser
  }
  linkProvider (cb) {
    const provider = new this.providers.Google()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    this.auth.signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken
      // The signed-in user info.
      var googleUser = result.user
      var credential = this.auth.GoogleAuthProvider.credential(
        googleUser.getAuthResponse().id_token)
      this.getCurrentUser().linkAndRetrieveDataWithCredential(credential).then(function (usercred) {
        var user = usercred.user
        console.log('Anonymous account successfully upgraded', user)
        cb()
      }, function (error) {
        console.log('Error upgrading anonymous account', error)
      })
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code
      var errorMessage = error.message
      // The email of the user's account used.
      // var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential
      console.log('signInAnonymously err=' + errorMessage)
      // ...
    })
  }
  logout (cb) {
    cb()
  }
  // db
  readCollectionSince (coll, ts = 0) {
    return ((c) => ts ? c.where('modified_at', '>', ts) : c)(this.db.collection(coll))
      .get().then(unpackDocs)
  }
  listenCollection (coll, ts = 0, cb) {
    return ((c) => ts ? c.where('modified_at', '>', ts) : c)(this.db.collection(coll))
      .onSnapshot(function (querySnapshot) {
        var r = []
        querySnapshot.forEach(function (e) {
          const d = e.data()
          d.id = e.id
          r.push(d)
        })
        cb(null, {[coll]: r})
      })
  }
  nextId (coll) {
    return this.db.collection(coll).doc().id
  }
  update (delta) {
    const now = Date.now().valueOf()
    // Get a new write batch
    var batch = this.db.batch()
    Object.keys(delta).forEach(coll => {
      const c = this.db.collection(coll)
      delta[coll].forEach(d => {
        d.modified_at = now
        var ref = c.doc('' + d.id)
        batch.set(ref, d, {merge: true})
      })
    })
    return batch.commit()
  }
}
const hot = typeof module === 'undefined' ? null : module.hot
if (hot) {
  // hot.addStatusHandler(function (d) {})
  hot.accept()
}
