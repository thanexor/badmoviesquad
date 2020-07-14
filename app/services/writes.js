import firebase from './firebase'

import store from 'reduxState/store'
import { getUserEmail } from 'reduxState/selectors'
import { get } from 'lodash'

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

export async function completeNight() {
  try {
    console.log('complete night start')
    const nightRefs = await firebase.firestore()
      .collection('Nights')
      .where('state', '==', 'pending')
      .get()

    const nightRef = nightRefs[0]
    console.log('night', nightRef)

    const pickRefs = await db.collection('Picks')
      .where("state", "==", "active")
      .get()

    console.log('picks', pickRefs)

    const promises = []

    nightRef.update({
      completedAt: Date.now(),
      state: 'completed',
    })

    console.log('night updated')

    pickRefs.forEach(ref => promises.push(ref.update({
      night: nightRef,
      state: 'completed',
    })))

    await Promise.all(promises)

    console.log('picks updated')

    return {
      success: true
    }
  }
  catch (e) {
    return {
      success: false,
      error: e.message,
    }
  }
}