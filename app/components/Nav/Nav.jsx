import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { useFetchedData } from 'app/hooks';
import { getUserBacklog, getActiveNights, getActivity } from 'services/read';

import useBoop from '../../hooks/use-boop';
import { animated } from 'react-spring';

import TMDBSearchModal from 'components/TMDBSearchModal';

import Logo from './Logo';
import NavList from './NavList';
import NavItem from './NavItem';
import SignOutButton from './SignOutButton';
import Profile from './Profile';
import User from './User';
import Button from 'components/Button';

import { Menu } from 'icon';

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

  padding-top: 0.5em;
  padding-bottom: 0.5em;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const StyledLogo = styled(Logo)`
  flex: 1 0 25%;
  ${({ theme }) => theme.textAlign.textLeft}
`;

const StyledNavList = styled(NavList)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.purpleDark};
  padding: 1em 5em;

  transform: ${({ openMenu }) =>
    openMenu ? `translateX(0)` : `translateX(100%)`};
  transition: transform 150ms ease-in;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    position: relative;
    top: unset;
    right: unset;
    flex: 0 0 50%;
    flex-direction: row;
    justify-content: center;
    order: 2;

    background-color: transparent;
    padding: 0;

    transform: none;
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
  padding-right: 0;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    padding-right: 1em;
  }
`;

const HamburgerButton = styled.div`
  display: block;
  width: 2em;
  height: 2em;
  position: relative;
  font-size: 1.2rem;
  background-color: transparent;
  cursor: pointer;
  order: 4;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    display: none;
  }
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
  const [openMenu, setOpenMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activity, refreshActivity] = useFetchedData(getActivity, 10);
  const [style, trigger] = useBoop({ rotation: 20, timing: 150 });

  const menuRef = useRef(null);

  useEffect(() => {
    // close menu when user clicks outside it
    const closeMenu = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      }

      setOpenMenu(false);
    };

    document.addEventListener('mousedown', closeMenu);

    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  return (
    <>
      <NavTheme>
        <NavContainer>
          <StyledLogo className='h--100'>Bad Movie Squad</StyledLogo>
          <StyledNavList ref={menuRef} openMenu={openMenu}>
            <NavItem>
              <NavLink exact to='/' activeClassName='active'>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/scores' activeClassName='active'>
                Scores
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/movies' activeClassName='active'>
                Movies
              </NavLink>
            </NavItem>
            {props.isAdmin ? (
              <NavItem>
                <NavLink to='/admin'>Admin</NavLink>
              </NavItem>
            ) : null}
          </StyledNavList>
          <StyledUser>
            <UserInfo>
              <Profile username={props.username} avatarURL={props.avatarURL} />
            </UserInfo>
            <SignOutButton />
          </StyledUser>
          <HamburgerButton onClick={() => setOpenMenu(true)}>
            <Menu />
          </HamburgerButton>
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
