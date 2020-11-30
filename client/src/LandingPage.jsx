import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom'
import Announcement from './common/Announcement'
import logo from './common/icons/logo.png'
import Omnibox from './common/Omnibox'
import CommandResults from './common/Omnibox/CommandResults'
import useUser from './common/useUser'
import Image from './Person/Image'
import Name from './Person/Name'
import './Person/Person.css'
import PersonResults from './Person/PersonResults'

const responseGoogle = response => {
  console.error(response)
}

function LandingPage(props) {
  useEffect(() => {
    document.title = 'Follow people, not platforms'
  })
  const history = useHistory()
  const [, refetch] = useUser()

  return (
    <React.Fragment>
      <div className="person">
        <Name name="Follow people, not platforms" />
        <Image src={logo} />
        <Announcement />
      </div>
      <Omnibox
        getResultsComponent={query =>
          query.startsWith('/') ? CommandResults : PersonResults
        }
      />
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        onSuccess={async googleUser => {
          await fetch('/login', {
            body: JSON.stringify({ idToken: googleUser.tokenId }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
          })

          // Reset cache so that newly created user is picked up when we arrive on the home page.
          await refetch()

          history.push('/home')
        }}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </React.Fragment>
  )
}

export default LandingPage
