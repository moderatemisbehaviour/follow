import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import NextSteps from '../common/NextSteps'
import Omnibox from '../common/Omnibox'
import CommandResults from '../common/Omnibox/CommandResults'
import Person from './Person'
import PersonResults from './PersonResults'

PersonBrowser.propTypes = {
  id: PropTypes.string.isRequired
}

function PersonBrowser(props) {
  const history = useHistory()
  const { id } = props
  const { error, data } = useQuery(GET_PERSON, {
    variables: { id }
  })

  if (error) return <p>ERROR</p>

  const person = (data && data.person) || {}

  return (
    <React.Fragment>
      <Person
        name={person.name}
        image={person.image || undefined}
        profiles={person.profiles}
      />
      <Omnibox
        getResultsComponent={query =>
          query.startsWith('/') ? CommandResults : PersonResults
        }
      />
      {person && (
        <NextSteps
          nextOptions={[
            [
              {
                className: 'continue',
                label: 'Share',
                id: 'share',
                onClick: () => history.push(`/person/${id}/share`)
              }
            ],
            [
              {
                className: 'configure',
                label: `Edit ${person.name}`,
                id: 'edit-person',
                onClick: () => history.push(`/person/${id}/edit`)
              }
            ]
          ]}
        />
      )}
    </React.Fragment>
  )
}

const GET_PERSON = gql`
  query GetPerson($id: ID!) {
    person(id: $id) {
      id
      name
      image
      profiles
    }
  }
`

export default PersonBrowser
