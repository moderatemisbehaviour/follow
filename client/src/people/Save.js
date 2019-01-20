import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
import PropTypes from 'prop-types'
import React from 'react'
import {Redirect} from 'react-router-dom'

import './Save.css'

function Save (props) {
  const {person} = props

  return (
    <Mutation mutation={CREATE_PERSON}>
      {(createPerson, {data, error, loading}) => {
        if (data) {
          const id = data.createPerson.id
          return <Redirect to={`/person/${id}`}/>
        }

        return <input
          className="save"
          disabled={props.disabled}
          onClick={(e) => {
            createPerson({
              variables: {
                person
              }
            })
          }}
          type="submit"
          value="Save"/>
      }}
    </Mutation>
  )
}

const CREATE_PERSON = gql`
  mutation CreatePerson($person: PersonInput!) {
    createPerson(person: $person) {
      id
      name
    }
  }
`

Save.propTypes = {
  disabled: PropTypes.bool,
  person: PropTypes.shape({})
}

export default Save
