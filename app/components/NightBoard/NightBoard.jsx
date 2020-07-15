import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getActivePicks } from 'services/read'
import { useFetchedData } from 'app/hooks'

import Slot from './Slot'
import EmptySlot from './EmptySlot'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const propTypes = {
  className: PropTypes.string,
  slots: PropTypes.number.isRequired,
}

function NightBoard(props) {
  const picks = useFetchedData(getScores)

  const slots = picks.map(pick => (
    <Slot movie={pick.movie} />
  ))

  while ( slots.length < props.slots ) {
    slots.push(<EmptySlot />)
  }

  return (
    <Container className={props.className}>
      { slots }
    </Container>
  )
}

NightBoard.propTypes = propTypes
export default React.memo(NightBoard)