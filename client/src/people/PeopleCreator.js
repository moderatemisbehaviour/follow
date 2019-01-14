import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Person from './Person'
import Search from '../search/Search'

class PeopleBrowser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prompt: "Enter the person's name",
      person: {}
    }
  }

  render () {
    return (
      <React.Fragment>
        <Person name="..."/>
        <Search prompt={this.state.prompt}/>
      </React.Fragment>
    )
  }
}

export default PeopleBrowser
