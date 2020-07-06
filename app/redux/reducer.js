import {
  LOGIN,
  LOGOUT,
} from './actions'

const initialState = {
  username: null,
  loggedInEmail: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.displayName,
        loggedInEmail: action.email,
      }
    case LOGOUT:
      return {
        ...state,
        username: null,
        loggedInEmail: null,
      }
    default:
      return state;
  }
};