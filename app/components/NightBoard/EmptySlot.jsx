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
  fetchActivePicks: PropTypes.func.isRequired,
}

function EmptySlot(props) {
  const [ pickerOpen, setPickerOpen ] = useState(false)

  return (
    <Container className={props.className}>
      <Text>Empty Slot</Text>
      <Button onClick={() => setPickerOpen(true)}>Make Pick</Button>
      <MovieSearchModal 
        isOpen={pickerOpen}
        onRequestClose={() => setPickerOpen(false)}
        onClick={async movie => {
          await makePick({
            movieId: movie.firebase_id,
            points: 3
          })
          setPickerOpen(false)
          props.fetchActivePicks()
        }}
      />
    </Container>
  )
}

EmptySlot.propTypes = propTypes
export default React.memo(EmptySlot)