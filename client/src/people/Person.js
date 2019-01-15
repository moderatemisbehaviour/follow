import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../avatar/Avatar'
import logo from '../logo.png'
import Profiles from '../profiles/Profiles'
import '../app/App.css'
import './Person.css'

Person.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  profiles: PropTypes.arrayOf(PropTypes.shape({}))
}

Person.defaultProps = {
  name: 'Follow people, not platforms',
  photo: logo,
  profiles: []
}

function Person (props) {
  const { name, photo, profiles } = props

  return <div>
    <h1 className={`name ${props.className}`}>{name}</h1>
    <Avatar src={photo}/>
    <Profiles profiles={profiles}/>
  </div>
}

export default Person
