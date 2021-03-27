import styled from 'styled-components';

export default styled.ul`
  display: flex;
  grid-row-gap: 36px;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 0;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    grid-column-gap: 24px;
    grid-row-gap: 0;
  }
`;
