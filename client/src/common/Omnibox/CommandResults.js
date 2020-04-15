import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import makeResultsKeyboardNavigationEventHandler from './makeResultsKeyboardNavigationEventHandler'
import Result from './Result'

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

const commands = ['/contact']

function CommandResults(props) {
  const [currentlySelectedIndex, setCurrentlySelectedIndex] = useState(null)
  const resultRefs = useMemo(
    () =>
      Array.from({ length: props.resultsPerPage }, (_, index) =>
        index === 0 ? props.firstResultRef : React.createRef()
      ),
    [props.firstResultRef, props.resultsPerPage]
  )
  const onSelect = event => props.setQuery(event.target.textContent)
  useEffect(() => {
    if (currentlySelectedIndex !== null) {
      resultRefs[currentlySelectedIndex].current.focus()
    }
  })

  let results = []
  if (props.query === '/contact') {
    results = (
      <React.Fragment>
        <Result key="submit-a-feature-request" ref={resultRefs[0]}>
          💡Submit a feature request
        </Result>
        <Result key="report-a-bug" ref={resultRefs[1]}>
          🐛Report a bug
        </Result>
        <Result key="make-a-general-enquiry" ref={resultRefs[2]}>
          🗣Make a general enquiry
        </Result>
      </React.Fragment>
    )
  } else {
    const matchingCommands = commands.filter(command =>
      command.includes(props.query)
    )
    const commandsToRender = matchingCommands.length
      ? matchingCommands
      : commands
    results = commandsToRender.map((command, index) => (
      <Result key={command} ref={resultRefs[index]}>
        {command}
      </Result>
    ))
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
