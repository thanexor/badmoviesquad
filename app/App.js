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
} from './redux/selectors'

import Nav from './components/Nav'
import NavItem from './components/NavItem'
import SignInButton from './components/SignInButton'
import Profile from './components/Profile'

import Home from './containers/Home'
import Scores from './containers/Scores'
import Upcoming from './containers/Upcoming'
import Backlog from './containers/Backlog'

const Container = styled.div`
  font-family: 'Nunito Sans';
  background-color: ${({ theme }) => theme.neutral};
  min-height: 100vh;
`

function App(props) {
  return (
    <Container>
      <Router>
        <div>
          <nav>
            <Nav>
              <NavItem>
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/scores">Scores</Link>
              </NavItem>
              <NavItem>
                <Link to="/upcoming">Upcoming</Link>
              </NavItem>
              <NavItem>
                <Link to="/backlog">Backlog</Link>
              </NavItem>
              <NavItem>
                {props.isLoggedIn ?
                  <Profile username={props.username} />
                  :
                  <SignInButton />
                }
              </NavItem>
            </Nav>
          </nav>

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
        </div>
      </Router>
    </Container>
  )
}

export default connect(
  (state) => ({
    isLoggedIn: isLoggedIn(state),
    username: getUsername(state),
  })
)(App)
