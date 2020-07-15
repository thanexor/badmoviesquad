import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { OutbidPick } from 'services/writes'

import Button from 'components/Button'
import MovieSearchModal from 'components/MovieSearchModal'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
`

const Text = styled.div``

const propTypes = {
  className: PropTypes.string,
  pick: PropTypes.object.isRequired,
}

function Slot(props) {
  const [ pickerOpen, setPickerOpen ] = useState(false)
  const movie = props.pick
  return (
    <Container className={props.className}>
      <Text>{movie.title}</Text>
      <Button onClick={() => setPickerOpen(true)}>Outbid</Button>
      <MovieSearchModal 
        isOpen={pickerOpen}
        onRequestClose={() => setPickerOpen(false)}
        onClick={movie => outbidPick({
          movieId: movie.firebase_id,
          points: 3,
          outbitPickId: "",
        })}
      />
    </Container>
  )
}

Slot.propTypes = propTypes
export default React.memo(Slot)