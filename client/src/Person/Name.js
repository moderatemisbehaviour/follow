import PropTypes from 'prop-types'
import React from 'react'

function Name(props) {
  return (
    <h1
      className={`name ${props.name === 'Awesome Person' ? 'placeholder' : ''}`}
    >
      {props.name}
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
