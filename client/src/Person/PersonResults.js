import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PersonList from '../Person/PersonList'
import CreatePersonPrompt from './CreatePersonPrompt'

PersonResults.propTypes = {
  effect: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  resultRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectRef: PropTypes.object.isRequired,
  setResultsCount: PropTypes.func.isRequired
}

function PersonResults(props) {
  useEffect(props.effect)

  const history = useHistory()
  const onSelect = event => {
    const personId = event.target.dataset.id
    history.push(`/person/${personId}`)
  }
  props.onSelectRef.current = onSelect

  const getPeopleResult = useQuery(GET_PEOPLE, {
    variables: {
      query: props.query,
      resultsPerPage: props.resultsPerPage,
      startingPopularity: calculateStartingPopularity(
        props.resultsPerPage,
        props.pageNumber
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
  props.setResultsCount(
    !getPeopleCountResult.loading && !getPeopleCountResult.error
      ? getPeopleCountResult.data.peopleCount
      : null
  )

  return (
    <React.Fragment>
      {getPeopleResult.loading ? (
        <div>Loading results...</div>
      ) : getPeopleResult.error ? (
        <div>Error getting results :(</div>
      ) : getPeopleResult.data.people.length ? (
        <PersonList
          people={getPeopleResult.data.people}
          refs={props.resultRefs}
        />
      ) : null}

      <CreatePersonPrompt key="create-person-prompt" personName={props.query} />
    </React.Fragment>
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
      profiles
    }
  }
`

const GET_PEOPLE_COUNT = gql`
  query PeopleCount($query: String!) {
    peopleCount(query: $query)
  }
`

export default PersonResults
