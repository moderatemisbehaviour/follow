import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './PeopleCreator.css'
import Person from './Person'
import EditorInput from './EditorInput'

class PeopleBrowser extends Component {
  constructor (props) {
    super(props)
    this.propertyEditOrder = [
      'name',
      'profiles'
    ]
    this.state = {
      currentlyEditing: this.propertyEditOrder[0],
      prompt: "Enter the person's name",
      person: {
        name: ''
      }
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    const { target: { value: newName } } = event
    this.setState({
      ...this.state,
      person: {
        name: newName
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        <Person name={this.state.person.name} className="editing"/>
        <EditorInput onChange={this.onChange}/>
      </React.Fragment>
    )
  }
}

export default PeopleBrowser
