import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

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
  name: PropTypes.string.isRequired,
  backgroundURL: PropTypes.string,
  posterURL: PropTypes.string,
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
    </Container>
  )
}

MovieCard.propTypes = propTypes
export default React.memo(MovieCard)