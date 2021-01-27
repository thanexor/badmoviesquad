import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchResultActions from './SearchResultActions';

const Container = styled.div`
  max-height: 72vh;

  h3 {
    font-size: 1.8rem;
    font-weight: normal;
    color: ${({ theme }) => theme.grey06};
  }

  .muted {
    opacity: 0.25;
  }
`;

const SearchBox = styled.input`
  position: absolute;
  top: 1em;
  box-sizing: border-box;
  font-size: 1.5rem;
  font-weight: normal;
  padding: 1em;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2em;

  &::placeholder {
  }
`;

const SearchResults = styled.div`
  // display: flex;
  margin-top: 5em;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 600px;
  max-height: 72vh;
  overflow: auto;
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 0.5em 0 1em;
  padding: 0.5em;
  transition: background-color 100ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.grey02};
  }
`;

const SearchResultPoster = styled.img`
  width: 55px;
  min-height: 70px;
  margin-right: 2em;
  font-size: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.grey07};
  background: ${({ theme }) => theme.grey02};
`;

const SearchResultTitle = styled.h4`
  margin: 0 0 1rem;
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.grey09};

  small {
    font-size: 85%;
  }
`;

const propTypes = {
  className: PropTypes.string,
  addMovieToBacklog: PropTypes.func.isRequired,
};

export default function TMDBSearch(props) {
  const [movieDB, setMovieDB] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovieDB = async () => {
      if (searchTerm.length > 0) {
        let response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=fba97c7e6c8f93d931fe92ce8c7ac282&language=en-US&query=${searchTerm}&page=1&include_adult=false`
        );
        response = await response.json();
        setMovieDB(response.results);
      }
    };

    fetchMovieDB();
  }, [searchTerm]);

  const movieDBCards = movieDB.map((movie) => {
    const moviePosterURL = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
    const releaseDate = movie.release_date
      ? movie.release_date.substr(0, 4)
      : null;

    return (
      <SearchResult onClick={props.onClick} key={movie.id}>
        <SearchResultPoster src={moviePosterURL} alt={movie.title} />
        <SearchResultTitle>
          {movie.title} <small>({releaseDate})</small>
        </SearchResultTitle>
        <SearchResultActions
          addMovieToBacklog={() => props.addMovieToBacklog(movie)}
        />
      </SearchResult>
    );
  });

  return (
    <Container className={props.className}>
      <SearchBox
        placeholder={'Search to add movie'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchResults>
        {movieDBCards.length === 0 ? (
          <h3 className='muted'>Search results (0)</h3>
        ) : (
          <h3>Search results ({movieDBCards.length})</h3>
        )}
        {movieDBCards}
      </SearchResults>
    </Container>
  );
}

TMDBSearch.propTypes = propTypes;
