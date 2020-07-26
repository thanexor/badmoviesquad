import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import Time from './Time'

const Container = styled.div``

const Name = styled.span``
const Movie = styled.span``

const propTypes = {
  className: PropTypes.string,
  timestamp: PropTypes.number.isRequired,
  movieId: PropTypes.string.isRequired,
  movieName: PropTypes.string.isRequired,
  outbidId: PropTypes.string.isRequired,
  outbidName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

function Pick(props) {
  const time = moment(props.timestamp).fromNow()
  return (
    <Container className={props.className}>
      <Time>[{time}]</Time>
      <Name>{ props.username }</Name> outbid <Movie>{ props.outbidName}</Movie> with <Movie>{ props.movieName}</Movie>
    </Container>
  )
}

Pick.propTypes = propTypes
export default React.memo(Pick)