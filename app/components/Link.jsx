import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../constants';

export default styled(Link)`
  color: ${COLORS.pinkHot};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
