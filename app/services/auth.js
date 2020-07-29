import firebase from './firebase'
import store from 'reduxState/store'
import {
  loginAs,
  logout,
} from 'reduxState/actions'

const db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    const userRef = await db.collection('Users').doc(user.email)
    const userDetails = await userRef.get()
    const { admin, total_points, lastLogin } = userDetails.data()

    store.dispatch(loginAs({
      admin,
      points: total_points,
      lastLogin: lastLogin ? lastLogin : Date.now(),
      avatarURL: user.photoURL,
      email: user.email,
      displayName: user.displayName,
    }))

    await userRef.update({
      lastLogin: Date.now()
    })
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

export function signOut() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
  }).catch(function({ code, message, email, credential }) {
    console.error("Error signing in: ", message)
  }).finally(() => {
    store.dispatch(logout())
  })
}