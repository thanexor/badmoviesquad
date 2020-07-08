import firebase from './firebase'
import store from 'reduxState/store'
import {
  loginAs,
  logout,
} from 'reduxState/actions'

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(loginAs({
      email: user.email,
      displayName: user.displayName,
    }))
  } else {
    store.dispatch(logout())
  }
});

export function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    store.dispatch(loginAs({
      email: user.email,
      displayName: user.displayName,
    }))
  }).catch(function({ code, message, email, credential }) {
    console.error("Error signing in: ", message)
  });
}