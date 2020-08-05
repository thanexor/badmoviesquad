import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  width: 100%;
  padding: 3em;
  box-sizing: border-box;
  height: 500px;
  background: no-repeat url(${(props) => props.background}); 
  background-size: cover;
  background-position: center;
`

const Poster = styled.img`
  height: 100%;
`

const Text = styled.div`
  margin-left: 3em;
`

const Title = styled.h1``

const Description = styled.p``

const propTypes = {
  className: PropTypes.string,
  movie: PropTypes.object.isRequired,
}

function Hero({ movie, className }) {
  const m = moment(movie.release_date)
  const year = m.year()

  return (
    <Container
      background={movie.backdrop_path}
      className={className}
    >
      <Poster src={movie.poster_path} alt={movie.title} />
      <Text>
        <Title>{movie.title} ({year})</Title>
        <Description>{movie.overview}</Description>
      </Text>

    </Container>
  )
}

Hero.propTypes = propTypes
export default React.memo(Hero)