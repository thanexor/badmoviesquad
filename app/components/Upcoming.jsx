import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  
  .upcoming {
    padding: 
  }
`



const propTypes = {
  className: PropTypes.string,
  movieName: PropTypes.string.isRequired,
  pickedBy: PropTypes.string.isRequired,
}

function Upcoming(props) {
  return (
    <Container className={props.className}>
      <div class="upcoming">
        <h2>{props.movieName}</h2>
        <div>
          <p>Picked By: {props.pickedBy}</p>
        </div>
      </div>
    </Container>
  )
}

Upcoming.propTypes = propTypes
export default React.memo(Upcoming)