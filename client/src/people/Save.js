import PropTypes from 'prop-types'
import React from 'react'

import './Save.css'

function Save (props) {
  return <input className="save" disabled={props.disabled} type="submit" value="Save"/>
}

Save.propTypes = {
  disabled: PropTypes.bool
}

export default Save
