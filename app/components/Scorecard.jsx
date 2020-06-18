import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const Name = styled.div`

`

const Points = styled.div`

`

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}

export default function Scorecard(props) {
  return (
    <Container className={props.className}>
      <Name>{props.name}</Name>
      <Points>{props.score}</Points>
    </Container>
  )
}

Scorecard.propTypes = propTypes
