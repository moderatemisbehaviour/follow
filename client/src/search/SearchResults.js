import React from 'react'
import PropTypes from 'prop-types'

import CreatePersonButton from '../people/CreatePersonButton'
import SearchResult from './SearchResult'
import './SearchResults.css'

SearchResults.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired
}

function SearchResults (props) {
  const {data: {people}} = props
  let searchResults = people.map((person, index) => {
    return <SearchResult key={index} id={person.id} personName={person.name}/>
  })

  return (
    <ul className="SearchResults">
      {searchResults}
      <CreatePersonButton/>
    </ul>
  )
}

export default SearchResults
