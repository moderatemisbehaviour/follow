import React from 'react'
import PropTypes from 'prop-types'

import './Profile.css'
import twitterLogo from '../common/twitter.svg'
import youtubeLogo from '../common/youtube.png'
import facebookLogo from '../common/facebook.svg'
import placeholderProfileIcon from './placeholderProfileIcon.svg'

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

function Profile (props) {
  const {id, url: userInputUrl} = props

  let url
  let platformIconUrl
  if (!userInputUrl) {
    platformIconUrl = placeholderProfileIcon
  } else {
    try {
      url = new URL(userInputUrl)
      const hostname = url.hostname.toUpperCase()

      if (hostname === 'TWITTER') platformIconUrl = twitterLogo
      else if (hostname === 'YOUTUBE') platformIconUrl = youtubeLogo
      else if (hostname === 'FACEBOOK') platformIconUrl = facebookLogo
    } catch (e) {}
  }

  return (
    <span className='Profile' id={id}>
      <a href={url ? url.href : 'www.example.com'}>
        {platformIconUrl &&
          <img src={platformIconUrl} alt="platform icon" />
        }
        {!platformIconUrl &&
          <span>{userInputUrl.charAt(0)}</span>
        }
      </a>
    </span>
  )
}

export default Profile
