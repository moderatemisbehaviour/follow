import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './SearchResult.css'

SearchResult.propTypes = {
  id: PropTypes.string.isRequired,
  personName: PropTypes.string.isRequired
}

function SearchResult (props) {
  const {id, personName} = props
  return (
    <Link to={`/person/${id}`}>
      <li className="SearchResult">{personName}</li>
    </Link>
  )
}

export default SearchResult
