import firebase from './firebase'
import store from '../store'
import {
  loginAs,
  logout,
} from '../redux/actions'

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(loginAs(user))
  } else {
    store.dispatch(logout())
  }
});

export function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}