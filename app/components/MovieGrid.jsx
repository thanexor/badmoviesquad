import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MovieCard from './MovieCard'

const Container = styled.div``

const Movie = styled(MovieCard)`
  display: grid;
`

const propTypes = {
  className: PropTypes.string,
  movies: PropTypes.array.isRequired,
}

function MovieGrid(props) {
  const movies = props.movies.map(movie => (
    <Movie
      id={movie.firebase_id}
      name={movie.title}
      posterURL={movie.poster_path}
      backgroundURL={movie.backdrop_path}
    />
  ))
  return (
    <Container className={props.className}>
      { movies }
    </Container>
  )
}

MovieGrid.propTypes = propTypes
export default React.memo(MovieGrid)