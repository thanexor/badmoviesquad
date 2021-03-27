import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { outbidPick } from 'services/writes';
import { recordOutbid } from 'services/activity';

import useBoop from '../../hooks/useBoop';
import { animated } from 'react-spring';

import Button from 'components/Button';
import MovieSearchModal from 'components/MovieSearchModal';
import PointsPill from '../PointsPill';
import { COLORS } from '../../constants';

const Container = styled.div`
  display: grid;
  padding: 3vw;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 0.5fr;
  grid-template-areas:
    'title point-cost'
    'picked-by pick-button';
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  background: rgb(255, 0, 226);
  background: linear-gradient(
      145deg,
      rgba(255, 0, 226, 0.8) -50%,
      rgba(38, 8, 80, 0.8) 100%
    ),
    url(${(props) => props.poster_path});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  flex: 0 0 50%;
  box-sizing: border-box;
  min-height: 350px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const MovieTitle = styled.div`
  grid-area: title;
  align-self: flex-start;
  font-size: 1.4em;
  font-weight: bold;
`;

const MovieLink = styled.a`
  color: #fff;
  text-shadow: 1px 1px black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MovieDate = styled.span`
  margin-left: 10px;
  font-size: 70%;
  color: ${COLORS.gray[600]};
`;

const PointCost = styled.div`
  align-self: flex-start;
  justify-self: flex-end;
  grid-area: point-cost;
`;

const PickedBy = styled.span`
  grid-area: picked-by;
  width: fit-content;
  padding: 0.5em 1em;
  border-radius: 100px;
  font-size: 1.6rem;
  color: ${COLORS.pinkHot};
  background-color: #ffffff;
`;

const OutbidButton = styled(Button)`
  grid-area: pick-button;
  max-width: 100px;
  justify-self: right;
`;

const propTypes = {
  className: PropTypes.string,
  pick: PropTypes.object.isRequired,
  fetchActivePicks: PropTypes.func.isRequired,
  refreshActivity: PropTypes.func.isRequired,
};

function Slot(props) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [style, trigger] = useBoop({ scale: 1.025, timing: 150 });

  const { movie, picker, tax } = props.pick;

  console.log(movie);

  return (
    <Container className={props.className} poster_path={movie.poster_path}>
      <PickedBy>
        Picked by: <strong>{picker.displayName}</strong>
      </PickedBy>
      <PointCost>
        <PointsPill>{tax + 3} pts</PointsPill>
      </PointCost>
      <MovieTitle target='_blank' href={movie.info_url}>
        <MovieLink target='_blank' href={movie.info_url}>
          {movie.title}
        </MovieLink>
        <MovieDate>({movie.release_date.substr(0, 4)})</MovieDate>
      </MovieTitle>
      <OutbidButton onClick={() => setPickerOpen(true)} onMouseEnter={trigger}>
        <animated.span style={style}>Outbid</animated.span>
      </OutbidButton>

      <MovieSearchModal
        isOpen={pickerOpen}
        onRequestClose={() => setPickerOpen(false)}
        tax={tax + 1}
        onClick={async (movie) => {
          await outbidPick({
            movieId: movie.firebase_id,
            points: 3,
            outbidPickId: props.pick.firebase_id,
          });
          await recordOutbid({
            movieId: movie.firebase_id,
            movieName: movie.title,
            outbidPickId: props.pick.firebase_id,
          });
          setPickerOpen(false);
          props.fetchActivePicks();
          props.refreshActivity();
        }}
      />
    </Container>
  );
}

Slot.propTypes = propTypes;
export default React.memo(Slot);
