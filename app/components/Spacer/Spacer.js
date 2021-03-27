import styled from 'styled-components';

function getWidth({ axis, size }) {
  return axis === 'vertical' ? 1 : size;
}

function getHeight({ axis, size }) {
  return axis === 'horizontal' ? 1 : size;
}

function getAxis({ axis }) {
  return axis === 'horizontal' ? 'inline-block' : 'block';
}

const Spacer = styled.span`
  display: ${getAxis};
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
`;

export default Spacer;
