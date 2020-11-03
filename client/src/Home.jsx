import { useQuery } from '@apollo/react-hooks'
import Emoji from 'a11y-react-emoji'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Footer from './common/Footer'
import NextOption from './common/NextSteps/NextOption'
import useUser from './common/useUser'
import './Home.css'
import ResponsiveContainer from './layout/ResponsiveContainer'
import PersonList from './Person/PersonList'
import { GET_PEOPLE } from './Person/queries'

function Home() {
  const user = useUser()

  return (
    <ResponsiveContainer>
      <div id="home" style={{ textAlign: 'center' }}>
        {user ? (
          <UserContent user={user} />
        ) : (
          <p>
            Once you <a href="/">login</a> we&apos;ll show your stuff here{' '}
            <Emoji symbol="🙂" label="slightly smiling face" />
          </p>
        )}
      </div>
      <Footer />
    </ResponsiveContainer>
  )
}

UserContent.propTypes = {
  user: PropTypes.object.isRequired
}

function UserContent(props) {
  return (
    <>
      <h1>Welcome {props.user.name}!</h1>
      <div className="content">
        <CreatedProfiles user={props.user} />
      </div>
    </>
  )
}

CreatedProfiles.propTypes = {
  user: PropTypes.object.isRequired
}

function CreatedProfiles(props) {
  const history = useHistory()

  const getPeopleResult = useQuery(GET_PEOPLE, {
    variables: {
      query: `creator: ${props.user.id}`
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
        <>
          <div className="create-profile-prompt">
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
          <div className="created-profiles">
            <h2>Created profiles</h2>
            <PersonList people={getPeopleResult.data.people} />
          </div>
        </>
      )}
    </>
  )
}

export default Home
