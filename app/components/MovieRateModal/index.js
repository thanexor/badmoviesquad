import { connect } from 'react-redux'
import Modal from './Modal'

import { getAllMovies } from 'reduxState/selectors'

export default connect(
  state => ({
    allMovies: getAllMovies(state)
  }),
  null
)(Modal)