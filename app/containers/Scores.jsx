import React, { useState, useEffect } from 'react'
//import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getScores } from '../services/firebase'

import Scorecard from '../components/Scorecard'

const Container = styled.div``

const StyledScorecard = styled(Scorecard)`
  width: 400px;
  margin-top: 4px;
  margin-bottom: 4px;
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
      <StyledScorecard
        key={score.uid}
        name={score.displayName}
        score={score.total_points}
      />
    )
  })

  return (
    <Container>
      <h1>Scores</h1>

      { Scores }

    </Container>
  )
}

Scores.propTypes = propTypes
