import firebase from './firebase'

import store from 'reduxState/store'
import { getUserEmail } from 'reduxState/selectors'

const db = firebase.firestore()

export async function makePick(movieId) {
  const email = getUserEmail(store.getState())

  const movieRef = db.collection('Movies').doc(movieId)
  const userRef = db.collection('Users').doc(email)

  const pickRef = await firebase.firestore()
    .collection('Picks')
    .add({
      movie: movieRef,
      picker: userRef,
      state: "active",
      total_points: 3
    })

  await movieRef.update({
    picks: firebase.firestore.FieldValue.arrayUnion(pickRef)
  })

  return pickRef
}