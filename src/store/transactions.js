/*

  Transactions :: Store Module
  ============================

  Concerns: (Sync changes back & forth with remote server)
  - CRUD Transactions
  - Transaction Details
  - Amount & Balance Checks

*/
import { union } from 'lodash'
import api from '../api'


const state = {
  transactions: []
}


const mutations = {
  transactions_update(state, payload) {
    state.transactions = union(state.transactions, payload)
  }
}

const actions = {
  transactions_update(context, payload) {
    context.commit('transactions_update', payload)
  },

  account_get_transactions(context, query) {
    const endpoint = api.base_url('TRANSACTIONS') + api.make_url_param_string(query)

    return api.request(endpoint).then(({data}) => {
      context.dispatch('transactions_update', data)
    })
  }

}


export default {
  state,
  mutations,
  actions
}
