import PropTypes from 'prop-types'
import React from 'react'

ResultsPager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onNavigation: PropTypes.func.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  resultsCount: PropTypes.number.isRequired
}

function ResultsPager(props) {
  return (
    <div
      className="results-pager"
      title="Navigate through pages of search results with ← and →"
    >
      {Array.from({ length: props.numberOfPages }, (_, index) => (
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
      <span className="results-count">{props.resultsCount} search results</span>
    </div>
  )
}

export default ResultsPager
