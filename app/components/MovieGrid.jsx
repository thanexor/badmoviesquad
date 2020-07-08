import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MovieCard from './MovieCard'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Movie = styled(MovieCard)`
`

const propTypes = {
  className: PropTypes.string,
  movies: PropTypes.array.isRequired,
}

function MovieGrid(props) {
  const movies = props.movies.map(movie => (
    <Movie key={movie.id} movie={movie} />
  ))
  return (
    <Container className={props.className}>
      { movies }
    </Container>
  )
}

MovieGrid.propTypes = propTypes
export default React.memo(MovieGrid)