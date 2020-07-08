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
} from 'reduxState/selectors'

import Nav from 'components/Nav'

import Home from 'containers/Home'
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
          <Nav username={ props.username } isLoggedIn={ props.isLoggedIn } />
          <Container>
            <Switch>
              <Route path="/backlog">
                <Backlog />
              </Route>
              <Route path="/upcoming">
                <Upcoming />
              </Route>
              <Route path="/scores">
                <Scores />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </Body>
  );
}

export default connect(
  (state) => ({
    isLoggedIn: isLoggedIn(state),
    username: getUsername(state),
    userEmail: getUserEmail(state),
  })
)(App)