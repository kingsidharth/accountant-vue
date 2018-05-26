/*

  Accounts :: Store Module
  ============================

  Concerns:
  - CRUD Accounts
  - Account Details
  - Account Balances
  - Account Transactions

*/
import { union } from 'lodash'
import api from '../api'


const state = {
  accounts: []
}

const mutations = {
  account_get(state, payload) {
    state.accounts = union(state.accounts, payload)
  }
}

const actions = {
  account_get(context) {
    const endpoint = api.base_url('ACCOUNTS')

    return api.request(endpoint).then(({data}) => {
      context.commit('account_get', data)
    })
  },
}

export default {
  state,
  mutations,
  actions
}
