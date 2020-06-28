import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { getUpcoming } from '../services/firebase'
import Upcoming from '../components/Upcoming'

const Container = styled.div``

const propTypes = {

}

export default function UpcomingPage(props) {
  const [ upcoming, setUpcoming ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUpcoming()
      setUpcoming(data)
    }
    fetchData()
  }, [])

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