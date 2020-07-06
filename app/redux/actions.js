const LOGIN = "LOGIN"
export function loginAs(user) {
  return {
    type: LOGIN,
    user,
  }
}

const LOGOUT = "LOGOUT"
export function logout() {
  return {
    type: LOGOUT,
  }
}