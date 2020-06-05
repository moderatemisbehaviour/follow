import PropTypes from 'prop-types'
import React from 'react'
import KnownPlatformIcon from './KnownPlatformIcon'
import UnknownPlatformIcon from './UnknownPlatformIcon'
import usePlatformName from './usePlatformName'

PlatformIcon.propTypes = {
  url: PropTypes.object
}

function PlatformIcon(props) {
  const platformName = usePlatformName(props.url)
  const knownPlatform = knownPlatforms.includes(platformName)

  return knownPlatform ? (
    <KnownPlatformIcon url={props.url} />
  ) : (
    <UnknownPlatformIcon url={props.url} />
  )
}

const knownPlatforms = [
  'twitter',
  'youtube',
  'facebook',
  'instagram',
  'github',
  'linkedin'
]

export default PlatformIcon
