import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Input from '../common/Input'
import CreatePersonButton from '../Person/CreatePersonButton'
import './Search.css'
import SearchResults from './SearchResults'
import SearchResultsNavigator from './SearchResultsNavigator'

Search.propTypes = {
  resultsPerPage: PropTypes.number
}

Search.defaultProps = {
  resultsPerPage: 5
}

function Search(props) {
  const [query, setQuery] = useState()
  const { loading, error, data, fetchMore } = useQuery(GET_PEOPLE, {
    variables: { query },
    skip: !query
  })

  // TODO: Add a debounce to the search.
  return (
    <div className="search">
      <Input
        onChange={event => setQuery(event.target.value)}
        prompt="Type a person's name."
        type="search"
      />
      {query && (
        <SearchResults
          resultsPerPage={props.resultsPerPage}
          searchResults={(data && data.people) || []}
        >
          {loading ? <li>Loading...</li> : undefined}
          {error ? <li>Error :(</li> : undefined}
          <CreatePersonButton personName={query} />
          {data && (
            <SearchResultsNavigator
              currentPage={1}
              resultsPerPage={props.resultsPerPage}
              numberOfResults={data.people.length}
              onNavigation={pageNumber => {
                fetchMore({
                  variables: {
                    startingPopularity: calculateStartingPopularity(
                      props.resultsPerPage,
                      pageNumber
                    )
                  }
                })
              }}
            />
          )}
        </SearchResults>
      )}
    </div>
  )
}

function calculateStartingPopularity(resultsPerPage, pageNumber) {
  return resultsPerPage * (pageNumber - 1) + 1
}

const GET_PEOPLE = gql`
  query People(
    $query: String!
    $resultsPerPage: Int!
    $startingPopularity: Int!
  ) {
    people(
      query: $query
      resultsPerPage: $resultsPerPage
      startingPopularity: $startingPopularity
    ) {
      id
      name
      image
    }
  }
`

export default Search
