import React from 'react'

import './Input.css'

function Input (props) {
  return (
    <input
      autoFocus
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      placeholder={props.prompt}
      type={props.type}
      value={props.value}
    />
  )
}

export default Input
