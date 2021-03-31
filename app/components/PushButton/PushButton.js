import React from 'react';
import styled from 'styled-components/macro';

import { COLORS } from '../../constants';

const PushButton = ({ children, ...delegated }) => {
  return (
    <Pushable {...delegated}>
      <Shadow />
      <Edge />
      <Front>{children}</Front>
    </Pushable>
  );
};

const Pushable = styled.button`
  position: relative;
  background: transparent;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 600ms;

  &:hover {
    filter: brightness(90%);
    transition: filter 250ms;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const Shadow = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsla(0, 0%, 0%, 0.25);
  transform: translateY(2px);
  filter: blur(4px);

  ${Pushable}:hover & {
    transform: translateY(4px);
  }
  ${Pushable}:active & {
    transform: translateY(1px);
  }
`;

export const Edge = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(340, 76%, 47%);
  background: linear-gradient(
    to left,
    hsl(340, 76%, 32%) 0%,
    hsl(340, 76%, 47%) 8%,
    hsl(340, 76%, 47%) 92%,
    hsl(340, 76%, 32%) 100%
  );
`;

export const Front = styled.span`
  position: relative;
  display: block;
  padding: 12px 42px;
  border-radius: 12px;
  font-size: 1.8rem;
  font-weight: bold;
  background: hsl(340, 85%, 60%);
  color: ${COLORS.white};
  transform: translateY(-4px);
  will-change: transform;
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);

  ${Pushable}:hover & {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  ${Pushable}:active & {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
`;

export default PushButton;
