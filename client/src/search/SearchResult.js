import React from 'react'
import { Link } from 'react-router-dom'

import './SearchResult.css'

function SearchResult (props) {
  const { id, personName } = props
  return <Link to={`/person/${id}`}>
    <li className="SearchResult">{personName}</li>
  </Link>
}

export default SearchResult
