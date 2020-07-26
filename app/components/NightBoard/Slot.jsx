import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { outbidPick } from 'services/writes'
import { recordOutbid } from 'services/activity'

import Button from 'components/Button'
import MovieSearchModal from 'components/MovieSearchModal'

const Container = styled.div`
  display: grid;
  padding: 3vw;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr .5fr;
  grid-template-areas:
    "title point-cost"
    "picked-by pick-button";

  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  background: no-repeat linear-gradient(transparent 70%, black), url(${props => props.backdrop_path});
  background-size: cover;
  background-position: center;
  border: 1px solid ${({ theme }) => theme.primary};
  flex: 0 0 50%;
  box-sizing: border-box;
  min-height: 350px;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const MovieTitle = styled.a`
  grid-area: title;
  align-self: flex-start;
  color: #fff;
  font-size: 1.4em;
  text-shadow: 1px 1px black;

  text-decoration: none;
`

const PointCost = styled.div`
  align-self: flex-start;
  justify-self: flex-end;
  grid-area: point-cost;
  font-size: 1.1em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  background-color: ${({ theme }) => theme.purpleSuperdark};
  color: white;
`

const PickedBy = styled.span`
  grid-area: picked-by;
  width: fit-content;
  padding: 1em;
  font-size: .75em;
  color: ${({ theme }) => theme.grey02};
  background-color: ${({ theme }) => theme.purpleSuperdark};
`

const OutbidButton = styled(Button)`
  grid-area: pick-button;
  max-width: 100px;
  justify-self: right;
`

const propTypes = {
  className: PropTypes.string,
  pick: PropTypes.object.isRequired,
  fetchActivePicks: PropTypes.func.isRequired,
  refreshActivity: PropTypes.func.isRequired,
}

function Slot(props) {
  const [ pickerOpen, setPickerOpen ] = useState(false)
  const { movie, picker, tax } = props.pick

  return (
    <Container className={props.className} backdrop_path={movie.backdrop_path} >
      <PickedBy>A {picker.displayName} joint</PickedBy>
      <PointCost>${tax + 3}</PointCost>
      <MovieTitle
        target="_blank"
        href={movie.info_url}
      >
        {movie.title}
      </MovieTitle>
      <OutbidButton onClick={() => setPickerOpen(true)}>Outbid</OutbidButton>

      <MovieSearchModal
        isOpen={pickerOpen}
        onRequestClose={() => setPickerOpen(false)}
        tax={tax + 1}
        onClick={async movie => {
          await outbidPick({
            movieId: movie.firebase_id,
            points: 3,
            outbidPickId: props.pick.firebase_id,
          })
          await recordOutbid({
            movieId: movie.firebase_id,
            movieName: movie.title,
            outbidPickId: props.pick.firebase_id,
          })
          setPickerOpen(false)
          props.fetchActivePicks()
          props.refreshActivity()
        }}
      />
    </Container>
  )
}

Slot.propTypes = propTypes
export default React.memo(Slot)