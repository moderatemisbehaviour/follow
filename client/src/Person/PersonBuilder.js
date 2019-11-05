import PropTypes from 'prop-types'
import React, { Component } from 'react'

import EditorInput from '../common/EditorInput'
import NextSteps from '../common/NextSteps/NextSteps'
import './PersonBuilder.css'
import Person from './Person'

// TODO: Make this work with any type of object not just people.
// Sure there's a clever way to do this using JSON schema and / or JSON path.
class PersonBuilder extends Component {
  constructor(props) {
    super(props)

    this.properties = {
      name: {
        name: 'name',
        getter: () => this.state.person.name,
        setter: value => {
          this.setState(state => ({
            person: {
              ...state.person,
              name: value
            }
          }))
        },
        next: () => [this.properties.profiles],
        prompt: "Enter the person's name",
        validate: () => !!this.state.person.name,
        validationMessage: 'Please provide a name',
        complete: () => null,
        discard: () => delete this.state.person.name
      },
      image: {
        name: 'image',
        getter: () => this.state.person.image,
        setter: value => {
          this.setState(state => {
            const updatedPerson = { ...state.person }
            updatedPerson.image = value
            return {
              ...state,
              person: updatedPerson
            }
          })
        },
        next: () => [this.properties.profiles],
        prompt: "Copy-paste the person's image URL",
        validate: () => {
          try {
            const urlInInput = this.state.person.image
            // eslint-disable-next-line no-new
            new URL(urlInInput)
            return true
          } catch (e) {
            return false
          }
        },
        validationMessage: 'The URL you have provided is invalid.',
        complete: () => null,
        discard: () => delete this.state.person.image
      },
      profiles: {
        name: 'profile',
        getter: () => this.state.person.profiles[this.currentProfileIndex],
        setter: value => {
          this.setState(state => {
            const updatedPerson = { ...state.person }
            updatedPerson.profiles[this.currentProfileIndex] = value
            return {
              ...state,
              person: updatedPerson
            }
          })
        },
        next: () => [this.properties.profiles, this.properties.image],
        prompt: "Copy-paste the person's profile URL",
        validate: () => {
          try {
            const urlInInput = this.state.person.profiles[
              this.currentProfileIndex
            ]
            // eslint-disable-next-line no-new
            new URL(urlInInput)
            return true
          } catch (e) {
            return false
          }
        },
        validationMessage: 'The URL you have provided is invalid.',
        complete: () => {
          this.currentProfileIndex = ++this.currentProfileIndex
        },
        discard: () =>
          this.state.person.profiles.splice(this.currentProfileIndex, 1)
      }
    }

    const {
      person: { profiles }
    } = props

    this.state = {
      person: {
        name: '',
        profiles: [],
        ...props.person
      },
      propertyBeingEdited: this.properties[props.propertyBeingEdited],
      touched: false
    }

    this.currentProfileIndex = (profiles && profiles.length - 1) || 0

    this.input = React.createRef()

    this.editProperty = this.editProperty.bind(this)
    this.editNextProperty = this.editNextProperty.bind(this)
  }

  editProperty(event) {
    const {
      target: { value }
    } = event
    this.state.propertyBeingEdited.setter(value)
    this.setState({
      touched: true
    })
  }

  editNextProperty(nextProperty) {
    if (this.state.propertyBeingEdited.validate()) {
      this.state.propertyBeingEdited.complete()
    } else {
      this.state.propertyBeingEdited.discard()
    }

    if (nextProperty.getter() === undefined) {
      nextProperty.setter('')
    }

    this.setState(state => ({
      ...state,
      propertyBeingEdited: nextProperty,
      touched: false
    }))

    this.input.current.focus()
  }

  get personValid() {
    return this.state.person.name && this.state.person.profiles.some(p => !!p)
  }

  getNextOptions(object) {
    const firstRow = []
    const secondRow = []
    const nextOptions = [firstRow, secondRow]

    Object.values(this.properties).forEach(property => {
      if (property.name === 'profile') {
        if (this.state.person.profiles.length > 0) {
          nextOptions[0].push({
            className: `edit-profiles`,
            key: `edit-profiles-button`,
            label: `Edit profiles`,
            onClick: () => this.editNextProperty(property)
          })
        }

        nextOptions[0].push({
          className: `add-${property.name}`,
          key: `add-${property.name}-button`,
          label: `Add ${property.name}`,
          onClick: () => this.editNextProperty(property)
        })
      } else {
        const propertyValue = property.getter()
        const propertyHasExistingValue = !!propertyValue
        const verb =
          propertyHasExistingValue ||
          property === this.state.propertyBeingEdited
            ? 'edit'
            : 'add'
        const disabled = property === this.state.propertyBeingEdited

        nextOptions[0].push({
          className: `${verb}-${property.name}`,
          disabled,
          key: `${verb}-${property.name}-button`,
          label: `${this.capitalizeFirstLetter(verb)} ${property.name}`,
          onClick: () => this.editNextProperty(property)
        })
      }
    })

    return nextOptions
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  get personWithCurrentInvalidPropertyDiscarded() {
    if (!this.state.propertyBeingEdited.validate()) {
      this.state.propertyBeingEdited.discard()
    }
    return this.state.person
  }

  render() {
    const value = this.state.propertyBeingEdited.getter()
    const invalid = !!value && !this.state.propertyBeingEdited.validate()
    const prompt = this.state.propertyBeingEdited.prompt

    return (
      <div className="person-builder">
        <Person
          name={this.state.person.name || null}
          image={this.state.person.image ? this.state.person.image : undefined}
          profiles={this.state.person.profiles}
        />
        <EditorInput
          onChange={this.editProperty}
          prompt={prompt}
          inputRef={this.input}
          invalid={this.state.touched && invalid}
          value={value}
        />
        <NextSteps
          invalid={this.state.touched && invalid}
          message="Continue adding information then press save to complete! You can also easily make more changes later."
          invalidMessage={this.state.propertyBeingEdited.validationMessage}
          nextOptions={this.getNextOptions(this.state.person)}
        />
        {this.props.children(
          () => this.personWithCurrentInvalidPropertyDiscarded,
          this.personValid
        )}
      </div>
    )
  }
}

PersonBuilder.propTypes = {
  person: PropTypes.object,
  propertyBeingEdited: PropTypes.string,
  children: PropTypes.func
}

PersonBuilder.defaultProps = {
  propertyBeingEdited: 'name'
}

export default PersonBuilder
