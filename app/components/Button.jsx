import styled from 'styled-components'

export default styled.button`
  background-color: ${({ theme }) => theme.pinkHot};
  color: #fff;
  padding: 1em 1.25em;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 100ms linear;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.pinkHotter}
  }
`