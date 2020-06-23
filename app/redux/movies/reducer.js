const initialState = {
  movies: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "MOVIES_SUCCESS":
      return {
        ...state,
        movies: action.data,
        loading: false,
        error: null,
      }
    case "MOVIES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
};