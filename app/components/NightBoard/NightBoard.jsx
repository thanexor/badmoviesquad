import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Slot from './Slot';
import EmptySlot from './EmptySlot';

const Container = styled.div``;

const Title = styled.h3``;

const Location = styled.p``;

const Header = styled.div``;

const Slots = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    grid-template-columns: 1fr 1fr;
  }
`;

const propTypes = {
  className: PropTypes.string,
  slots: PropTypes.number.isRequired,
  activePicks: PropTypes.array.isRequired,
  fetchActivePicks: PropTypes.func.isRequired,
  night: PropTypes.object.isRequired,
  refreshActivity: PropTypes.func.isRequired,
};

function NightBoard(props) {
  const { title, location } = props.night;

  const slots = props.activePicks.map((pick) => (
    <Slot
      key={pick.firestore_id}
      pick={pick}
      fetchActivePicks={props.fetchActivePicks}
      refreshActivity={props.refreshActivity}
    />
  ));

  while (slots.length < props.slots) {
    slots.push(
      <EmptySlot
        key={slots.length}
        fetchActivePicks={props.fetchActivePicks}
        refreshActivity={props.refreshActivity}
      />
    );
  }

  return (
    <Container className={props.className}>
      <Header>
        <Title>{title}</Title>
        <Location>{location}</Location>
      </Header>

      <Slots>{slots}</Slots>
    </Container>
  );
}

NightBoard.propTypes = propTypes;
export default React.memo(NightBoard);
