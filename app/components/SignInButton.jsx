import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { signIn } from 'services/auth';

import Button from './Button';

const propTypes = {
  className: PropTypes.string,
};

function SignInButton(props) {
  return (
    <Button className={props.className} onClick={signIn}>
      Sign in with Google
    </Button>
  );
}

SignInButton.propTypes = propTypes;
export default React.memo(SignInButton);
