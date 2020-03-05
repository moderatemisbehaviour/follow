import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Person from '../Person/Person'
import SearchResult from './SearchResult'
import SearchResultsNavigator from './SearchResultsNavigator'

const SearchResults = React.forwardRef((props, ref) => {
  const { searchResults, searchResultsCount } = props

  const searchResultRefs = searchResults.map(_ => React.createRef())
  searchResultRefs[0] = ref
  const [pageNumber, setPageNumber] = useState(1)

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
    }
  }

  return (
    <ul
      className="search-results"
      onKeyUp={searchResults.length ? e => onKeyUp(e) : null}
    >
      <React.Fragment>
        {searchResults &&
          searchResults.map((searchResult, index) => (
            <SearchResult
              key={searchResult.id}
              id={searchResult.id}
              ref={searchResultRefs[index]}
            >
              <Person {...searchResult} />
            </SearchResult>
          ))}

        {props.children}

        {searchResultsCount === undefined ? null : (
          <SearchResultsNavigator
            currentPage={pageNumber}
            onNavigation={pageNumber => {
              props.onNavigation(pageNumber)
              setPageNumber(pageNumber)
            }}
            resultsPerPage={props.resultsPerPage}
            searchResultsCount={searchResultsCount}
          />
        )}
      </React.Fragment>
    </ul>
  )
})

SearchResults.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  onArrowUpBlur: PropTypes.func,
  onNavigation: PropTypes.func,
  resultsPerPage: PropTypes.number.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape({})),
  searchResultsCount: PropTypes.number
}

SearchResults.defaultProps = {
  searchResults: []
}

export default SearchResults
