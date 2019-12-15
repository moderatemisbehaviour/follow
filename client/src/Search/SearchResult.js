import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

SearchResult.propTypes = {
  children: PropTypes.shape({}),
  id: PropTypes.string.isRequired
}

function SearchResult(props) {
  return (
    <Link to={`/person/${props.id}`}>
      <li className="search-result">{props.children}</li>
    </Link>
  )
}

export default SearchResult
