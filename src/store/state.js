
const initialState = {
  'version': '0.1.0',
  'auth': {
    'isLoggedIn': false
  },
  'user': {
    'username': null,
    'email': null,
    'id': null
  },

  'token': {
    'access_token': '',
    'refresh_token': '',
    'expires_in': null,
    'token_type': ''
  }
}

export const state = initialState
