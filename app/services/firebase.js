import firebase from 'firebase'

const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true,
})

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

