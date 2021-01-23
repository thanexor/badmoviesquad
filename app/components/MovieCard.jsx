import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/Button';

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

const Poster = styled.img`
  display: block;
  max-width: 100%;
  position: relative;

  transition: all 100ms ease;
  transition-property: box-shadow, transform;

  border: 3px solid ${({ theme }) => theme.pinkHot};
  box-shadow: 0 0 0 3px transparent;
  transform: translate(0, 0);

  // for broken images
  min-height: 65%;
  font-size: 10px;
  color: ${({ theme }) => theme.grey03};
  background: rgba(255, 255, 255, 0.15);

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 2px 2px 0 5px ${({ theme }) => theme.pinkHot};
  }
`;

const Title = styled.span`
  display: block;
  margin: 0.5em 0 0;
  font-size: 1.6rem;
  font-weight: normal;
  color: ${({ theme }) => theme.grey03};
  line-height: 1.25;

  small {
    font-size: 1.2rem;
    opacity: 0.5;
  }
`;

const propTypes = {
  className: PropTypes.string,
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function MovieCard(props) {
  const { movie } = props;
  return (
    <Container className={props.className} onClick={() => props.onClick(movie)}>
      <Poster src={movie.poster_path} alt={movie.title} />
      <Title className='h6'>
        {movie.title} <small>({movie.release_date.substr(0, 4)})</small>
      </Title>
    </Container>
  );
}

MovieCard.propTypes = propTypes;
