import React from 'react'
import PropTypes from 'prop-types'

import './Profile.css'
import twitterLogo from '../common/twitter.svg'
import youtubeLogo from '../common/youtube.png'
import facebookLogo from '../common/facebook.svg'
import placeholderProfileIcon from './placeholderProfileIcon.svg'
import UnknownPlatformIcon from './UnknownPlatformIcon'

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

const websiteToPlatformIconMap = {
  'twitter': twitterLogo,
  'youtube': youtubeLogo,
  'facebook': facebookLogo
}

function Profile (props) {
  const {id, url: userInputUrl} = props

  let className
  let platformIconUrl
  let url
  let websiteName
  if (!userInputUrl) {
    platformIconUrl = placeholderProfileIcon
    className = 'platform-icon placeholder'
  } else {
    try {
      url = new URL(userInputUrl)
      const hostnameParts = url.hostname.split('.')

      const websiteNameIndex = hostnameParts.length >= 2 ? hostnameParts.length - 2 : 0
      websiteName = hostnameParts[websiteNameIndex]

      const knownPlatform = websiteName in websiteToPlatformIconMap
      if (knownPlatform) {
        platformIconUrl = websiteToPlatformIconMap[websiteName]
      }

      className = `platform-icon ${knownPlatform ? 'known' : 'unknown'}`
    } catch (e) {
      className = 'platform-icon unknown invalid'
    }
  }

  return (
    <div className='Profile' id={id}>
      <a href={url ? url.href : 'www.example.com'}>
        {platformIconUrl &&
          <img className={className} src={platformIconUrl} alt="platform icon" />
        }
        {!platformIconUrl &&
          <UnknownPlatformIcon className={className}>
            {url ? websiteName.charAt(0) : '?'}
          </UnknownPlatformIcon>
        }
      </a>
    </div>
  )
}

export default Profile
