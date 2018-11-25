import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PeopleBrowser from '../people-browser/PeopleBrowser'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: []
    }
  }

  render () {
    return (
      <Router>
        <Route path={'/person/:id'}>
          {({ match }) => {
            const id = match === null ? null : match.params.id
            return <PeopleBrowser id={id} />
          }}
        </Route>
      </Router>
    )
  }
}

export default App
