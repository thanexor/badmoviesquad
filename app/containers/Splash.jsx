import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
}

function Splash(props) {
  return (
    <Container className={props.className}>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
      <h1>SPLASH</h1>
    </Container>
  )
}

Splash.propTypes = propTypes
export default React.memo(Splash)