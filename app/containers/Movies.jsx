import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useFetchedData } from 'app/hooks'
import { MOVIE_URL } from 'app/constants'

import MovieCard from 'components/MovieCard'

const Container = styled.div``

const MoviesList = styled.div`
  display: flex;
  flex-direction: row;
`

const propTypes = {
  className: PropTypes.string,
  movies: PropTypes.array.isRequired,
}

function Movies(props) {
  const renderedMovies = props.movies.map(movie => {
    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        onClick={() => {
          console.log('click!')
          window.open(`${MOVIE_URL}/${props.movie.id}`, '_blank')
        }}
      />
    )
  })

  return (
    <Container className={props.className}>
      <h1>Movies</h1>
      <MoviesList>
        {renderedMovies}
      </MoviesList>
    </Container>
  )
}

Movies.propTypes = propTypes
export default React.memo(Movies)