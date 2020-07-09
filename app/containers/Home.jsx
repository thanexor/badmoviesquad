import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useFetchedData } from 'app/hooks'
import { 
  getUserBacklog, 
  getUpcoming,
} from 'services/actions'

import { MOVIE_URL } from 'app/constants'
import MovieGrid from 'components/MovieGrid'
import MovieCard from 'components/MovieCard'
import Pick from 'components/Pick'

const Movies = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Container = styled.div``

const Picks = styled.div`
  display: flex;
  flex-direction: row;
`

const propTypes = {
  user: PropTypes.string.isRequired,
}

export default function Home(props) {
  const [ isSearchOpen, setIsSearchOpen ] = useState(false)

  const backlog = useFetchedData(getUserBacklog, props.user)
  const picks = useFetchedData(getUpcoming)

  const displayPicks = picks.map(({movie, picker}) => (
     <Pick
      movie={movie}
      pickedBy={picker}
      onOutbid={() => {}}
    />
  ))

  const movies = backlog.map(movie => (
    <MovieCard
      key={movie.id}
      movie={movie} 
      onClick={() => window.open(`${MOVIE_URL}/${movie.id}`, '_blank')}
    />
  ))


  return (
    <Container>
      <h1>Home</h1>

      <Picks>
        {displayPicks}
      </Picks>

      <h3>Your Backlog</h3>

      <Movies>
        {movies}
      </Movies>
    </Container>
  )
}

Home.propTypes = propTypes
