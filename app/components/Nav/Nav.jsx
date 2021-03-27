import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { getUserBacklog, getActiveNights, getActivity } from 'services/read';

import { useFetchedData } from 'app/hooks';
import useBoop from '../../hooks/useBoop';
import useWindowSize from '../../hooks/useWindowSize';
import { animated } from 'react-spring';

import TMDBSearchModal from 'components/TMDBSearchModal';
import Button from 'components/Button';

import NavList from './NavList';
import NavItem from './NavItem';
import SignOutButton from './SignOutButton';
import Profile from './Profile';
import User from './User';
import Spacer from '../Spacer';

import { Menu } from 'icon';

// styled components
const NavTheme = styled.nav`
  position: sticky;
  top: 0;
  z-index: 30;
  background-color: ${({ theme }) => theme.purpleDark};
  box-shadow: 0 7px 16px 0px ${({ theme }) => theme.purpleSuperdarkTransparent};

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
  padding-right: 24px;
  padding-left: 24px;
  max-width: 1540px;

  padding-top: 0.25em;
  padding-bottom: 0.25em;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    padding-top: 0.75em;
    padding-bottom: 0.75em;
  }
`;

const Logo = styled.div`
  margin-right: auto;
  text-align: left;
`;

const LogoNavLink = styled(NavLink)`
  font-family: ${({ theme }) => theme.fontFamily.creepster};
  color: ${({ theme }) => theme.limeGreem};
  margin-top: 0;
  margin-bottom: 0;
  text-decoration: none;
  transition: color 150ms ease-in-out;
  font-size: clamp(3.6rem, 5vw, 4.4rem);

  &:hover {
    color: ${({ theme }) => theme.limeGreemDark};
  }
`;

const MenuOverlay = styled.div`
  display: ${({ openMenu }) => (openMenu ? `block` : `none`)};
  opacity: ${({ openMenu }) => (openMenu ? `1` : `0`)};
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: opacity 150ms ease-in;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    display: none;
    pointer-events: none;
  }
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
  padding: 3em 5em;

  transform: ${({ openMenu }) =>
    openMenu ? `translateX(0)` : `translateX(100%)`};
  transition: transform 150ms ease-in;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    position: relative;
    top: unset;
    right: unset;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    order: 2;

    background-color: transparent;
    padding: 0;

    transform: none;
  }
`;

const StyledUser = styled(User)`
  margin-left: auto;
  justify-content: flex-end;
  order: 3;
`;

const UserInfo = styled.div`
  display: flex;
  text-align: right;
  font-size: 0.75em;
  padding-right: 0;
`;

const MobileOnlyWrapper = styled.div`
  display: flex;
  order: 4;
  ${({ theme }) => theme.mediaBreakpoint.md} {
    display: none;
  }
`;

const HamburgerButton = styled.div`
  display: inline-flex;
  width: 2em;
  height: 2em;
  position: relative;
  font-size: 1.2rem;
  background-color: transparent;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  text-align: right;
  position: fixed;
  bottom: 1em;
  right: 24px;
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
  points: PropTypes.string,
  avatarURL: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

// template
export default function Nav(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activity, refreshActivity] = useFetchedData(getActivity, 10);
  const [searchStyle, searchTrigger] = useBoop({ rotation: 20, timing: 150 });
  const [menuStyle, menuTrigger] = useBoop({ x: 1.2, timing: 100 });
  const [logoStyle, logoTrigger] = useBoop({ rotation: 1, timing: 200 });
  const windowSize = useWindowSize();

  const menuRef = useRef(null);

  useEffect(() => {
    // close menu when user clicks outside it
    const closeMenu = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) {
        if (e.target.hasAttribute('data-menu-link')) {
          setTimeout(() => {
            setOpenMenu(false);
          }, 100);
        }
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
          <Logo>
            <LogoNavLink to='/' onMouseEnter={logoTrigger}>
              <animated.span style={logoStyle}>
                {windowSize.width > 1000 ? 'Bad Movie Squad' : 'BMS'}
              </animated.span>
            </LogoNavLink>
          </Logo>
          <StyledNavList ref={menuRef} openMenu={openMenu}>
            <NavItem>
              <NavLink
                exact
                to='/'
                activeClassName='active'
                data-menu-link='true'
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to='/scores'
                activeClassName='active'
                data-menu-link='true'
              >
                Scores
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to='/movies'
                activeClassName='active'
                data-menu-link='true'
              >
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
              <Profile
                username={props.username}
                points={props.points}
                avatarURL={props.avatarURL}
              />
            </UserInfo>
            <Spacer size={20} axis='horizontal' />
            <SignOutButton />
          </StyledUser>
          <MobileOnlyWrapper>
            <Spacer size={15} axis='horizontal' />
            <HamburgerButton
              onClick={() => setOpenMenu(true)}
              onMouseEnter={menuTrigger}
            >
              <animated.span style={menuStyle}>
                <Menu />
              </animated.span>
            </HamburgerButton>
            <MenuOverlay openMenu={openMenu} />
          </MobileOnlyWrapper>
        </NavContainer>
      </NavTheme>
      <SearchContainer>
        <SearchButton
          className='open-search'
          onMouseEnter={searchTrigger}
          onClick={() => {
            setIsSearchOpen(true);
            trigger();
          }}
        >
          <animated.span style={searchStyle}>
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
