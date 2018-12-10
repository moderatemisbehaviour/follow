import React from 'react'
import { Link } from 'react-router-dom'

import './SearchResult.css'

function SearchResult (props) {
  const { id, personName, firstSearchResultRef } = props
  return <Link to={`/person/${id}`}>
    <li className="SearchResult" ref={firstSearchResultRef}>{personName}</li>
  </Link>
}

export default SearchResult
