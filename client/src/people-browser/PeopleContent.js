import React from 'react'

import Avatar from '../avatar/Avatar'
import Search from '../search/Search'
import '../app/App.css'

function PeopleContent (props) {
  const { title, photo } = props

  return <div>
    <header className="App-header">
      <h1 className="App-title">{title}</h1>
    </header>
    <Avatar src={photo} />
    <Search/>
  </div>
}

export default PeopleContent
