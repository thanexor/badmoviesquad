import firebase from './firebase'

import store from 'reduxState/store'
import { getUserEmail } from 'reduxState/selectors'

const db = firebase.firestore()

export async function recordPick({ movieId }) {
  const email = getUserEmail(store.getState())

  const ref = await firebase.firestore()
    .collection('Activity')
    .add({
      type: 'pick',
      movie: movieId,
      picker: email,
    })

  return ref
}

export async function recordOutbid({ movieId }) {

}

export async function recordLike({ movieId }) {

}

export async function recordDislike({ movieId }) {

}