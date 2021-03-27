import styled from 'styled-components';

import { COLORS } from '../constants';

export default styled.button`
  background-color: ${COLORS.pinkHot};
  color: #fff;
  padding: 14px 20px;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 100ms linear;

  &:hover,
  &:focus {
    background-color: ${COLORS.pinkHotter};
  }
`;
