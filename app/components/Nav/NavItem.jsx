import styled from 'styled-components';

import { COLORS } from '../../constants';

export default styled.li`
  text-align: center;

  a {
    line-height: 1;
    padding: 0.2em 0.5em 0.5em;
    background-color: transparent;
    border-radius: 4px;
    text-decoration: none;
    color: ${COLORS.white};
    font-size: 1.8rem;
    font-weight: 500;
    transition: background-color 100ms ease-in-out;

    &:hover,
    &:focus {
      background-color: ${COLORS.purpleSuperdark};
    }
  }

  .active {
    background-color: ${COLORS.primary};

    &:hover,
    &:focus {
      background-color: ${COLORS.primaryDark};
    }
  }
`;
