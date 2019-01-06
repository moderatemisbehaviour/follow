import React from 'react'
import PropTypes from 'prop-types'

import './Profiles.css'
import Profile from './Profile'

Profiles.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired
}

function Profiles (props) {
  const { profiles } = props
  return (
    <div className='Profiles'>
      {profiles.map(({ id, platform, url }) => (
        <Profile key={id} platform={platform} url={url}/>
      ))}
    </div>
  )
}

export default Profiles
