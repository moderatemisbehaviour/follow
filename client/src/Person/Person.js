import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import Profiles from '../Profiles/Profiles'
import Name from './Name'

import '../App.css'
import './Person.css'

Person.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  profiles: PropTypes.arrayOf(PropTypes.string.isRequired)
}

function Person(props) {
  const { name, image, profiles } = props

  return (
    <div className="person">
      <Name name={name || undefined} />
      <Image src={image} />
      {profiles && <Profiles profiles={profiles} />}
    </div>
  )
}

export default Person
