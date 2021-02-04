const firebase = require('firebase')

firebase.initializeApp({
  apiKey: "AIzaSyDvM2q1mKESdbL3Bjea5Boph8OsOHBXDx0",
  authDomain: "bms-admin-1337.firebaseapp.com",
  databaseURL: "https://bms-admin-1337.firebaseio.com",
  projectId: "bms-admin-1337",
  storageBucket: "bms-admin-1337.appspot.com",
  messagingSenderId: "42411448045"
})

const db = firebase.firestore()

function run() {
  db.collection('Picks')
    .where("state", "==", "active")
    .get()
    .then(picks => {
      picks.forEach(pick => {
        const pickRef = pick.ref
        const { movie, picker } = pick.data()

        movie.update({
          picks: firebase.firestore.FieldValue.arrayUnion(pickRef)
        })
      })
    })
}

function updatePosters() {
  db.collection('Movies')
    .get()
    .then(async movies => {
      movies.forEach(async doc => {
        const movieRef = doc.ref

        const movie = await movieRef.get()

        const { id, title } = movie.data()
      
        console.log(`updating ${title} (${id})`)

        let response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=fba97c7e6c8f93d931fe92ce8c7ac282&language=en-US`
        )
        response = await response.json();

        movieRef.update({
          backdrop_path: response.backdrop_path,
          poster_path: response.poster_path,
        })
      })
    })
}

updatePosters()