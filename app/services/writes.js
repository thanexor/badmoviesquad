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

export async function completeNight() {
  try {
    const nightRefs = await firebase.firestore()
      .collection('Nights')
      .where('state', '==', 'pending')
      .get()

    if (nightRefs.empty) {
      throw ({ message: "No Night to Complete!" })
    }

    const nightRef = nightRefs.docs[0].ref

    await nightRef.update({
      completedAt: Date.now(),
      state: 'completed',
    })

    const pickRefs = await db.collection('Picks')
      .where("state", "==", "active")
      .get()

    const promises = []
    pickRefs.forEach(pick => promises.push(pick.ref.update({
      night: nightRef,
      state: 'completed',
    })))

    await Promise.all(promises)

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

export async function createNight({ title, location, slots }) {
  return db.collection('Nights').add({
    location,
    slots,
    title,
    state: "pending",
  })
}