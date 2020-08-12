import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Pick from './Pick'
import Backlog from './Backlog'
import Outbid from './Outbid'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: .85em;
  color: ${({ theme }) => theme.grey04};
`

const propTypes = {
  className: PropTypes.string,
  activity: PropTypes.array.isRequired,
}

export default function ActivityFeed(props) {

  const renderedActivity = props.activity.map(action => {
    switch (action.type) {
      case 'backlog':
        return (
          <Backlog
            key={action.firebase_id}
            movieName={action.movieName}
            movieId={action.movieId}
            userId={action.userId}
            username={action.username}
            timestamp={action.timestamp}
          />
        )
      case 'pick':
        return (
          <Pick
            key={action.firebase_id}
            movieName={action.movieName}
            movieId={action.movieId}
            userId={action.userId}
            username={action.username}
            timestamp={action.timestamp}
          />
        )
      case 'outbid':
        return (
          <Outbid
            key={action.firebase_id}
            outbidName={action.outbidName}
            outbidId={action.outbidId}
            movieName={action.movieName}
            movieId={action.movieId}
            userId={action.userId}
            username={action.username}
            timestamp={action.timestamp}
          />
        )
      default:
        return (<h3>who knows what this is</h3>)
    }
  })

  return (
    <Container className={props.className}>
      { renderedActivity }
    </Container>
  )
}

ActivityFeed.propTypes = propTypes