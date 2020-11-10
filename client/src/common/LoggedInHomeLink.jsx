import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../Person/Image'
import UnderlineButton from './buttons/UnderlineButton'
import './LoggedInHomeLink.css'

LoggedInHomeLink.propTypes = {
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired
}

function LoggedInHomeLink(props) {
  return (
    <span id="user-home">
      <Link to="/home">
        <Image src={props.user.image} />
      </Link>
      <UnderlineButton
        id="signout"
        onClick={() => {
          fetch('/logout', { method: 'POST' })
          props.refetch()
        }}
        style={{ color: 'hsl(0, 100%, 68%)' }}
      >
        Sign out
      </UnderlineButton>
    </span>
  )
}

export default LoggedInHomeLink
