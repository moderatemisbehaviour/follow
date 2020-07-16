function getCookie(name) {
  const matchingCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(name))

  if (matchingCookie) {
    const cookieValue = matchingCookie.split('=')[1]
    return cookieValue
  }

  return null
}

export default getCookie
