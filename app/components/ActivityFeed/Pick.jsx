import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const Name = styled.span``
const Movie = styled.span``

const propTypes = {
  className: PropTypes.string,
  timestamp: PropTypes.number.isRequired,
  movieId: PropTypes.string.isRequired,
  movieName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

function Pick(props) {
  return (
    <Container className={props.className}>
      { props.username } picked { props.movieName}
    </Container>
  )
}

Pick.propTypes = propTypes
export default React.memo(Pick)