import React from 'react'
import PropTypes from 'prop-types'

import './Profile.css'

Profile.propTypes = {
  id: PropTypes.number.isRequired,
  platform: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

function Profile (props) {
  const { platform, url } = props
  return (
    <span className='Profile'>
      <a href={url}>{platform}</a>
    </span>
  )
}

export default Profile
