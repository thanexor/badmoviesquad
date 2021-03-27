import React from 'react';
import styled, { keyframes } from 'styled-components';

import Tippy from '@tippy.js/react';
import { followCursor } from 'tippy.js';

import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/animations/shift-away-subtle.css';

import UnstyledButton from '../UnstyledButton';
import { COLORS } from '../../constants';

const Tooltip = ({
  content,
  children,
  type = 'default',
  placement = 'bottom',
  wrapperStyles = {},
  when = true,
  ...delegated
}) => {
  const shouldRenderTooltip = !!when;

  if (!shouldRenderTooltip) {
    return children;
  }

  return (
    <>
      <StyledTooltip
        content={content}
        hideOnClick={false}
        placement={placement}
        animation='shift-away-subtle'
        {...delegated}
        plugins={type === 'default' ? [followCursor] : null}
      >
        <ContentWrapper style={wrapperStyles}>{children}</ContentWrapper>
      </StyledTooltip>
    </>
  );
};

const enterKeyframesBottom = keyframes`
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(20px);
  }
`;

const enterKeyframesTop = keyframes`
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(-20px);
  }
`;

const StyledTooltip = styled(Tippy)`
  && {
    padding: 2px 6px 4px;
    font-size: 1.8rem;
    font-weight: 500;
    font-family: ${({ theme }) => theme.fontFamily.systemFonts};
    text-align: center;

    border: none;
    border-radius: 6px;
    background-color: hsl(0, 0%, 100%);
    color: ${COLORS.purpleSuperdark};
  }

  &[data-placement] > .tippy-arrow {
    border-bottom-color: hsl(0, 0%, 100%);
    border-radius: 8px;
  }
`;

const ContentWrapper = styled(UnstyledButton)`
  display: inline-flex;
`;

export default Tooltip;
