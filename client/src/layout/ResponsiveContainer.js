import PropTypes from 'prop-types'
import React from 'react'
import './ResponsiveContainer.css'

ResponseContainer.propTypes = {
  children: PropTypes.array
}

function ResponseContainer(props) {
  return <div className="responsive-container">{props.children}</div>
}

export default ResponseContainer
