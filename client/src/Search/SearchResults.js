import PropTypes from 'prop-types'
import React from 'react'
import Person from '../Person/Person'
import SearchResult from './SearchResult'

function SearchResults(props) {
  console.log(props.children)
  return (
    <ul className="search-results">
      <React.Fragment>
        {props.searchResults &&
          props.searchResults.map(searchResult => (
            <SearchResult key={searchResult.id} id={searchResult.id}>
              <Person {...searchResult} />
            </SearchResult>
          ))}
        {props.searchResults && props.searchResults.length === 0 && (
          <li className="placeholder">No people found.</li>
        )}
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
  searchResults: null
}

export default SearchResults
