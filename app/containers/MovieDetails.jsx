import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
  match: PropTypes.object.isRequired,
}

function MovieDetails(props) {
  const { params } = props.match

  return (
    <Container className={props.className}>
      <h1>Viewing {params.movieId}</h1>
    </Container>
  )
}

MovieDetails.propTypes = propTypes
export default React.memo(MovieDetails)