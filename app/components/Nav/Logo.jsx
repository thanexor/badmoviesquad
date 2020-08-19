import styled from "styled-components";

export default styled.span`
  font-family: ${({ theme }) => theme.logoFont.creepster};
  color: ${({ theme }) => theme.limeGreem};
  margin-top: 0;
  margin-bottom: 0;
  pointer-events: none;
`
