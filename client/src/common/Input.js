import PropTypes from 'prop-types'
import React from 'react'
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

function Input(props) {
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
