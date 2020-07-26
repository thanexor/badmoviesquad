import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'

import { useFetchedData, useForceUpdate } from 'app/hooks'
import {
  getUserBacklog,
  getActiveNights,
  getActivity,
} from 'services/read'

import { MOVIE_URL } from 'app/constants'
import MovieCard from 'components/MovieCard'
import NightBoard from 'components/NightBoard'
import ActivityFeed from 'components/ActivityFeed'

import MovieSearchModal from 'components/MovieSearchModal'

const Movies = styled.div`
  display: flex;
`

const Container = styled.div`
  .search-container {
    display: block;
    text-align: right;
    margin: -3.5em 0 1.5em;
  }

  .open-search {
    display: inline-block;
    text-align: right;
  }

  .open-search i {
    font-style: normal  ;
  }
`

const Picks = styled.div`
  display: flex;
`

const NoNight = styled.h3`
  font-size: 3em;
  color: #fff;
`

const propTypes = {
  user: PropTypes.string.isRequired,
  fetchActivePicks: PropTypes.func.isRequired,
  activePicks: PropTypes.array.isRequired,
}

export default function Home(props) {
  const [ isSearchOpen, setIsSearchOpen ] = useState(false)

  const [ backlog ] = useFetchedData(getUserBacklog, props.user)
  const [ nights ] = useFetchedData(getActiveNights)
  const [ activity, refreshActivity ] = useFetchedData(getActivity, 10)

  const forceUpdate = useForceUpdate()

  const night = nights[0]

  const movies = backlog.map(movie => (
    <MovieCard
      key={movie.id}
      movie={movie}
      onClick={() => window.open(`${MOVIE_URL}/${movie.id}`, '_blank')}
    />
  ))

  return (
    <Container>
      <h1>What's next</h1>
      <div className="search-container">
        <Button className="open-search" onClick={() => setIsSearchOpen(true)}>Search movies <i>&#128269;</i></Button>
      </div>

      {
        night
          ? <NightBoard
            slots={2}
            activePicks={props.activePicks}
            fetchActivePicks={props.fetchActivePicks}
            refreshActivity={refreshActivity}
            night={night}
          />
          :
          <NoNight>One sec...</NoNight>
      }


      <h3>Recent activity</h3>
      <ActivityFeed
        activity={activity}
      />

      <h3>Recently added</h3>

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
