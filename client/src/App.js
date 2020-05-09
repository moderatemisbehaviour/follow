import { createBrowserHistory } from 'history'
import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import About from './About'
import Footer from './common/Footer'
import Omnibox from './common/Omnibox'
import CommandResults from './common/Omnibox/CommandResults'
import Home from './Home'
import PersonBrowser from './Person/PersonBrowser'
import PersonCreator from './Person/PersonCreator'
import PersonEditor from './Person/PersonEditor'
import PersonResults from './Person/PersonResults'

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
          <Route path={'/about'} component={About} />
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
            {() => (
              <React.Fragment>
                <Home />
                <Omnibox
                  getResultsComponent={query =>
                    query.startsWith('/') ? CommandResults : PersonResults
                  }
                />
              </React.Fragment>
            )}
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
