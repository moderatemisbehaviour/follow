import PropTypes from 'prop-types'
import React from 'react'
import './Image.css'
import placeholderPersonImage from './placeholderPersonImage.svg'

function Image(props) {
  return (
    <div
      className="image"
      style={{
        backgroundImage: `url(${props.src})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        clipPath: 'circle()'
      }}
    />
  )
}

Image.propTypes = {
  src: PropTypes.string
}

Image.defaultProps = {
  src: placeholderPersonImage
}

export default Image
