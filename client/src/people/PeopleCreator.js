import React, { Component } from 'react'

import EditorInput from './EditorInput'
import NextSteps from './NextSteps'
import './PeopleCreator.css'
import Person from './Person'
import placeholderProfileImage from './placeholderProfileImage.svg'
import Save from './Save.js'

class PeopleCreator extends Component {
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
        getter: () => this.state.person.profiles[this.state.propertyBeingEditedIndex - 1] || '',
        setter: (value) => {
          const updatedPerson = { ...this.state.person }
          updatedPerson.profiles[this.state.propertyBeingEditedIndex - 1] = value
          return updatedPerson
        },
        next: () => this.properties[1]
      }
    ]
    this.state = {
      propertyBeingEditedIndex: 0,
      propertyBeingEdited: this.properties[0],
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
    const updatedPerson = this.state.propertyBeingEdited.setter(value)
    console.log(updatedPerson)
    this.setState({
      ...this.state,
      person: updatedPerson
    })
  }

  editNextProperty (event) {
    this.setState({
      ...this.state,
      propertyBeingEditedIndex: this.state.propertyBeingEditedIndex + 1,
      propertyBeingEdited: this.state.propertyBeingEdited.next()
    })
  }

  get className () {
    return `editing-${this.propertyBeingEditedName}`
  }

  get prompt () {
    return `Enter the person's ${this.propertyBeingEditedName}`
  }

  get propertyBeingEditedName () {
    return this.state.propertyBeingEdited.name
  }

  render () {
    const value = this.state.propertyBeingEdited.getter()
    return (
      <div className={'PeopleCreator ' + this.className}>
        <Person name={this.state.person.name || null} photo={placeholderProfileImage}/>
        <EditorInput onChange={this.editProperty} prompt={this.prompt} value={value}/>
        <NextSteps onClick={this.editNextProperty}/>
        <Save disabled/>
      </div>
    )
  }
}

export default PeopleCreator
