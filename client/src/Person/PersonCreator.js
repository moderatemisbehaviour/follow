import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'

import PersonBuilder from './PersonBuilder'
import Save from '../common/Save'

function PersonCreator(props) {
  useEffect(() => {
    document.title = `Create ${props.person.name || 'person'}`
  })

  return (
    <PersonBuilder person={props.person}>
      {(getPerson, isValid) => {
        return (
          <Mutation mutation={CREATE_PERSON}>
            {(createPerson, { data, error, loading }) => {
              if (data) {
                const id = data.createPerson.id
                return <Redirect to={`/person/${id}`} />
              }

              return (
                <Save
                  disabled={!isValid}
                  onClick={async e => {
                    createPerson({
                      variables: { person: await getPerson() }
                    })
                  }}
                />
              )
            }}
          </Mutation>
        )
      }}
    </PersonBuilder>
  )
}

PersonCreator.propTypes = {
  id: PropTypes.string,
  person: PropTypes.object
}

const CREATE_PERSON = gql`
  mutation CreatePerson($person: PersonInput!) {
    createPerson(person: $person) {
      id
      name
    }
  }
`

export default PersonCreator
