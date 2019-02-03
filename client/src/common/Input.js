import React from 'react'
import PropTypes from 'prop-types'

import './Input.css'

Input.propTypes = {
  inputRef: PropTypes.shape({}),
  invalid: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  prompt: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}

function Input (props) {
  return (
    <input
      autoFocus
      id="the-input"
      className={`the-input ${props.invalid && 'invalid'}`} // TODO: Remove this
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
