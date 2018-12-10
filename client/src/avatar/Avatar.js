import React from 'react'
import './Avatar.css'

function Avatar (props) {
  const { src } = props
  return (
    <div className="Avatar">
      <img src={src} alt="logo" />
    </div>
  )
}

export default Avatar
