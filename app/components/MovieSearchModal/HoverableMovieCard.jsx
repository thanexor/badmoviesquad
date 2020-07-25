import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'

const HoverCard = styled.div`
  grid-area: main;
  visibility: hidden;
  width: 100%;
  border: 1px solid black;

  :hover {
    display: block;
  }
`

const Points = styled.div`
  font-size: 1.2em;
`

const PointText = styled.div``

const Poster = styled.img`
  grid-area: main;
  width: 100%;
`

const Name = styled.div``

const Container = styled.div`
  width: 150px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "main";
  cursor: pointer;

  &:hover ${Poster} {
    visibility: hidden;
  }

  &:hover ${HoverCard} {
    visibility: visible;
  }
`

const propTypes = {
  className: PropTypes.string,
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  pointCost: PropTypes.number.isRequired,
}

export default function HoverableMovieCard(props) {
  const { movie } = props
  return (
    <Container
      className={props.className}
      onClick={() => props.onClick(movie)}
    >
      <Poster
        src={movie.poster_path}
        alt={movie.name}
      />

      <HoverCard>
        <Name>{movie.title}</Name>
        <Points>{props.pointCost}</Points>
        <PointText>to pick</PointText>

      </HoverCard>
    </Container>
  )
}

HoverableMovieCard.propTypes = propTypes