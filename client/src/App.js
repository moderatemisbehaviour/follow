import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import About from './About'
import PersonSite from './Person/PersonSite'
import PersonViewer from './Person/PersonViewer'

const history = createBrowserHistory()
history.listen(() => {
  window.analytics.page()
})

function App(props) {
  return (
    <Router history={history}>
      <Switch>
        <Route path={'/about'} component={About} />
        <Route path={'/person/:id/view'}>
          {({ match }) => {
            const id = match === null ? null : match.params.id
            return <PersonViewer id={id} />
          }}
        </Route>
        <Route>
          <PersonSite />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
