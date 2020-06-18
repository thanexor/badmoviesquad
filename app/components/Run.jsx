import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default function Run(props) {
  return (
    <Container className={props.className}>
      { props.name }
    </Container>
  )
}

Run.propTypes = propTypes
