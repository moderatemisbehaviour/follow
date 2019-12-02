import PropTypes from 'prop-types'
import React from 'react'

UnknownPlatformIcon.propTypes = {
  platformName: PropTypes.string
}

function UnknownPlatformIcon(props) {
  const { platformName } = props
  const text = platformName ? platformName.charAt(0) : '?'

  return (
    <svg viewBox="0 0 100 100" height="100%">
      <circle cx="50" cy="50" r="50" fill="black" />
      <text
        x="50"
        y="55"
        fill="white"
        fontSize="70"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {text}
      </text>
    </svg>
  )
}

export default UnknownPlatformIcon
