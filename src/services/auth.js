import rp from 'request-promise'
import Vue from 'vue'
import store from '../store'

// URL and endpoint constants
const API_URL = 'https://api.test.simplex.ink/app_dev.php/'
const client_id = '1_1fwfg4mreq680s0404s8g8ggkgkkgoc08skow044o08cwckc4o'
const client_secret = '3kz917qhoo6ccw8ogg8og0k8k4kw80skokg8scsco88k8wk4wk'

export var Register = (email, username, password1, password2) => {
  var formData = new FormData()
  formData.append('email', email)
  formData.append('username', username)
  formData.append('plainPassword[first]', password1)
  formData.append('plainPassword[second]', password2)
  return Vue.http.post(API_URL + 'api/users/new', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    resolveWithFullResponse: true
  })
}
export var Auth = (username, password) => {
  const options = {
    method: 'GET',
    uri: API_URL + 'oauth/v2/token',
    qs: {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: 'password',
      username: username,
      password: password
    },
    resolveWithFullResponse: true,
    json: true
  }
  return rp(options)
}
export var UploadImage = (avatar) => {
  var formData = new FormData()
  formData.append('avatar[path]', avatar)
  let userId = store.state.user.id
  let token = store.state.token.access_token
  return Vue.http.post(API_URL + 'api/users/' + userId + '/avatars?access_token=' + token, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    resolveWithFullResponse: true
  })
}
export var CURRENT_USER = (token) => {
  const options = {
    method: 'GET',
    uri: API_URL + 'api/users/current',
    qs: {
      access_token: token
    }
  }
  return rp(options)
}
export var REFRESH_TOKEN = (token) => {
  const options = {
    method: 'GET',
    uri: API_URL + 'oauth/v2/token',
    qs: {
      client_id: client_id,
      client_secret: client_secret,
      grant_type: 'refresh_token',
      refresh_token: token
    },
    json: true
  }
  return rp(options)
}
export var LOGOUT = () => {
  store.commit('LOGOUT')
}
export var GET_SECRET = (token) => {
  const options = {
    method: 'GET',
    uri: API_URL + 'api/secret_page/',
    qs: {
      access_token: token
    },
    json: true
  }
  return rp(options)
}
export var IS_EXPIRED_TOKEN = () => {
  let expiresAt = JSON.parse(store.state.token.expires_in)
  let date = new Date().getTime() > expiresAt
  return date
}
export var GET_CURRENT_POSITION_BROWSER = (lat, lng) => {
  const options = {
    method: 'GET',
    uri: 'https://api.geonames.org/countryCodeJSON',
    qs: {
      formatted: true,
      lat: lat,
      lng: lng,
      username: 'authapp'

    },
    json: true
  }
  return rp(options)
}
export var GET_CURRENT_POSITION_IP = () => {
  return Vue.http.get('https://api.ipdata.co')
}
