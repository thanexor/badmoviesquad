import store from './store'
import { fetchMovies } from './redux/movies/actions'

export default function init() {
  store.dispatch(fetchMovies())
}