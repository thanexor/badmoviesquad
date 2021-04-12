import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { getActivity } from 'services/read';

import { useFetchedData } from 'app/hooks';
import useBoop from '../../hooks/useBoop';
import useWindowSize from '../../hooks/useWindowSize';
import { animated } from 'react-spring';

import TMDBSearchModal from 'components/TMDBSearchModal';
import PushButton, { Shadow, Edge, Front } from 'components/PushButton';

import NavList from './NavList';
import NavItem from './NavItem';
import SignOutButton from './SignOutButton';
import Profile from './Profile';
import User from './User';
import Spacer from '../Spacer';

import searchImg from 'static/img/search_win.png';

import { Menu } from 'icon';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { COLORS } from '../../constants';

// styled components
const NavTheme = styled.nav`
  position: sticky;
  top: 0;
  z-index: 30;
  background-color: ${COLORS.purpleDark};
  box-shadow: 0 7px 16px 0px ${COLORS.purpleSuperdarkTransparent};

  svg {
    width: 2em;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;

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
  font-family: var(--logo-font);
  color: ${COLORS.limeGreem};
  margin-top: 0;
  margin-bottom: 0;
  text-decoration: none;
  transition: color 150ms ease-in-out;
  font-size: clamp(3.6rem, 4vw, 5.4rem);

  &:hover {
    color: ${COLORS.limeGreemDark};
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
  width: 30vw;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${COLORS.purpleDark};
  padding: 3em 5em;

  transform: ${({ openMenu }) => (openMenu ? `translateX(0)` : `translateX(100%)`)};
  transition: transform 150ms ease-in;

  ${({ theme }) => theme.mediaBreakpoint.md} {
    position: relative;
    top: unset;
    right: unset;
    width: 100%;
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

const SearchButton = styled(PushButton)`
  font-size: unset;
  font-weight: normal;
  line-height: 0;

  &,
  ${Shadow}, ${Edge}, ${Front} {
    border-radius: 50%;
  }

  ${Edge} {
    background: ${COLORS.limeGreemDark};
    background: linear-gradient(
      to left,
      hsl(77, 65%, 40%) 0%,
      ${COLORS.limeGreemDark} 8%,
      ${COLORS.limeGreemDark} 92%,
      hsl(77, 65%, 40%) 100%
    );
  }

  ${Front} {
    padding: 24px;
    background: ${COLORS.limeGreem};
  }
`;

const SearchImg = styled.img`
  display: block;
  width: 24px;
  height: auto;
`;

const propTypes = {
  username: PropTypes.string,
  points: PropTypes.number,
  avatarURL: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

// template
export default function Nav(props) {
  const windowSize = useWindowSize();
  const [fontFamily, setFontFamily] = useState("'Creepster'");
  const [openMenu, setOpenMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activity, refreshActivity] = useFetchedData(getActivity, 10);
  const [searchStyle, searchTrigger] = useBoop({ rotation: 20, timing: 150 });
  const [menuStyle, menuTrigger] = useBoop({ x: 1.2, timing: 100 });
  const [logoStyle, logoTrigger] = useBoop({ rotation: 1, timing: 200 });

  const fonts = ["'Creepster'", "'Metal Mania'",];
  const random = () => fonts[Math.floor(Math.random() * fonts.length)]

  return (
    <>
      <NavTheme>
        <MaxWidthWrapper
          onClick={(e) => {
            if (openMenu) {
              setOpenMenu(false);
            }
          }}
        >
          <NavContainer>
            <Logo>
              <LogoNavLink
                exact
                to='/'
                replace
                onMouseDown={logoTrigger}
                onClick={() => setFontFamily(random)}
                style={{ '--logo-font': `${fontFamily}, cursive` }}
              >
                <animated.span style={logoStyle}>
                  {windowSize.width > 1000 ? 'Bad Movie Squad' : 'BMS'}
                </animated.span>
              </LogoNavLink>
            </Logo>
            <StyledNavList
              openMenu={openMenu}
              onClick={(e) => {
                // stop event bubbling so we don't close the menu on a side menu mis-click
                e.stopPropagation();
              }}
            >
              <NavItem>
                <NavLink
                  exact
                  to='/'
                  replace
                  activeClassName='active'
                  onClick={() => setOpenMenu(false)}
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to='/scores'
                  replace
                  activeClassName='active'
                  onClick={() => setOpenMenu(false)}
                >
                  Scores
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to='/movies'
                  replace
                  activeClassName='active'
                  onClick={() => setOpenMenu(false)}
                >
                  Movies
                </NavLink>
              </NavItem>
              {props.isAdmin ? (
                <NavItem>
                  <NavLink to='/admin' onClick={() => setOpenMenu(false)}>
                    Admin
                  </NavLink>
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
              <HamburgerButton onClick={() => setOpenMenu(true)} onMouseEnter={menuTrigger}>
                <animated.span style={menuStyle}>
                  <Menu />
                </animated.span>
              </HamburgerButton>
              <MenuOverlay openMenu={openMenu} />
            </MobileOnlyWrapper>
          </NavContainer>
        </MaxWidthWrapper>
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
            <SearchImg src={searchImg} />
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
