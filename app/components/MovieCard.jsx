import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'

const Container = styled.div`
  display: flex;
  align-items: left;
  flex-direction: row;
  flex-wrap: wrap;
  // cursor: pointer;
  // height: 12vw;
  // overflow: hidden;
`

const MakePickButton = styled(Button)`
`

const Poster = styled.div`
  max-height: 200px;
`

const PosterImage = styled.img`
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
      <Poster>
        <PosterImage
          src={movie.poster_path}
          alt={movie.name}
        />
      </Poster>
    </Container>
  )
}

MovieCard.propTypes = propTypes