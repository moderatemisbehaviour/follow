import PropTypes from 'prop-types'
import React from 'react'

import twitterLogo from '../common/icons/twitter.svg'
import youtubeLogo from '../common/icons/youtube.png'
import facebookLogo from '../common/icons/facebook.svg'

KnownPlatformIcon.propTypes = {
  platformName: PropTypes.string.isRequired,
  url: PropTypes.string
}

function KnownPlatformIcon(props) {
  const platformIconUrl = nameToIconMap[props.platformName]
  return <img src={platformIconUrl} alt="platform icon" />
}

const nameToIconMap = {
  twitter: twitterLogo,
  youtube: youtubeLogo,
  facebook: facebookLogo
}

export default KnownPlatformIcon
