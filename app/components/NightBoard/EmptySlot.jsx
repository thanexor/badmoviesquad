import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Text = styled.div``

const propTypes = {
  className: PropTypes.string,
}

function EmptySlot(props) {
  return (
    <Container className={props.className}>
      <Text>Empty Slot</Text>
      <Button>Make Pick</Button>
    </Container>
  )
}

EmptySlot.propTypes = propTypes
export default React.memo(EmptySlot)