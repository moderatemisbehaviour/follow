import PropTypes from 'prop-types'
import React from 'react'
import facebookLogo from '../common/icons/facebook.svg'
import githubLogo from '../common/icons/github.svg'
import instagramLogo from '../common/icons/instagram.svg'
import linkedinLogo from '../common/icons/linkedin.svg'
import twitterLogo from '../common/icons/twitter.svg'
import youtubeLogo from '../common/icons/youtube.png'

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
  facebook: facebookLogo,
  instagram: instagramLogo,
  github: githubLogo,
  linkedin: linkedinLogo
}

export default KnownPlatformIcon
