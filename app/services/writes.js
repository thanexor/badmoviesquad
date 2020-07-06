import firebase from './firebase'

import store from 'reduxState/store'
import { getUserEmail } from 'reduxState/selectors'

const db = firebase.firestore()

export async function makePick(firebase_id) {
  const email = getUserEmail(store.getState())

  const pickRef = await firebase.firestore()
    .collection('Picks')
    .add({
      movie: db.collection('Movies').doc(movieId),
      picker: db.collection('Users').doc(email),
      state: "active",
      total_points: 3
    })

  await movie.update({
    picks: firebase.firestore.FieldValue.arrayUnion(pickRef)
  })

  return pickRef
}