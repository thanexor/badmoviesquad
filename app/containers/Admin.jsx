import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/Button'

import CreateNightModal from 'components/CreateNightModal'

import {
  completeNight
} from 'services/writes'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
}

function Admin(props) {
  const [ completingNight, setCompletingNight ] = useState(false)
  const [ completeNightError, setCompletingNightError ] = useState(null)

  const [ isCreateNightOpen, setIsCreateNightOpen ] = useState(false)

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