import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div``

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  backgroundURL: PropTypes.string,
}

function MovieCard(props) {
  return (
    <Container className={props.className}>
      { props.name }
    </Container>
  )
}

MovieCard.propTypes = propTypes
export default React.memo(MovieCard)