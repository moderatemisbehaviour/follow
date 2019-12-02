import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'

import Person from './Person'
import PersonBuilder from './PersonBuilder'
import Save from '../common/Save'

function PersonEditor(props) {
  const { id } = props

  const [person, setPerson] = useState()

  useEffect(() => {
    document.title = `Edit ${(person && person.name) || 'person'}`
  })

  return (
    <Query query={GET_PERSON} variables={{ id }}>
      {({ data, loading, error }) => {
        if (error) return <p>ERROR</p>
        // TODO: These next few lines are horrible, make it more elegant
        //
        // These lines came about because we wanted to update the document title using person name but that is not
        // available until it has been retrieved using the ID prop. Setting the state is therefore only being used as
        // a way to move person into the closure scope of the useEffect function when it has been found.
        if (data) setPerson(data.person)
        if (loading || !person) {
          return <Person name="Loading..." />
        }

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
