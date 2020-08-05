export const getUserEmail = state => state.loggedInEmail
export const getUsername = state => state.username
export const getAvatarURL = state => state.avatarURL
export const isLoggedIn = state => getUserEmail(state) !== null

export const getPoints = state => state.points
export const getIsAdmin = state => state.isAdmin
export const getLastLogin = state => state.lastLogin

export const getAllMovies = state => state.movies
export const getActivePicks = state => state.activePicks

export const searchMovies = (state, term) => {
  const movies = getAllMovies(state)
  return movies.filter(movie => movie.title.toLowerCase().includes(term.toLowerCase()))
}