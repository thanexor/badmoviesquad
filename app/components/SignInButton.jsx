import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { signIn } from 'services/auth'

const Button = styled.button``

const propTypes = {
  className: PropTypes.string,
}

function SignInButton(props) {
  return (
    <Button
      className={props.className}
      onClick={signIn}
    >
      Sign In
    </Button>
  )
}

SignInButton.propTypes = propTypes
export default React.memo(SignInButton)