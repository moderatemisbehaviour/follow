import { useQuery } from '@apollo/react-hooks'
import Emoji from 'a11y-react-emoji'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import Person from './Person'
import './PersonViewer.css'

PersonViewer.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.object
}

// TODO: Make this component simply just Person. Create a layout component to do what Person currently does.
function PersonViewer(props) {
  const { id } = props
  const { error, data } = useQuery(GET_PERSON, {
    variables: { id }
  })

  if (error) return <p>ERROR</p>

  const person = (data && data.person) || {}

  return (
    <div id="person-viewer">
      <Person
        name={person.name}
        image={person.image || undefined}
        profiles={person.profiles}
        style={props.style}
      />
      <div id="plug">
        Hosted with <Emoji symbol="❤️" /> by{' '}
        <a href={document.location.origin}>People Not Platforms</a>
      </div>
    </div>
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

export default PersonViewer
