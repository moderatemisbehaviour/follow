import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import createPersonIcon from '../common/createPerson.svg'
import Name from '../people/Name'

import './CreatePerson.css'

function CreatePerson (props) {
  return (
    <li id="create-person">
      <img src={createPersonIcon} alt="create person icon"/>
      <span>Create </span>
      <Link to={`/person/create?name=${props.personName}`}>
        <span id="create-suggested-person">
          <Name name={props.personName}/>
        </span>
      </Link>
      <span> or </span>
      <Link to="/person/create">
        <span id="create-new-person">
          someone else.
        </span>
      </Link>
    </li>
  )
}

CreatePerson.propTypes = {
  personName: PropTypes.string
}

export default CreatePerson
