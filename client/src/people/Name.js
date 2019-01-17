import React from 'react'
import PropTypes from 'prop-types'

import './Name.css'

function Name (props) {
  return (
    <h1 className={`name ${props.name === 'Awesome Person' && 'placeholder'}`}>
      <span>
        {props.name}
      </span>
    </h1>
  )
}

Name.propTypes = {
  name: PropTypes.string
}

Name.defaultProps = {
  name: 'Awesome Person'
}

export default Name
