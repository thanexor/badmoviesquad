import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
  movieName: PropTypes.string.isRequired,
  pickedBy: PropTypes.string.isRequired,
}

function Upcoming(props) {
  return (
    <Container className={props.className}>
      <div>
        Movie: {props.movieName}
      </div>
      <div>
        Picked By: {props.pickedBy}
      </div>
    </Container>
  )
}

Upcoming.propTypes = propTypes
export default React.memo(Upcoming)