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
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    debugger
  });
}