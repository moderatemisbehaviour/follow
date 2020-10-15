import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import UnderlineButton from './buttons/UnderlineButton'
import './Footer.css'
import LoggedInHomeLink from './LoggedInHomeLink'
import LoggedOutHomeLink from './LoggedOutHomeLink'

function Footer() {
  const [cookies] = useCookies(['isLoggedIn'])

  return (
    <div id="footer">
      <div className="left">
        <Link to="/about">
          <UnderlineButton>About</UnderlineButton>
        </Link>
        <span>&#183;</span>
        <Link to="/attributions">
          <UnderlineButton>Attributions</UnderlineButton>
        </Link>
        <span>&#183;</span>
      </div>
      <div className="centre">
        {cookies.isLoggedIn ? <LoggedInHomeLink /> : <LoggedOutHomeLink />}
      </div>
      <div className="right">
        <span>&#183;</span>
        <Link to="/contact">
          <UnderlineButton>Contact</UnderlineButton>
        </Link>
        <span>&#183;</span>
        <Link to="/privacy">
          <UnderlineButton>Privacy</UnderlineButton>
        </Link>
      </div>
    </div>
  )
}

export default Footer