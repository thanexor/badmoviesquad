import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom"

import NavList from "components/NavList";
import NavItem from "components/NavItem";
import SignOutButton from "components/SignOutButton";
import Profile from "components/Profile";

// styled components
const NavTheme = styled.nav`
  background-color: ${({ theme }) => theme.purpleDark};

  svg {
    width: 2em;
  }

  .logo {
    font-family: ${({ theme }) => theme.logoFont.creepster};
    color: ${({ theme }) => theme.limeGreem};
    margin-top: 0;
    margin-bottom: 0;
    pointer-events: none;
  }
`

const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 1540px;

  .logo {
    ${({ theme }) => theme.textAlign.textLeft}
  }

  .user {
    ${({ theme }) => theme.textAlign.textRight}
  }

  .logo,
  .user,
  ${NavList} {
    flex: 0 0 100%;
    ${({ theme }) => theme.textAlign.textCenter}

    ${({ theme }) => theme.mediaBreakpoint.md} {
      flex: 0 0 33.33%;
    }
  }
  
  .user-info {
    text-align: right;
    font-size: .75em;
    padding-right: 1em;
`

const propTypes = {
  username: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}

// template
export default function Nav(props) {
  return (
    <NavTheme>
      <NavContainer>
        <span className="logo h--100">Bad Movie Squad</span>
        <NavList>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/scores">Scores</Link>
          </NavItem>
          <NavItem>
            <Link to="/movies">Movies</Link>
          </NavItem>
          { props.isAdmin ?
            <NavItem>
              <Link to="/admin">Admin</Link>
            </NavItem>
            : null
          }
        </NavList>
        <SignOutButton />
        <span className="user">
          <UserInfo>
              <Profile username={props.username} />
          </UserInfo>
        </span>
      </NavContainer>
    </NavTheme>
  );
}