import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { getScores } from 'services/read';
// import { useFetchedData } from 'app/hooks';

import Tooltip from '../Tooltip';
import Spacer from '../Spacer';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 2em;
  border: 2px solid ${({ theme }) => theme.limeGreem};
  border-radius: 50px;
`;

const Points = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0.25em 0.5em 0.5em;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.purpleSuperdark};
`;

const propTypes = {
  className: PropTypes.string,
  score: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
};

function Profile(props) {
  // TODO: Need to get currentUser score not all scores
  // const [userScores] = useFetchedData(getScores);

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
      <Points>420 pts</Points>
    </Container>
  );
}

Profile.propTypes = propTypes;
export default React.memo(Profile);
