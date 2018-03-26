<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
import {GET_CURRENT_POSITION_BROWSER, GET_CURRENT_POSITION_IP} from './services/auth'
import Vue from 'vue'

export default {
  name: 'App',
  mounted: function () {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    function successCallback (position) {
      let lat = position.coords.latitude
      let lng = position.coords.longitude
      GET_CURRENT_POSITION_BROWSER(lat, lng).then(response => {
        if (response.countryCode === 'UA') {
          Vue.i18n.set('ru')
        } else {
          Vue.i18n.set('en')
        }
      })
    }
    function errorCallback (error) {
      if (error.code === error.PERMISSION_DENIED) {
        GET_CURRENT_POSITION_IP().then(response => {
          if (response.body.country_code === 'UA') {
            Vue.i18n.set('ru')
          } else {
            Vue.i18n.set('en')
          }
        })
      }
    }
  }
}
</script>

<style >
#app {
  height: 100%;
}
</style>
