import React from 'react'
import './Avatar.css'

function Avatar (props) {
  const { src } = props
  return (
    <img src={src} className="Avatar" alt="logo" />
  )
}

export default Avatar
