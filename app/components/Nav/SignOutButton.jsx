import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/Button';
import useBoop from '../../hooks/use-boop';
import { animated } from 'react-spring';

import { signOut } from 'services/auth';

const StyledButton = styled(Button)`
  margin-right: 10px;
  padding: 0.5em 1.25em;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    margin-right: 0;
  }
`;

const propTypes = {
  className: PropTypes.string,
};

function SignOutButton(props) {
  const [style, trigger] = useBoop({ scale: 1.025, timing: 150 });

  return (
    <StyledButton
      className={props.className}
      onClick={signOut}
      onMouseEnter={trigger}
    >
      <animated.span style={style}>Sign Out</animated.span>
    </StyledButton>
  );
}

SignOutButton.propTypes = propTypes;
export default React.memo(SignOutButton);
