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
    let isMounted = true

    Vibrant.from(`http://logo.clearbit.com/${props.url.hostname}`)
      .getPalette()
      .then(palette => {
        const swatch =
          palette.DarkVibrant ||
          palette.DarkMuted ||
          palette.Vibrant ||
          palette.Muted
        const colour = swatch ? swatch.getHex() : 'black'
        if (isMounted) setIconColour(colour)
        return null // Necessary to avoid warning logged by Vibrant.
      })
      .catch(() =>
        console.debug(
          `Unable to determine an icon colour for ${props.url}. This is most likely caused by Clearbit returning a 404 for http://logo.clearbit.com/${props.url.hostname}.`
        )
      )

    return () => (isMounted = false)
  }) // TODO: Fix horrible isMounted pattern

  return (
    <CharacterInACircle character={platformName.charAt(0)} fill={iconColour} />
  )
}

export default UnknownPlatformIcon
