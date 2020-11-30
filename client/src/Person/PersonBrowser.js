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

  const getPersonResult = useQuery(GET_PERSON, {
    variables: { id }
  })
  const person = (getPersonResult.data && getPersonResult.data.person) || {}
  const getUserResult = useQuery(GET_USER, {
    skip: !person
  })

  const userIsCreator =
    getUserResult.data &&
    getUserResult.data.user &&
    getUserResult.data.user.id === person.creator

  if (getPersonResult.error) return <p>ERROR</p>

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
              },
              {
                className: 'continue',
                label: 'Embed',
                id: 'embed',
                onClick: () => history.push(`/person/${id}/embed`)
              }
            ],
            [
              {
                className: 'configure',
                disabled: !userIsCreator,
                label: `Edit ${person.name}`,
                id: 'edit-person',
                onClick: () => history.push(`/person/${id}/edit`),
                title: userIsCreator
                  ? undefined
                  : 'You cannot edit this person because you did not create them.'
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
      creator
      name
      image
      profiles
    }
  }
`

const GET_USER = gql`
  query GetUser {
    user {
      id
      email
      image
      name
    }
  }
`

export default PersonBrowser
