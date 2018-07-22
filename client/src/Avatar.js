import React, { Component } from 'react'
import './Avatar.css'
import logo from './logo.png'

class Avatar extends Component {
  render () {
    return (
      <img src={logo} className="Avatar" alt="logo" />
    )
  }
}

export default Avatar
