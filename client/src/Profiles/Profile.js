import PropTypes from 'prop-types'
import React from 'react'
import PlatformIcon from './PlatformIcon'

Profile.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired
}

Profile.defaultProps = {
  className: ''
}

function Profile(props) {
  const { className, url } = props

  let platformName = null
  let invalid = false

  try {
    // eslint-disable-next-line no-new
    const hostnameParts = new URL(url).hostname.split('.')
    const platformNameIndex =
      hostnameParts.length >= 2 ? hostnameParts.length - 2 : 0
    platformName = hostnameParts[platformNameIndex]
  } catch (e) {
    invalid = true
  }

  return (
    <div
      className={`profile${invalid ? ' invalid' : ''} ${className}`}
      title={url}
    >
      <a
        href={url}
        onClick={trackAction(url, platformName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlatformIcon platformName={platformName} />
      </a>
    </div>
  )
}

function trackAction(url, platformName) {
  return () => {
    window.analytics.track('Clicked profile', {
      url,
      platformName
    })
  }
}

export default Profile
