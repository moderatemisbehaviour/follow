import PropTypes from 'prop-types'
import React from 'react'

import './NextSteps.css'

NextSteps.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidMessage: PropTypes.string,
  message: PropTypes.string
}

function NextSteps (props) {
  return (
    <div className={`next-steps ${props.invalid ? 'invalid' : ''}`}>
      <span className='message'>{props.invalid ? props.invalidMessage : props.message}</span>
      <div>
        {props.children}
      </div>
    </div>
  )
}

NextSteps.propTypes = {
  onClick: PropTypes.func
}

export default NextSteps
