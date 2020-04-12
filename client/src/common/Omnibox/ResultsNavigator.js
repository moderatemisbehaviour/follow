import PropTypes from 'prop-types'
import React, { useState } from 'react'
import ResultsPager from './ResultsPager'

ResultsNavigator.propTypes = {
  resultRefs: PropTypes.shape({}),
  onArrowUpBlur: PropTypes.func
}

ResultsNavigator.defaultProps = {
  resultsPerPage: 5
}

function ResultsNavigator(props) {
  const [onSelectResult, setOnSelectResult] = useState()
  const [resultsCount, setResultsCount] = useState()
  const [resultRefs, setResultRefs] = useState()
  const [selectedResultsIndex, setSelectedResultIndex] = useState()

  return (
    <React.Fragment>
      {resultsCount > props.resultsPerPage ? (
        <ResultsPager
          currentPage={pageNumber}
          onNavigation={pageNumber => setPageNumber(pageNumber)}
          resultsCount={resultsCount}
          resultsPerPage={props.resultsPerPage}
          resultRefs={resultRefs}
        />
      ) : null}
    </React.Fragment>
  )

  function onKeyUp(event) {
    event.stopPropagation()

    let newPageNumber = pageNumber

    if (event.key === 'ArrowUp') {
      const previousSearchResult = document.activeElement.previousSibling
      if (previousSearchResult) {
        previousSearchResult.focus()
      } else {
        props.onArrowUpBlur()
      }
    } else if (event.key === 'ArrowDown') {
      const nextSearchResult = document.activeElement.nextSibling
      nextSearchResult && nextSearchResult.focus()
    } else if (event.key === 'ArrowLeft') {
      newPageNumber = pageNumber - 1
      setPageNumber(newPageNumber)
      props.onNavigation(newPageNumber)
    } else if (event.key === 'ArrowRight') {
      newPageNumber = pageNumber - 1
      setPageNumber(newPageNumber)
      props.onNavigation(newPageNumber)
    } else if (event.key === 'Enter') {
      onSelectResult(event.target.dataset.key)
    }
  }
}

export default ResultsNavigator
