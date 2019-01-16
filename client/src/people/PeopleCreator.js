import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NextSteps from './NextSteps'
import './PeopleCreator.css'
import Person from './Person'
import EditorInput from './EditorInput'
import placeholderProfileImage from './placeholderProfileImage.svg'

class PeopleBrowser extends Component {
  constructor (props) {
    super(props)
    this.propertyEditOrder = [
      'name',
      'profiles'
    ]
    this.state = {
      currentlyEditingIndex: 0,
      person: {
        name: '',
        profiles: []
      }
    }
    this.editProperty = this.editProperty.bind(this)
    this.editNextProperty = this.editNextProperty.bind(this)
  }

  editProperty (event) {
    const { target: { value } } = event

    const updatedPerson = { ...this.state.person }
    // TODO: When more properties are used we could make this dynamic using something like getters and setters for each property.
    if (this.getCurrentlyEditingProperty() === 'name') {
      updatedPerson.name = value
    } else {
      updatedPerson.profiles[this.state.currentlyEditingIndex - 1] = value
    }

    console.log(updatedPerson)
    this.setState({
      ...this.state,
      person: updatedPerson
    })
  }

  editNextProperty (event) {
    const updatedPerson = { ...this.state.person }
    updatedPerson.profiles.push('')
    this.setState({
      ...this.state,
      currentlyEditingIndex: this.state.currentlyEditingIndex + 1
    })
  }

  getCurrentlyEditingProperty () {
    if (this.state.currentlyEditingIndex > 0) {
      return this.propertyEditOrder[this.propertyEditOrder.length - 1]
    }
    return this.propertyEditOrder[this.state.currentlyEditingIndex]
  }

  getCurrentlyEditingPropertyValue () {
    if (this.getCurrentlyEditingProperty() === 'name') {
      return this.state.person.name
    }
    return this.state.person.profiles[this.state.currentlyEditingIndex - 1]
  }

  getPrompt () {
    return `Enter the person's ${this.getCurrentlyEditingProperty()}`
  }

  render () {
    const value = this.getCurrentlyEditingPropertyValue()
    return (
      <React.Fragment>
        <Person className="editing" name={this.state.person.name || null} photo={placeholderProfileImage}/>
        <EditorInput onChange={this.editProperty} prompt={this.getPrompt()} value={value}/>
        <NextSteps onClick={this.editNextProperty}/>
      </React.Fragment>
    )
  }
}

export default PeopleBrowser
