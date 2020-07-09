import store from 'reduxState/store'

import { 
  fetchMovies
} from 'reduxState/actions'


export default function init() {
  store.dispatch(fetchMovies())
}