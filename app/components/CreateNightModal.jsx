import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
}

function CreateNightModal(props) {
  return (
    <Container className={props.className}>
    </Container>
  )
}

CreateNightModal.propTypes = propTypes
export default React.memo(CreateNightModal)