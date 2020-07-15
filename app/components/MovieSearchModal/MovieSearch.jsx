import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MovieCard from 'components/MovieCard'

import { shuffle } from 'lodash'

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

  useEffect(() => {
    setSearchResults(searchMovies(allMovies, searchTerm))
  }, [searchTerm, allMovies])

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
    </Container>
  )
}

MovieSearch.propTypes = propTypes
export default React.memo(MovieSearch)