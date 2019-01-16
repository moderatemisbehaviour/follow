import React from 'react'

import './NextSteps.css'

function NextSteps (props) {
  return (
    <div className="NextSteps">
      <span>Then press enter or click</span>
      <div>
        <button onClick={props.onClick}>next</button>
      </div>
    </div>
  )
}

export default NextSteps
