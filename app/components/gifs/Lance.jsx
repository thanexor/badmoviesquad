import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  /* height: 100%; */
`;

const propTypes = {
  className: PropTypes.string,
};

function Lance(props) {
  return (
    <Container>
      <iframe
        src='https://giphy.com/embed/umWQh108RZcg8'
        width='100%'
        height='100%'
        frameBorder='0'
        className='giphy-embed'
        allowFullScreen
      ></iframe>
    </Container>
  );
}

Lance.propTypes = propTypes;
export default React.memo(Lance);
