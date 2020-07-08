import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { makePick } from '../services/writes'

import Button from 'components/Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  backgroundURL: PropTypes.string,
  posterURL: PropTypes.string,
  makePick: PropTypes.func.isRequired,
}

function MovieCard(props) {
  let content = null
  if (props.posterURL) {
    content = (
      <Poster
        src={props.posterURL}
        alt={props.name}
      />
    )
  } else if (props.backgroundURL) {
    content = (
      <Background
        src={props.backgroundURL}
        alt={props.name}
      />
    )
  } else {
    content = (
      <NoData>
        NO DATA
      </NoData>
    )
  }

  return (
    <Container className={props.className}>
      { content }
      <Name>
        {props.name}
      </Name>
      <MakePickButton
        onClick={() => props.makePick(props.id)}
      >Pick
      </MakePickButton>
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