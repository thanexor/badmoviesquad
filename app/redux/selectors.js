export const getUserEmail = state => state.loggedInEmail
export const getUsername = state => state.username
export const isLoggedIn = state => getUserEmail(state) !== null