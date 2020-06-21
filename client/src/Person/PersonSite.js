import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Footer from '../common/Footer'
import NextOption from '../common/NextSteps/NextOption'
import Omnibox from '../common/Omnibox'
import CommandResults from '../common/Omnibox/CommandResults'
import Home from '../Home'
import PersonBrowser from './PersonBrowser'
import PersonCreator from './PersonCreator'
import PersonEditor from './PersonEditor'
import PersonEmbedder from './PersonEmbedder'
import PersonResults from './PersonResults'
import PersonSharer from './PersonSharer'
import './PersonSite.css'

function PersonSite(props) {
  const history = useHistory()

  return (
    <div id="person-site">
      <Switch>
        <Route path={'/person/create'}>
          {({ location }) => {
            const name = location.search.replace('?name=', '')
            return <PersonCreator person={{ name }} />
          }}
        </Route>
        <Route path={'/person/:id/edit'}>
          {({ match }) => {
            const id = match === null ? null : match.params.id
            return <PersonEditor id={id} />
          }}
        </Route>
        {/* TODO: Ditch switch so you can just change the appropriate bit. */}
        <Route path={'/person/:id/share'}>
          {({ match }) => {
            const id = match === null ? null : match.params.id
            return <PersonSharer id={id} />
          }}
        </Route>
        <Route path={'/person/:id/embed'}>
          {({ match }) => {
            const id = match === null ? null : match.params.id
            return <PersonEmbedder id={id} />
          }}
        </Route>
        <Route path={'/person/:id'}>
          {({ match }) => {
            const id = match === null ? null : match.params.id
            return <PersonBrowser id={id} />
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
              <NextOption
                className="continue"
                label="Create a profile"
                onClick={() => history.push('/person/create')}
              />
            </React.Fragment>
          )}
        </Route>
      </Switch>
      <Route component={Footer} />
    </div>
  )
}

export default PersonSite
