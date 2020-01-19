import PropTypes from 'prop-types'
import React from 'react'

SearchResultsNavigator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  searchResultsCount: PropTypes.number.isRequired,
  onNavigation: PropTypes.func.isRequired
}

function SearchResultsNavigator(props) {
  const numberOfPages = Math.ceil(
    props.searchResultsCount / props.resultsPerPage
  )

  return (
    <div
      className="search-results-navigator"
      title="Navigate through pages of search results with ← and →"
    >
      {Array.from({ length: numberOfPages }, (_, index) => (
        <button
          className={`
            page ${index + 1 === props.currentPage ? 'current-page' : ''}
          `}
          key={index + 1}
          onClick={() => props.onNavigation(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <span className="search-results-count">
        {props.searchResultsCount} search results
      </span>
    </div>
  )
}

export default SearchResultsNavigator
