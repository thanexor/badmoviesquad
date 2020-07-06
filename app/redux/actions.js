export const LOGIN = "LOGIN"
export function loginAs({displayName, email}) {
  return {
    type: LOGIN,
    displayName,
    email,
  }
}

export const LOGOUT = "LOGOUT"
export function logout() {
  return {
    type: LOGOUT,
  }
}