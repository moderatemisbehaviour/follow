import { useQuery } from '@apollo/react-hooks'
import { debounce } from 'debounce'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Input from '../common/Input'
import CreatePersonPrompt from '../Person/CreatePersonPrompt'
import './Search.css'
import SearchResults from './SearchResults'

Search.propTypes = {
  resultsPerPage: PropTypes.number
}

Search.defaultProps = {
  resultsPerPage: 5
}

function Search(props) {
  const [touched, setTouched] = useState()
  const [inputValue, setInputValue] = useState('')
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const location = useLocation()
  if (!touched && location.search) {
    setTouched(true)
    const queryFromParam = location.search.split('?')[1]
    setInputValue(queryFromParam)
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

  const getPeopleResult = useQuery(GET_PEOPLE, {
    variables: {
      query,
      resultsPerPage: props.resultsPerPage,
      startingPopularity: calculateStartingPopularity(
        props.resultsPerPage,
        pageNumber
      )
    },
    skip: !query
  })

  const getPeopleCountResult = useQuery(GET_PEOPLE_COUNT, {
    variables: { query },
    skip: !query
  })

  const searchInputRef = React.createRef()
  const searchResultsRef = React.createRef()
  function focusSearchInput() {
    searchInputRef.current.focus()
  }
  function focusSearchResults(event) {
    if (event.key === 'ArrowDown') searchResultsRef.current.focus()
  }

  return (
    <div
      className="search"
      onKeyUp={getPeopleResult.data ? focusSearchResults : undefined}
    >
      <Input
        onChange={event => {
          if (event.key === 'ArrowDown') return
          setInputValue(event.target.value)
          setQueryDebounced(setQuery, event.target.value)
        }}
        prompt="Type a person's name."
        inputRef={searchInputRef}
        type="search"
        value={inputValue}
      />
      {query && (
        <SearchResults
          onNavigation={setPageNumber}
          onArrowUpBlur={focusSearchInput}
          ref={searchResultsRef}
          resultsPerPage={props.resultsPerPage}
          searchResults={
            getPeopleResult.data ? getPeopleResult.data.people : undefined
          }
          searchResultsCount={
            getPeopleCountResult.data
              ? getPeopleCountResult.data.peopleCount
              : undefined
          }
        >
          {getPeopleResult.loading ? <li>Loading...</li> : undefined}
          {getPeopleResult.error ? <li>Error :(</li> : undefined}

          <CreatePersonPrompt personName={query} />
        </SearchResults>
      )}
    </div>
  )
}

const setQueryDebounced = debounce((setQuery, query) => {
  setQuery(query)
}, 200)

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

const GET_PEOPLE_COUNT = gql`
  query PeopleCount($query: String!) {
    peopleCount(query: $query)
  }
`

export default Search
