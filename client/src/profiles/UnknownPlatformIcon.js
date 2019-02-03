import React from 'react'

import './UnknownPlatformIcon.css'

function UnknownPlatformIcon (props) {
  return (
    <svg className={props.className} viewBox="0 0 100 100" height="100%">
      <circle cx="50" cy="50" r="50" fill="black"/>
      <text x="50" y="55" fill="white" fontSize="70" dominantBaseline="middle" textAnchor="middle">{props.children}</text>
    </svg>
  )
}

export default UnknownPlatformIcon
