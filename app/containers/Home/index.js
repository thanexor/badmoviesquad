import Home from './Home'
import { connect } from 'react-redux'

import { getActivePicks, getUserEmail } from 'reduxState/selectors'
import { fetchActivePicks } from 'reduxState/actions'

export default connect(
  state => ({
    activePicks: getActivePicks(state),
    user: getUserEmail(state),
  }),
  dispatch => ({
    fetchActivePicks: () => dispatch(fetchActivePicks())
  })
)(Home)

