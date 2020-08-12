import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useFetchedDatum } from 'app/hooks'
import { getMovie } from 'services/read'
import Button from 'components/Button'

import { makeOpenPick, makeOutbidPick } from './calls'
import Hero from './Hero'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const propTypes = {
  className: PropTypes.string,
  match: PropTypes.object.isRequired,
  openPick: PropTypes.bool.isRequired,
}

function MovieDetails(props) {
  const { params } = props.match
  const { movieId, pickId } = params

  const [ movie, _, isLoading] = useFetchedDatum(getMovie, movieId)

  const PickButton = (
    <Button onClick={async () => {
      await makeOpenPick({
        movieId: movie.firebase_id,
        title: movie.title,
      })
      // route to home
    }}>Pick</Button>
  )

  const OutbidButton = (
    <Button onClick={async () => {
      await makeOutbidPick({
        movieId: movie.firebase_id,
        title: movie.title,
        pickId: pickId,
      })
      // route to home
    }}>Outbid</Button>
  )

  return (
    <Container className={props.className}>
      <Hero movie={movie} />
      {props.openPick
        ? PickButton
        : null
      }
      {pickId
        ? OutbidButton
        : null
      }
    </Container>
  )
}

MovieDetails.propTypes = propTypes
export default React.memo(MovieDetails)