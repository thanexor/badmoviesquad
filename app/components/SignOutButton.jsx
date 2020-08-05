import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { signOut } from 'services/auth'

const Button = styled.button``

const propTypes = {
  className: PropTypes.string,
}

function SignOutButton(props) {
  return (
    <Button
      className={props.className}
      onClick={signOut}
    >
      Sign Out
    </Button>
  )
}

SignOutButton.propTypes = propTypes
export default React.memo(SignOutButton)