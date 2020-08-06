import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'

const Container = styled.div``

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
    ${({ theme }) => theme.textAlign.textCenter}
  }
`

const SearchResults = styled.div`
  // display: flex;
  margin-top: 7em;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 600px;
  max-height: 65vh;
  overflow: auto;
`

const SearchResult = styled.div`
  display: flex;
  align-items: top;
  flex-direction: row;
  margin: .75em 0;
`

const SearchResultPoster = styled.img`
  width: 35px;
  margin-right: 2em;
  font-size: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.grey07};
  background: ${({ theme }) => theme.grey02};
`

const SearchResultTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 14px;
  font-weight: normal;

  small {
    font-size: 85%;
  }
`

const SearchResultActions = styled.div`
  flex-grow: 1;
  text-align: right;
  justify-self: right;
  padding-right: 1em;
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
    movie.poster_path = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`

    console.log('movie', movie);
    return (
      <SearchResult
        onClick={props.onClick}
      >
        <SearchResultPoster
          src={movie.poster_path}
          alt={movie.title}
        />
        <SearchResultTitle>{movie.title} <small>({movie.release_date.substr(0, 4)})</small></SearchResultTitle>
        <SearchResultActions>
          <Button className="button-pick">Pick</Button>
        </SearchResultActions>
      </SearchResult>
    )
  })

  return (
    <Container className={props.className}>
      <SearchBox
        placeholder={"Search"}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <SearchResults>
        {(movieDBCards.length === 0)
          ? <h4>Search for a movie</h4>
          : null
        }
        {movieDBCards}
      </SearchResults>
    </Container>
  )
}

TMDBSearch.propTypes = propTypes