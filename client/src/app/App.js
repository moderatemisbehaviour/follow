import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PeopleBrowser from '../people/PeopleBrowser'
import PeopleCreator from '../people/PeopleCreator'
import './App.css'
import Footer from './Footer'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: []
    }
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={'/person/create'}>
            {({location}) => {
              const name = location.search.replace('?name=', '')
              return (
                <React.Fragment>
                  <PeopleCreator name={name}/>
                  <Footer location={location}/>
                </React.Fragment>
              )
            }}
          </Route>
          <Route path={'/person/:id'}>
            {({location, match}) => {
              const id = match === null ? null : match.params.id
              return (
                <React.Fragment>
                  <PeopleBrowser id={id}/>
                  <Footer location={location}/>
                </React.Fragment>
              )
            }}
          </Route>
          <Route>
            {({location}) => (
              <React.Fragment>
                <PeopleBrowser/>
                <Footer location={location}/>
              </React.Fragment>
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
