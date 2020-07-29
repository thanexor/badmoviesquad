import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { MOVIE_URL } from 'app/constants'

import MovieCard from 'components/MovieCard'

const Container = styled.div``

const Movies = styled.div`
  display: flex;
  flex-direction: row;
`

const propTypes = {
  className: PropTypes.string,
  backlog: PropTypes.array.isRequired,
}

function Backlog(props) {
  const Backlog = props.backlog.map(movie => {
    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        onClick={() => {
          window.open(props.movie.info_url)
        }}
      />
    )
  })

  return (
    <Container className={props.className}>
      <h1>Backlog</h1>
      <Movies>
        {Backlog}
      </Movies>
    </Container>
  )
}

Backlog.propTypes = propTypes
export default React.memo(Backlog)