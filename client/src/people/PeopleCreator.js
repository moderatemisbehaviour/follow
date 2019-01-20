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
        next: () => this.properties[1]
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

    this.input = React.createRef()

    this.editProperty = this.editProperty.bind(this)
    this.editNextProperty = this.editNextProperty.bind(this)
  }

  editProperty (event) {
    const {target: {value}} = event
    this.state.propertyBeingEdited.setter(value)
  }

  editNextProperty (event) {
    const nextProperty = this.state.propertyBeingEdited.next()
    this.setState(state => ({
      ...state,
      propertyBeingEditedIndex: this.state.propertyBeingEditedIndex + 1,
      propertyBeingEdited: nextProperty
    }))
    nextProperty.setter('')

    this.input.current.focus()
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

  get personValid () {
    return this.state.person.name && this.state.person.profiles.some((p) => !!p)
  }

  render () {
    const value = this.state.propertyBeingEdited.getter()
    return (
      <div className={'PeopleCreator ' + this.className}>
        <Person
          name={this.state.person.name || null}
          profiles={this.state.person.profiles}/>
        <EditorInput onChange={this.editProperty} prompt={this.prompt} inputRef={this.input} value={value}/>
        <NextSteps onClick={this.editNextProperty}/>
        <Save disabled={!this.personValid} person={this.state.person}/>
      </div>
    )
  }
}

export default PeopleCreator
