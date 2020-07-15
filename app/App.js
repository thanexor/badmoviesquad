import React from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { connect } from 'react-redux'
import {
  isLoggedIn,
  getUsername,
  getUserEmail,
  getIsAdmin,
} from 'reduxState/selectors'

import Nav from 'components/Nav'

import Home from 'containers/Home'
import Admin from 'containers/Admin'
import Scores from 'containers/Scores'
import Upcoming from 'containers/Upcoming'
import Backlog from 'containers/Backlog'

const Body = styled.div`
  font-family: 'Nunito Sans';
  background-color: ${({ theme }) => theme.neutral};
  min-height: 100vh;
`

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 1540px;
`

function App(props) {
  return (
    <Body>
      <Router>
        <div>
          <Nav
            username={props.username}
            isLoggedIn={props.isLoggedIn}
            isAdmin={props.isAdmin}
          />
          <Container>
            <Switch>
              <Route path="/backlog">
                <Backlog
                  backlog={[]}
                />
              </Route>
              <Route path="/upcoming">
                <Upcoming />
              </Route>
              <Route path="/scores">
                <Scores />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/">
                <Home
                  user={props.userEmail}
                />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </Body >
  );
}

export default connect(
  (state) => ({
    isLoggedIn: isLoggedIn(state),
    username: getUsername(state),
    userEmail: getUserEmail(state),
    isAdmin: getIsAdmin(state),
  })
)(App)