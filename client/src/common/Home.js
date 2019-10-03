import React from 'react'

import Image from '../Person/Image'
import logo from '../common/icons/logo.png'
import Announcement from './Announcement'
import Name from '../Person/Name'

import '../App.css'
import '../Person/Person.css'

function Home() {
  return (
    <div className="person">
      <Name name="Follow people, not platforms" />
      <Image src={logo} />
      <Announcement />
    </div>
  )
}

export default Home
