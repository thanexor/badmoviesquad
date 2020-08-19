import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const ProfileImage = styled.img`
  width: 1em;
  border: 2px solid ${({ theme }) => theme.limeGreem};
  border-radius: 50px;
`

const Username = styled.span`
  font-weight: 300;
  color: red;
`

const propTypes = {
  className: PropTypes.string,
  username: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
}

function Profile(props) {
  return (
    <Container className={props.className}>
      <ProfileImage src={props.avatarURL} />
      <Username>{props.username}</Username>
    </Container>
  );
}

Profile.propTypes = propTypes
export default React.memo(Profile)