import Vue from 'vue'
import Vuex from 'vuex'

import meta from './meta'

Vue.use(Vuex)


const state = {
  transactions: [],
  accounts: []
}

const modules = {
  meta
}

export default new Vuex.Store({
  state,
  // mutations,
  // actions,
  modules
})
