import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import createPersonIcon from './createPerson.svg'
import './CreatePersonPrompt.css'
import Name from './Name'

function CreatePersonPrompt(props) {
  return (
    <div id="create-person">
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
    </div>
  )
}

CreatePersonPrompt.propTypes = {
  personName: PropTypes.string
}

export default CreatePersonPrompt
