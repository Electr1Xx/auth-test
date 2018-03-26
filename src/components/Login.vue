<template>
  <b-container fluid class="main-section">
    <b-row>
      <b-col md="12" class="user-login-header text-center">
        <h1>{{$t('SignIn')}}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="4" sm="8" xs="12" offset-md="4" offset-sm="2" class="login-image-main text-center">
        <b-row>
          <b-col md="12" sm="12" xs="12" class="user-image-section">
            <b-img src="../assets/businessman.png"></b-img>
          </b-col>
          <b-col md="12" sm="12" xs="12" class="user-login-box">
            <b-form-group
              class="form-group"
              id="fieldset1"
              :invalid-feedback="invalidUsername"
              :state="usernameCheck"
            >
              <b-form-input class="form-control" id="input1"  :state="usernameCheck" v-model="username"
                            :placeholder="($t('enterUsername'))" required></b-form-input>
            </b-form-group>
            <b-form-group
              class="form-group"
              id="fieldset2"
              :invalid-feedback="invalidPassword"
              :state="checkPassword"
            >
              <b-form-input class="form-control" id="input2" :state="checkPassword" v-model="password"  @keypress.native="checkCaps"
                            :placeholder="($t('enterPassword1'))" required></b-form-input>
              <b-alert class="alert"
                       variant="danger"
                       :show="capsLockEnabled"
              >{{$t('capslock')}}</b-alert>
            </b-form-group>
            <p>{{error}}</p>
            <b-link :disabled="isValid()" @click="login" class="btn btn-defualt">{{$t('SignIn')}}</b-link>
          </b-col>
          <b-col md="12" sm="12" xs="12" class="last-part">
            <p>{{$t('notAccount')}}
              <b-link :to="{path: '/register', query:{userName: this.username, password: this.password}}">{{$t('createAccount')}}</b-link>
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {Auth} from '../services/auth'
import store from '../store'
import router from '../router'
import {CheckCaps} from '../services/checkCaps'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      error: '',
      capsLockEnabled: false
    }
  },
  computed: {
    usernameCheck () {
      if (this.username.length > 3) {
        return true
      } else if (!this.username) {
        return null
      } else {
        return false
      }
    },
    invalidUsername () {
      if (this.username.length > 3) {
        return ''
      } else {
        return this.$t('shortUsername')
      }
    },
    checkPassword () {
      if (this.password.length >= 6) {
        return true
      } else if (!this.password) {
        return null
      } else {
        return false
      }
    },
    invalidPassword () {
      if (this.password.length <= 6) {
        return this.$t('shortPassword')
      } else {
        return ''
      }
    }
  },
  methods: {
    isValid () {
      if (this.usernameCheck && this.checkPassword) {
        return false
      } else {
        return true
      }
    },
    login () {
      if (this.usernameCheck && this.checkPassword) {
        Auth(this.username, this.password).then(response => {
          let token = response.body
          store.commit('UPDATE_TOKEN', token)
          store.commit('UPDATE_AUTH', {isLoggedIn: true})
          router.push('/secret')
        }).catch(() => { this.error = this.$t('error') })
      } else {
      }
    },
    checkCaps (event) {
      this.capsLockEnabled = CheckCaps(event)
    }
  }
}
</script>

<style scoped>
  .main-section{
    background:url('../assets/imgpsh_fullsize.jpg') no-repeat;
    background-size:100% 100%;
    margin: 0px;
    width: 100%;
    height: 100vh
  }
  .user-login-header h1{
    font-size: 45px;
    color:#fff;
    margin-top: 5%;
  }
  .user-login-header p,.last-part p{
    color:#c9c5c7;
  }
  .user-login-header span{
    color:#fff;
    font-weight: 600;
  }
  .login-image-main{
    padding: 30px;
    background-color:#fff;
    border-radius:5px;
    box-shadow: 0 0 5px 0 #fff;
    margin-top: 15px;
  }
  .user-image-section img{
    background-color: #B56162;
    padding:30px;
    height:150px;
    width:150px;
    border-radius: 50%;
  }
  .user-login-box,.last-part{
    padding:20px;
  }
  .user-login-box a,.user-login-box a:hover{
    background-color: #B56162;
    border:1px solid #B56162;
    width: 100%;
    color:#fff;
    font-weight:600;
  }
  .last-part a{
    text-decoration: none;
    color:#B56162;
  }
  .alert{
    position: absolute;
    top: 65px;
    left: 97%;
    width: 200px;

  }
  @media (max-height: 800px){
    .main-section{
      height: 100%;
    }
    .login-image-main{
      margin-bottom: 3%;
    }
  }
</style>
