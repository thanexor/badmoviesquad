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
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: ${({ theme }) => theme.purpleSuperdark};
  color: #fff;
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
          <Nav username={props.username} isLoggedIn={props.isLoggedIn} />
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
  })
)(App)