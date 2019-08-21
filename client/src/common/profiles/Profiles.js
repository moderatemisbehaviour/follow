import React from 'react'
import PropTypes from 'prop-types'

import './Profiles.css'
import Profile from './Profile'

Profiles.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.string.isRequired)
}

Profiles.defaultProps = {
  profiles: []
}

function Profiles (props) {
  const { profiles } = props
  return (
    <div className="profiles">
      {profiles.map((url, index) => {
        const profileId = `profile-${index}`
        return <Profile key={profileId} id={profileId} url={url}/>
      })}
    </div>
  )
}

export default Profiles
