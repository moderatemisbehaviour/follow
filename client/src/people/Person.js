import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../avatar/Avatar'
import Name from './Name'
import Profiles from '../profiles/Profiles'
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
    <React.Fragment>
      <Name name={name || undefined}/>
      <Avatar src={photo}/>
      <Profiles profiles={profiles || undefined}/>
    </React.Fragment>
  )
}

export default Person
