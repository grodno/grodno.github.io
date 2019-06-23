export class UserStore {

  get TEMPLATE() {
    return '<p></p>';
  }
  constructor({ api }, auth) {
    Object.assign(this, {
      top: api,
      auth
    });
  }
  init2() {
    this.auth.listenUser((user) => {
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
        this.auth.signInAnonymously();
        // User is signed out.
        // ...
      }
      // ...
      this.top.notify();
    });
  }
  getInfo() {
    const user = this.auth.getCurrentUser();
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
    this.auth.linkProvider(this.top.notify);
  }
  onLogout() {
    this.auth.logout(this.top.notify);
  }
}
