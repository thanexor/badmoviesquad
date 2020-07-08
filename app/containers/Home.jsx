import React from 'react'
//import PropTypes from 'prop-types'
import styled from 'styled-components'

import MovieGrid from 'components/MovieGrid'

const Container = styled.div``

const propTypes = {

}

export default function Home(props) {
  return (
    <Container>
      <h1>Home</h1>

      <h3>Your Backlog</h3>
      {/* <MovieGrid
        movies={}
      /> */}

    </Container>
  )
}

Home.propTypes = propTypes
