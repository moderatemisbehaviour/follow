import PropTypes from 'prop-types'
import React from 'react'
import KnownPlatformIcon from './KnownPlatformIcon'
import UnknownPlatformIcon from './UnknownPlatformIcon'

PlatformIcon.propTypes = {
  platformName: PropTypes.string
}

function PlatformIcon(props) {
  const { platformName } = props
  const knownPlatform = knownPlatforms.includes(platformName)
  return knownPlatform ? (
    <KnownPlatformIcon platformName={platformName} />
  ) : (
    <UnknownPlatformIcon platformName={platformName} />
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
