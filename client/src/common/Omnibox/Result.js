import PropTypes from 'prop-types'
import React from 'react'

const Result = React.forwardRef((props, ref) => {
  return (
    <li className="result" ref={ref} tabIndex={0} data-id={props.id}>
      {props.children}
    </li>
  )
})

Result.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string
}

export default Result
