import PropTypes from 'prop-types'
import React, { useEffect, useLayoutEffect } from 'react'
import AvailableCommands from './AvailableCommands'
import ContactOptions from './ContactOptions'

CommandResults.propTypes = {
  effect: PropTypes.func.isRequired,
  resultRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  query: PropTypes.string.isRequired,
  setResultsCount: PropTypes.func.isRequired
}

function CommandResults(props) {
  useLayoutEffect(() => props.setResultsCount(null))
  useEffect(props.effect())

  let results
  if (props.query === '/contact') {
    results = <ContactOptions refs={props.resultRefs} />
  } else {
    results = <AvailableCommands query={props.query} refs={props.resultRefs} />
  }

  return <ol>{results}</ol>
}

export default CommandResults
