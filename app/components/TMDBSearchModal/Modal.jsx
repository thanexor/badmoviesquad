import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactModal from 'react-modal';
import TMDBSearch from './TMDBSearch';

import { addToBacklog } from 'services/writes';
import { recordBacklog } from 'services/activity';

const Container = styled.div``;

const propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  allMovies: PropTypes.array,
  onClick: PropTypes.func,
  tax: PropTypes.number,
  refreshActivity: PropTypes.func.isRequired,
};

function Modal(props) {
  async function addMovieToBacklog(movie) {
    const ref = await addToBacklog(movie);
    if (ref) {
      await recordBacklog({
        movieId: ref.id,
        movieName: movie.title,
      });
    }
    props.refreshActivity();
    props.onRequestClose();
  }

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={{
        overlay: {
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(225, 225, 225, 0.85)',
        },
        content: {
          position: 'absolute',
          top: '10vh',
          left: '50%',
          right: '0',
          bottom: 'auto',
          border: '1px solid rgb(204, 204, 204)',
          background: 'rgb(255, 255, 255)',
          overflow: 'auto',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '80vh',
          height: '100%',
          transform: 'translateX(-50%)',
          fontFamily: 'sans-serif',
        },
      }}
    >
      <TMDBSearch addMovieToBacklog={addMovieToBacklog} />
    </ReactModal>
  );
}

Modal.propTypes = propTypes;
export default React.memo(Modal);
