import Backlog from './Backlog'
import { connect } from 'react-redux'

import { getAllMovies } from 'reduxState/selectors'

export default connect(
  state => ({
    backlog: getAllMovies(state)
  }),
  null
)(Backlog)