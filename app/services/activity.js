import firebase from './firebase'

import store from 'reduxState/store'
import { getUserEmail, getUsername } from 'reduxState/selectors'

const db = firebase.firestore()

export async function recordPick({ movieId, movieName }) {
  const email = getUserEmail(store.getState())
  const username = getUsername(store.getState())

  const ref = await firebase.firestore()
    .collection('Activity')
    .add({
      type: 'pick',
      movieId: movieId,
      movieName: movieName,
      userId: email,
      username: username,
      timestamp: Date.now()
    })

  return ref
}

export async function recordOutbid({ movieId, movieName, outbidPickId }) {
  const email = getUserEmail(store.getState())
  const username = getUsername(store.getState())

  const pick = await firebase.firestore()
    .collection('Picks')
    .doc(outbidPickId)
    .get()


  const { movie } = pick.data()

  const movieData = await movie.get()
  const outbidId = movie.id
  const outbidName = movieData.data().title

  const ref = await firebase.firestore()
    .collection('Activity')
    .add({
      type: 'outbid',
      movieId: movieId,
      movieName: movieName,
      outbidId,
      outbidName,
      userId: email,
      username: username,
      timestamp: Date.now()
    })

  return ref
}

export async function recordLike({ movieId }) {

}

export async function recordDislike({ movieId }) {

}