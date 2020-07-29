import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'

const Container = styled.div`
  flex: 0 0 50%;
  margin: 2px;
  padding: 5em;
  border: 1px solid  ${({ theme }) => theme.pinkHot};
  border-radius: 5px;
`

const MovieTitle = styled.h2`

`

const PickedBy = styled.p`
  font-size: 0.8em;
`

const propTypes = {
  className: PropTypes.string,
  movie: PropTypes.object.isRequired,
  pickedBy: PropTypes.object.isRequired, 
  onOutbid: PropTypes.func.isRequired,
}

function Pick(props) {
  return (
    <Container className={props.className}>
      <MovieTitle>{props.movie.title}</MovieTitle>
      <PickedBy>Picked by {props.pickedBy.displayName}</PickedBy>
      <Button onClick={props.onOutbid}>Remove pick</Button>
    </Container>
  )
}

Pick.propTypes = propTypes
export default React.memo(Pick)