import React from 'react'
import { Link } from 'react-router-dom'
import UnderlineButton from './buttons/UnderlineButton'
import './Footer.css'
import LoggedInHomeLink from './LoggedInHomeLink'
import LoggedOutHomeLink from './LoggedOutHomeLink'
import useUser from './useUser'

function Footer() {
  const [user, refetch] = useUser()

  return (
    <div id="footer">
      <div className="left">
        <Link to="/about">
          <UnderlineButton>About &#183;</UnderlineButton>
        </Link>
        <Link to="/attributions">
          <UnderlineButton>Attributions &#183;</UnderlineButton>
        </Link>
      </div>
      <div className="centre">
        {user ? (
          <LoggedInHomeLink refetch={refetch} user={user} />
        ) : (
          <LoggedOutHomeLink />
        )}
      </div>
      <div className="right">
        <Link to="/contact">
          <UnderlineButton>&#183; Contact</UnderlineButton>
        </Link>
        <Link to="/privacy">
          <UnderlineButton>&#183; Privacy</UnderlineButton>
        </Link>
      </div>
    </div>
  )
}

export default Footer
