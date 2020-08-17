import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'

import { useFetchedData } from 'app/hooks'
import {
  getUserBacklog,
  getActiveNights,
  getActivity,
} from 'services/read'

import { MOVIE_URL } from 'app/constants'
import MovieCard from 'components/MovieCard'
import NightBoard from 'components/NightBoard'
import ActivityFeed from 'components/ActivityFeed'

import TMDBSearchModal from 'components/TMDBSearchModal'

const Movies = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  flex-wrap: wrap;

  .home-movies-list {
    width: 20%;
  }
`

const Container = styled.div`
  .search-container {
    text-align: right;
    position: fixed;
    top: 75px;
    right: 20px;
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
        <Button className="open-search" onClick={() => setIsSearchOpen(true)}>Search to add<i>&#128269;</i></Button>
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
      <Movies className="home-movies-list">
        {movies}
      </Movies>

      <TMDBSearchModal
        isOpen={isSearchOpen}
        onRequestClose={() => setIsSearchOpen(false)}
        refreshActivity={refreshActivity}
      />
    </Container>
  )
}

Home.propTypes = propTypes
