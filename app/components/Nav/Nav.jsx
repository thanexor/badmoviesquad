import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useFetchedData } from 'app/hooks';
import { getUserBacklog, getActiveNights, getActivity } from 'services/read';

import useBoop from '../../hooks/use-boop';
import { animated } from 'react-spring';

import Boop from 'components/Boop';
import TMDBSearchModal from 'components/TMDBSearchModal';

import Logo from './Logo';
import NavList from './NavList';
import NavItem from './NavItem';
import SignOutButton from './SignOutButton';
import Profile from './Profile';
import User from './User';
import Button from 'components/Button';

// styled components
const NavTheme = styled.nav`
  position: sticky;
  top: 0;
  z-index: 30;
  background-color: ${({ theme }) => theme.purpleDark};

  svg {
    width: 2em;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  /* Site container */
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 1540px;
`;

const StyledLogo = styled(Logo)`
  flex: 0 0 100%;
  order: 1;
  ${({ theme }) => theme.textAlign.textCenter}

  ${({ theme }) => theme.mediaBreakpoint.md} {
    flex: 0 0 25%;
    ${({ theme }) => theme.textAlign.textLeft}
  }
`;

const StyledNavList = styled(NavList)`
  flex: 0 0 50%;
  justify-content: flex-start;
  order: 2;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    ${({ theme }) => theme.textAlign.textCenter}
  }
`;

const StyledUser = styled(User)`
  flex: 0 0 50%;
  justify-content: flex-end;
  order: 3;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    flex: 0 0 25%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  text-align: right;
  font-size: 0.75em;
  padding-right: 1em;
`;

const SearchContainer = styled.div`
  text-align: right;
  position: fixed;
  bottom: 1em;
  right: 3em;
  z-index: 30;
  margin: -3.5em 0 1.5em;

  .open-search {
    display: inline-block;
    text-align: right;
  }

  .open-search i {
    font-style: normal;
  }
`;

const SearchButton = styled(Button)`
  padding: 25.08px 22px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.limeGreem};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.limeGreemDark};
  }
`;

const propTypes = {
  username: PropTypes.string,
  avatarURL: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

// template
export default function Nav(props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activity, refreshActivity] = useFetchedData(getActivity, 10);
  const [style, trigger] = useBoop({ rotation: 10, timing: 150 });

  return (
    <>
      <NavTheme>
        <NavContainer>
          <StyledLogo className='h--100'>Bad Movie Squad</StyledLogo>
          <StyledNavList>
            <NavItem>
              <Link to='/'>Home</Link>
            </NavItem>
            <NavItem>
              <Link to='/scores'>Scores</Link>
            </NavItem>
            <NavItem>
              <Link to='/movies'>Movies</Link>
            </NavItem>
            {props.isAdmin ? (
              <NavItem>
                <Link to='/admin'>Admin</Link>
              </NavItem>
            ) : null}
          </StyledNavList>
          <StyledUser>
            <UserInfo>
              <Profile username={props.username} avatarURL={props.avatarURL} />
            </UserInfo>
            <SignOutButton />
          </StyledUser>
        </NavContainer>
      </NavTheme>
      <SearchContainer>
        <SearchButton
          className='open-search'
          onMouseEnter={trigger}
          onClick={() => {
            setIsSearchOpen(true);
            trigger();
          }}
        >
          <animated.span style={style}>
            <i>&#128269;</i>
          </animated.span>
        </SearchButton>
      </SearchContainer>
      <TMDBSearchModal
        isOpen={isSearchOpen}
        onRequestClose={() => setIsSearchOpen(false)}
        refreshActivity={refreshActivity}
      />
    </>
  );
}
