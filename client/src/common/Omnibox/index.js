import { debounce } from 'debounce'
import feature from 'feature-js'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import CreatePersonPrompt from '../../Person/CreatePersonPrompt'
import Input from '../Input'
import useUser from '../useUser'
import makeResultsKeyboardNavigationEventHandler from './makeResultsKeyboardNavigationEventHandler'
import makeResultsPagerKeyboardNavigationEventHandler from './makeResultsPagerKeyboardNavigationEventHandler'
import './Omnibox.css'
import ResultsPager from './ResultsPager'
import useSearchParamAsQuery from './useSearchParamAsQuery'

Omnibox.propTypes = {
  getResultsComponent: PropTypes.func.isRequired,
  resultsPerPage: PropTypes.number
}

Omnibox.defaultProps = {
  resultsPerPage: 5
}

function Omnibox(props) {
  const [user] = useUser()

  const [inputValue, setInputValue] = useState('')
  const [query, setQuery] = useState('')

  useSearchParamAsQuery(setInputValue, setQuery)

  useEffect(
    () => {
      if (query) document.title = `Searching for ${query}`
    },
    // Only update when query changes otherwise history push re-renders cause an infinite loop!
    [query]
  )
  // TODO: Make it so this update only happens when the query changes.
  //
  // Had it that way before but found that the setting of document.title in Home was overriding it here because it was
  // always running whereas this one was waiting for query to change.
  useEffect(() => {
    if (query) document.title = `Searching for ${query}`
    else if (!feature.touch) focusInput()
  })

  const inputRef = useRef()
  const resultRefs = useMemo(
    () => Array.from({ length: props.resultsPerPage }, _ => React.createRef()),
    [props.resultsPerPage]
  )
  function focusInput() {
    inputRef.current.focus()
  }
  function focusResults(event) {
    const firstResult = resultRefs[0].current
    if (event.key === 'ArrowDown' && firstResult) firstResult.focus()
  }

  const [currentlySelectedIndex, setCurrentlySelectedIndex] = useState(null)
  const [resultsCount, setResultsCount] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  const ResultsComponent = props.getResultsComponent(query)

  return (
    <div id="omnibox" onKeyUp={query ? focusResults : undefined}>
      <Input
        onChange={event => {
          if (event.key === 'ArrowDown') return
          setInputValue(event.target.value)
          setQueryDebounced(setQuery, event.target.value)
        }}
        prompt="Type a person's name"
        inputRef={inputRef}
        type="search"
        value={inputValue}
      />
      {query && (
        <div
          className="results"
          onBlur={event => {
            const newlyFocusedElement = event.relatedTarget
            const resultsLostFocus = !resultRefs
              .map(resultRef => resultRef.current)
              .includes(newlyFocusedElement)

            if (resultsLostFocus) {
              setCurrentlySelectedIndex(null)
            }
          }}
          onFocus={() => {
            if (currentlySelectedIndex === null) setCurrentlySelectedIndex(0)
          }}
          onKeyUp={event => {
            makeResultsKeyboardNavigationEventHandler(
              resultRefs,
              focusInput,
              currentlySelectedIndex,
              setCurrentlySelectedIndex
            )(event)

            if (resultsCount) {
              makeResultsPagerKeyboardNavigationEventHandler(
                pageNumber,
                setPageNumber,
                calculateNumberOfPages(resultsCount, props.resultsPerPage)
              )(event)
            }
          }}
        >
          <ResultsComponent
            effect={focusSelectedResult}
            pageNumber={pageNumber}
            query={query}
            resultsPerPage={props.resultsPerPage}
            resultRefs={resultRefs}
            setResultsCount={setResultsCount}
          >
            {user ? (
              <CreatePersonPrompt
                key="create-person-prompt"
                personName={query}
              />
            ) : (
              undefined
            )}
          </ResultsComponent>
          {resultsCount !== null ? (
            <ResultsPager
              currentPage={pageNumber}
              onNavigation={setPageNumber}
              numberOfPages={calculateNumberOfPages(
                resultsCount,
                props.resultsPerPage
              )}
              resultsCount={resultsCount}
            />
          ) : null}
        </div>
      )}
    </div>
  )

  function focusSelectedResult() {
    const resultRefsCurrent = resultRefs.filter(
      resultRef => !!resultRef.current
    )

    if (resultRefsCurrent.length && currentlySelectedIndex !== null) {
      const resultIndexToFocus = Math.min(
        currentlySelectedIndex,
        resultRefsCurrent.length - 1
      )
      resultRefsCurrent[resultIndexToFocus].current.focus()
    }
  }
}

function calculateNumberOfPages(resultsCount, resultsPerPage) {
  return Math.ceil(resultsCount / resultsPerPage)
}

const setQueryDebounced = debounce((setQuery, query) => {
  setQuery(query)
}, 200)

export default Omnibox
