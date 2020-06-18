import React, { useState, useEffect } from 'react'
//import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getScores } from '../services/firebase'

import Search from '../components/Search'
import Image from '../components/Image'

const Container = styled.div``

const StyledImage = styled(Image)`
  width: 400px;
  height: 400px;
`

const propTypes = {

}

export default function Scores(props) {
  const [ userScores, setUserScores ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const scores = await getScores()
      setUserScores(scores)    
    }
    fetchData()
  }, [])

  const Scores = userScores.map(score => {
    return (
      <div>

      </div>
    )
  })

  return (
    <Container>
      <h1>Scores</h1>

    </Container>
  )
}

Scores.propTypes = propTypes
