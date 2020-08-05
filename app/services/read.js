import firebase from './firebase'

const db = firebase.firestore()

function fixPosterURLs(movie) {
  const BACKDROP_URL = "https://image.tmdb.org/t/p/w780"
  const POSTER_URL = "https://image.tmdb.org/t/p/w342"
  const SITE_URL = "https://www.themoviedb.org/movie/"
  return {
    ...movie,
    backdrop_path: `${BACKDROP_URL}${movie.backdrop_path}`,
    poster_path: `${POSTER_URL}${movie.poster_path}`,
    info_url: `${SITE_URL}${movie.id}`
  }
}

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
        movie: fixPosterURLs(fetchedMovie.data()),
        picker: fetchedPicker.data(),
      }
    })
  )
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

export async function getActiveNights() {
  const nights = await db.collection('Nights')
    .where('state', '==',  'pending')
    .get()

  return extractData(nights)
}


export async function getActivity(limit) {
  const activity = await db.collection('Activity')
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get()

  const extractedData = await extractData(activity)
  return extractedData
}