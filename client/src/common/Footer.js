import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import HomeLink from './HomeLink'

function Footer() {
  return (
    <div id="footer">
      <div className="left">
        <Link to="/about">About</Link>
        <span>&#183;</span>
        <Link to="/attributions">Attributions</Link>
        <span>&#183;</span>
      </div>
      <div className="centre">
        <HomeLink />
      </div>
      <div className="right">
        <span>&#183;</span>
        <Link to="/contact">Contact</Link>
        <span>&#183;</span>
        <Link to="/privacy">Privacy</Link>
      </div>
    </div>
  )
}

export default Footer
