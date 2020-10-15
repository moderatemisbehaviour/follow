import { useQuery } from '@apollo/react-hooks'
import Emoji from 'a11y-react-emoji'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import Footer from './common/Footer'
import NextOption from './common/NextSteps/NextOption'
import './Home.css'
import ResponsiveContainer from './layout/ResponsiveContainer'
import PersonList from './Person/PersonList'
import { GET_PEOPLE } from './Person/queries'

function Home(props) {
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
            <CreatedProfiles user={!loading && !error && data.user} />
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

CreatedProfiles.propTypes = {
  user: PropTypes.object.isRequired
}

function CreatedProfiles(props) {
  const history = useHistory()

  const getPeopleResult = useQuery(GET_PEOPLE, {
    variables: {
      query: 'creator: fakeUserId'
    },
    fetchPolicy: 'cache-and-network'
  })

  return (
    <>
      {getPeopleResult.loading ? (
        <div>Loading results...</div>
      ) : getPeopleResult.error ? (
        <div>Error getting results :(</div>
      ) : !getPeopleResult.data.people.length ? (
        <div className="create-profile-prompt">
          <p>
            To get started create a profile that you can share with others and
            embed in your personal site.
          </p>
          <NextOption
            className="continue"
            label="Create a profile"
            onClick={() =>
              history.push(
                `/person/create?name=${props.user.name}&image=${props.user.image}&profile=mailto:${props.user.email}`
              )
            }
          />
        </div>
      ) : (
        <div className="created-profiles">
          <PersonList people={getPeopleResult.data.people} />
        </div>
      )}
    </>
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
