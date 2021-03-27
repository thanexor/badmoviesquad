import styled from 'styled-components';

import { COLORS } from '../../constants';

export default styled.li`
  text-align: center;

  a {
    line-height: 1;
    padding: 0.2em 0.5em 0.5em;
    background-color: transparent;
    border-radius: 8px;
    text-decoration: none;
    color: ${COLORS.white};
    font-size: 2rem;
    font-weight: 500;
    transition: background-color 100ms ease-in-out;

    &:hover,
    &:focus {
      background-color: ${COLORS.purpleSuperdark};
    }
  }

  .active {
    background: ${COLORS.primary};
    background: linear-gradient(
      145deg,
      ${COLORS.primary} -50%,
      ${COLORS.pinkHotter} 100%
    );

    &:hover,
    &:focus {
      background: ${COLORS.primaryDark};
      background: linear-gradient(
        145deg,
        ${COLORS.pinkHotter} -50%,
        ${COLORS.primary} 100%
      );
    }
  }
`;
