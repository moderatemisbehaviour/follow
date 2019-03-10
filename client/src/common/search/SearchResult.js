import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './SearchResult.css'

SearchResult.propTypes = {
  children: PropTypes.shape({})
}

function SearchResult (props) {
  const {children: person} = props
  return (
    <Link to={`/person/${person.id}`} key={person.id}>
      <li className="SearchResult">
        {person}
      </li>
    </Link>
  )
}

export default SearchResult
