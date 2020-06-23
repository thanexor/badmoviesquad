import { getMovies } from '../../services/firebase'

const moviesRequest = (params) => ({
  type: 'MOVIES_REQUEST',
  params,
});

const moviesResponse = (data) => ({
  type: 'MOVIES_SUCCESS',
  movies: data,
});

const moviesError = (error) => ({
  type: 'MOVIES_ERROR',
  error: error,
});

export const fetchMovies = (params) => {
  return async (dispatch, getState) => {
    dispatch(moviesRequest(params));

    try {
      const movies = await getMovies()
      dispatch(moviesResponse(movies))
    } catch(e) {
      dispatch(moviesError(e.message))
    }
  };
}