import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import Name from './Name';
import Time from './Time';
import Link from 'components/Link';

const Container = styled.div`
  margin: 0.5em 0;
`;
const Movie = styled(Link)``;

const propTypes = {
  className: PropTypes.string,
  timestamp: PropTypes.number.isRequired,
  movieId: PropTypes.string.isRequired,
  movieName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

function Pick(props) {
  const time = moment(props.timestamp).fromNow();
  return (
    <Container className={props.className}>
      <Time>[{time}]</Time>
      <Name>{props.username}</Name> picked{' '}
      <Movie to={`/movie/${props.movieId}`}>{props.movieName}</Movie>
    </Container>
  );
}

Pick.propTypes = propTypes;
export default React.memo(Pick);
