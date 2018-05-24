import Vue from 'vue'
import Vuex from 'vuex'

import meta from './meta'
import accounts from './accounts'
import transactions from './transactions'

Vue.use(Vuex)

const modules = {
  meta,
  accounts,
  transactions
}

export default new Vuex.Store({
  modules
})
