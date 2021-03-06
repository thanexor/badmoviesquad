import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { makePick } from 'services/writes';
import { recordPick } from 'services/activity';

import Particles from 'react-particles-js';
import particleConfig from './particleConfig';

import useBoop from '../../hooks/useBoop';
import { animated } from 'react-spring';

import Button from 'components/Button';
import MovieSearchModal from 'components/MovieSearchModal';
import { COLORS } from '../../constants';

const Container = styled.div`
  display: flex;
  flex: 0 0 50%;
  min-height: 350px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.purpleDark};
  border-radius: 10px;
`;

const Content = styled.div`
  position: absolute;
  text-align: center;
`;

const StyledButton = styled(Button)``;

const StyledParticles = styled(Particles)`
  width: 100%;
  max-height: 350px;
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
  const [style, trigger] = useBoop({ scale: 1.025, timing: 150 });

  return (
    <Container className={props.className}>
      <Content>
        <Text>Empty Slot</Text>
        <StyledButton
          onClick={() => setPickerOpen(true)}
          onMouseEnter={trigger}
        >
          <animated.span style={style}>Make Pick</animated.span>
        </StyledButton>
      </Content>
      <StyledParticles
        width={'100%'}
        height={'350px'}
        params={particleConfig}
      />
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
