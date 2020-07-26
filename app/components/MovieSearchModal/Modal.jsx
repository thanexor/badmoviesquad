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
  onClick: PropTypes.func.isRequired,
  tax: PropTypes.number,
}

function Modal(props) {
  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={{
        overlay: {
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
        },
        content: {
          position: 'absolute',
          top: '10vh',
          left: '50%',
          right: '0',
          bottom: 'auto',
          border: '1px solid rgb(204, 204, 204)',
          background: 'rgb(255, 255, 255)',
          overflow: 'auto',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '72vh',
          height: '100%',
          transform: 'translateX(-50%)',
        }
      }}
    >
      <MovieSearch
        allMovies={props.allMovies}
        onClick={props.onClick}
        tax={props.tax}
      />
    </ReactModal>
  )
}

Modal.propTypes = propTypes
export default React.memo(Modal)