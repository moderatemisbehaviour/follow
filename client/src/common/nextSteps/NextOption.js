import PropTypes from 'prop-types'
import React from 'react'

NextOption.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired
}

function NextOption (props) {
  return (
    <input
      id={`add-${props.name}`}
      className="next"
      disabled={props.disabled}
      onClick={props.onClick}
      type="button" value={props.label}/>
  )
}

export default NextOption
