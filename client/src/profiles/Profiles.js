import React from 'react'
import PropTypes from 'prop-types'

import './Profiles.css'
import Profile from './Profile'

Profiles.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }))
}

const placeholderProfiles = [
  {
    id: 1,
    platform: 'PLACEHOLDER',
    url: 'http://example.com'
  },
  {
    id: 2,
    platform: 'PLACEHOLDER',
    url: 'http://example.com'
  },
  {
    id: 3,
    platform: 'PLACEHOLDER',
    url: 'http://example.com'
  }
]

Profiles.defaultProps = {
  profiles: placeholderProfiles
}

function Profiles (props) {
  const { profiles } = props
  return (
    <div className={`profiles ${profiles === placeholderProfiles && 'placeholder'}`}>
      {profiles.map(({ id, platform, url }) => (
        <Profile key={id} platform={platform} url={url}/>
      ))}
    </div>
  )
}

export default Profiles
