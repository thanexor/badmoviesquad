import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useFetchedDatum } from 'app/hooks'
import { getMovie } from 'services/read'

import Hero from './Hero'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const propTypes = {
  className: PropTypes.string,
  match: PropTypes.object.isRequired,
}

function MovieDetails(props) {
  const { params } = props.match
  const [ movie, _, isLoading] = useFetchedDatum(getMovie, params.movieId)

  return (
    <Container className={props.className}>
      <Hero movie={movie} />
    </Container>
  )
}

MovieDetails.propTypes = propTypes
export default React.memo(MovieDetails)