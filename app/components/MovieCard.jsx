import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  height: 12vw;
  overflow: hidden;
`

const MakePickButton = styled(Button)`
`

const Poster = styled.img`
  display: block;
  width: auto;
  height: 100%;
  margin: 0 auto;
`

const NoData = styled.div`
  height: 400px;
`

const Name = styled.div``

const propTypes = {
  className: PropTypes.string,
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default function MovieCard(props) {
  const { movie } = props
  return (
    <Container
      className={props.className}
      onClick={() => props.onClick(movie)}
    >
      <Poster
        src={movie.poster_path}
        alt={movie.name}
        />
    </Container>
  )
}

MovieCard.propTypes = propTypes