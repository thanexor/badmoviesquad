import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom"

import Logo from "./Logo";
import NavList from "./NavList";
import NavItem from "./NavItem";
import SignOutButton from "./SignOutButton";
import Profile from "./Profile";
import User from "./User";

// styled components
const NavTheme = styled.nav`
  background-color: ${({ theme }) => theme.purpleDark};

  svg {
    width: 2em;
  }
`

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
`

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
    display: inline-block;
    text-align: right;
    font-size: .75em;
    padding-right: 1em;
`

const propTypes = {
  username: PropTypes.string,
  avatarURL: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

// template
export default function Nav(props) {
  return (
    <NavTheme>
      <NavContainer>
        <StyledLogo className="h--100">Bad Movie Squad</StyledLogo>
        <StyledNavList>
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
        </StyledNavList>
        <StyledUser>
          <UserInfo>
            <Profile username={props.username} avatarURL={props.avatarURL} />
          </UserInfo>
          <SignOutButton />
        </StyledUser>
      </NavContainer>
    </NavTheme>
  );
}