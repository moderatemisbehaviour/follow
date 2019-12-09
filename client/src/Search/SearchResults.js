import React from 'react'
import PropTypes from 'prop-types'

import CreatePersonButton from '../Person/CreatePersonButton'
import Person from '../Person/Person'
import SearchResult from './SearchResult'

function SearchResults(props) {
  const {
    query,
    results: { data, loading, error }
  } = props

  return (
    <ul className="SearchResults">
      {loading && <li>Loading...</li>}
      {error && <li>Error :(</li>}
      {data && data.people && (
        <React.Fragment>
          {data.people.map(person => (
            <SearchResult key={person.id} id={person.id}>
              <Person {...person} />
            </SearchResult>
          ))}
          <CreatePersonButton personName={query} />
        </React.Fragment>
      )}
    </ul>
  )
}

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.shape({})
}

SearchResults.defaultProps = {
  results: {}
}

export default SearchResults
