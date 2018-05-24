/*

  Transactions :: Store Module
  ============================

  Concerns: (Sync changes back & forth with remote server)
  - CRUD Transactions
  - Transaction Details
  - Amount & Balance Checks

*/
import { union } from 'lodash'
import api from './api'


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
    const endpoint = api.base_url('ACCOUNTS') + query.account_id + '/' + api.domain_url('TRANSACTIONS')
    return api.request(endpoint).then((transactions) => {
      context.dispatch('transactions_update', transactions)
    })
  }

}


export default {
  state,
  mutations,
  actions
}
