import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getBacklog } from '../services/firebase'

import MovieCard from '../components/MovieCard'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
}

function Backlog(props) {
  const [ backlog, setBacklog ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBacklog()
      setBacklog(data)
    }
    fetchData()
  }, [])

  const Backlog = backlog.map(movie => {
    return (
      <MovieCard
        name={movie.title}
      />
    )
  })

  return (
    <Container className={props.className}>
      <h1>Backlog</h1>
      {Backlog}
    </Container>
  )
}

Backlog.propTypes = propTypes
export default React.memo(Backlog)