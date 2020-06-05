import React from 'react'
import CharacterInACircle from '../common/CharacterInACircle'

function InvalidProfile(props) {
  return (
    <div className="profile invalid">
      <CharacterInACircle character="?" />
    </div>
  )
}

export default InvalidProfile
