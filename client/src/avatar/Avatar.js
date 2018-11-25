import React from 'react'
import './Avatar.css'
import logo from '../logo.png'

function Avatar (props) {
  const { src } = props
  return (
    <img src={src || logo} className="Avatar" alt="logo" />
  )
}

export default Avatar
