import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { MOVIE_URL } from 'app/constants'
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
    <Movie 
      key={movie.id}
      movie={movie} 
      onClick={() => {
        console.log('click!')
        window.open(`${MOVIE_URL}/${props.movie.id}`, '_blank')
      }}
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