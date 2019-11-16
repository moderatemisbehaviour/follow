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
        primaryOptions: () => this.getDefaultNextOptions(this.properties.name),
        secondaryOptions: () => [],
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
        primaryOptions: () => this.getDefaultNextOptions(this.properties.image),
        secondaryOptions: () => [],
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
        primaryOptions: () => {
          const nextOptions = []
          const currentlyBeingEdited =
            this.state.propertyBeingEdited === this.properties.profiles

          if (this.state.person.profiles.length > 0) {
            nextOptions.push({
              className: `edit-profiles ${
                currentlyBeingEdited ? 'currently-being-edited' : ''
              }`,
              disabled: currentlyBeingEdited,
              key: `edit-profiles-button`,
              label: `Edit profiles`,
              onClick: () => this.editNextProperty(this.properties.profiles)
            })
          }
          nextOptions.push({
            className: `add-profile`,
            key: `add-profile-button`,
            label: `Add profile`,
            onClick: () => {
              this.currentProfileIndex = this.state.person.profiles.length
              this.editNextProperty(this.properties.profiles)
            }
          })

          return nextOptions
        },
        secondaryOptions: () =>
          this.state.person.profiles.map((profile, index) => ({
            className: `edit-profile-${index} ${
              index === this.currentProfileIndex ? 'currently-being-edited' : ''
            }`,
            key: `edit-profile-${index}`,
            label: `${index + 1}`,
            onClick: () => {
              this.currentProfileIndex = index
              this.editNextProperty(this.properties.profiles)
            }
          })),
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
        discard: () => {
          this.state.person.profiles.splice(this.currentProfileIndex, 1)
        }
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
    if (!this.state.propertyBeingEdited.validate())
      this.state.propertyBeingEdited.discard()

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

  get nextOptions() {
    const firstRow = Object.values(this.properties).reduce(
      (nextOptionsAll, property) =>
        nextOptionsAll.concat(property.primaryOptions()),
      []
    )

    const secondRow = this.state.propertyBeingEdited.secondaryOptions()
    const nextOptions = [firstRow, secondRow]
    return nextOptions
  }

  getDefaultNextOptions(property) {
    const nextOptions = []

    const propertyValue = property.getter()
    const propertyHasExistingValue = !!propertyValue
    const verb =
      propertyHasExistingValue || property === this.state.propertyBeingEdited
        ? 'edit'
        : 'add'
    const currentlyBeingEdited = property === this.state.propertyBeingEdited

    nextOptions.push({
      className: `${verb}-${property.name} ${
        currentlyBeingEdited ? 'currently-being-edited' : ''
      }`,
      disabled: currentlyBeingEdited,
      key: `${verb}-${property.name}-button`,
      label: `${this.capitalizeFirstLetter(verb)} ${property.name}`,
      onClick: () => this.editNextProperty(property)
    })

    return nextOptions
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  getPersonWithCurrentInvalidPropertyDiscarded() {
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
          nextOptions={this.nextOptions}
        />
        {this.props.children(
          () => this.getPersonWithCurrentInvalidPropertyDiscarded(),
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
