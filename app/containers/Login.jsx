import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Lance } from 'components/gifs'
import SignInButton from 'components/SignInButton'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Title = styled.h1`
`

const StyledSignIn = styled(SignInButton)`
  display: inline-block;
  min-width: 110px;
  background: linear-gradient(-35deg,var(--c1,#e15712),var(--c2,#b20e44) 50%,var(--c1,#e15712)) var(--x,0)/300%;
  color: #fff;
  text-align: center;
  text-shadow: 1px 1px 0 rgba(83,7,32,.75);
  border: 0;
  outline: 2px solid transparent;
  padding: 1.2em 1.65em;
  font-size: 1em;
  line-height: 1.1;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: outline .2s ease-in-out,background .15s ease-in-out;

  transition:
    outline 200ms ease-in-out,
    background 150ms ease-in-out;

  &:hover {
    --x: 40%;
  }

  &:focus {
    outline: 2px solid rgba(darken($teal, 40%), .15);
  }

  &:active {
    outline: 2px solid rgba(darken($teal, 40%), .35);
    --x: 20%;
  }
`

const propTypes = {
  className: PropTypes.string,
}

function Login(props) {
  return (
    <Container className={props.className}>
      <Title>Bad Movie Squad</Title>
      <Lance />
      <StyledSignIn />
    </Container>
  )
}

Login.propTypes = propTypes
export default React.memo(Login)