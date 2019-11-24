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
              <Mutation mutation={EDIT_PERSON}>
                {(editPerson, { data, error, loading }) => {
                  if (data) {
                    const id = data.editPerson.id
                    return <Redirect to={`/person/${id}`} />
                  }

                  return (
                    <Save
                      disabled={!isValid}
                      onClick={async e => {
                        // TODO: Find a better solution for this.
                        // Mutation fails because person has __typename property from the query that was used to retrieve it.
                        // This property is not in the GraphQL schema so Apollo throws an error.
                        //
                        // https://github.com/apollographql/apollo-client/issues/1913
                        const person = await getPerson()
                        delete person.__typename
                        editPerson({
                          variables: { id, person }
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

const EDIT_PERSON = gql`
  mutation EditPerson($id: ID!, $person: PersonInput!) {
    editPerson(id: $id, person: $person) {
      id
      name
      image
      profiles
    }
  }
`

const GET_PERSON = gql`
  query GetPerson($id: ID!) {
    person(id: $id) {
      name
      image
      profiles
    }
  }
`

export default PersonEditor
