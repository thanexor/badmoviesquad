import * as firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyB7XiBUzinKlCQ2ymSkVqzcPXcPyxx8364",
  authDomain: "badmoviesquad-1337.firebaseapp.com",
  databaseURL: "https://badmoviesquad-1337.firebaseio.com",
  projectId: "badmoviesquad-1337",
  storageBucket: "badmoviesquad-1337.appspot.com",
  messagingSenderId: "304211569129",
  appId: "1:304211569129:web:d7b896eedf7e95831ec378"
})

let currentUser = null
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user
    console.log(user)
  } else {
    currentUser = null
    console.log('no user logged in!')
  }
});

const db = firebase.firestore()

export function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}

// there's gotta be a better way to do this
function extractData(queryResult) {
  const data = []

  queryResult.forEach(item => {
    data.push(item.data())
  })
  return data
}

export async function getScores() {
  const users = await db.collection('Users')
    .orderBy("total_points", "desc")
    .get()

  return extractData(users)
}

export async function getUpcoming() {
  const activePicks = await db.collection('Picks')
    .where("state", "==", "active")
    .get()

  const extractedData = await extractData(activePicks)

  return Promise.all(
    extractedData.map(async ({movie, picker}) => {
      const data = await Promise.all([
        movie.get(),
        picker.get(),
      ])
      const [fetchedMovie, fetchedPicker] = data
      return {
        movie: fetchedMovie.data(),
        picker: fetchedPicker.data(),
      }
    })
  )
}

export async function getBacklog() {
  return []
}

export async function getMovies() {
  const movies = await db.collection('Movies')
    .get()

  const data = extractData(movies)

  const movieDB_URL = "https://image.tmdb.org/t/p/w300"
  const repairedData = data.map(movie => {
    return {
      ...movie,
      backdrop_path: `${movieDB_URL}${movie.backdrop_path}`,
      poster_path: `${movieDB_URL}${movie.poster_path}`,
    }
  })
  return repairedData
}
