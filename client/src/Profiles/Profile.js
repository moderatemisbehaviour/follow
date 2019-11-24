import React from 'react'
import PropTypes from 'prop-types'

import twitterLogo from '../common/icons/twitter.svg'
import youtubeLogo from '../common/icons/youtube.png'
import facebookLogo from '../common/icons/facebook.svg'
import placeholderProfileIcon from './placeholderProfileIcon.svg'
import UnknownPlatformIcon from './UnknownPlatformIcon'

Profile.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired
}

const websiteToPlatformIconMap = {
  twitter: twitterLogo,
  youtube: youtubeLogo,
  facebook: facebookLogo
}

function Profile(props) {
  const { className, url: userInputUrl } = props

  let platformIconClassName
  let platformIconUrl
  let url
  let websiteName
  if (!userInputUrl) {
    platformIconUrl = placeholderProfileIcon
    platformIconClassName = 'platform-icon placeholder'
  } else {
    try {
      url = new URL(userInputUrl)
      const hostnameParts = url.hostname.split('.')

      const websiteNameIndex =
        hostnameParts.length >= 2 ? hostnameParts.length - 2 : 0
      websiteName = hostnameParts[websiteNameIndex]

      const knownPlatform = websiteName in websiteToPlatformIconMap
      if (knownPlatform) {
        platformIconUrl = websiteToPlatformIconMap[websiteName]
      }

      platformIconClassName = `platform-icon ${
        knownPlatform ? 'known' : 'unknown'
      }`
    } catch (e) {
      platformIconClassName = 'platform-icon unknown invalid'
    }
  }

  return (
    <div className={`profile ${className}`}>
      <a href={url ? url.href : 'http://www.example.com'}>
        {platformIconUrl && (
          <img
            className={platformIconClassName}
            src={platformIconUrl}
            alt="platform icon"
          />
        )}
        {!platformIconUrl && (
          <UnknownPlatformIcon className={platformIconClassName}>
            {url ? websiteName.charAt(0) : '?'}
          </UnknownPlatformIcon>
        )}
      </a>
    </div>
  )
}

export default Profile
