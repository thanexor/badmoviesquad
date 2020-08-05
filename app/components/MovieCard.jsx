import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'

const Container = styled.div`
  width: 12.25%;
  margin: 1%;
`

const Poster = styled.img`
  display: block;
  max-width: 100%;

  // for broken images
  font-size: 10px;
  color: ${({ theme }) => theme.grey02};
  background: rgba(255, 255, 255, .1);
  min-height: 250px;
  min-width: 80px;
`

const Title = styled.span`
  font-size: 1.4rem;
  font-weight: normal;

  small {
    font-size: 1.2rem;
  }
`

const propTypes = {
  className: PropTypes.string,
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default function MovieCard(props) {
  const { movie } = props
  return (
    <Container
      className={props.className}
      onClick={() => props.onClick(movie)}
    >
      <Poster
        src={movie.poster_path}
        alt={movie.title}
      />
      <Title className="h6">{movie.title} <small>({ movie.release_date.substr(0, 4) })</small></Title>
    </Container>
  )
}

MovieCard.propTypes = propTypes