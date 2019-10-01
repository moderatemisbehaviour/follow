import React from 'react'
import PropTypes from 'prop-types'

import HomeLink from './HomeLink'

Footer.propTypes = {
  location: PropTypes.shape().isRequired
}

function Footer(props) {
  return props.location.pathname === '/' ? null : <HomeLink />
}

export default Footer
