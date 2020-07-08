import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useFetchedData } from 'app/hooks'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
}

function MovieSearch(props) {
  const [ searchTerm, setSearchTerm ] = useState("")
  const searchResults = useFetchedData()
  return (
    <Container className={props.className}>
    </Container>
  )
}

MovieSearch.propTypes = propTypes
export default React.memo(MovieSearch)