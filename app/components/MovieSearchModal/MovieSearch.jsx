import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``
const SearchBox = styled.input`
`

const SearchResults = styled.div``

const propTypes = {
  className: PropTypes.string,
  searchMovies: PropTypes.func.isRequired,
}

function MovieSearch(props) {
  const [ searchTerm, setSearchTerm ] = useState("")
  const [ searchResults, setSearchResults ] = useState([])

  const onSearch = () => {
    setSearchResults(props.searchMovies(searchTerm))
  }

  const movies = searchResults.map(movie => (
    <div>{movie.title}</div>
  ))

  return (
    <Container className={props.className}>
      <SearchBox
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <SearchResults>
        {movies}
      </SearchResults>
    </Container>
  )
}

MovieSearch.propTypes = propTypes
export default React.memo(MovieSearch)