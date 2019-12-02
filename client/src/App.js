import { createBrowserHistory } from 'history'
import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import './App.css'
import Footer from './common/Footer'
import PersonBrowser from './Person/PersonBrowser'
import PersonCreator from './Person/PersonCreator'
import PersonEditor from './Person/PersonEditor'

const history = createBrowserHistory()
history.listen(() => {
  window.analytics.page()
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: []
    }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path={'/person/create'}>
            {({ location }) => {
              const name = location.search.replace('?name=', '')
              return (
                <React.Fragment>
                  <PersonCreator person={{ name }} />
                  <Footer location={location} />
                </React.Fragment>
              )
            }}
          </Route>
          <Route path={'/person/:id/edit'}>
            {({ location, match }) => {
              const id = match === null ? null : match.params.id
              return (
                <React.Fragment>
                  <PersonEditor id={id} />
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
      </Router>
    )
  }
}

export default App
