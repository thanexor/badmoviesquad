import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchData } from 'app/hooks'
import { getUserBacklog } from 'services/actions'

import MovieCard from 'components/MovieCard'

const Container = styled.div``

const Movies = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`

const propTypes = {
  className: PropTypes.string,
}

function Backlog(props) {
  const backlog = fetchData(getUserBacklog, 'nathanemyers')

  const Backlog = backlog.map(movie => {
    return (
      <MovieCard
        id={movie.firebase_id}
        name={movie.title}
        posterURL={movie.poster_path}
        backgroundURL={movie.backdrop_path}
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