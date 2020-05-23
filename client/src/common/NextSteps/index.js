import PropTypes from 'prop-types'
import React from 'react'
import NextOption from './NextOption'
import './NextSteps.css'

NextSteps.propTypes = {
  className: PropTypes.string,
  invalid: PropTypes.bool,
  invalidMessage: PropTypes.string,
  message: PropTypes.string,
  nextOptions: PropTypes.array
}

function NextSteps(props) {
  return (
    <div className={`next-steps ${props.invalid ? 'invalid' : ''}`}>
      <span className="message">
        {props.invalid ? props.invalidMessage : props.message}
      </span>
      <div>
        {props.nextOptions.map((rowOfNextOptions, index) => (
          <div key={index}>
            {rowOfNextOptions.map(nextOption => (
              <NextOption
                key={nextOption.id}
                {...nextOption}
                className={`${nextOption.className} ${
                  index === 0 ? 'primary' : 'secondary'
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

NextSteps.propTypes = {
  onClick: PropTypes.func
}

export default NextSteps
