import React, { useEffect } from 'react'
import Announcement from './common/Announcement'
import logo from './common/icons/logo.png'
import Image from './Person/Image'
import Name from './Person/Name'
import './Person/Person.css'

function Home() {
  useEffect(() => {
    document.title = 'Follow people, not platforms'
  })

  return (
    <div className="person">
      <Name name="Follow people, not platforms" />
      <Image src={logo} />
      <Announcement />
    </div>
  )
}

export default Home
