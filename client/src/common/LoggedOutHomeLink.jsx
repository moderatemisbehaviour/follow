import React from 'react'
import { Link } from 'react-router-dom'
import home from '../common/icons/home.svg'

function LoggedOutHomeLink(props) {
  return (
    <Link id="home" to="/">
      <img src={home} alt="home button"></img>
    </Link>
  )
}

export default LoggedOutHomeLink
