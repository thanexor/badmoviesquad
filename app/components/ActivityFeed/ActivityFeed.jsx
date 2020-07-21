import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useFetchedData } from 'app/hooks'
import { getActivity } from 'services/read'
import Pick from './Pick'
import Outbid from './Outbid'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const propTypes = {
  className: PropTypes.string,
}

function ActivityFeed(props) {
  const activity = useFetchedData(getActivity, 10)

  const renderedActivity = activity.map(action => {
    switch (action.type) {
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
export default React.memo(ActivityFeed)