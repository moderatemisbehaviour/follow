import React, { Component } from 'react'

import EditorInput from './EditorInput'
import NextOption from '../common/nextSteps/NextOption'
import NextSteps from '../common/nextSteps/NextSteps'
import './PeopleCreator.css'
import Person from './Person'
import Save from './Save.js'

class PeopleCreator extends Component {
  constructor (props) {
    super(props)

    this.properties = {
      name: {
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
        next: () => [this.properties.profiles],
        nextButtonLabel: "Add the person's name",
        prompt: "Enter the person's name",
        validate: () => !!this.state.person.name,
        validationMessage: 'Please provide a name'
      },
      profiles: {
        name: 'profile',
        getter: () => this.state.person.profiles[this.state.profileIndex],
        setter: (value) => {
          this.setState(state => {
            const updatedPerson = { ...state.person }
            updatedPerson.profiles[state.profileIndex] = value
            return {
              ...state,
              person: updatedPerson
            }
          })
        },
        next: () => [this.properties.profiles, this.properties.image],
        nextButtonLabel: 'Add a profile',
        prompt: "Copy-paste the person's profile URL",
        validate: () => {
          try {
            const urlInInput = this.state.person.profiles[this.state.profileIndex]
            // eslint-disable-next-line no-new
            new URL(urlInInput)
            return true
          } catch (e) {
            return false
          }
        },
        validationMessage: 'The URL you have provided is invalid.'
      },
      image: {
        name: 'image',
        getter: () => this.state.person.photo,
        setter: (value) => {
          this.setState(state => {
            const updatedPerson = { ...state.person }
            updatedPerson.photo = value
            return {
              ...state,
              person: updatedPerson
            }
          })
        },
        next: () => [this.properties.profiles],
        nextButtonLabel: 'Add a profile image',
        prompt: "Copy-paste the person's image URL",
        validate: () => {
          try {
            const urlInInput = this.state.person.photo
            // eslint-disable-next-line no-new
            new URL(urlInInput)
            return true
          } catch (e) {
            return false
          }
        },
        validationMessage: 'The URL you have provided is invalid.'
      }
    }

    this.state = {
      person: {
        name: props.name || '',
        profiles: []
      },
      propertyBeingEdited: this.properties.name,
      profileIndex: 0,
      touched: false
    }

    this.input = React.createRef()

    this.editProperty = this.editProperty.bind(this)
    this.editNextProperty = this.editNextProperty.bind(this)
  }

  editProperty (event) {
    const {target: {value}} = event
    this.state.propertyBeingEdited.setter(value)
    this.setState({
      touched: true
    })
  }

  editNextProperty (nextProperty) {
    this.setState(prevState => ({
      propertyBeingEdited: nextProperty,
      profileIndex: ++prevState.profileIndex,
      touched: false
    }))
    nextProperty.setter('')

    this.input.current.focus()
  }

  get personValid () {
    return this.state.person.name && this.state.person.profiles.some((p) => !!p)
  }

  render () {
    const value = this.state.propertyBeingEdited.getter()
    const invalid = value && !this.state.propertyBeingEdited.validate()
    const nextOptions = this.state.propertyBeingEdited.next()
    const prompt = this.state.propertyBeingEdited.prompt

    return (
      <div className={'PeopleCreator ' + this.className}>
        <Person
          name={this.state.person.name || null}
          photo={this.state.person.photo ? this.state.person.photo : undefined}
          profiles={this.state.person.profiles}/>
        <EditorInput
          onChange={this.editProperty}
          prompt={prompt}
          inputRef={this.input}
          invalid={this.state.touched && invalid}
          value={value}/>
        <NextSteps
          invalid={this.state.touched && invalid}
          message="Continue adding information then press save to complete! You can also easily make more changes later."
          invalidMessage={this.state.propertyBeingEdited.validationMessage}
        >
          {
            nextOptions.map((nextProperty) => (
              <NextOption
                disabled={invalid}
                key={`add-${nextProperty.name}-button`}
                label={nextProperty.nextButtonLabel}
                name={nextProperty.name}
                onClick={() => this.editNextProperty(nextProperty)}/>
            ))
          }
        </NextSteps>
        <Save disabled={!this.personValid} person={this.state.person}/>
      </div>
    )
  }
}

export default PeopleCreator
