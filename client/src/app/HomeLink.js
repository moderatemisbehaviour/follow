import React from 'react'
import { Link } from 'react-router-dom'

import home from '../common/home.svg'
import './HomeLink.css'

function HomeLink (props) {
  return (
    <div className="HomeLink">
      <Link to="/">
        <button id="home">
          <img src={home} alt="home button"></img>
        </button>
      </Link>
    </div>
  )
}

export default HomeLink
