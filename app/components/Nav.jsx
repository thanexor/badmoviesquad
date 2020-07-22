import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom"

import NavList from "components/NavList";
import NavItem from "components/NavItem";
import SignInButton from "components/SignInButton";
import Profile from "components/Profile";

// styled components
const NavTheme = styled.nav`
  background-color: ${({ theme }) => theme.purpleDark};

  svg {
    width: 2em;
    fill: ${({ theme }) => theme.pinkHot}
  }
`

const NavContainer = styled.div`
  display: flex;
  align-items: center;

  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 1540px;

  .logo,
  .user,
  ${NavList} {
    flex: 0 0 25%;
  }

  .logo {
    padding: 1em 0;
  }

  ${NavList} {
    flex: 0 0 50%;
  }

  .user-info {
    text-align: right;
  }
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
        <span className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M302.5 512c23.18 0 44.43-12.58 56-32.66C374.69 451.26 384 418.75 384 384c0-36.12-10.08-69.81-27.44-98.62L400 241.94l9.38 9.38c6.25 6.25 16.38 6.25 22.63 0l11.3-11.32c6.25-6.25 6.25-16.38 0-22.63l-52.69-52.69c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63l9.38 9.38-39.41 39.41c-11.56-11.37-24.53-21.33-38.65-29.51V63.74l15.97-.02c8.82-.01 15.97-7.16 15.98-15.98l.04-31.72C320 7.17 312.82-.01 303.97 0L80.03.26c-8.82.01-15.97 7.16-15.98 15.98l-.04 31.73c-.01 8.85 7.17 16.02 16.02 16.01L96 63.96v153.93C38.67 251.1 0 312.97 0 384c0 34.75 9.31 67.27 25.5 95.34C37.08 499.42 58.33 512 81.5 512h221zM120.06 259.43L144 245.56V63.91l96-.11v181.76l23.94 13.87c24.81 14.37 44.12 35.73 56.56 60.57h-257c12.45-24.84 31.75-46.2 56.56-60.57z" />
          </svg>
        </span>
        <NavList>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/scores">Scores</Link>
          </NavItem>
          <NavItem>
            <Link to="/backlog">Backlog</Link>
          </NavItem>
          { props.isAdmin ?
            <NavItem>
              <Link to="/admin">Admin</Link>
            </NavItem>
            : null
          }
        </NavList>
        <span className="user">
          <div className="user-info">
            {props.isLoggedIn ? (
              <Profile username={props.username} />
            ) : (
              <SignInButton />
            )}
          </div>
        </span>
      </NavContainer>
    </NavTheme>
  );
}