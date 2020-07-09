import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ReactModal from 'react-modal'
import MovieSearch from './MovieSearch'

const Container = styled.div`

`

const propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  allMovies: PropTypes.array.isRequired,
}

function Modal(props) {
  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
    >
      <MovieSearch allMovies={props.allMovies}

      />
    </ReactModal>
  )
}

Modal.propTypes = propTypes
export default React.memo(Modal)