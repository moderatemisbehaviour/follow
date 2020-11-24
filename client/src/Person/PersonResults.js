import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import PersonList from '../Person/PersonList'
import { GET_PEOPLE, GET_PEOPLE_COUNT } from './queries'

PersonResults.propTypes = {
  children: PropTypes.element,
  effect: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  resultRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setResultsCount: PropTypes.func.isRequired
}

function PersonResults(props) {
  useEffect(props.effect)

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
    // TODO: Was necessary to call callback here rather than at the top level of the component because React hooks does it was triggering a setState in Omnibox during its render which React hooks does not like.
    onCompleted: data =>
      props.setResultsCount(
        !data.loading && !data.error
          ? getPeopleCountResult.data.peopleCount
          : null
      ),
    skip: !props.query
  })

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
      {props.children}
    </React.Fragment>
  )
}

function calculateStartingPopularity(resultsPerPage, pageNumber) {
  return resultsPerPage * (pageNumber - 1) + 1
}

export default PersonResults
