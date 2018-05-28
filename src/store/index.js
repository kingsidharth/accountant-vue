import Vue from 'vue'
import Vuex from 'vuex'

import meta from './meta'
import accounts from './accounts'
import transactions from './transactions'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  modules: {
    meta,
    accounts,
    transactions
  }
})
