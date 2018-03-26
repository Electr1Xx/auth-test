import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import * as mutations from './mutations'
import vuexI18n from 'vuex-i18n'
import {en} from '../lang/language/en'
import {ru} from '../lang/language/ru'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState()]

})

Vue.use(vuexI18n.plugin, store)
Vue.i18n.add('en', en)
Vue.i18n.add('ru', ru)
Vue.i18n.set('en')

export default store
