import PropTypes from 'prop-types'
import React from 'react'

CharacterInACircle.propTypes = {
  character: PropTypes.string,
  fill: PropTypes.string
}

CharacterInACircle.defaultProps = {
  character: '?',
  fill: 'black'
}

function CharacterInACircle(props) {
  return (
    <svg viewBox="0 0 100 100" height="100%">
      <circle cx="50" cy="50" r="50" fill={props.fill} />
      <text
        x="50"
        y="55"
        fill="white"
        fontSize="70"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {props.character}
      </text>
    </svg>
  )
}

export default CharacterInACircle
