import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../avatar/Avatar'
import logo from '../logo.png'
import Profiles from '../profiles/Profiles'
import Search from '../search/Search'
import '../app/App.css'

PeopleContent.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  profiles: PropTypes.arrayOf(PropTypes.shape({}))
}

PeopleContent.defaultProps = {
  name: 'Follow people, not platforms',
  photo: logo,
  profiles: []
}

function PeopleContent (props) {
  const { name, photo, profiles } = props

  return <div>
    <header className="App-header">
      <h1 className="App-name">{name}</h1>
    </header>
    <Avatar src={photo}/>
    <Profiles profiles={profiles}/>
    <Search/>
  </div>
}

export default PeopleContent
