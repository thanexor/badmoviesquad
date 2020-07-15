import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { makePick } from 'services/writes'

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
  movie: PropTypes.object.isRequired,
}

function Slot(props) {
  const [ pickerOpen, setPickerOpen ] = useState(false)
  return (
    <Container className={props.className}>
      <Text>{props.movie.title}</Text>
      <Button onClick={() => setPickerOpen(true)}>Outbid</Button>
      <MovieSearchModal 
        isOpen={pickerOpen}
        onRequestClose={() => setPickerOpen(false)}
        onClick={movie => makePick({
          movieId: movie.firebase_id,
          points: 3
        })}
      />
    </Container>
  )
}

Slot.propTypes = propTypes
export default React.memo(Slot)