export const UPDATE_TOKEN = (state, token) => {
  state.token = token
  let expires = new Date().getTime() + token.expires_in * 1000
  state.token.expires_in = expires
}
export const UPDATE_AUTH = (state, auth) => {
  state.auth = auth
}
export const UPDATE_USER = (state, user) => {
  state.user = user
}
export const LOGOUT = (state) => {
  state.token.access_token = '',
  state.token.refresh_token = '',
  state.token.expires_in = null,
  state.token.token_type = '',
  state.auth.isLoggedIn = false
}
