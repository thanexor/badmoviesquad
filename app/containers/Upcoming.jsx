import React from 'react'
import styled from 'styled-components'

import { getUpcoming } from 'services/read'
import { useFetchedData } from 'app/hooks'

import Upcoming from 'components/Upcoming'

const Container = styled.div``

const propTypes = {

}

export default function UpcomingPage(props) {
  const upcoming = useFetchedData(getUpcoming)

  const UpcomingPicks = upcoming.map(({movie, picker}) => {
    return (
      <Upcoming
        key={movie.title}
        pickedBy={picker.displayName}
        movieName={movie.title}
      />
    )
  })

  return (
    <Container>
      <h1>Upcoming</h1>
      { UpcomingPicks }
    </Container>
  )
}

UpcomingPage.propTypes = propTypes