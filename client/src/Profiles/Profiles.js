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

function Profiles(props) {
  const { profiles } = props
  return (
    <div className="profiles">
      {profiles.map((url, index) => (
        <Profile
          key={`profile-${index}`}
          className={`profile-${index}`}
          url={url}
        />
      ))}
    </div>
  )
}

export default Profiles
