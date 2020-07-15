import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactModal from 'react-modal'

import { createNight } from 'services/writes'

import Button from 'components/Button'

const Container = styled.div``

const Label = styled.label``

const Input = styled.input

const propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

function CreateNightModal(props) {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [slots, setSlots] = useState(2)

  const [working, setWorking] = useState(false)
  const [error, setError] = useState(null)

  const onCreateNight = async () => {
    setWorking(true)
    const results = await createNight({ title, location, slots })
    if (!results.success) {
      setError(results.error)
    }
    setWorking(false)
  }

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
    >
      <Container className={props.className}>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />

        <Label>Location</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />

        <Label>Slots</Label>
        <Input value={slots} onChange={(e) => setSlots(e.target.value)} />

        <Button
          onClick={onCreateNight}
        >
          {/* {working ? "Creating..." : "Create Night"} */}
        </Button>
      </Container>
    </ReactModal>
  )
}

CreateNightModal.propTypes = propTypes
export default React.memo(CreateNightModal)