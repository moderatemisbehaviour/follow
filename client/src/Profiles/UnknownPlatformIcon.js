import * as Vibrant from 'node-vibrant'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import CharacterInACircle from '../common/CharacterInACircle'
import usePlatformName from './usePlatformName'

UnknownPlatformIcon.propTypes = {
  url: PropTypes.object.isRequired
}

function UnknownPlatformIcon(props) {
  const platformName = usePlatformName(props.url)
  const [iconColour, setIconColour] = useState()

  useEffect(() => {
    Vibrant.from(`http://logo.clearbit.com/${props.url.hostname}`)
      .getPalette()
      .then(palette => {
        const swatch =
          palette.DarkVibrant ||
          palette.DarkMuted ||
          palette.Vibrant ||
          palette.Muted
        const colour = swatch ? swatch.getHex() : 'black'
        setIconColour(colour)
      })
  })

  return (
    <CharacterInACircle character={platformName.charAt(0)} fill={iconColour} />
  )
}

export default UnknownPlatformIcon
