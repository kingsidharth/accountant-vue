import Vue from 'vue'
import Vuex from 'vuex'

import meta from './meta'
import accounts from './accounts'

Vue.use(Vuex)


const state = {
  transactions: [],
}

const modules = {
  meta,
  accounts
}

export default new Vuex.Store({
  state,
  // mutations,
  // actions,
  modules
})
