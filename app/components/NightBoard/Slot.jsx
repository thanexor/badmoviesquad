import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { outbidPick } from 'services/writes';
import { recordOutbid } from 'services/activity';

import Button from 'components/Button';
import MovieSearchModal from 'components/MovieSearchModal';

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
  background: no-repeat
      linear-gradient(
        ${({ theme }) => theme.purpleDark} 70%,
        ${({ theme }) => theme.grey10}
      ),
    url(${(props) => props.backdrop_path});
  background-size: cover;
  background-position: center;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 4px;
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
  color: ${({ theme }) => theme.grey06};
`;

const PointCost = styled.div`
  align-self: flex-start;
  justify-self: flex-end;
  grid-area: point-cost;
  font-size: 1.4rem;
  padding: 0.25em 0.5em;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.purpleSuperdark};
  color: white;
`;

const PickedBy = styled.span`
  grid-area: picked-by;
  width: fit-content;
  padding: 0.5em 1em;
  border-radius: 100px;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.pinkHot};
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
  const { movie, picker, tax } = props.pick;

  console.log(movie);

  return (
    <Container className={props.className} backdrop_path={movie.backdrop_path}>
      <PickedBy>
        Picked by: <strong>{picker.displayName}</strong>
      </PickedBy>
      <PointCost>{tax + 3} pts</PointCost>
      <MovieTitle target='_blank' href={movie.info_url}>
        <MovieLink target='_blank' href={movie.info_url}>
          {movie.title}
        </MovieLink>
        <MovieDate>({movie.release_date.substr(0, 4)})</MovieDate>
      </MovieTitle>
      <OutbidButton onClick={() => setPickerOpen(true)}>Outbid</OutbidButton>

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
