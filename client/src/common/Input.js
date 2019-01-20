import React from 'react'
import PropTypes from 'prop-types'

import './Input.css'

function Input (props) {
  return (
    <input
      autoFocus
      className="the-input"
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      placeholder={props.prompt}
      ref={props.inputRef}
      type={props.type}
      value={props.value}
    />
  )
}

Input.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  prompt: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}

export default Input
