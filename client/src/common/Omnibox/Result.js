import PropTypes from 'prop-types'
import React from 'react'

const Result = React.forwardRef((props, ref) => {
  return (
    <li
      className="result"
      ref={ref}
      tabIndex={props.tabbable ? 0 : null}
      data-id={props.id}
    >
      {props.children}
    </li>
  )
})

Result.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  tabbable: PropTypes.bool
}

Result.defaultProps = {
  tabbable: true
}

export default Result
