import PropTypes from 'prop-types'
import React from 'react'

SearchResultsNavigator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numberOfResults: PropTypes.number.isRequired,
  resultsPerPage: PropTypes.number.isRequired
}

function SearchResultsNavigator(props) {
  const numberOfPages = Math.ceil(props.numberOfResults / props.resultsPerPage)

  return (
    <div
      className="search-results-navigator"
      title="Navigate through pages of search results with ← and →"
    >
      {Array.from({ length: numberOfPages }, (_, index) => (
        <button
          className={`
            page
            ${index + 1 === props.currentPage ? 'current-page' : undefined}
          `}
          key={index + 1}
        >
          {index + 1}
        </button>
      ))}
      <button className="more">more</button>
    </div>
  )
}

export default SearchResultsNavigator
