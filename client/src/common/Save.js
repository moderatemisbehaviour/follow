import PropTypes from 'prop-types'
import React from 'react'

import './Save.css'

function Save(props) {
  const { disabled, onClick } = props
  return (
    <input
      className="save"
      disabled={disabled}
      onClick={onClick}
      type="submit"
      value="Save"
    />
  )
}

Save.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default Save
