import React from 'react'

import Avatar from '../avatar/Avatar'
import logo from '../common/logo.png'
import Announcement from '../common/Announcement'
import Name from '../people/Name'

import '../app/App.css'
import '../people/Person.css'

function Home() {
  return (
    <div className="person">
      <Name name="Follow people, not platforms" />
      <Avatar src={logo} />
      <Announcement />
    </div>
  )
}

export default Home
