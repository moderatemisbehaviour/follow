import { Link } from 'react-router-dom'
import React from 'react'

import './CreatePersonButton.css'

function CreatePersonButton (props) {
  // TODO: Don't just re-use SearchResult HTML & CSS
  return (
    <Link to="/person/create">
      <li className="CreatePersonButton">Create a new person</li>
    </Link>
  )
}

export default CreatePersonButton
