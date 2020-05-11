import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Profiles from '../Profiles/Profiles'
import Image from './Image'
import Name from './Name'
import './Person.css'

Person.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  profiles: PropTypes.arrayOf(PropTypes.string.isRequired),
  style: PropTypes.object
}

Person.defaultProps = {
  stlye: {}
}

function Person(props) {
  const { name, image, profiles } = props
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.match(/person\/[\d\w]{24}$/)) {
      document.title = name
    }
  })

  return (
    <div className="person" style={props.style}>
      <Name name={name || undefined} />
      <Image src={image} />
      {profiles && <Profiles profiles={profiles} />}
    </div>
  )
}

export default Person
