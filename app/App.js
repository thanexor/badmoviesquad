import React from 'react';
import styled from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  isLoggedIn,
  getUsername,
  getPoints,
  getIsAdmin,
} from 'reduxState/selectors';

import Nav from 'components/Nav';

import Home from 'containers/Home';
import Admin from 'containers/Admin';
import Scores from 'containers/Scores';
import Login from 'containers/Login';
import Movies from 'containers/Movies';
import MovieDetails from 'containers/MovieDetails';

const Body = styled.div`
  position: relative;
  font-size: 1.6rem;
  ${({ theme }) => theme.fontWeight.w400}
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: ${({ theme }) => theme.purpleSuperdark};
  color: #fff;
  min-height: 100vh;

  .sr-only {
    position: absolute !important;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    background: white;
    color: black;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${({ theme }) => theme.fontWeight.w600}
    line-height: 1.2;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  h1,
  .h--100 {
    font-size: 3.6rem;
    ${({ theme }) => theme.mediaBreakpoint.lg} {
      font-size: 4.4rem;
    }
  }
  h2,
  .h--200 {
    font-size: 2.8rem;
    ${({ theme }) => theme.mediaBreakpoint.lg} {
      font-size: 3.6rem;
    }
  }
  h3,
  .h--300 {
    font-size: 2.4rem;
    ${({ theme }) => theme.mediaBreakpoint.lg} {
      font-size: 2.8rem;
    }
  }
  h4,
  .h--400 {
    font-size: 2.4rem;
  }
  h5,
  .h--500 {
    font-size: 2rem;
  }
  h6,
  .h--600 {
    font-size: 1.8rem;
  }
  p,
  .b--100 {
    font-size: 1.6rem;
    ${({ theme }) => theme.fontWeight.w400}
  }
`;

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-right: 24px;
  padding-left: 24px;
  padding-bottom: 15px;
  max-width: 1540px;
`;

const ReactModalPortal = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`;

function App(props) {
  return (
    <Body>
      <Router>
        <div style={{ position: 'relative' }}>
          {props.isLoggedIn && (
            <Nav
              username={props.username}
              points={props.points}
              isLoggedIn={props.isLoggedIn}
              isAdmin={props.isAdmin}
            />
          )}
          <Container>
            <Switch>
              <Route path='/movies'>
                <Movies />
              </Route>
              <Route path='/scores'>
                <Scores />
              </Route>
              <Route path='/login'>
                {props.isLoggedIn ? <Redirect to='/' /> : <Login />}
              </Route>

              <Route path='/movie/:movieId' component={MovieDetails} />

              <Route path='/admin'>
                <Admin />
              </Route>
              <Route path='/'>
                {!props.isLoggedIn ? <Redirect to='/login' /> : <Home />}
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </Body>
  );
}

export default connect((state) => ({
  isLoggedIn: isLoggedIn(state),
  username: getUsername(state),
  points: getPoints(state),
  isAdmin: getIsAdmin(state),
}))(App);
