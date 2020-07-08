import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useFetchedData } from 'app/hooks'
import { getUserBacklog } from 'services/actions'

import MovieCard from 'components/MovieCard'

const Container = styled.div``

const Movies = styled.div`
  display: flex;
  flex-direction: row;
`

const propTypes = {
  className: PropTypes.string,
}

function Backlog(props) {
  const backlog = useFetchedData(getUserBacklog, 'nathanemyers')

  const Backlog = backlog.map(movie => {
    return (
      <MovieCard
        key={movie.id}
        movie={movie}
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