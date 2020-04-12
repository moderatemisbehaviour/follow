import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Person from './Person'

PersonList.propTypes = {
  currentlySelectedIndex: PropTypes.number,
  onKeyUp: PropTypes.func,
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  refs: PropTypes.arrayOf(PropTypes.object)
}

PersonList.defaultProps = {
  currentlySelectedIndex: null
}

function PersonList(props) {
  useEffect(() => {
    if (props.currentlySelectedIndex !== null)
      props.refs[props.currentlySelectedIndex].current.focus()
  })

  return (
    <ul onKeyUp={props.onKeyUp}>
      {props.people.map((person, index) => (
        <Link
          className="search-result"
          data-id={person.id}
          key={person.id}
          ref={props.refs[index]}
          tabIndex={0}
          to={`/person/${person.id}`}
        >
          <li>
            <Person {...person} />
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default PersonList
