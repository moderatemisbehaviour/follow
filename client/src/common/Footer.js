import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Footer.css'
import HomeLink from './HomeLink'

function Footer() {
  const location = useLocation()
  return (
    <div id="footer">
      <Link to="/attributions">Attributions</Link>
      <span>&#183;</span>
      {location.pathname === '/' ? null : (
        <React.Fragment>
          <HomeLink />
          <span>&#183;</span>
        </React.Fragment>
      )}
      <Link to="/contact">Contact</Link>
    </div>
  )
}

export default Footer
