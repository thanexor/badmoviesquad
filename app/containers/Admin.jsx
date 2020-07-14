import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
}

function Admin(props) {
  return (
    <Container className={props.className}>
      <h1>Admin Controls</h1>
    </Container>
  )
}

Admin.propTypes = propTypes
export default React.memo(Admin)