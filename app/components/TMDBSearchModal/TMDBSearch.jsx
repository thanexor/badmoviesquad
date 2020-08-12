import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { addToBacklog } from 'services/writes'

import Button from 'components/Button'

const Container = styled.div`
  max-height: 72vh;

  h3 {
    font-size: 1.8rem;
    font-weight: normal;
    color: ${({ theme }) => theme.grey06};
  }

  .muted {
    opacity: .25;
  }
`

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
`

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
`

const SearchResult = styled.div`
  display: flex;
  align-items: top;
  flex-direction: row;
  margin: .5em 0 1em;
  padding: .5em;

  &:hover {
    background-color: ${({ theme }) => theme.grey01};
  }
`

const SearchResultPoster = styled.img`
  width: 55px;
  min-height: 70px;
  margin-right: 2em;
  font-size: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.grey07};
  background: ${({ theme }) => theme.grey02};
`

const SearchResultTitle = styled.h4`
  margin: 0 0 1rem;
  font-size: 1.8rem;
  font-weight: normal;
  color: ${({ theme }) => theme.grey09};

  small {
    font-size: 85%;
  }
`

const SearchResultActions = styled.div`
  flex-grow: 1;
  text-align: right;
  justify-self: right;
  padding-right: 1.5em;
`

const propTypes = {
  className: PropTypes.string,
}

export default function TMDBSearch(props) {
  const [movieDB, setMovieDB] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchMovieDB = async () => {
      if (searchTerm.length > 0) {
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=fba97c7e6c8f93d931fe92ce8c7ac282&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
        response = await response.json()
        console.log('res', response.results)
        setMovieDB(response.results);
      }
    }

    fetchMovieDB()
  }, [searchTerm])

  const movieDBCards = movieDB.map(movie => {
    const moviePosterURL = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    const releaseDate = movie.release_date ? movie.release_date.substr(0,4) : null

    return (
      <SearchResult
        onClick={props.onClick}
      >
        <SearchResultPoster
          src={moviePosterURL}
          alt={movie.title}
        />
        <SearchResultTitle>{movie.title} <small>({releaseDate})</small></SearchResultTitle>
        <SearchResultActions>
          <Button
            onClick={async () => {
              await addToBacklog(movie)
            }}
            className="button-pick"
          >
            Add
          </Button>
        </SearchResultActions>
      </SearchResult>
    )
  })

  return (
    <Container className={props.className}>
      <SearchBox
        placeholder={"Search to add movie"}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <SearchResults>
        {(movieDBCards.length === 0)
          ? <h3 className="muted">Search results (0)</h3>
          : <h3>Search results ({movieDBCards.length})</h3>
        }
        {movieDBCards}
      </SearchResults>
    </Container>
  )
}

TMDBSearch.propTypes = propTypes