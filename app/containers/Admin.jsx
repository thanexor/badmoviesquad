import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button'

import CreateNightModal from 'components/CreateNightModal'
import { useFetchedData } from 'app/hooks'
import { getActiveNights } from 'services/read'

import {
  completeNight
} from 'services/writes'

const Container = styled.div``

const Nights = styled.div`
  display: flex;
  flex-direction: column;
`

const propTypes = {
  className: PropTypes.string,
}

function Admin(props) {
  const [ completingNight, setCompletingNight ] = useState(false)
  const [ completeNightError, setCompletingNightError ] = useState(null)

  const [ isCreateNightOpen, setIsCreateNightOpen ] = useState(false)

  const [ activeNights ] = useFetchedData(getActiveNights)

  const renderedNights = activeNights.map(night => (
    <h4 key={night.firebase_id}>{night.title} @ {night.location}</h4>
  ))


  const onCompleteNight = async () => {
    setCompletingNight(true)
    const results = await completeNight()
    setCompletingNight(false)
    if (!results.success) {
      setCompletingNightError(results.error)
    }
  }
  return (
    <Container className={props.className}>
      <h1>Admin Controls</h1>
      <span>You may need to reload the page to see changes here</span>
      <h3>Current Nights</h3>

      <Nights>
        {renderedNights}
      </Nights>

      <Button onClick={onCompleteNight}>
        {completingNight ?
          "Working..." : "Complete Night"
        }
      </Button>

      {completeNightError ?
        <h3>{completeNightError}</h3> : null
      }

      
      <Button onClick={() => setIsCreateNightOpen(true)}>Create Night</Button>

      <CreateNightModal
        isOpen={isCreateNightOpen}
        onRequestClose={() => setIsCreateNightOpen(false)}
      />
    </Container>
  )
}

Admin.propTypes = propTypes
export default React.memo(Admin)