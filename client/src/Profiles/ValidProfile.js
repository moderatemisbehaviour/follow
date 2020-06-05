import PropTypes from 'prop-types'
import React from 'react'
import MailIcon from '../common/MailIcon'
import PlatformIcon from './PlatformIcon'
import usePlatformName from './usePlatformName'

ValidProfile.propTypes = {
  url: PropTypes.object.isRequired
}

function ValidProfile(props) {
  const platformName = usePlatformName(props.url)
  const email = props.url.protocol === 'mailto:'

  return (
    <div className="profile" title={props.url.href}>
      <a
        href={props.url.href}
        onClick={trackAction(props.url.href, platformName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {email ? <MailIcon /> : <PlatformIcon url={props.url} />}
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

export default ValidProfile
