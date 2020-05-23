import PropTypes from 'prop-types'
import React from 'react'

NextOption.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired
}

function NextOption(props) {
  return (
    <input
      id={props.id}
      className={`next ${props.className ? props.className : 'configure'}`}
      disabled={props.disabled}
      onClick={props.onClick}
      type="button"
      value={props.label}
    />
  )
}

export default NextOption
