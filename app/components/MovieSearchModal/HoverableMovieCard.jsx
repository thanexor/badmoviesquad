import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// i think this kinda looks like garbage
// maybe we do something like a sticker on the poster
// like: $3 to pick
const HoverCard = styled.div`
  display: block;
  padding: .5em;
  color: white;
  background: black;
  opacity: 0;
  width: 100%;
  text-align: center;
  background: none ${({ theme }) => theme.purpleDark};
  box-sizing: border-box;
  margin-top: 3px;
  border: none;
  border-radius: 2px;
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
  display: block;
  max-width: 100%;
  position: relative;

  transition: all 200ms ease;
  transition-property: box-shadow, transform;

  box-shadow: 0 0 0 3px ${({ theme }) => theme.purpleDark};
  transform: translate(0, 0);

  // for broken images
  min-height: 80%;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.grey08};
  background: rgba(200, 200, 200, .25);

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 2px 2px 0 5px ${({ theme }) => theme.purpleDark};
  }
`

const Name = styled.div``

const Container = styled.div`
  width: 25%;
  padding: 1%;
  min-height: 65%;
  cursor: pointer;
  box-sizing: border-box;

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
        alt={movie.title}
      />

      <HoverCard>
        <HoverText>
          { makingPick 
          ? 
            "Making pick..."
          : (
            <>
              Pick for &nbsp;<Points>{props.pointCost}</Points> <PointText>points</PointText>
            </>
          )
          }
        </HoverText>
      </HoverCard>
    </Container>
  )
}

HoverableMovieCard.propTypes = propTypes