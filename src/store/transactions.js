/*

  Transactions :: Store Module
  ============================

  Concerns: (Sync changes back & forth with remote server)
  - CRUD Transactions
  - Transaction Details
  - Amount & Balance Checks

*/
import { find, filter, forEach } from 'lodash'

import api from '../api'
import { update_resource } from './helpers'

let endpoint = api.base_url('TRANSACTIONS')

const state = {
  data: []
}


const mutations = {
  transactions_remote_update: function(state, payload) {
    update_resource(state.data, payload)
  }
}

const actions = {
  transactions_remote_get: async function(context) {
    return await api.request(endpoint).then(({data}) => {
      context.commit('transactions_remote_update', data)
    })
  },
}

const getters = {
  get_account_transactions: (state) => (account_id) => {
    let data = state.data

    return filter(data, function(d) {
      if ( filter(d.amounts, { account_id: account_id }).length > 0) {
        return d
      } else {
        return false
      }
    })
  },
}


export default {
  state,
  mutations,
  actions,
  getters
}
