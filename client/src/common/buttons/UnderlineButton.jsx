import PropTypes from 'prop-types'
import React from 'react'
import './UnderlineButton.css'

UnderlineButton.propTypes = {
  children: PropTypes.node
}

function UnderlineButton(props) {
  const { children, ...otherProps } = props
  return (
    <button className="underline-button" {...otherProps}>
      {props.children}
    </button>
  )
}

export default UnderlineButton
