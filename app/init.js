import store from 'reduxState/store'

import { 
  fetchMovies,
  fetchActivePicks,
} from 'reduxState/actions'


export default function init() {
  store.dispatch(fetchMovies())
  store.dispatch(fetchActivePicks())
}