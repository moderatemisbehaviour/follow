import PropTypes from 'prop-types'
import React from 'react'

import './NextSteps.css'

function NextSteps (props) {
  return (
    <div className="NextSteps">
      <span>Then press enter or click</span>
      <div>
        <input className="next" onClick={props.onClick} type="button" value="Next"/>
      </div>
    </div>
  )
}

NextSteps.propTypes = {
  onClick: PropTypes.func
}

export default NextSteps
