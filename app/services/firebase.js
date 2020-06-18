import * as firebase from 'firebase'

firebase.initializeApp({
  apiKey:            "AIzaSyDvM2q1mKESdbL3Bjea5Boph8OsOHBXDx0",
  authDomain:        "bms-admin-1337.firebaseapp.com",
  databaseURL:       "https://bms-admin-1337.firebaseio.com",
  projectId:         "bms-admin-1337",
  storageBucket:     "bms-admin-1337.appspot.com",
  messagingSenderId: "42411448045"
})

const db = firebase.firestore()

export async function getScores() {
  const users = await db.collection('Users')
    .orderBy("total_points", "desc")
    .get()

  const data = []
  users.forEach(user => {
    data.push(user.data())
  })
  return data
}

