import React from 'react'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'

import Person from './Person'
import PersonBuilder from './PersonBuilder'
import Save from '../common/Save'

function PersonEditor(props) {
  const { id } = props

  const GET_PERSON = gql`
    query getPerson($id: ID!) {
      person(id: $id) {
        name
        image
        profiles
      }
    }
  `

  return (
    <Query query={GET_PERSON} variables={{ id }}>
      {({ data, loading, error }) => {
        if (error) return <p>ERROR</p>
        if (loading) {
          return <Person name="Loading..." />
        }

        const { person } = data
        return (
          <PersonBuilder person={person} propertyBeingEdited="image">
            {(getPerson, isValid) => (
              <Mutation mutation={CREATE_PERSON}>
                {(createPerson, { data, error, loading }) => {
                  if (data) {
                    const id = data.createPerson.id
                    return <Redirect to={`/person/${id}`} />
                  }

                  return (
                    <Save
                      disabled={!isValid}
                      onClick={e => {
                        createPerson({
                          variables: { person: getPerson() }
                        })
                      }}
                    />
                  )
                }}
              </Mutation>
            )}
          </PersonBuilder>
        )
      }}
    </Query>
  )
}

PersonEditor.propTypes = {
  id: PropTypes.string
}

const CREATE_PERSON = gql`
  mutation CreatePerson($person: PersonInput!) {
    createPerson(person: $person) {
      id
      name
    }
  }
`

export default PersonEditor
