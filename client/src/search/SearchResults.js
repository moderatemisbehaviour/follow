import React from 'react'
import PropTypes from 'prop-types'

import CreatePersonButton from '../people/CreatePersonButton'
import SearchResult from './SearchResult'
import './SearchResults.css'

SearchResults.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired,
  firstSearchResultRef: PropTypes.shape({})
}

function SearchResults (props) {
  const { data: { people }, firstSearchResultRef } = props
  let searchResults = people.map((person, index) => {
    return <SearchResult key={index} id={person.id} personName={person.name} firstSearchResultRef={!index ? firstSearchResultRef : null} />
  })

  return (
    <ul className="SearchResults" onKeyDown={onKeyDown}>
      {searchResults}
      <CreatePersonButton/>
    </ul>
  )
}

function onKeyDown () {}

export default SearchResults
