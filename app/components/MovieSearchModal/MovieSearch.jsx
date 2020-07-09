import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MovieCard from 'components/MovieCard'

const Container = styled.div``
const SearchBox = styled.input`
`

const SearchResults = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const propTypes = {
  className: PropTypes.string,
  allMovies: PropTypes.array.isRequired,
}

function MovieSearch(props) {
  const [ searchTerm, setSearchTerm ] = useState("")
  const [ searchResults, setSearchResults ] = useState([])

  const movies = props.allMovies.filter(movie => movie.title.includes(searchTerm))

  const movieCards = searchResults.map(movie => (
    <MovieCard  movie={movie}/>
  ))

  return (
    <Container className={props.className}>
      <SearchBox
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