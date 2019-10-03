import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import createPersonIcon from './createPerson.svg'
import Name from './Name'

import './CreatePersonButton.css'

function CreatePersonButton(props) {
  return (
    <li id="create-person">
      <img src={createPersonIcon} alt="create person icon" />
      <span>Create </span>
      <Link to={`/person/create?name=${props.personName}`}>
        <span id="create-suggested-person">
          <Name name={props.personName} />
        </span>
      </Link>
      <span> or </span>
      <Link to="/person/create">
        <span id="create-new-person">someone else.</span>
      </Link>
    </li>
  )
}

CreatePersonButton.propTypes = {
  personName: PropTypes.string
}

export default CreatePersonButton
