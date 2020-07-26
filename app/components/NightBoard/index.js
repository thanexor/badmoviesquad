import { connect } from 'react-redux'
import NightBoard from './NightBoard'

import { fetchActivity } from 'reduxState/actions'

export default connect(
  state => ({

  }),
  dispatch => ({
    // refreshActivity: () => dispatch(fetchActivePicks())
  }),
)(NightBoard)