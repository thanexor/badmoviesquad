import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'

const Container = styled.div``

const MovieTitle = styled.div`
`

const PickedBy = styled.div`
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
      <Button onClick={props.onOutbid}>GET THIS SHIT OUTTA HERE</Button>
    </Container>
  )
}

Pick.propTypes = propTypes
export default React.memo(Pick)