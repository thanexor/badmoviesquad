import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useFetchedData } from 'app/hooks';
import { getUserBacklog, getActiveNights, getActivity } from 'services/read';

import { MOVIE_URL } from 'app/constants';
import MovieCard from 'components/MovieCard';
import NightBoard from 'components/NightBoard';
import ActivityFeed from 'components/ActivityFeed';

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  padding-top: 1.5em;
  padding-bottom: 10vh;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    grid-template-columns: repeat(8, 1fr);
  }

  .home-movies-list {
    width: 20%;
  }
`;

const Container = styled.div`
  padding: 1.5em 0;
`;

const RecentActivity = styled.div`
  padding: 1.5em 0;
`;

const Picks = styled.div`
  display: flex;
`;

const NoNight = styled.h3`
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
      <h1 className='sr-only'>Bad Movie Squad</h1>
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
      <RecentActivity>
        <h2>Recent activity</h2>
        <ActivityFeed activity={activity} />
      </RecentActivity>

      <h2>Recently added</h2>
      <Movies className='home-movies-list'>{movies}</Movies>
    </Container>
  );
}

Home.propTypes = propTypes;
