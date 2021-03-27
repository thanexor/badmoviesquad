import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HoverableMovieCard from './HoverableMovieCard';

import { shuffle, isLength } from 'lodash';

const Container = styled.div`
  // display: flex;
  // align-items: left;
  // justify-content: left;
  // flex-direction: row;
  // flex-basis: 30%;
  font-family: sans-serif;
`;

const SearchBox = styled.input`
  margin-top: 1em;
  margin-bottom: 2em;

  box-sizing: border-box;
  font-size: 1.5rem;
  font-weight: normal;
  padding: 1em;
  width: 100%;
  max-width: 600px;

  &::placeholder {
    // text-align: center;
  }
`;

const Movies = styled.div`
  display: flex;
  flex-basis: 25%;
  flex-wrap: wrap;
  justify-content: left;
`;

function randomSample(array, size) {
  return shuffle(array).slice(0, size);
}

function searchMovies(movies, term) {
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(term.toLowerCase())
  );
}

const propTypes = {
  className: PropTypes.string,
  allMovies: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  tax: PropTypes.number,
};

function MovieSearch(props) {
  const { allMovies } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(searchMovies(allMovies, searchTerm));
  }, [searchTerm, allMovies]);

  const { tax = 0 } = props;

  let movieCards = [];
  if (searchTerm.length === 0) {
    movieCards = randomSample(allMovies, 15).map((movie) => (
      <HoverableMovieCard
        master
        key={movie.id}
        onClick={props.onClick}
        movie={movie}
        pointCost={3 + tax}
      />
    ));
  } else {
    movieCards = searchResults.map((movie) => (
      <HoverableMovieCard
        key={movie.id}
        onClick={props.onClick}
        movie={movie}
        pointCost={3 + tax}
      />
    ));
  }

  return (
    <Container>
      <SearchBox
        placeholder={'Search'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Movies>{movieCards}</Movies>
    </Container>
  );
}

MovieSearch.propTypes = propTypes;
export default React.memo(MovieSearch);
