import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PointsPill from '../PointsPill';
import Tooltip from '../Tooltip';
import Spacer from '../Spacer';
import { COLORS } from '../../constants';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 2em;
  border: 2px solid ${COLORS.limeGreem};
  border-radius: 50px;
`;

const propTypes = {
  className: PropTypes.string,
  username: PropTypes.string.isRequired,
  points: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
};

function Profile(props) {
  return (
    <Container className={props.className}>
      <Tooltip
        content={props.username}
        distance={18}
        duration={48}
        delay={[248, 0]}
      >
        <ProfileImage src={props.avatarURL} />
      </Tooltip>
      <Spacer size={10} axis='horizontal' />
      <PointsPill>{props.points} pts</PointsPill>
    </Container>
  );
}

Profile.propTypes = propTypes;
export default React.memo(Profile);
