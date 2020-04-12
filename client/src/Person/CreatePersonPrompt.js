import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import createPersonIcon from './createPerson.svg'
import './CreatePersonPrompt.css'
import Name from './Name'

function CreatePersonPrompt(props) {
  return (
    <span id="create-person">
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
    </span>
  )
}

CreatePersonPrompt.propTypes = {
  personName: PropTypes.string
}

export default CreatePersonPrompt
