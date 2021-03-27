import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactModal from 'react-modal';
import MovieSearch from './MovieSearch';

import { COLORS } from '../../constants';

const propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  allMovies: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  tax: PropTypes.number,
};

function Modal(props) {
  return (
    <StyledReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={{
        overlay: {
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'hsla(265, 80%, 8%, 0.8)',
        },
        content: {
          position: 'absolute',
          top: '10vh',
          left: '50%',
          right: '0',
          bottom: 'auto',
          backgroundColor: '#ffffff',
          overflow: 'auto',
          borderRadius: '10px',
          outline: 'none',
          padding: '20px',
          width: '100%',
          height: '100%',
          transform: 'translateX(-50%)',
        },
      }}
    >
      <MovieSearch
        allMovies={props.allMovies}
        onClick={props.onClick}
        tax={props.tax}
      />
    </StyledReactModal>
  );
}

const StyledReactModal = styled(ReactModal)`
  max-width: 80vw;
  max-height: 80vh;
  ${({ theme }) => theme.mediaBreakpoint.md} {
    max-width: 600px;
  }
`;

Modal.propTypes = propTypes;
export default React.memo(Modal);
