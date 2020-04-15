import { debounce } from 'debounce'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Input from '../Input'
import './Omnibox.css'
import useSearchParamAsQueryOnLoad from './useSearchParamAsQueryOnLoad'

Omnibox.propTypes = {
  getResultsComponent: PropTypes.func.isRequired
}

function Omnibox(props) {
  const [inputValue, setInputValue] = useState('')
  const [query, setQuery] = useState('')

  useSearchParamAsQueryOnLoad(setInputValue, setQuery)

  const history = useHistory()
  useEffect(
    () => {
      if (query) {
        document.title = `Searching for ${query}`
        history.push({ search: query })
      }
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

  const inputRef = useRef()
  const firstResultRef = useRef()
  function focusInput() {
    inputRef.current.focus()
  }
  function focusResults(event) {
    if (event.key === 'ArrowDown') firstResultRef.current.focus()
  }

  const ResultsComponent = props.getResultsComponent(query)

  return (
    <div id="omnibox" onKeyUp={query ? focusResults : undefined}>
      <Input
        onChange={event => {
          if (event.key === 'ArrowDown') return
          setInputValue(event.target.value)
          setQueryDebounced(setQuery, event.target.value)
        }}
        prompt="Type a person's name or / to see available commands"
        inputRef={inputRef}
        type="search"
        value={inputValue}
      />
      {query && (
        <div className="results">
          <ResultsComponent
            firstResultOnKeyUp={focusInput}
            firstResultRef={firstResultRef}
            query={query}
            setQuery={query => {
              setInputValue(query)
              setQuery(query)
            }}
          />
        </div>
      )}
    </div>
  )
}

const setQueryDebounced = debounce((setQuery, query) => {
  setQuery(query)
}, 200)

export default Omnibox
