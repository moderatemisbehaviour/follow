import PropTypes from 'prop-types'
import React from 'react'

import './NextSteps.css'

NextSteps.propTypes = {
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  message: PropTypes.string
}

NextSteps.defaultProps = {
  message: 'Select next to continue adding information then press save to complete! You can also easily make more changes later.'
}

function NextSteps (props) {
  return (
    <div className={`next-steps ${props.invalid ? 'invalid' : ''}`}>
      <span className='message'>{props.message}</span>
      <div>
        <input className="next border-style" disabled={props.disabled} id="next" onClick={props.onClick} type="button" value="Next"/>
      </div>
    </div>
  )
}

NextSteps.propTypes = {
  onClick: PropTypes.func
}

export default NextSteps
