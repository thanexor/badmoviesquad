export const getUser = state => state.loggedInAs
export const isLoggedIn = state => getUser(state) !== null