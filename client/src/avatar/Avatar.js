import React from 'react'
import PropTypes from 'prop-types'

import './Avatar.css'
import placeholderPersonImage from '../people/placeholderPersonImage.svg'

function Avatar(props) {
  // TODO: Rename, it doesn't make sense.
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
  src: placeholderPersonImage
}

export default Avatar
