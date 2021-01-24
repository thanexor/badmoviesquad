import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/Button';

import { useFetchedData } from 'app/hooks';
import { getUserBacklog, getActiveNights, getActivity } from 'services/read';

import { MOVIE_URL } from 'app/constants';
import MovieCard from 'components/MovieCard';
import NightBoard from 'components/NightBoard';
import ActivityFeed from 'components/ActivityFeed';

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  padding-bottom: 10vh;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    grid-template-columns: repeat(6, 1fr);
  }

  .home-movies-list {
    width: 20%;
  }
`;

const SearchButton = styled(Button)`
  padding: 25.08px 22px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.limeGreem};

  &:hover {
    background-color: ${({ theme }) => theme.limeGreemDark};
  }
`;

const Container = styled.div``;

const Picks = styled.div`
  display: flex;
`;

const NoNight = styled.h3`
  font-size: 3em;
  color: #fff;
`;

const propTypes = {
  user: PropTypes.string.isRequired,
  fetchActivePicks: PropTypes.func.isRequired,
  activePicks: PropTypes.array.isRequired,
};

export default function Home(props) {
  const [backlog] = useFetchedData(getUserBacklog, props.user);
  const [nights] = useFetchedData(getActiveNights);
  const [activity, refreshActivity] = useFetchedData(getActivity, 10);

  const night = nights[0];

  const movies = backlog.map((movie) => (
    <MovieCard
      key={movie.id}
      movie={movie}
      onClick={() => window.open(`${MOVIE_URL}/${movie.id}`, '_blank')}
    />
  ));

  return (
    <Container>
      <h1>What's next</h1>

      {night ? (
        <NightBoard
          slots={2}
          activePicks={props.activePicks}
          fetchActivePicks={props.fetchActivePicks}
          refreshActivity={refreshActivity}
          night={night}
        />
      ) : (
        <NoNight>One sec...</NoNight>
      )}

      <h3>Recent activity</h3>
      <ActivityFeed activity={activity} />

      <h3>Recently added</h3>
      <Movies className='home-movies-list'>{movies}</Movies>
    </Container>
  );
}

Home.propTypes = propTypes;
