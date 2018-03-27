<template>
  <b-container fluid class="main-section">
    <b-row>
      <b-col  md="12" class="user-login-header text-center">
        <h1>{{$t('SignUp')}}</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col  md="4" sm="8" xs="12" offset-md="4" offset-sm="2" class="login-image-main text-center">
        <b-row >
          <b-col md="12" sm="12" xs="12" class="user-image-section">
            <label class="mr-sm-2" for="file-input" ><b-img accept="image/*" :src="imageSrc" >
            </b-img></label>
            <b-form-file  @change="uploadImg" id="file-input" class="mt-3" ></b-form-file>

          </b-col>
          <b-col md="12" sm="12" xs="12" class="user-login-box">
            <b-form-group
              class="form-group"
              id="email"
              :invalid-feedback="invalidEmail"
              :state="emailCheck"
            >
              <b-form-input type="text" class="form-control" id="input_email" :state="emailCheck" v-model="email" :placeholder="($t('enterEmail'))" required></b-form-input>
            </b-form-group>
            <b-form-group
              class="form-group"
              id="username"
              :invalid-feedback="invalidUsername"
              :state="checkUsername"
            >
              <b-form-input type="text" class="form-control" id="input_username" :state="checkUsername" v-model="username" :placeholder="($t('enterUsername'))" required></b-form-input>
            </b-form-group>
            <b-form-group
              class="form-group"
              id="password1"
              :invalid-feedback="invalidPassword1"
              :state="checkPassword"
            >
              <b-form-input type="password" class="form-control" @keypress.native="checkCaps"  id="input_password1" :state="checkPassword" v-model="password1" :placeholder="($t('enterPassword1'))" required></b-form-input>
              <b-alert class="alert"
                       variant="danger"
                       :show="capsLockEnabled"
              >{{$t('capslock')}}</b-alert>
            </b-form-group>
            <b-form-group
              class="form-group"
              id="password2"
              :invalid-feedback="invalidPassword2"
              :state="confirmPassword"
            >
              <b-form-input type="password" class="form-control" id="input_password2" :state="confirmPassword" v-model="password2" :placeholder="($t('enterPassword2'))"></b-form-input>
            </b-form-group>
            <p>{{error}}</p>
            <b-link :disabled="isValid()" @click="registration()" class="btn btn-defualt">{{$t('SignUp')}}</b-link>
          </b-col>
          <b-col md="12" sm="12" xs="12" class="last-part">
            <p>{{$t('haveAccount')}}<b-link to="/login">{{$t('SignIn')}}</b-link></p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {Auth, Register, UploadImage} from '../services/auth'
import {CheckCaps} from '../services/checkCaps'
import store from '../store'
import router from '../router'
export default {
  props: ['userName', 'password'],
  name: 'register',
  data () {
    return {
      email: '',
      password1: this.$route.query.password || '',
      password2: '',
      username: this.$route.query.userName || '',
      capsLockEnabled: false,
      error: '',
      avatar: null,
      imageSrc: '../static/businessman.png'
    }
  },
  computed: {
    checkUsername () {
      if (this.username.length > 3) {
        return true
      } else if (this.username.length === 0) {
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
    emailCheck () {
      if (this.isValidEmail(this.email)) {
        return true
      } else if (this.email.length === 0) {
        return null
      } else {
        return false
      }
    },
    invalidEmail () {
      if (!this.isValidEmail(this.email)) {
        return this.$t('emailNotValid')
      } else {
        return ''
      }
    },
    checkPassword () {
      if (this.password1.length >= 6) {
        return true
      } else if (this.password1.length === 0) {
        return null
      } else {
        return false
      }
    },
    invalidPassword1 () {
      if (this.password1.length <= 6) {
        return this.$t('shortPassword')
      } else {
        return ''
      }
    },
    confirmPassword () {
      if (this.password1 === this.password2 && this.password2 !== '') {
        return true
      } else if (!this.password2) {
        return null
      } else {
        return false
      }
    },
    invalidPassword2 () {
      if (this.password1 !== this.password2) {
        return this.$t('passwordNotMatch')
      } else {
        return ''
      }
    }
  },
  methods: {
    isValidEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    isValid () {
      if (this.checkUsername && this.emailCheck && this.checkPassword && this.confirmPassword) {
        return false
      } else {
        return true
      }
    },
    checkCaps (event) {
      this.capsLockEnabled = CheckCaps(event)
    },
    uploadImg (e) {
      let reader, files = e.target.files
      if (files.length === 0) {
        console.log('Empty')
      } else {
        reader = new FileReader()
        reader.onload = (e) => {
          this.imageSrc = e.target.result
        }
        this.avatar = files[0]
        reader.readAsDataURL(files[0])
      }
    },
    registration () {
      if (this.checkUsername && this.emailCheck && this.checkPassword && this.confirmPassword) {
        Register(this.email, this.username, this.password1, this.password2).then((response) => {
          let user = response.body
          store.commit('UPDATE_USER', user)
          Auth(this.username, this.password1).then(response => {
            let token = response.body
            store.commit('UPDATE_TOKEN', token)
            store.commit('UPDATE_AUTH', {isLoggedIn: true})
            if (this.avatar === null) {
              router.push('/secret')
            } else {
              UploadImage(this.avatar).then(response => { console.log(response) })
              router.push('/secret')
            }
          }).catch((error) => { console.log(error); this.error = this.$t('error') })
        }).catch((error) => { this.error = this.$t('alreadyExist') })
      } else {
      }
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
    height: 100vh;
  }
  .user-login-header{
    margin-top: 2%;
  }
  .login-image-main{
    margin-top: 15px;
  }
  .user-login-header h1{
    font-size: 45px;
    color:#fff;
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
  .mt-3{
    display: none;
  }
  .alert{
    position: absolute;
    top: 120px;
    left: 97%;
    width: 200px;
  }
  @media (max-height: 735px){
    .main-section{
      height: 100%;
    }
    .login-image-main{
      margin-bottom: 4%;
    }
    .user-login-header {
      margin-top: 1%;
    }
  }
</style>
