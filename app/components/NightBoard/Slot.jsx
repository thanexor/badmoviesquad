import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { outbidPick } from 'services/writes'
import { recordOutbid } from 'services/activity'

import Button from 'components/Button'
import MovieSearchModal from 'components/MovieSearchModal'

const Container = styled.div`
  display: grid;
  padding: 0.5em;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 50px;
  grid-template-areas:
    "picked-by point-cost"
    "title pick-button";

  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  width: 300px;
  height: 200px;
  background: no-repeat linear-gradient(transparent 70%, black), url(${props => props.backdrop_path});
  background-size: cover;
  background-position: center;
  border: 1px solid ${({ theme }) => theme.primary};
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
  color: papayawhip;
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
  align-self: flex-start;
  grid-area: picked-by;
  font-size: 1.1em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  width: fit-content;
  background-color: ${({ theme }) => theme.purpleSuperdark};
`

const OutbidButton = styled(Button)`
  grid-area: pick-button;
  margin-right: 1em;
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