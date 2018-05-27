/*

  Accounts :: Store Module
  ============================

  Concerns:
  - CRUD Accounts
  - Account Details
  - Account Balances
  - Account Transactions

*/
import { unionWith, find, filter, includes, assign, map } from 'lodash'
import api from '../api'

let endpoint = api.base_url('ACCOUNTS')

/*

  State

*/
const state = {
  data: [], // Actual accounts stored here
}


/*

  Mutations

*/
const mutations = {
  accounts_remote_updated(state, payload) {
    let data = unionWith(state.data, payload, 'id')
    data = map(data, (d) => { return assign(d, { detailed: false }) })
    state.data = data
  },
}


/*

  Actions

*/
const actions = {
  /*
    App API
  */

  /*
    Remote
  */
  accounts_remote_get: (context) => {
    return api.request(endpoint).then(({data}) => {
      context.commit('accounts_remote_updated', data)
    })
  },

  account_get_details: (context, id) => {
    console.log(id);
  },

  account_create: (context, accounts) => {
    return api.request(endpoint, accounts, 'POST')
              .then(({data, errors}) => {
                context.commit('accounts_remote_updated', data)
                context.dispatch('modal_close')
              })
  },
}


/*

  Getters

*/
const getters = {
  accounts_get_all: (state) => {
    return state.data
  },

  account_get_details: (state) => (id) => {
    return find(state.data, { id: id })
  },
}


/*

  Store Package

*/
export default {
  state,
  mutations,
  actions,
  getters
}
