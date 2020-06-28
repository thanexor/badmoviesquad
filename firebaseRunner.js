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

run()