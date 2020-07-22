import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Slot from './Slot'
import EmptySlot from './EmptySlot'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const propTypes = {
  className: PropTypes.string,
  slots: PropTypes.number.isRequired,
  activePicks: PropTypes.array.isRequired,
  fetchActivePicks: PropTypes.func.isRequired,
}

function NightBoard(props) {

  const slots = props.activePicks.map(pick => (
    <Slot
      key={pick.firestore_id}
      pick={pick}
      fetchActivePicks={props.fetchActivePicks}
    />
  ))

  while ( slots.length < props.slots ) {
    slots.push(<EmptySlot
      key={slots.length}
      fetchActivePicks={props.fetchActivePicks}
    />)
  }

  return (
    <Container className={props.className}>
      { slots }
    </Container>
  )
}

NightBoard.propTypes = propTypes
export default React.memo(NightBoard)