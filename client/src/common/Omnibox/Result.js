import PropTypes from 'prop-types'
import React from 'react'

// eslint-disable-next-line react/display-name
const Result = React.forwardRef((props, ref) => {
  return (
    <li className="result" ref={ref} data-id={props.id}>
      {props.children}
    </li>
  )
})

Result.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string
}

export default Result
