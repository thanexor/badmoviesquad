import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
  username: PropTypes.string.isRequired,
}

function Profile(props) {
  return (
    <Container className={props.className}>
      { props.username }
    </Container>
  )
}

Profile.propTypes = propTypes
export default React.memo(Profile)