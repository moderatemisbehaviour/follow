import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Result from '../common/Omnibox/Result'
import Person from './Person'

PersonList.propTypes = {
  currentlySelectedIndex: PropTypes.number,
  onKeyUp: PropTypes.func,
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  refs: PropTypes.arrayOf(PropTypes.object)
}

function PersonList(props) {
  useEffect(() => {
    if (props.currentlySelectedIndex !== null)
      props.refs[props.currentlySelectedIndex].current.focus()
  })

  return (
    <ul onKeyUp={props.onKeyUp}>
      {props.people.map((person, index) => (
        <Result id={person.id} key={person.id} ref={props.refs[index]}>
          <Link to={`/person/${person.id}`}>
            <Person {...person} />
          </Link>
        </Result>
      ))}
    </ul>
  )
}

export default PersonList
