import React from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Nav from './components/Nav'
import NavItem from './components/NavItem'

import Home from './containers/Home'
import Scores from './containers/Scores'
import Upcoming from './containers/Upcoming'

const Container = styled.div`
  font-family: 'Nunito Sans';
  background-color: ${({ theme }) => theme.neutral};
  min-height: 100vh;
`

function App() {
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
            </Nav>
          </nav>

          <Switch>
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

export default App
