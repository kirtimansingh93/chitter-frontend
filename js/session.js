function logOut() {
  sessionStorage.clear()
  location.reload()
}

function sessionKey() {
  return sessionStorage.getItem('session_key')
}