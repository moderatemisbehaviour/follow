import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../avatar/Avatar'
import Profiles from '../common/profiles/Profiles'
import Name from './Name'

import '../app/App.css'
import './Person.css'

Person.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  profiles: PropTypes.arrayOf(PropTypes.string.isRequired)
}

function Person (props) {
  const { name, photo, profiles } = props

  return (
    <div className="person">
      <Name name={name || undefined}/>
      <Avatar src={photo}/>
      {profiles && <Profiles profiles={profiles}/>}
    </div>
  )
}

export default Person
