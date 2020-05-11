import { AService } from "./AService";

export class UserService extends AService {
  get fb() {
    return this.$.app.firebase.impl;
  }
  init() {
    this.fb.listenUser((user) => {
      if (user) {
      } else {
        this.fb.signInAnonymously();
        // User is signed out.
        // ...
      }
      this.emit("signed");
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
    return !user
      ? { isLoading: true }
      : {
          ...user,
          isLoading: false,
        };
  }
  onLogin() {
    return this.fb.linkProvider();
  }
  onLogout() {
    return this.fb.logout();
  }
  onSigned() {
    return {
      _: NaN,
    };
  }
}
