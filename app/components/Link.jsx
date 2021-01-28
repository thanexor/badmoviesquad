import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  color: ${({ theme }) => theme.pinkHot};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
