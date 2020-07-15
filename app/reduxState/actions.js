import { getMovies } from 'services/read'

export const LOGIN = "LOGIN"
export function loginAs({displayName, email, avatarURL, admin, points, lastLogin}) {
  return {
    type: LOGIN,
    admin,
    points,
    lastLogin,
    avatarURL,
    displayName,
    email,
  }
}

export const LOGOUT = "LOGOUT"
export function logout() {
  return {
    type: LOGOUT,
  }
}

export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS"
function fetchMoviesSuccess(data) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    data,
  }
}

export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE"
function fetchMoviesFailure(error) {
  return {
    type: FETCH_MOVIES_FAILURE,
    error,
  }
}

export function fetchMovies() {
  return async (dispatch) => {
    try {
      const data = await getMovies()
      dispatch(fetchMoviesSuccess(data))
    } catch(e) {
      dispatch(fetchMoviesFailure(e.message))
    }
  }
}