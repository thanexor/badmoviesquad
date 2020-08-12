import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import Time from './Time'
import Link from 'components/Link'

const Container = styled.div`
  margin: .5em 0;
`

const Name = styled.span``
const Movie = styled(Link)``

const propTypes = {
  className: PropTypes.string,
  timestamp: PropTypes.number.isRequired,
  movieId: PropTypes.string.isRequired,
  movieName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

function Backlog(props) {
  const time = moment(props.timestamp).fromNow()
  return (
    <Container className={props.className}>
      <Time>[{time}]</Time>
      <Name>{ props.username }</Name> added <Movie to={`/movie/${props.movieId}`}>{props.movieName}</Movie> to the backlog
    </Container>
  )
}

Backlog.propTypes = propTypes
export default React.memo(Backlog)