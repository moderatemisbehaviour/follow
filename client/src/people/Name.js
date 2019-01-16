import React from 'react'
import PropTypes from 'prop-types'

import './Name.css'

function Name (props) {
  return <h1 className={`Name ${props.name === 'Awesome Person' && 'placeholder'}`}>{props.name}</h1>
}

Name.propTypes = {
  name: PropTypes.string
}

Name.defaultProps = {
  name: 'Awesome Person'
}

export default Name
