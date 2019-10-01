import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PersonBrowser from './Person/PersonBrowser'
import PeopleCreator from './Person/PersonCreator'
import './App.css'
import Footer from './common/Footer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: []
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={'/person/create'}>
            {({ location }) => {
              const name = location.search.replace('?name=', '')
              return (
                <React.Fragment>
                  <PeopleCreator name={name} />
                  <Footer location={location} />
                </React.Fragment>
              )
            }}
          </Route>
          <Route path={'/person/:id'}>
            {({ location, match }) => {
              const id = match === null ? null : match.params.id
              return (
                <React.Fragment>
                  <PersonBrowser id={id} />
                  <Footer location={location} />
                </React.Fragment>
              )
            }}
          </Route>
          <Route>
            {({ location }) => (
              <React.Fragment>
                <PersonBrowser />
                <Footer location={location} />
              </React.Fragment>
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
