import { connect } from 'react-redux'
import Modal from './Modal'


export default connect(
  null,
  dispatch => ({
    searchMovies: () => {}
  })
)(Modal)