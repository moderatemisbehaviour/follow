import PropTypes from 'prop-types'
import React from 'react'
import InvalidProfile from './InvalidProfile'
import ValidProfile from './ValidProfile'

Profile.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired
}

function Profile(props) {
  let validUrl = null

  try {
    validUrl = new URL(props.url)
  } catch (e) {}

  return (
    <div
      className={`profile${props.className ? ` ${props.className}` : ''}`}
      title={props.url}
    >
      {validUrl ? (
        <ValidProfile className={props.className} url={validUrl} />
      ) : (
        <InvalidProfile />
      )}
    </div>
  )
}

export default Profile
