import styled from 'styled-components'

export default styled.li`
  padding: 1.25em 1em;
  ${({ theme }) => theme.textAlign.textCenter}
  min-width: 100px;

  a {
    text-decoration: none;
  	color: #fff;
  	font-weight: bold;
  }
`
