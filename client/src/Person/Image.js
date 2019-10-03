import React from 'react'
import PropTypes from 'prop-types'

import './Image.css'
import placeholderPersonImage from './placeholderPersonImage.svg'

function Image(props) {
  const { src } = props
  return (
    <div className="image">
      <img src={src} alt="logo" />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string
}

Image.defaultProps = {
  src: placeholderPersonImage
}

export default Image
