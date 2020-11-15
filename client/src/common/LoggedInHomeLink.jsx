import PropTypes from 'prop-types'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Image from '../Person/Image'
import UnderlineButton from './buttons/UnderlineButton'
import './LoggedInHomeLink.css'

LoggedInHomeLink.propTypes = {
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired
}

function LoggedInHomeLink(props) {
  const history = useHistory()

  return (
    <span id="user-home">
      <Link to="/home">
        <Image src={props.user.image} />
      </Link>
      <UnderlineButton
        id="signout"
        onClick={async () => {
          await fetch('/logout', { method: 'POST' })
          await props.refetch()
          history.push('/')
        }}
        style={{ color: 'hsl(0, 100%, 68%)' }}
      >
        Sign out
      </UnderlineButton>
    </span>
  )
}

export default LoggedInHomeLink
