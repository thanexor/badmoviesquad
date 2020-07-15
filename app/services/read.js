import firebase from './firebase'

const db = firebase.firestore()

// there's gotta be a better way to do this
function extractData(queryResult) {
  const data = []

  queryResult.forEach(item => {
    const itemData = item.data()

    data.push({
      ...itemData,
      firebase_id: item.ref.id,
      firebase_ref: item.ref.path,
    })
  })
  return data
}

export async function getScores() {
  const users = await db.collection('Users')
    .orderBy("total_points", "desc")
    .get()

  return extractData(users)
}

export async function getActivePicks() {
  const activePicks = await db.collection('Picks')
    .where("state", "==", "active")
    .get()

  const extractedData = await extractData(activePicks)

  return Promise.all(
    extractedData.map(async (pick) => {
      const { movie, picker } = pick
      const data = await Promise.all([
        movie.get(),
        picker.get(),
      ])
      const [fetchedMovie, fetchedPicker] = data
      return {
        ...pick,
        movie: fetchedMovie.data(),
        picker: fetchedPicker.data(),
      }
    })
  )
}

function fixPosterURLs(movie) {
  const movieDB_URL = "https://image.tmdb.org/t/p/w300"
  return {
    ...movie,
    backdrop_path: `${movieDB_URL}${movie.backdrop_path}`,
    poster_path: `${movieDB_URL}${movie.poster_path}`,
  }
}

export async function getUserBacklog(email) {
  const movies = await db.collection('Movies')
    .where('added_by', '==', email)
    .get()

  const data = extractData(movies)
  const repairedData = data.map(movie => fixPosterURLs(movie))
  return repairedData
}

export async function getMovies() {
  const movies = await db.collection('Movies')
    .get()

  const data = extractData(movies)
  const repairedData = data.map(movie => fixPosterURLs(movie))
  return repairedData
}

export async function getPrevNight() {
  const nights = await db.collection('Nights')
    .orderBy('completedAt', 'desc')
    .limit(1)
    .get()

  const nightRef = nights[0]
  return nightRef.data()
}