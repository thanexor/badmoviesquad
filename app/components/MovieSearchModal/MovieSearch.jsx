import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import HoverableMovieCard from './HoverableMovieCard'
import Button from 'components/Button'

import { shuffle, isLength } from 'lodash'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: sans-serif;
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

function randomSample(array, size) {
  return shuffle(array).slice(0, size)
}

function searchMovies(movies, term) {
  return movies.filter(movie => movie.title.toLowerCase().includes(term.toLowerCase()))
}

const propTypes = {
  className: PropTypes.string,
  allMovies: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  tax: PropTypes.number,
}

function MovieSearch(props) {
  const { allMovies } = props
  const [ searchTerm, setSearchTerm ] = useState("")
  const [ searchResults, setSearchResults ] = useState([])
  const [ movieDB, setMovieDB ] = useState([])

  useEffect(() => {
    setSearchResults(searchMovies(allMovies, searchTerm))
  }, [searchTerm, allMovies])

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
  const { tax=0 } = props

  let movieCards = []
  if (searchTerm.length === 0) {
    movieCards = randomSample(allMovies, 15).map(movie => (
      <HoverableMovieCard
        master
        key={movie.id}
        onClick={props.onClick}
        movie={movie}
        pointCost={3 + tax}
      />
    ))
  } else {
    movieCards = searchResults.map(movie => (
      <HoverableMovieCard
        key={movie.id}
        onClick={props.onClick}
        movie={movie}
        pointCost={3 + tax}
      />
    ))
  }

  let movieDBCards = React.createElement();
  if (movieDB.length === 0 ) {
    movieDBCards = (
      <h4>Search for a movie</h4>
    )
  } else {
    movieDBCards = movieDB.map(movie => {
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
          <SearchResultTitle>{movie.title} <small>({ movie.release_date.substr(0, 4) })</small></SearchResultTitle>
          <SearchResultActions>
            <Button className="button-pick">Pick</Button>
          </SearchResultActions>
        </SearchResult>
      )
    })
  }

  return (
    <Container className={props.className}>
      <SearchBox
        placeholder={"Search"}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <SearchResults>
        {movieDBCards}
      </SearchResults>
    </Container>
  )
}

MovieSearch.propTypes = propTypes
export default React.memo(MovieSearch)
