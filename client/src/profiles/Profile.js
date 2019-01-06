import React from 'react'
import PropTypes from 'prop-types'

import './Profile.css'
import twitterLogo from '../twitter.svg'
import youtubeLogo from '../youtube.png'
import facebookLogo from '../facebook.svg'

Profile.propTypes = {
  id: PropTypes.number.isRequired,
  platform: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

function Profile (props) {
  const { platform, url } = props

  let platformIconUrl
  if (platform === 'TWITTER') platformIconUrl = twitterLogo
  else if (platform === 'YOUTUBE') platformIconUrl = youtubeLogo
  else if (platform === 'FACEBOOK') platformIconUrl = facebookLogo

  return (
    <span className='Profile' id={platform.toLowerCase()}>
      <a href={url}>
        <img src={platformIconUrl} alt="platform icon" />
      </a>
    </span>
  )
}

export default Profile
