import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import AvailableCommands from './AvailableCommands'
import ContactOptions from './ContactOptions'

CommandResults.propTypes = {
  effect: PropTypes.func.isRequired,
  onSelectRef: PropTypes.object.isRequired,
  resultRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  setResultsCount: PropTypes.func.isRequired
}

function CommandResults(props) {
  useEffect(props.effect)
  props.setResultsCount(null)

  let results
  let onSelect
  if (props.query === '/contact') {
    results = <ContactOptions refs={props.resultRefs} />
    onSelect = () => null
  } else {
    results = <AvailableCommands query={props.query} refs={props.resultRefs} />
    onSelect = event => props.setQuery(event.target.textContent)
  }

  props.onSelectRef.current = onSelect

  return <ol onClick={onSelect}>{results}</ol>
}

export default CommandResults
