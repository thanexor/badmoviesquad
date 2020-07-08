import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchData } from 'app/hooks'
import { getUserBacklog } from 'services/actions'

import MovieGrid from 'components/MovieGrid'

const Container = styled.div``

const propTypes = {
  user: PropTypes.string.isRequired,
}

export default function Home(props) {
  const backlog = fetchData(getUserBacklog, props.user)

  return (
    <Container>
      <h1>Home</h1>

      <h3>Your Backlog</h3>
      <MovieGrid
        movies={backlog}
      />

    </Container>
  )
}

Home.propTypes = propTypes
