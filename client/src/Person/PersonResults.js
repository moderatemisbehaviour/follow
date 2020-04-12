import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import makeResultsKeyboardNavigationEventHandler from '../common/Omnibox/makeResultsKeyboardNavigationEventHandler'
import makeResultsPagerKeyboardNavigationEventHandler from '../common/Omnibox/makeResultsPagerKeyboardNavigationEventHandler'
import ResultsPager from '../common/Omnibox/ResultsPager'
import PersonList from '../Person/PersonList'
import CreatePersonPrompt from './CreatePersonPrompt'

PersonResults.propTypes = {
  firstResultOnKeyUp: PropTypes.func.isRequired,
  firstResultRef: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  resultsPerPage: PropTypes.number
}

PersonResults.defaultProps = {
  resultsPerPage: 5
}

function PersonResults(props) {
  const [currentlySelectedIndex, setCurrentlySelectedIndex] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const resultRefs = useMemo(
    () =>
      Array.from({ length: props.resultsPerPage }, (_, index) =>
        index === 0 ? props.firstResultRef : React.createRef()
      ),
    [props.resultsPerPage]
  )

  const getPeopleResult = useQuery(GET_PEOPLE, {
    variables: {
      query: props.query,
      resultsPerPage: props.resultsPerPage,
      startingPopularity: calculateStartingPopularity(
        props.resultsPerPage,
        pageNumber
      )
    },
    fetchPolicy: 'cache-and-network',
    skip: !props.query
  })

  const getPeopleCountResult = useQuery(GET_PEOPLE_COUNT, {
    variables: { query: props.query },
    fetchPolicy: 'cache-and-network',
    skip: !props.query
  })

  const history = useHistory()
  const onSelect = personId => {
    history.push(`/person/${personId}`)
  }

  return (
    <div className="results">
      {getPeopleResult.loading ? (
        'Loading...'
      ) : getPeopleResult.error ? (
        'Error :('
      ) : (
        <React.Fragment>
          <PersonList
            currentlySelectedIndex={Math.min(
              currentlySelectedIndex,
              getPeopleResult.data.people.length - 1
            )}
            people={getPeopleResult.data.people}
            onKeyUp={event => {
              makeResultsKeyboardNavigationEventHandler(
                resultRefs,
                onSelect,
                props.firstResultOnKeyUp,
                currentlySelectedIndex,
                setCurrentlySelectedIndex
              )(event)

              makeResultsPagerKeyboardNavigationEventHandler(
                pageNumber,
                setPageNumber,
                calculateNumberofPages(
                  getPeopleCountResult.data.peopleCount,
                  props.resultsPerPage
                )
              )(event)
            }}
            refs={resultRefs}
          />
          <CreatePersonPrompt
            key="create-person-prompt"
            personName={props.query}
          />
        </React.Fragment>
      )}

      {getPeopleCountResult.loading ? (
        'Loading...'
      ) : getPeopleCountResult.error ? (
        'Error :('
      ) : (
        <ResultsPager
          currentPage={pageNumber}
          onNavigation={setPageNumber}
          numberOfPages={calculateNumberofPages(
            getPeopleCountResult.data.peopleCount,
            props.resultsPerPage
          )}
          resultsCount={getPeopleCountResult.data.peopleCount}
        />
      )}
    </div>
  )
}

function calculateStartingPopularity(resultsPerPage, pageNumber) {
  return resultsPerPage * (pageNumber - 1) + 1
}

function calculateNumberofPages(resultsCount, resultsPerPage) {
  return Math.ceil(resultsCount / resultsPerPage)
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

export default PersonResults
