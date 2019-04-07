import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './SearchResult.css'

SearchResult.propTypes = {
  children: PropTypes.shape({}),
  id: PropTypes.number.isRequired
}

function SearchResult (props) {
  return (
    <Link to={`/person/${props.id}`}>
      <li className="SearchResult">
        {props.children}
      </li>
    </Link>
  )
}

export default SearchResult
