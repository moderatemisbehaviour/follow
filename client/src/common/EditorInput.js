import PropTypes from 'prop-types'
import React from 'react'
import Input from './Input'

EditorInput.propTypes = {
  inputRef: PropTypes.shape({}).isRequired,
  invalid: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  prompt: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

function EditorInput(props) {
  return (
    <Input
      inputRef={props.inputRef}
      onChange={props.onChange}
      prompt={props.prompt}
      invalid={props.invalid}
      value={props.value}
    />
  )
}

export default EditorInput
