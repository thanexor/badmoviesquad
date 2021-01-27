import styled from 'styled-components';

export default styled.li`
  padding: 1em 0.25em;
  ${({ theme }) => theme.textAlign.textCenter}

  ${({ theme }) => theme.mediaBreakpoint.md} {
    padding: 1.25em 2em;
  }

  a {
    text-decoration: none;
    color: #fff;
    font-size: 1.8rem;
    font-weight: bold;
    transition: color 100ms ease-in-out;

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.pinkHot};
    }
  }

  .active {
    color: ${({ theme }) => theme.pinkHot};
  }
`;
