import React from 'react'
import PropTypes from 'prop-types'

import SearchResult from './SearchResult'
import './SearchResults.css'

function SearchResults (props) {
  const {children, people} = props
  let searchResults = people.map((person, index) => {
    return <SearchResult key={index} id={person.id} personName={person.name}/>
  })

  return (
    <ul className="SearchResults">
      {searchResults}
      {children}
    </ul>
  )
}

SearchResults.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  people: PropTypes.arrayOf(PropTypes.shape({}))
}

SearchResults.defaultProps = {
  children: null,
  people: []
}

export default SearchResults
