import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Secret from '../components/Secret'
import store from '../store'

import {IS_EXPIRED_TOKEN, REFRESH_TOKEN} from '../services/auth'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: true
    },
    {
      path: '/secret',
      name: 'Secret',
      component: Secret,
      beforeEnter: guardUserUnLogin
    },
    { path: '*',
      redirect: '/login'
    }

  ]
})

function guardUserUnLogin (to, from, next) {
  const auth = router.app.$options.store.state.auth.isLoggedIn
  const refreshToken = router.app.$options.store.state.token.refresh_token
  if (auth) {
    if (IS_EXPIRED_TOKEN()) {
      REFRESH_TOKEN(refreshToken).then(response => {
        let token = response
        store.commit('UPDATE_TOKEN', token)
        store.commit('UPDATE_AUTH', {isLoggedIn: true})
        router.push('/secret')
      })
    } else {
      next()
    }
  } else {
    next({
      path: '/login'
    })
  }
}

export default router
