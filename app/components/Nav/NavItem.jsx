import styled from 'styled-components';

import { COLORS } from '../../constants';

export default styled.li`
  text-align: center;

  a {
    display: block;
    line-height: 1;
    padding: 12px 20px 16px;
    background-color: transparent;
    border-radius: 50px;
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
    background: ${COLORS.primaryDark};
    background: linear-gradient(
      145deg,
      ${COLORS.pinkHotter} -50%,
      ${COLORS.primary} 100%
    );
  }
`;
