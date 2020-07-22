import {
  LOGIN,
  LOGOUT,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_ACTIVE_PICKS_SUCCESS,
  FETCH_ACTIVE_PICKS_FAILURE,
} from './actions'

const initialState = {
  username: null,
  loggedInEmail: null,
  avatarURL: null,
  lastLogin: null,
  points: 0,
  isAdmin: false,
  movies: [],
  activePicks: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAdmin: action.admin,
        lastLogin: action.lastLogin,
        points: action.points,
        username: action.displayName,
        loggedInEmail: action.email,
        avatarURL: action.avatarURL,
      }
    case LOGOUT:
      return {
        ...state,
        username: null,
        loggedInEmail: null,
      }
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.data
      }
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case FETCH_ACTIVE_PICKS_SUCCESS:
      return {
        ...state,
        activePicks: action.data
      }
    case FETCH_ACTIVE_PICKS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
};