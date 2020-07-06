import firebase from './firebase'

const db = firebase.firestore()

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