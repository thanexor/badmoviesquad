import styled from 'styled-components'

export default styled.li`
  padding: 0;
  ${({ theme }) => theme.textAlign.textCenter}

  ${({ theme }) => theme.mediaBreakpoint.md} {
    padding: 1.25em 1em;
  }

  a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
  }
`;
