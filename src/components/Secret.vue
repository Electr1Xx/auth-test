<template>
<b-container fluid>
  <b-row><b-col>{{message}}</b-col></b-row>
  <b-row><b-col>{{user}}</b-col></b-row>
  <b-row><b-col><b-link  @click="logout()" class="btn btn-defualt">{{$t('logout')}}</b-link>
  </b-col></b-row>
  <div class="footer"><p>{{$t('footer')}}</p></div>
</b-container>
</template>

<script>
import {CURRENT_USER, GET_SECRET} from '../services/auth'
import store from '../store'
import router from '../router'

export default {
  name: 'secret',
  data () {
    return {
      message: '',
      user: {}
    }
  },
  mounted: function () {
    let token = store.state.token.access_token
    GET_SECRET(token).then(response => { this.message = response })
    CURRENT_USER(token).then(response => { this.user = response })
  },
  methods: {
    logout () {
      store.commit('LOGOUT')
      router.push('/login')
    }
  }

}

</script>

<style scoped>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: black;
    color: white;
    text-align: center;
  }
</style>
