import { useQuery } from '@apollo/react-hooks'
import Emoji from 'a11y-react-emoji'
import gql from 'graphql-tag'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Footer from './common/Footer'
import NextOption from './common/NextSteps/NextOption'
import './Home.css'
import ResponsiveContainer from './layout/ResponsiveContainer'
import { useCookies } from 'react-cookie'

function Home(props) {
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_USER)
  const [cookies] = useCookies(['isLoggedIn'])

  return (
    <ResponsiveContainer>
      <div id="home" style={{ textAlign: 'center' }}>
        <h1>
          Welcome{!loading && !error && data.user ? ` ${data.user.name}` : ''}!
        </h1>
        <div className="content">
          {cookies.isLoggedIn ? (
            <div className="create-profile-prompt">
              <p>
                To get started create a profile that you can share with others
                and embed in your personal site.
              </p>
              <NextOption
                className="continue"
                label="Create a profile"
                onClick={() => history.push('/person/create')}
              />
            </div>
          ) : (
            <p>
              Once you <a href="/">login</a> we&apos;ll show your stuff here{' '}
              <Emoji symbol="🙂" label="slightly smiling face" />
            </p>
          )}
        </div>
      </div>
      <Footer />
    </ResponsiveContainer>
  )
}

export const GET_USER = gql`
  query GetUser {
    user {
      email
      image
      name
    }
  }
`

export default Home
