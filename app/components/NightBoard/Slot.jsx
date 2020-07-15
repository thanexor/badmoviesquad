import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
  movie: PropTypes.object
}

function Slot(props) {
  return (
    <Container className={props.className}>
    </Container>
  )
}

Slot.propTypes = propTypes
export default React.memo(Slot)