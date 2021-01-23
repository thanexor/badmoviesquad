import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/Button';

import { signOut } from 'services/auth';

const StyledButton = styled(Button)`
  padding: 0.5em 1.25em;
`;

const propTypes = {
  className: PropTypes.string,
};

function SignOutButton(props) {
  return (
    <StyledButton className={props.className} onClick={signOut}>
      Sign Out
    </StyledButton>
  );
}

SignOutButton.propTypes = propTypes;
export default React.memo(SignOutButton);
