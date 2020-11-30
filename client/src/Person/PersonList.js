import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Result from '../common/Omnibox/Result'
import Person from './Person'

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  refs: PropTypes.arrayOf(PropTypes.object)
}

function PersonList(props) {
  return (
    <ol>
      {props.people.map((person, index) => (
        <Result id={person.id} key={person.id}>
          <Link
            to={`/person/${person.id}`}
            ref={props.refs ? props.refs[index] : undefined}
          >
            <Person {...person} renderLinks={false} />
          </Link>
        </Result>
      ))}
    </ol>
  )
}

export default PersonList
