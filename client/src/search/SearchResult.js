import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './SearchResult.css'

SearchResult.propTypes = {
  firstSearchResultRef: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  personName: PropTypes.string.isRequired
}

function SearchResult (props) {
  const { id, personName, firstSearchResultRef } = props
  return <Link to={`/person/${id}`}>
    <li className="SearchResult" ref={firstSearchResultRef}>{personName}</li>
  </Link>
}

export default SearchResult
