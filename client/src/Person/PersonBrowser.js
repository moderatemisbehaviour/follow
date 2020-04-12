import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import NextOption from '../common/nextSteps/NextOption'
import Omnibox from '../common/Omnibox'
import CommandResults from '../common/Omnibox/CommandResults'
import Person from './Person'
import PersonResults from './PersonResults'

PersonBrowser.propTypes = {
  id: PropTypes.string.isRequired
}

function PersonBrowser(props) {
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
        getResultsProvider={query =>
          query.startsWith('/') ? CommandResults : PersonResults
        }
      />
      {person && (
        <Link to={`/person/${id}/edit`}>
          <NextOption label={`Edit ${person.name}`} id={`edit-person`} />
        </Link>
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
