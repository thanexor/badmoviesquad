import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'

import { useFetchedData } from 'app/hooks'
import { getUserBacklog } from 'services/read'

import { MOVIE_URL } from 'app/constants'
import MovieCard from 'components/MovieCard'
import NightBoard from 'components/NightBoard'
import ActivityFeed from 'components/ActivityFeed'

import MovieSearchModal from 'components/MovieSearchModal'

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
  fetchActivePicks: PropTypes.func.isRequired,
  activePicks: PropTypes.array.isRequired,
}

export default function Home(props) {
  const [ isSearchOpen, setIsSearchOpen ] = useState(false)

  const backlog = useFetchedData(getUserBacklog, props.user)

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
      <Button onClick={() => setIsSearchOpen(true)}>SEARCH</Button>

      <NightBoard
        slots={2}
        activePicks={props.activePicks}
        fetchActivePicks={props.fetchActivePicks}
      />

      <h3>Activity Feed</h3>
      <ActivityFeed />

      <h3>Your Backlog</h3>

      <Movies>
        {movies}
      </Movies>
      <MovieSearchModal
        isOpen={isSearchOpen}
        onRequestClose={() => setIsSearchOpen(false)}
      />
    </Container>
  )
}

Home.propTypes = propTypes
