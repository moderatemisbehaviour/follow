import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import makeResultsKeyboardNavigationEventHandler from '../makeResultsKeyboardNavigationEventHandler'
import AvailableCommands from './AvailableCommands'
import ContactOptions from './ContactOptions'

CommandResults.propTypes = {
  firstResultOnKeyUp: PropTypes.func.isRequired,
  firstResultRef: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  resultsPerPage: PropTypes.number,
  setQuery: PropTypes.func.isRequired
}

CommandResults.defaultProps = {
  resultsPerPage: 5
}

function CommandResults(props) {
  const [currentlySelectedIndex, setCurrentlySelectedIndex] = useState(null)
  const resultRefs = useMemo(
    () =>
      Array.from({ length: props.resultsPerPage }, (_, index) =>
        index === 0 ? props.firstResultRef : React.createRef()
      ),
    [props.firstResultRef, props.resultsPerPage]
  )
  useEffect(() => {
    if (currentlySelectedIndex !== null) {
      resultRefs[currentlySelectedIndex].current.focus()
    }
  })

  let results
  let onSelect
  if (props.query === '/contact') {
    results = <ContactOptions refs={resultRefs} />
    onSelect = () => null
  } else {
    results = <AvailableCommands query={props.query} refs={resultRefs} />
    onSelect = event => props.setQuery(event.target.textContent)
  }

  return (
    <ul
      onClick={onSelect}
      onKeyUp={event => {
        makeResultsKeyboardNavigationEventHandler(
          resultRefs,
          onSelect,
          props.firstResultOnKeyUp,
          currentlySelectedIndex,
          setCurrentlySelectedIndex
        )(event)
      }}
    >
      {results}
    </ul>
  )
}

export default CommandResults
