import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import createPersonIcon from '../common/createPerson.svg'
import Name from '../people/Name'

import './CreatePerson.css'

function CreatePerson (props) {
  return (
    <li id="create-person">
      <img src={createPersonIcon}/>
      <span id="create-suggested-person">
        <span>Create </span>
        <Link to={`/person/create?name=${props.personName}`}>
          <Name name={props.personName}/>
        </Link>
      </span>
      <span> or </span>
      <span id="create-new-person">
        <Link to="/person/create">someone else.</Link>
      </span>
    </li>
  )
}

CreatePerson.propTypes = {
  personName: PropTypes.string
}

export default CreatePerson
