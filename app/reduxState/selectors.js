export const getUserEmail = state => state.loggedInEmail
export const getUsername = state => state.username
export const isLoggedIn = state => getUserEmail(state) !== null

export const getAllMovies = state => state.movies

export const searchMovies = (state, term) => {
  const movies = getAllMovies(state)
  return movies.filter(movie => movie.title.toLowerCase().includes(term.toLowerCase()))
}