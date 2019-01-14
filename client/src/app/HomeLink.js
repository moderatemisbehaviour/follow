import React from 'react'
import { Link } from 'react-router-dom'

import './HomeLink.css'

function HomeLink (props) {
  return (
    <div className="HomeLink">
      <Link to="/">
        <p>return home</p>
      </Link>
    </div>
  )
}

export default HomeLink
