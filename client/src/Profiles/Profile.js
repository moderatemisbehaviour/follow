import PropTypes from 'prop-types'
import React from 'react'
import InvalidProfile from './InvalidProfile'
import ValidProfile from './ValidProfile'

Profile.propTypes = {
  url: PropTypes.string.isRequired
}

function Profile(props) {
  let validUrl = null

  try {
    validUrl = new URL(props.url)
  } catch (e) {}

  return validUrl ? <ValidProfile url={validUrl} /> : <InvalidProfile />
}

export default Profile
