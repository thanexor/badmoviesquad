import {
  LOGIN,
  LOGOUT,
} from './actions'

const initialState = {
  loggedInAs: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedInAs: action.user,
      }
    case LOGOUT:
      return {
        ...state,
        loggedInAs: null,
      }
    default:
      return state;
  }
};