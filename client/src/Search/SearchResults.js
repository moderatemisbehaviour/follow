import React from 'react'
import PropTypes from 'prop-types'

import Person from '../Person/Person'
import SearchResult from './SearchResult'

function SearchResults(props) {
  return (
    <ul className="search-results">
      <React.Fragment>
        {props.searchResults.map(searchResult => (
          <SearchResult key={searchResult.id} id={searchResult.id}>
            <Person {...searchResult} />
          </SearchResult>
        ))}
        {props.children}
      </React.Fragment>
    </ul>
  )
}

SearchResults.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  resultsPerPage: PropTypes.number.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape({}))
}

SearchResults.defaultProps = {
  results: {}
}

export default SearchResults
