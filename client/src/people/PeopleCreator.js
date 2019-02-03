import React, { Component } from 'react'

import EditorInput from './EditorInput'
import NextSteps from './NextSteps'
import './PeopleCreator.css'
import Person from './Person'
import Save from './Save.js'

class PeopleCreator extends Component {
  constructor (props) {
    super(props)

    this.properties = [
      {
        name: 'name',
        getter: () => this.state.person.name,
        setter: (value) => {
          this.setState(state => ({
            ...state,
            person: {
              ...state.person,
              name: value
            }
          }))
        },
        next: () => this.properties[1],
        prompt: "Enter the person's name",
        validate: () => !!this.state.person.name,
        validationMessage: 'Please provide a name'
      },
      {
        name: 'profiles',
        getter: () => this.state.person.profiles[this.state.propertyBeingEditedIndex - 1],
        setter: (value) => {
          this.setState(state => {
            const updatedPerson = { ...state.person }
            updatedPerson.profiles[state.propertyBeingEditedIndex - 1] = value
            return {
              ...state,
              person: updatedPerson
            }
          })
        },
        next: () => this.properties[1],
        prompt: "Copy-paste the person's profile URL",
        validate: () => {
          try {
            const urlInInput = this.state.person.profiles[this.state.propertyBeingEditedIndex - 1]
            // eslint-disable-next-line no-new
            new URL(urlInInput)
            return true
          } catch (e) {
            return false
          }
        },
        validationMessage: 'The URL you have provided is invalid.'
      }
    ]

    this.state = {
      propertyBeingEditedIndex: 0,
      propertyBeingEdited: this.properties[0],
      person: {
        name: '',
        profiles: []
      },
      touched: false
    }

    this.input = React.createRef()

    this.editProperty = this.editProperty.bind(this)
    this.editNextProperty = this.editNextProperty.bind(this)
  }

  editProperty (event) {
    const {target: {value}} = event
    this.state.propertyBeingEdited.setter(value)
    this.setState(state => ({
      ...state,
      touched: true
    }))
  }

  editNextProperty (event) {
    const nextProperty = this.state.propertyBeingEdited.next()
    this.setState(state => ({
      ...state,
      propertyBeingEditedIndex: this.state.propertyBeingEditedIndex + 1,
      propertyBeingEdited: nextProperty,
      touched: false
    }))
    nextProperty.setter('')

    this.input.current.focus()
  }

  get className () {
    return `editing-${this.propertyBeingEditedName}`
  }

  get propertyBeingEditedName () {
    return this.state.propertyBeingEdited.name
  }

  get personValid () {
    return this.state.person.name && this.state.person.profiles.some((p) => !!p)
  }

  render () {
    const invalid = !this.state.propertyBeingEdited.validate()
    const prompt = this.state.propertyBeingEdited.prompt
    const value = this.state.propertyBeingEdited.getter()

    return (
      <div className={'PeopleCreator ' + this.className}>
        <Person
          name={this.state.person.name || null}
          profiles={this.state.person.profiles}/>
        <EditorInput
          onChange={this.editProperty}
          prompt={prompt}
          inputRef={this.input}
          invalid={this.state.touched && invalid}
          value={value}/>
        <NextSteps
          disabled={invalid}
          invalid={this.state.touched && invalid}
          message={this.state.touched && invalid ? this.state.propertyBeingEdited.validationMessage : undefined}
          onClick={this.editNextProperty}/>
        <Save disabled={!this.personValid} person={this.state.person}/>
      </div>
    )
  }
}

export default PeopleCreator
