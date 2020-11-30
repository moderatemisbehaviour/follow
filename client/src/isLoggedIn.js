import getCookie from './getCookie'

function isLoggedIn() {
  return getCookie('isLoggedIn')
}

export default isLoggedIn
