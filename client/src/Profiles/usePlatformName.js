import { useMemo } from 'react'

function usePlatformName(url) {
  return useMemo(() => {
    const hostnameParts = url.hostname.split('.')
    const platformNameIndex =
      hostnameParts.length >= 2 ? hostnameParts.length - 2 : 0
    const platformName = hostnameParts[platformNameIndex]
    return platformName
  }, [url])
}

export default usePlatformName
