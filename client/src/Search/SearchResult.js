import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = React.forwardRef((props, ref) => {
  return (
    <Link
      className="search-result"
      ref={ref}
      tabIndex={0}
      to={`/person/${props.id}`}
    >
      <li>{props.children}</li>
    </Link>
  )
})

SearchResult.propTypes = {
  children: PropTypes.shape({}),
  id: PropTypes.string.isRequired
}

export default SearchResult
