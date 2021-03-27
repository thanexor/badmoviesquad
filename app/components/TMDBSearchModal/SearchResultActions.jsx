import React from 'react';
import styled from 'styled-components';

import useBoop from '../../hooks/useBoop';
import { animated } from 'react-spring';

import Button from 'components/Button';

const Container = styled.div`
  flex-grow: 1;
  text-align: right;
  justify-self: right;
  padding-right: 1.5em;
`;

const SearchResultActions = (props) => {
  const [style, trigger] = useBoop({ scale: 1.025, timing: 150 });

  return (
    <Container>
      <Button
        className='button-pick'
        onClick={props.addMovieToBacklog}
        onMouseEnter={trigger}
      >
        <animated.span style={style}>Add</animated.span>
      </Button>
    </Container>
  );
};

export default SearchResultActions;
