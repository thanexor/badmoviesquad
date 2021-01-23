import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { makePick } from 'services/writes';
import { recordPick } from 'services/activity';

import Particles from 'react-particles-js';
import particleConfig from './particleConfig';

import Button from 'components/Button';
import MovieSearchModal from 'components/MovieSearchModal';

const Container = styled.div`
  display: flex;
  flex: 0 0 50%;
  min-height: 350px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.purpleDark};
  border-radius: 4px;
  /* border: 2px solid ${({ theme }) => theme.primary}; */
`;

const Content = styled.div`
  position: absolute;
  text-align: center;
`;

const StyledButton = styled(Button)``;

const StyledParticles = styled(Particles)`
  width: 100%;
  max-height: 100%;
`;

const Text = styled.div`
  font-size: 1.4em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const propTypes = {
  className: PropTypes.string,
  fetchActivePicks: PropTypes.func.isRequired,
  refreshActivity: PropTypes.func.isRequired,
};

function EmptySlot(props) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <Container className={props.className}>
      <Content>
        <Text>Empty Slot</Text>
        <StyledButton onClick={() => setPickerOpen(true)}>
          Make Pick
        </StyledButton>
      </Content>
      <StyledParticles width={'100%'} height={'100%'} params={particleConfig} />
      <MovieSearchModal
        isOpen={pickerOpen}
        onRequestClose={() => setPickerOpen(false)}
        onClick={async (movie) => {
          await makePick({
            movieId: movie.firebase_id,
            points: 3,
          });
          await recordPick({
            movieId: movie.firebase_id,
            movieName: movie.title,
          });
          setPickerOpen(false);
          props.fetchActivePicks();
          props.refreshActivity();
        }}
      />
    </Container>
  );
}

EmptySlot.propTypes = propTypes;
export default React.memo(EmptySlot);
