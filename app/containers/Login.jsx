import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Lance } from 'components/gifs';
import SignInButton from 'components/SignInButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1``;

const propTypes = {
  className: PropTypes.string,
};

function Login(props) {
  return (
    <Container className={props.className}>
      <Title>Bad Movie Squad</Title>
      <Lance />
      <SignInButton />
    </Container>
  );
}

Login.propTypes = propTypes;
export default React.memo(Login);
