import Movies from './Movies'
import { connect } from 'react-redux'

import { getAllMovies } from 'reduxState/selectors'

export default connect(
  state => ({
    movies: getAllMovies(state)
  }),
  null
)(Movies)