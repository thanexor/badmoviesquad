import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// i think this kinda looks like garbage
// maybe we do something like a sticker on the poster
// like: $3 to pick
const HoverCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: black;
  
  grid-area: main;
  opacity: 0;
  width: 100%;
  border: 1px solid black;
`

const HoverText = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
`

const Points = styled.div`
  font-size: 1.2em;
  margin-right: 0.2em;
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

  &:hover ${HoverCard} {
    opacity: 0.7;
  }
`

const propTypes = {
  className: PropTypes.string,
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  pointCost: PropTypes.number.isRequired,
}

export default function HoverableMovieCard(props) {
  const [ makingPick, setMakingPick ] = useState(false)
  const { movie } = props
  return (
    <Container
      className={props.className}
      onClick={() => {
        setMakingPick(true)
        if(!makingPick) {
          props.onClick(movie)
        }
      }}
    >
      <Poster
        src={movie.poster_path}
        alt={movie.name}
      />

      <HoverCard>
        <HoverText>
          { makingPick 
          ? 
            "making pick..."
          : (
            <>
              <Points>{props.pointCost}</Points>
              <PointText>points</PointText>
            </>
          )
          }
        </HoverText>
      </HoverCard>
    </Container>
  )
}

HoverableMovieCard.propTypes = propTypes