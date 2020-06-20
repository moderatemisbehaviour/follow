import React from 'react'
import { Link } from 'react-router-dom'
import home from '../common/icons/home.svg'

function HomeLink(props) {
  return (
    <Link to="/">
      <img id="home" src={home} alt="home button"></img>
    </Link>
  )
}

export default HomeLink
