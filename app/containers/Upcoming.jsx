import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import styled from 'styled-components'

import Upcoming from '../components/Upcoming'
import {
  getUpcoming,
 } from '../redux/selectors'

const Container = styled.div``

const propTypes = {
  upcoming: PropTypes.array.isRequired,
}

function UpcomingPage(props) {
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

export default connect(
  (state) => ({
    upcoming: getUpcoming(state)
  }),
  null
)(UpcomingPage)
