import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import NextOption from '../common/nextSteps/NextOption'
import Search from '../Search/Search'
import Person from './Person'

PersonBrowser.propTypes = {
  id: PropTypes.string.isRequired
}

function PersonBrowser(props) {
  const { id } = props

  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { id }
  })

  if (error) return <p>ERROR</p>
  if (loading) return <Person name="Loading..." />

  const {
    person: { name, image, profiles }
  } = data

  return (
    <React.Fragment>
      <Person name={name} image={image || undefined} profiles={profiles} />
      <Search />
      <Link to={`/person/${id}/edit`}>
        <NextOption label={`Edit ${name}`} id={`edit-person`} />
      </Link>
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
