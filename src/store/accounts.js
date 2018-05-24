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
import request from './api'


const state = {
  accounts: []
}

const mutations = {
  account_get(state, payload) {
    state.accounts = union(state.accounts, payload.accounts)
  }
}

const actions = {
  account_get(context) {
    const endpoint = 'http://local.appserver.com:5000/v1/accounts/'
    return request(endpoint).then((accounts) => {
      context.commit('account_get', accounts)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
