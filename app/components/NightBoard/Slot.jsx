import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { outbidPick } from 'services/writes'
import { recordOutbid } from 'services/activity'

import Button from 'components/Button'
import MovieSearchModal from 'components/MovieSearchModal'

const Container = styled.div`
  display: flex;
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

const Text = styled.div`
  color: papayawhip;
  font-size: 1.4em;
  margin: 0.2em;
  text-shadow: 1px 1px black;
`

const OutbidButton = styled(Button)`
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
  const { movie } = props.pick
  return (
    <Container className={props.className} backdrop_path={movie.backdrop_path} >
      <Content>
        <Text>{movie.title}</Text>
        <OutbidButton onClick={() => setPickerOpen(true)}>Outbid</OutbidButton>
      </Content>
      <MovieSearchModal
        isOpen={pickerOpen}
        onRequestClose={() => setPickerOpen(false)}
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