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
    this.properties = [
      {
        name: 'name',
        getter: () => this.state.person.name,
        setter: (value) => ({ ...this.state.person, name: value }),
        next: () => this.properties[1]
      },
      {
        name: 'profiles',
        getter: () => this.state.person.profiles[this.state.currentlyEditingIndex - 1] || '',
        setter: (value) => {
          const updatedPerson = { ...this.state.person }
          updatedPerson.profiles[this.state.currentlyEditingIndex - 1] = value
          return updatedPerson
        },
        next: () => this.properties[1]
      }
    ]
    this.state = {
      currentlyEditingIndex: 0,
      currentProperty: this.properties[0],
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
    const updatedPerson = this.state.currentProperty.setter(value)
    console.log(updatedPerson)
    this.setState({
      ...this.state,
      person: updatedPerson
    })
  }

  editNextProperty (event) {
    this.setState({
      ...this.state,
      currentlyEditingIndex: this.state.currentlyEditingIndex + 1,
      currentProperty: this.state.currentProperty.next()
    })
  }

  getPrompt () {
    return `Enter the person's ${this.state.currentProperty.name}`
  }

  render () {
    const value = this.state.currentProperty.getter()
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
