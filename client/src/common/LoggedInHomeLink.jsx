import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import Image from '../Person/Image'
import UnderlineButton from './buttons/UnderlineButton'
import './LoggedInHomeLink.css'

function LoggedInHomeLink() {
  const { loading, error, data } = useQuery(GET_USER_IMAGE)
  const [, , removeCookies] = useCookies(['isLoggedIn'])

  if (loading) {
    return <p>LOADING!</p>
  }
  if (error) {
    return <p>ERROR!</p>
  }

  return (
    <span id="user-home">
      <Link to="/home">
        <Image src={data.user.image} />
      </Link>
      <UnderlineButton
        id="signout"
        onClick={() => {
          removeCookies('isLoggedIn')
          fetch('/logout', { method: 'POST' })
        }}
        style={{ color: 'hsl(0, 100%, 68%)' }}
      >
        Sign out
      </UnderlineButton>
    </span>
  )
}

export const GET_USER_IMAGE = gql`
  query GetUser {
    user {
      image
    }
  }
`

export default LoggedInHomeLink
