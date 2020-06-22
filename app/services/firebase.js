import * as firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyDvM2q1mKESdbL3Bjea5Boph8OsOHBXDx0",
  authDomain: "bms-admin-1337.firebaseapp.com",
  databaseURL: "https://bms-admin-1337.firebaseio.com",
  projectId: "bms-admin-1337",
  storageBucket: "bms-admin-1337.appspot.com",
  messagingSenderId: "42411448045"
})

const db = firebase.firestore()

// there's gotta be a better way to do this
async function extractData(queryResult) {
  const data = []

  queryResult.forEach(item => {
    data.push(item.data())
  })
  return Promise.all(data)
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
