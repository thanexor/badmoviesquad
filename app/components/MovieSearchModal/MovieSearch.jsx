import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MovieCard from 'components/MovieCard'

import { shuffle, isLength } from 'lodash'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const SearchBox = styled.input`
  font-size: 1.1em;
  padding: 0.3em;
  width: 330px;
  margin-bottom: 3em;

  &::placeholder {
    text-align: center;
  }
`

const SearchResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
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

  let movieCards = []
  if (searchTerm.length === 0) {
    movieCards = randomSample(allMovies, 15).map(movie => (
      <MovieCard
        key={movie.id}
        onClick={props.onClick}
        movie={movie}
      />
    ))
  } else {
    movieCards = searchResults.map(movie => (
      <MovieCard
        key={movie.id}
        onClick={props.onClick}
        movie={movie}
      />
    ))
  }

  let movieDBCards = React.createElement();
  if (movieDB.length === 0 ) {
    movieDBCards = (
      <h4>No Movies srry</h4>
    )
  } else {
    movieDBCards = movieDB.map(movie => {
      movie.poster_path = `https://image.tmdb.org/t/p/w300${movie.poster_path}`

      console.log('movie', movie);
      return (
        <MovieCard
          key={movie.id}
          onClick={() => { }}
          movie={movie}
        />
      )
    })
  }

  return (
    <Container className={props.className}>
      <SearchBox
        placeholder={"CHOOSE YOUR WEAPON"}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <SearchResults>
        {movieCards}
      </SearchResults>
      <hr/>
      <h3>From the cybernet</h3>
      <SearchResults>
        {movieDBCards}
      </SearchResults>

    </Container>
  )
}

MovieSearch.propTypes = propTypes
export default React.memo(MovieSearch)
