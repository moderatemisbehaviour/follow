import React from 'react'
import PropTypes from 'prop-types'

import './Avatar.css'

function Avatar (props) {
  const { src } = props
  return (
    <div className="Avatar">
      <img src={src} alt="logo" />
    </div>
  )
}

Avatar.propTypes = {
  src: PropTypes.string
}

Avatar.defaultProps = {
  src: ''
}

export default Avatar
