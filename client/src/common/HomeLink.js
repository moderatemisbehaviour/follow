import React from 'react'
import { Link } from 'react-router-dom'
import home from '../common/icons/home.svg'

function HomeLink(props) {
  return (
    <Link to="/">
      <button id="home">
        <img src={home} alt="home button"></img>
      </button>
    </Link>
  )
}

export default HomeLink
