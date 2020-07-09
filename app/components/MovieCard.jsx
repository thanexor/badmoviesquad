import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { makePick } from '../services/writes'

import Button from 'components/Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const MakePickButton = styled(Button)`
`

const Poster = styled.img`
  width: 150px;
`

const Background = styled.img`
  width: 150px;
`

const NoData = styled.div`
  width: 150px;
  height: 400px;
`

const Name = styled.div``

const propTypes = {
  className: PropTypes.string,
  movie: PropTypes.object.isRequired,
  makePick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

function MovieCard(props) {
  const { movie } = props 
  return (
    <Container 
      className={props.className}
      onClick={props.onClick}
    >
      <Poster
        src={movie.poster_path}
        alt={movie.name}
        />
    </Container>
  )
}

MovieCard.propTypes = propTypes
export default connect(
  null,
  (dispatch) => ({
    makePick: (firebase_id) => { return makePick(firebase_id)}
  })
)(MovieCard)