import feature from 'feature-js'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import './Input.css'

Input.propTypes = {
  inputRef: PropTypes.object,
  invalid: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  prompt: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}

function Input(props) {
  useEffect(() => {
    if (!feature.touch) props.inputRef.current.focus()
  }, [props.inputRef])

  return (
    <input
      id="the-input"
      className={`${props.invalid ? ' invalid' : ''}`} // TODO: Remove this
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      placeholder={props.prompt}
      ref={props.inputRef}
      type={props.type}
      value={props.value}
    />
  )
}

export default Input
