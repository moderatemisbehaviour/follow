import PropTypes from 'prop-types'
import React from 'react'
import Profile from './Profile'
import './Profiles.css'

Profiles.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.string.isRequired),
  renderLinks: PropTypes.bool
}

Profiles.defaultProps = {
  profiles: [],
  renderLinks: true
}

function Profiles(props) {
  const { profiles } = props
  return (
    <div className="profiles">
      {profiles.map((url, index) => (
        <Profile
          key={`profile-${index}`}
          className={`profile-${index}`}
          renderLinks={props.renderLinks}
          url={url}
        />
      ))}
    </div>
  )
}

export default Profiles
