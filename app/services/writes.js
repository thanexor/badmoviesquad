import firebase from './firebase'
import admin from 'firebase-admin'

import store from '../store'
import { getUserEmail } from '../redux/selectors'

admin.initializeApp();

export async function makePick(firebase_id) {
  const email = getUserEmail(store.getState())

  const pickRef = await admin.firestore()
    .collection('Picks')
    .add({
      movie: admin.firestore().collection('Movies').doc(movieId),
      picker: admin.firestore().collection('Users').doc(email),
      state: "active",
      total_points: 3
    })

  await movie.update({
    picks: firebase.firestore.FieldValue.arrayUnion(pickRef)
  })

  return pickRef
}