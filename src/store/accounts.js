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

let endpoint = api.base_url('ACCOUNTS')


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
    return api.request(endpoint).then(({data}) => {
      context.commit('account_get', data)
    })
  },

  account_create(context, accounts) {
    return api.request(endpoint, accounts, 'POST')
              .then(({data, errors}) => {
                context.commit('account_get', data)
                context.dispatch('modal_close')
              })
  },
}

export default {
  state,
  mutations,
  actions
}
