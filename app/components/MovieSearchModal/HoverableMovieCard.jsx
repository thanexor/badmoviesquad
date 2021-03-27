import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PointsPill from '../PointsPill';
import { COLORS } from '../../constants';

// i think this kinda looks like garbage
// maybe we do something like a sticker on the poster
// like: $3 to pick
const HoverCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  opacity: 0;
  box-sizing: border-box;
  margin-top: 3px;
  border: none;
  border-radius: 2px;
  transition: opacity 100ms ease;
`;

const HoverText = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;

const Poster = styled.img`
  display: block;
  max-width: 100%;
  position: relative;

  transition: all 200ms ease;
  transition-property: box-shadow, transform;
  will-change: box-shadow, transform;

  box-shadow: 0 0 0 3px ${COLORS.purpleDark};
  transform: translate(0, 0);

  // for broken images
  min-height: 80%;
  background: rgba(200, 200, 200, 0.25);

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 2px 2px 0 5px ${COLORS.purpleDark};
  }
`;

const Name = styled.div``;

const Container = styled.div`
  position: relative;
  min-height: 65%;
  cursor: pointer;
  box-sizing: border-box;

  &:hover ${HoverCard} {
    opacity: 1;
  }
`;

const propTypes = {
  className: PropTypes.string,
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  pointCost: PropTypes.number.isRequired,
};

export default function HoverableMovieCard(props) {
  const [makingPick, setMakingPick] = useState(false);
  const { movie } = props;
  return (
    <Container
      className={props.className}
      onClick={() => {
        setMakingPick(true);
        if (!makingPick) {
          props.onClick(movie);
        }
      }}
    >
      <Poster src={movie.poster_path} alt={movie.title} />

      <HoverCard>
        <HoverText>
          <PointsPill>
            {makingPick ? 'Making pick...' : `${props.pointCost} pts`}
          </PointsPill>
        </HoverText>
      </HoverCard>
    </Container>
  );
}

HoverableMovieCard.propTypes = propTypes;
