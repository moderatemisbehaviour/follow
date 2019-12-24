import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
  const [query, setQuery] = useState('')
  const [touched, setTouched] = useState()

  const location = useLocation()
  if (!touched && location.search) {
    setTouched(true)
    const queryFromParam = location.search.split('?')[1]
    setQuery(queryFromParam)
  }

  const history = useHistory()

  useEffect(
    () => {
      document.title = `Searching for ${query}`
      history.push({ search: query })
    },
    // Only update when query changes otherwise history push re-renders cause an infinite loop!
    [history, query]
  )
  // TODO: Make it so this update only happens when the query changes.
  //
  // Had it that way before but found that the setting of document.title in Home was overriding it here because it was
  // always running whereas this one was waiting for query to change.
  useEffect(() => {
    if (query) document.title = `Searching for ${query}`
  })

  const { loading, error, data, fetchMore } = useQuery(GET_PEOPLE, {
    variables: {
      query,
      resultsPerPage: props.resultsPerPage,
      startingPopularity: 0
    },
    skip: !query
  })

  // TODO: Add a debounce to the search.
  return (
    <div className="search">
      <Input
        onChange={event => setQuery(event.target.value)}
        prompt="Type a person's name."
        type="search"
        value={query}
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
                    query,
                    resultsPerPage: props.resultsPerPage,
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
