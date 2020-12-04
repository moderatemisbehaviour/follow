import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Footer from '../common/Footer'
import LandingPage from '../LandingPage'
import PersonBrowser from './PersonBrowser'
import PersonCreator from './PersonCreator'
import PersonEditor from './PersonEditor'
import './PersonSite.css'
import PersonEmbedder from './sharing/PersonEmbedder'
import PersonSharer from './sharing/PersonSharer'

function PersonSite(props) {
  return (
    <div id="person-site">
      <Switch>
        <Route path={'/person/create'}>
          {({ location }) => {
            const searchParams = new URLSearchParams(location.search)
            const name = searchParams.get('name')
            const image = searchParams.get('image')
            const profiles = searchParams.getAll('profile')
            return <PersonCreator person={{ name, image, profiles }} />
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
        <Route component={LandingPage} />
      </Switch>
      <Route component={Footer} />
    </div>
  )
}

export default PersonSite
